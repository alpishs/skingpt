from fastapi import APIRouter, File, Form, UploadFile

from app.schemas.analysis import AnalysisResponse
from app.services.analysis_service import create_analysis
from app.services.image_service import save_image


router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)


@router.post(
    "",
    response_model=AnalysisResponse,
)
async def analyze_skin(
    image: UploadFile = File(...),
    symptoms: str = Form(""),
):
    image_path = await save_image(image)

    result = create_analysis(
        image_path=image_path,
        symptoms=symptoms,
    )

    return result