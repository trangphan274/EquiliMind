
from fastapi import FastAPI

from app.database.database import client, db
from app.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.reflections import router as reflection_router
from app.routes.predictions import router as predictions_router
from app.routes.dashboard import router as dashboard_router
from app.routes.records import router as records_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(reflection_router)
app.include_router(predictions_router)
app.include_router(dashboard_router)
app.include_router(records_router)
@app.get("/")
async def root():
    return {
        "message": "EquiliMind API is running"
    }


@app.get("/health/database")
async def database_health():
    try:
        await client.admin.command("ping")

        return {
            "status": "success",
            "database": db.name,
            "message": "MongoDB connected successfully"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }