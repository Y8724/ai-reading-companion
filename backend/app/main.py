from fastapi import FastAPI
from .routes import books, auth
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="AI Reading Companion",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.include_router(books.router)
app.include_router(auth.router)

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