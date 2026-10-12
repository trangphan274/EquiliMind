from fastapi import APIRouter
from app.database.database import reflections_collection
from app.models.reflection import ReflectionCreate
from datetime import datetime, timezone

router = APIRouter(
    prefix="/api/reflections",
    tags=["Reflections"]
)


@router.post("")
async def create_reflection(reflection: ReflectionCreate):
    now = datetime.now(timezone.utc)

    document = {
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