
from fastapi import APIRouter, Depends
from app.database.database import predictions_collection
from app.service.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("")
async def get_dashboard(
    user_id: str = Depends(get_current_user)
):
    # Get all predictions belonging to the current user
    predictions = await (
        predictions_collection
        .find({"userId": user_id})
        .sort("createdAt", 1)
        .to_list(1000)
    )

    # No assessments yet
    if not predictions:
        return {
            "summary": None,
            "trend": [],
            "workMetrics": [],
            "latestAssessment": None,
            "profile": None
        }

    # -------------------------
    # Latest prediction
    # -------------------------

    latest = predictions[-1]
    latest_inputs = latest.get("inputs", {})

    # -------------------------
    # Summary
    # -------------------------

    summary = {
        "burnoutRisk": latest.get("burnoutRisk", 0),
        "satisfaction": latest_inputs.get("satisfaction_score", 0),
        "workload": latest_inputs.get("workload_score", 0),
        "overtimeHours": latest_inputs.get("overtime_hours", 0),
        "projectCompletion": latest_inputs.get(
            "project_completion_rate", 0
        )
    }

    # -------------------------
    # Burnout trend
    # -------------------------

    trend = []

    for prediction in predictions:
        trend.append({
            "date": prediction.get("createdAt"),
            "burnoutRisk": prediction.get("burnoutRisk", 0)
        })

    # -------------------------
    # Work metrics
    # -------------------------

    work_metrics = []

    for prediction in predictions:
        inputs = prediction.get("inputs", {})

        work_metrics.append({
            "date": prediction.get("createdAt"),
            "satisfaction": inputs.get(
                "satisfaction_score", 0
            ),
            "workload": inputs.get(
                "workload_score", 0
            ),
            "collaboration": inputs.get(
                "collaboration_score", 0
            ),
            "projectCompletion": inputs.get(
                "project_completion_rate", 0
            ),
            "overtimeHours": inputs.get(
                "overtime_hours", 0
            )
        })

    # -------------------------
    # Latest assessment
    # -------------------------

    latest_assessment = {
        "predictionId": str(latest.get("_id")),
        "burnoutRisk": latest.get("burnoutRisk", 0),
        "createdAt": latest.get("createdAt"),
        "inputs": latest_inputs
    }

    # -------------------------
    # Profile
    # -------------------------

    profile = {
        "role": latest_inputs.get("role"),
        "department": latest_inputs.get("department"),
        "jobLevel": latest_inputs.get("job_level"),
        "tenureMonths": latest_inputs.get("tenure_months")
    }

    return {
        "summary": summary,
        "trend": trend,
        "workMetrics": work_metrics,
        "latestAssessment": latest_assessment,
        "profile": profile
    }
