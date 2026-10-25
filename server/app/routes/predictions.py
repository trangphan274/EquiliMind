from datetime import datetime, timezone

from fastapi import APIRouter, Depends

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