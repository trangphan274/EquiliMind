from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.database.database import reflections_collection
from app.service.auth_dependency import get_current_user


router = APIRouter(
    prefix="/api/reflections",
    tags=["Reflections"]
)


class ReflectionCreate(BaseModel):
    content: str = Field(min_length=1)
    tag: str | None = None


class ReflectionUpdate(BaseModel):
    content: str | None = Field(default=None, min_length=1)
    tag: str | None = None


def validate_id(reflection_id: str):
    if not ObjectId.is_valid(reflection_id):
        raise HTTPException(status_code=400, detail="Invalid reflection ID")
    return ObjectId(reflection_id)


@router.post("")
async def create_reflection(
    reflection: ReflectionCreate,
    user_id: str = Depends(get_current_user)
):
    now = datetime.now(timezone.utc)

    document = {
        "userId": user_id,
        "content": reflection.content,
        "tag": reflection.tag,
        "createdAt": now,
        "updatedAt": now
    }

    result = await reflections_collection.insert_one(document)

    return {
        "message": "Reflection saved successfully",
        "reflectionId": str(result.inserted_id)
    }


@router.get("")
async def get_reflections(
    user_id: str = Depends(get_current_user)
):
    reflections = await (
        reflections_collection
        .find({"userId": user_id})
        .sort("createdAt", -1)
        .to_list(100)
    )

    return [
        {
            "id": str(item["_id"]),
            "content": item["content"],
            "tag": item.get("tag"),
            "createdAt": item["createdAt"],
            "updatedAt": item["updatedAt"]
        }
        for item in reflections
    ]


@router.get("/{reflection_id}")
async def get_reflection(
    reflection_id: str,
    user_id: str = Depends(get_current_user)
):
    result = await reflections_collection.find_one({
        "_id": validate_id(reflection_id),
        "userId": user_id
    })

    if not result:
        raise HTTPException(status_code=404, detail="Reflection not found")

    return {
        "id": str(result["_id"]),
        "content": result["content"],
        "tag": result.get("tag"),
        "createdAt": result["createdAt"],
        "updatedAt": result["updatedAt"]
    }


@router.put("/{reflection_id}")
async def update_reflection(
    reflection_id: str,
    reflection: ReflectionUpdate,
    user_id: str = Depends(get_current_user)
):
    update_data = reflection.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    update_data["updatedAt"] = datetime.now(timezone.utc)

    result = await reflections_collection.update_one(
        {
            "_id": validate_id(reflection_id),
            "userId": user_id
        },
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Reflection not found")

    return {"message": "Reflection updated successfully"}


@router.delete("/{reflection_id}")
async def delete_reflection(
    reflection_id: str,
    user_id: str = Depends(get_current_user)
):
    result = await reflections_collection.delete_one({
        "_id": validate_id(reflection_id),
        "userId": user_id
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reflection not found")

    return {"message": "Reflection deleted successfully"}