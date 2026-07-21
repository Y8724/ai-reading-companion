from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Book
from ..schemas import BookCreate, BookUpdate, BookOut
from ..services.ai_service import summarize
from ..auth import get_current_user
from ..models import User

router = APIRouter(prefix="/books", tags=["Books"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# create - owned by whoever is logged in
@router.post("/", response_model=BookOut)
def create_book(
    book: BookCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    try:
        ai_summary = summarize(book.notes) if book.notes else None
    except Exception as e:
        print("AI summary failed:", e)
        ai_summary = None

    new_book = Book(
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        description=book.description,
        notes=book.notes,
        ai_summary=ai_summary,
        owner_id=current_user.id,
        is_public=bool(book.is_public) if current_user.is_admin else False,
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


# read - only the caller's own books ("My Books")
@router.get("/", response_model=list[BookOut])
def get_books(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(Book)
        .filter(Book.owner_id == current_user.id)
        .order_by(Book.created_at.desc())
        .all()
    )


# read - the public collection, no login required
@router.get("/public", response_model=list[BookOut])
def get_public_books(db: Session = Depends(get_db)):
    return (
        db.query(Book)
        .filter(Book.is_public.is_(True))
        .order_by(Book.created_at.desc())
        .all()
    )


# read one - must be the owner
@router.get("/{book_id}", response_model=BookOut)
def get_book(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    book = db.get(Book, book_id)
    if not book or book.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


# update - must be the owner
@router.put("/{book_id}", response_model=BookOut)
def update_book(
    book_id: int,
    data: BookUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    book = db.get(Book, book_id)
    if not book or book.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Book not found")

    update_data = data.dict(exclude_unset=True)
    if "is_public" in update_data and not current_user.is_admin:
        update_data.pop("is_public")

    for field, value in update_data.items():
        setattr(book, field, value)

    if data.notes:
        book.ai_summary = summarize(data.notes)

    db.commit()
    db.refresh(book)
    return book


# delete - must be the owner
@router.delete("/{book_id}")
def delete_book(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    book = db.get(Book, book_id)
    if not book or book.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(book)
    db.commit()
    return{"message": "Book deleted"}


@router.post("/{book_id}/summarize", response_model=BookOut)
def generate_summary(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    book = db.get(Book, book_id)

    if not book or book.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Book not found")

    if not book.notes:
        raise HTTPException(status_code=400, detail="No notes to summarize")

    try:
        book.ai_summary = summarize(book.notes)
    except Exception as e:
        print("AI summary failed:", e)
        book.ai_summary = "AI summary unavailable (API quota exceeded)."

    db.commit()
    db.refresh(book)

    return book
