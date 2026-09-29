from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI(
    title="Healthcare Analytics Service",
    version="1.0.0"
)


class Patient(BaseModel):
    patientId: int
    age: int
    gender: str
    isActive: bool


class PatientAnalyticsRequest(BaseModel):
    patients: list[Patient]


@app.get("/health")
def health_check():
    return {
        "service": "Healthcare Analytics Service",
        "status": "Running"
    }


@app.post("/api/analytics/patient-summary")
def patient_summary(request: PatientAnalyticsRequest):

    patients = request.patients

    total_patients = len(patients)

    active_patients = sum(
        1 for patient in patients
        if patient.isActive
    )

    inactive_patients = total_patients - active_patients

    average_age = (
        sum(patient.age for patient in patients) / total_patients
        if total_patients > 0
        else 0
    )

    male_count = sum(
        1 for patient in patients
        if patient.gender.lower() == "male"
    )

    female_count = sum(
        1 for patient in patients
        if patient.gender.lower() == "female"
    )

    return {
        "totalPatients": total_patients,
        "activePatients": active_patients,
        "inactivePatients": inactive_patients,
        "averageAge": round(average_age, 2),
        "maleCount": male_count,
        "femaleCount": female_count
    }