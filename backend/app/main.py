from fastapi import FastAPI
from .database import Base, engine
from .routes import books
from fastapi.middleware.cors import CORSMiddleware
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Reading Companion",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.include_router(books.router)

origins = [
    "http://localhost:5173",  # local development
    "https://ai-reading-companion.netlify.app" # production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# simple health check route
@app.get("/")
def root():
    return {"message": "AI Reading Companion API running"}