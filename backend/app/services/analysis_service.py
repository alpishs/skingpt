import uuid


def create_analysis(
    image_path: str,
    symptoms: str,
):
    analysis_id = str(uuid.uuid4())

    return {
        "analysis_id": analysis_id,
        "image_filename": image_path.split("/")[-1],
        "symptoms": symptoms,
        "status": "completed",
        "message": "Image uploaded successfully. AI analysis will be added next.",
        "visual_observations": [],
        "possible_conditions": [],
        "confidence": None,
        "recommendations": [],
        "seek_professional_help": False,
        "disclaimer": (
            "This application provides AI-assisted information "
            "and is not a substitute for professional medical advice."
        ),
    }