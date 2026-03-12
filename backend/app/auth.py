import os
from fastapi import Header, HTTPException


ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")


def admin_required(authorization: str = Header(...)
):

    """
    Expect header:
    Authorization: Bearer <Admin_Token>
    """
    if not authorization.startswith("Bearer"):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    
    token = authorization.replace("Bearer", "").strip()

    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Forbidden")

    return True


