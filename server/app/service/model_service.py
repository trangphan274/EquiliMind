import json
from pathlib import Path

from catboost import CatBoostRegressor


BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "ml"

MODEL_PATH = MODEL_DIR / "catboost_burnout_model.cbm"
METADATA_PATH = MODEL_DIR / "model_metadata.json"


# Load model
model = CatBoostRegressor()
model.load_model(str(MODEL_PATH))


# Load metadata
with open(METADATA_PATH, "r", encoding="utf-8") as file:
    metadata = json.load(file)


FEATURES = metadata["features"]
CATEGORICAL_FEATURES = metadata["categorical_features"]
JOB_LEVEL_MAPPING = metadata["job_level_mapping"]


def predict_burnout(data):
    data = data.copy()

    # Convert job level to the same numeric values
    # used during model training.
    data["job_level"] = (
        JOB_LEVEL_MAPPING
        .get(data["job_level"], 0)
    )

    # Keep exactly the same feature order as training.
    input_data = [
        data[feature]
        for feature in FEATURES
    ]

    prediction = model.predict([input_data])[0]

    return float(prediction)