from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr

from app.database.database import users_collection
from app.service.auth_dependency import get_current_user
from app.database.database import (
    users_collection,
    reflections_collection,
    predictions_collection
)

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


class UserUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    username: str | None = None
    email: EmailStr | None = None


def get_user_object_id(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=401, detail="Invalid user ID")
    return ObjectId(user_id)


@router.get("/me")
async def get_my_profile(
    user_id: str = Depends(get_current_user)
):
    user = await users_collection.find_one({
        "_id": get_user_object_id(user_id)
    })

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": str(user["_id"]),
        "first_name": user.get("first_name"),
        "last_name": user.get("last_name"),
        "username": user.get("username"),
        "email": user.get("email")
    }


@router.put("/me")
async def update_my_profile(
    profile: UserUpdate,
    user_id: str = Depends(get_current_user)
):
    update_data = profile.model_dump(
        exclude_unset=True,
        exclude_none=True
    )

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    object_id = get_user_object_id(user_id)

    # Check username uniqueness
    if "username" in update_data:
        existing = await users_collection.find_one({
            "username": update_data["username"],
            "_id": {"$ne": object_id}
        })

        if existing:
            raise HTTPException(status_code=400, detail="Username already exists")

    # Check email uniqueness
    if "email" in update_data:
        update_data["email"] = str(update_data["email"])

        existing = await users_collection.find_one({
            "email": update_data["email"],
            "_id": {"$ne": object_id}
        })

        if existing:
            raise HTTPException(status_code=400, detail="Email already exists")

    result = await users_collection.update_one(
        {"_id": object_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Profile updated successfully"}


@router.delete("/me")
async def delete_my_account(
    user_id: str = Depends(get_current_user)
):
    object_id = get_user_object_id(user_id)

    result = await users_collection.delete_one({
        "_id": object_id
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    # Remove the user's related data
    await reflections_collection.delete_many({"userId": user_id})
    await predictions_collection.delete_many({"userId": user_id})

    return {"message": "Account and related data deleted successfully"}