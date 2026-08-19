import json

import ollama


MODEL_NAME = "qwen2.5vl:7b"


SYSTEM_PROMPT = """
You are an AI assistant supporting a dermatology application.

Analyze the provided skin image and return ONLY valid JSON.

Your task is to describe visible characteristics, NOT to diagnose
a medical condition.

Return exactly this structure:

{
  "image_quality": "good | acceptable | poor",
  "visual_observations": [
    "observation 1",
    "observation 2"
  ],
  "uncertainties": [
    "uncertainty 1"
  ]
}

Rules:

- Describe only characteristics that can reasonably be observed.
- Examples include redness, dryness, swelling, bumps, scaling,
  discoloration, pigmentation, or visible lesions.
- Do not provide a definitive diagnosis.
- Do not prescribe medication.
- Do not invent observations that cannot be seen.
- If the image quality is poor, mention that in uncertainties.
- Keep observations concise.
- Return JSON only.
"""


def analyze_image(
    image_path: str,
    symptoms: str,
) -> dict:

    prompt = f"""
Analyze the provided skin image.

User-reported symptoms:
{symptoms}

Return the requested JSON structure.
Separate visually observable characteristics from the symptoms
reported by the user.

Do not provide a diagnosis.
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
                "images": [image_path],
            },
        ],
    )

    content = response["message"]["content"]

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "image_quality": "unknown",
            "visual_observations": [content],
            "uncertainties": [
                "The AI response could not be parsed into structured data."
            ],
        }