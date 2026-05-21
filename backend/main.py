from fastapi import FastAPI
from pydantic import BaseModel
from matcher import match_trials
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Patient(BaseModel):
    name: str
    age: int
    conditions: list
    symptoms: list
    lab_results: dict


@app.get("/")
def home():
    return {"message": "Clinical Trial Matching API Running"}


@app.post("/match")
def match_patient(patient: Patient):

    patient_data = patient.dict()

    matches = match_trials(patient_data)

    # Generate simple explanations
    for match in matches:

        match["ai_explanation"] = (
            f"This patient shows similarity with "
            f"{match['disease']} trial criteria "
            f"based on symptoms, conditions, "
            f"and lab results."
        )

    return {
        "patient": patient_data,
        "matches": matches
    }