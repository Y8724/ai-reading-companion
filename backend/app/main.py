from fastapi import FastAPI
from .database import Base, engine
from .routes import books
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Reading Companion")

app.include_router(books.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
     "https://your-frontend.netlify.app"
    ]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)