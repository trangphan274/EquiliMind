from fastapi import APIRouter, Depends
from app.database.database import predictions_collection
from app.service.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/records",
    tags=["Records"]
)


@router.get("")
async def get_records(
    user_id: str = Depends(get_current_user)
):
    predictions = await (
        predictions_collection
        .find({"userId": user_id})
        .sort("createdAt", -1)
        .to_list(1000)
    )

    records = []

    for index, prediction in enumerate(predictions):
        burnout_risk = float(
            prediction.get("burnoutRisk", 0)
        )

        # Compare with the previous assessment
        previous_risk = None

        if index + 1 < len(predictions):
            previous_risk = float(
                predictions[index + 1].get(
                    "burnoutRisk",
                    0
                )
            )

        change = None

        if previous_risk is not None:
            change = round(
                (burnout_risk - previous_risk) * 100,
                1
            )

        records.append({
            "predictionId": str(
                prediction.get("_id")
            ),
            "createdAt": prediction.get(
                "createdAt"
            ),
            "burnoutRisk": burnout_risk,
            "previousRisk": previous_risk,
            "change": change,
            "inputs": prediction.get(
                "inputs",
                {}
            )
        })

    return {
        "records": records,
        "total": len(records)
    }