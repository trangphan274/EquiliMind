import os

from dotenv import load_dotenv
from pymongo import AsyncMongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "equilimind")

if not MONGO_URI:
    raise ValueError("MONGODB_URI is not set in .env")

client = AsyncMongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=30000,
    connectTimeoutMS=30000,
    socketTimeoutMS=30000,
)

db = client[DATABASE_NAME]

users_collection = db["users"]
predictions_collection = db["predictions"]
reflections_collection = db["reflections"]