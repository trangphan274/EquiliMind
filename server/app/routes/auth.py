from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import bcrypt
from app.service.auth_service import create_access_token
from app.database.database import users_collection


router = APIRouter(prefix="/auth", tags=["Authentication"])


# =========================
# REGISTER
# =========================

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: EmailStr
    password: str


@router.post("/register")
async def register(user: RegisterRequest):

    # Check username
    existing_username = await users_collection.find_one(
        {"username": user.username}
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    # Check email
    existing_email = await users_collection.find_one(
        {"email": user.email}
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Hash password
    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    # Create user
    new_user = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }

    # Save to MongoDB
    result = await users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id)
    }


# =========================
# LOGIN
# =========================

class LoginRequest(BaseModel):
    username_or_email: str
    password: str


@router.post("/login")
async def login(user: LoginRequest):

    # Find user by username OR email
    existing_user = await users_collection.find_one(
        {
            "$or": [
                {"username": user.username_or_email},
                {"email": user.username_or_email}
            ]
        }
    )

    # User does not exist
    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username/email or password"
        )

    # Check password
    password_is_correct = bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing_user["password"].encode("utf-8")
    )

    # Wrong password
    if not password_is_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid username/email or password"
        )

       # Create JWT token
    access_token = create_access_token(
        str(existing_user["_id"])
    )

    # Login successful
    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(existing_user["_id"]),
            "first_name": existing_user["first_name"],
            "last_name": existing_user["last_name"],
            "username": existing_user["username"],
            "email": existing_user["email"]
        }
    }