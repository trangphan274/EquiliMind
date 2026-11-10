from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from bson import ObjectId
from fastapi import HTTPException
from app.database.database import predictions_collection
from app.service.auth_dependency import get_current_user
from app.service.model_service import predict_burnout
from app.models.prediction import PredictionRequest


router = APIRouter(
    prefix="/api/predictions",
    tags=["Predictions"]
)


@router.post("")
async def create_prediction(
    prediction: PredictionRequest,
    user_id: str = Depends(get_current_user)
):
    input_data = prediction.model_dump()

    burnout_risk = predict_burnout(input_data)

    now = datetime.now(timezone.utc)

    document = {
        "userId": user_id,
        "burnoutRisk": burnout_risk,
        "inputs": input_data,
        "createdAt": now,
        "updatedAt": now,
    }

    result = await predictions_collection.insert_one(document)

    return {
        "message": "Prediction created successfully",
        "predictionId": str(result.inserted_id),
        "burnoutRisk": burnout_risk,
        "createdAt": now,
    }
@router.get("/{prediction_id}")
async def get_prediction(
    prediction_id: str,
    user_id: str = Depends(get_current_user)
):
    if not ObjectId.is_valid(prediction_id):
        raise HTTPException(status_code=400, detail="Invalid prediction ID")

    prediction = await predictions_collection.find_one({
        "_id": ObjectId(prediction_id),
        "userId": user_id
    })

    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return {
        "predictionId": str(prediction["_id"]),
        "burnoutRisk": prediction.get("burnoutRisk"),
        "inputs": prediction.get("inputs", {}),
        "createdAt": prediction.get("createdAt"),
        "updatedAt": prediction.get("updatedAt")
    }


@router.delete("/{prediction_id}")
async def delete_prediction(
    prediction_id: str,
    user_id: str = Depends(get_current_user)
):
    if not ObjectId.is_valid(prediction_id):
        raise HTTPException(status_code=400, detail="Invalid prediction ID")

    result = await predictions_collection.delete_one({
        "_id": ObjectId(prediction_id),
        "userId": user_id
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return {"message": "Prediction deleted successfully"}