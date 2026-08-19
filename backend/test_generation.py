from app.services.rag_service import search_knowledge
from app.services.llm_service import generate_response


symptoms = """
Redness and itching for three days.
The area also feels slightly dry.
"""

visual_observations = [
    "Localized redness",
    "Small raised bumps",
    "Mild dryness",
]


query = f"""
Symptoms:
{symptoms}

Visual observations:
{visual_observations}
"""


knowledge = search_knowledge(
    query=query,
    limit=3,
)


result = generate_response(
    symptoms=symptoms,
    visual_observations=visual_observations,
    knowledge_context=knowledge,
)


print("\n========== SKINGPT RESPONSE ==========\n")
print(result)