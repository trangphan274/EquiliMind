from fastapi import APIRouter, Depends
from app.database.database import reflections_collection
from app.models.reflection import ReflectionCreate
from app.service.auth_dependency import get_current_user
from datetime import datetime, timezone


router = APIRouter(
    prefix="/api/reflections",
    tags=["Reflections"]
)


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
        "updatedAt": now,
    }

    result = await reflections_collection.insert_one(document)

    return {
        "message": "Reflection saved successfully",
        "reflectionId": str(result.inserted_id),
    }


@router.get("")
async def get_reflections(
    user_id: str = Depends(get_current_user)
):
    reflections = await reflections_collection.find(
        {"userId": user_id}
    ).sort(
        "createdAt", -1
    ).to_list(100)

    return [
        {
            "id": str(reflection["_id"]),
            "content": reflection["content"],
            "tag": reflection.get("tag"),
            "createdAt": reflection["createdAt"],
            "updatedAt": reflection["updatedAt"],
        }
        for reflection in reflections
    ]