import uuid

from app.services.scoring_service import calculate_skin_score
from app.services.llm_service import generate_response
from app.services.rag_service import search_knowledge
from app.services.vision_service import analyze_image


def create_analysis(
    image_path: str,
    symptoms: str,
):
    analysis_id = str(uuid.uuid4())

    # 1. Analyze image
    visual_analysis = analyze_image(
        image_path=image_path,
        symptoms=symptoms,
    )

    visual_observations = visual_analysis[
        "visual_observations"
    ]

    # 2. Build RAG query
    rag_query = f"""
    Symptoms:
    {symptoms}

    Visual observations:
    {visual_observations}
    """

    # 3. Retrieve relevant knowledge
    knowledge = search_knowledge(
        query=rag_query,
        limit=3,
    )

    # 4. Generate final response
    ai_response = generate_response(
        symptoms=symptoms,
        visual_observations=visual_observations,
        knowledge_context=knowledge,
    )

    skin_score_result = calculate_skin_score(
        confidence=ai_response["confidence"],
        possible_conditions=ai_response["possible_conditions"],
        visual_observations=visual_analysis["visual_observations"],
    )

    return {
        "analysis_id": analysis_id,
        "image_filename": image_path.split("/")[-1],
        "symptoms": symptoms,
        "status": "completed",
        "message": "AI analysis completed.",

        "image_quality": visual_analysis[
            "image_quality"
        ],

        "visual_observations": visual_observations,

        "uncertainties": visual_analysis[
            "uncertainties"
        ],

        "possible_conditions": ai_response[
            "possible_conditions"
        ],

        "confidence": ai_response[
            "confidence"
        ],

        "recommendations": ai_response[
            "recommendations"
        ],

        "seek_professional_help": ai_response[
            "seek_professional_help"
        ],

        "disclaimer": ai_response[
            "safety_note"
        ],
        "skin_score": skin_score_result["skin_score"],
        "skin_level": skin_score_result["skin_level"],
        "references": [
            {
                "title": item["title"],
                "source": item["source"],
                "url": item["source_url"],
            }
            for item in knowledge
        ],
    }