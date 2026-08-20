from pydantic import BaseModel


class PossibleCondition(BaseModel):
    name: str
    reason: str


class AnalysisResponse(BaseModel):
    analysis_id: str
    image_filename: str
    symptoms: str
    status: str
    message: str

    image_quality: str

    visual_observations: list[str]
    uncertainties: list[str]

    possible_conditions: list[PossibleCondition]
    confidence: str | None

    recommendations: list[str]

    seek_professional_help: bool

    disclaimer: str

    skin_score: int
    skin_level: str