
from pydantic import BaseModel


class ImageQualityResponse(BaseModel):
    quality_score: int
    status: str
    blur_score: float
    brightness: float
    resolution: str
    quality_checks: dict
    quality_suggestions: list[str]