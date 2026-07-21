"""
One-off script to create (or update) the admin user.

Usage:
    python scripts/create_admin.py you@example.com
    (will prompt for a password, hidden input)
"""
import getpass
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.auth import hash_password
from app.database import SessionLocal
from app.models import User


def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/create_admin.py <email>")
        sys.exit(1)

    email = sys.argv[1].strip().lower()
    password = getpass.getpass("Password: ")
    confirm = getpass.getpass("Confirm password: ")

    if password != confirm:
        print("Passwords do not match.")
        sys.exit(1)

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            user.hashed_password = hash_password(password)
            db.commit()
            print(f"Updated password for existing user {email}")
        else:
            user = User(email=email, hashed_password=hash_password(password))
            db.add(user)
            db.commit()
            print(f"Created admin user {email}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
