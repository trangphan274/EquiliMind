from pydantic import BaseModel


class PredictionRequest(BaseModel):
    project_completion_rate: float
    role: str
    job_level: str
    department: str
    satisfaction_score: float
    workload_score: float
    collaboration_score: float
    overtime_hours: float
    tenure_months: float
    salary: float