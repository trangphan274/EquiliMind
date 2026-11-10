
from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.database.database import (
    users_collection,
    predictions_collection
)
from app.service.auth_dependency import get_current_user


router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)


class ProfileUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    username: str | None = None

    role: str | None = None
    department: str | None = None
    job_level: str | None = None
    tenure_months: int | None = None


def get_user_object_id(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=401,
            detail="Invalid user ID"
        )

    return ObjectId(user_id)


# =========================
# GET PROFILE
# =========================

@router.get("")
async def get_profile(
    user_id: str = Depends(get_current_user)
):
    user = await users_collection.find_one({
        "_id": get_user_object_id(user_id)
    })

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Get latest prediction of current user
    predictions = await (
        predictions_collection
        .find({"userId": user_id})
        .sort("createdAt", -1)
        .to_list(1)
    )

    latest = predictions[0] if predictions else None
    inputs = latest.get("inputs", {}) if latest else {}

    profile = {
        "firstName": user.get("first_name", ""),
        "lastName": user.get("last_name", ""),
        "username": user.get("username", ""),
        "email": user.get("email", ""),

        # Prefer saved profile information.
        # If not available, use latest assessment inputs.
        "role": user.get("role") or inputs.get("role"),
        "department": (
            user.get("department")
            or inputs.get("department")
        ),
        "jobLevel": (
            user.get("job_level")
            or inputs.get("job_level")
        ),
        "tenureMonths": (
            user.get("tenure_months")
            if user.get("tenure_months") is not None
            else inputs.get("tenure_months")
        )
    }

    latest_assessment = None

    if latest:
        latest_assessment = {
            "predictionId": str(latest["_id"]),
            "burnoutRisk": latest.get("burnoutRisk"),
            "createdAt": latest.get("createdAt"),

            "satisfaction": inputs.get("satisfaction_score"),
            "workload": inputs.get("workload_score"),
            "collaboration": inputs.get("collaboration_score"),
            "overtimeHours": inputs.get("overtime_hours"),
            "projectCompletion": inputs.get(
                "project_completion_rate"
            ),
            "salary": inputs.get("salary")
        }

    return {
        "profile": profile,
        "latestAssessment": latest_assessment
    }


# =========================
# UPDATE PROFILE
# =========================

@router.put("")
async def update_profile(
    data: ProfileUpdate,
    user_id: str = Depends(get_current_user)
):
    object_id = get_user_object_id(user_id)

    user = await users_collection.find_one({
        "_id": object_id
    })

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    update_data = data.model_dump(exclude_unset=True)

    # Check username uniqueness
    if (
        "username" in update_data
        and update_data["username"] != user.get("username")
    ):
        existing = await users_collection.find_one({
            "username": update_data["username"]
        })

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

    # Map frontend fields to MongoDB fields
    field_mapping = {
        "first_name": "first_name",
        "last_name": "last_name",
        "username": "username",
        "role": "role",
        "department": "department",
        "job_level": "job_level",
        "tenure_months": "tenure_months"
    }

    update_fields = {}

    for frontend_field, database_field in field_mapping.items():
        if frontend_field in update_data:
            update_fields[database_field] = update_data[
                frontend_field
            ]

    if update_fields:
        update_fields["updated_at"] = datetime.now(timezone.utc)

        await users_collection.update_one(
            {"_id": object_id},
            {"$set": update_fields}
        )

    return {
        "message": "Profile updated successfully"
    }
