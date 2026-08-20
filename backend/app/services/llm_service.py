import json

import ollama


MODEL_NAME = "qwen2.5:7b"


RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "summary": {
            "type": "string"
        },
        "possible_conditions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "reason": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "reason"
                ]
            }
        },
        "recommendations": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "seek_professional_help": {
            "type": "boolean"
        },
        "confidence": {
            "type": "string",
            "enum": [
                "low",
                "moderate",
                "high"
            ]
        },
        "safety_note": {
            "type": "string"
        }
    },
    "required": [
        "summary",
        "possible_conditions",
        "recommendations",
        "seek_professional_help",
        "confidence",
        "safety_note"
    ]
}


SYSTEM_PROMPT = """
You are SkinGPT, an AI assistant for dermatology education.

You receive:
1. User-reported symptoms
2. Visual observations from an image model
3. Retrieved dermatology reference information

Use the reference information to explain what the observations
may be consistent with.

IMPORTANT:
- Do not provide a definitive diagnosis.
- Do not claim certainty.
- Do not prescribe medication.
- Do not invent medical facts.
- Clearly distinguish observations from possible explanations.
- Recommend professional medical evaluation when appropriate.
- If information is insufficient, say so.
"""


def generate_response(
    symptoms: str,
    visual_observations: list[str],
    knowledge_context: list[dict],
) -> dict:

    knowledge_text = "\n\n".join(
        [
            (
                f"### {item['title']}\n"
                f"{item['content']}\n"
                f"Source: {item.get('source', 'Unknown')}"
            )
            for item in knowledge_context
        ]
    )

    observations_text = "\n".join(
        f"- {observation}"
        for observation in visual_observations
    )

    prompt = f"""
USER SYMPTOMS:
{symptoms}

VISUAL OBSERVATIONS:
{observations_text}

REFERENCE INFORMATION:
{knowledge_text}

Based only on the information above, generate the final
SkinGPT response.
"""

    response = ollama.chat(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        format=RESPONSE_SCHEMA,
        options={
            "temperature": 0,
            "num_ctx": 8192,
        },
    )

    content = response["message"]["content"]

    return json.loads(content)