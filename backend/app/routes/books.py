from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Book
from ..schemas import BookCreate, BookUpdate, BookOut
from ..services.ai_service import summarize
from ..auth import admin_required

router = APIRouter(prefix="/books", tags=["Books"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Create admin only
@router.post("/", response_model=BookOut)
def create_book(
    book: BookCreate,
    _: bool = Depends(admin_required),
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
        ai_summary=ai_summary
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


#read all
@router.get("/", response_model=list[BookOut])
def get_books(db: Session = Depends(get_db)):
    return db.query(Book).order_by(Book.id.desc()).all()

#read one
@router.get("/{book_id}", response_model=BookOut)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


#update admin only
@router.put("/{book_id}", response_model=BookOut)
def update_book(
    book_id: int,
    data: BookUpdate,
    _: bool = Depends(admin_required),
    db: Session = Depends(get_db),
):

    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(book, field, value)

    if data.notes:
        book.ai_summary = summarize(data.notes)
    
    db.commit()
    db.refresh(book)
    return book


#delete admin only
@router.delete("/{book_id}")
def delete_book(
    book_id: int,
    _: bool = Depends(admin_required),
    db: Session = Depends(get_db),
):

    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not faund")

    db.delete(book)
    db.commit()
    return{"message": "Book deleted"}


@router.post("/{book_id}/summarize", response_model=BookOut)
def generate_summary(
    book_id: int,
    _: bool = Depends(admin_required),
    db: Session = Depends(get_db),
):
    book = db.get(Book, book_id)

    if not book:
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
