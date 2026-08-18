from typing import List

from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    analysis_id: str
    image_filename: str
    symptoms: str
    status: str
    message: str
    visual_observations: List[str] = []
    possible_conditions: List[str] = []
    confidence: str | None = None
    recommendations: List[str] = []
    seek_professional_help: bool = False
    disclaimer: str