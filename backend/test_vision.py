import ollama


IMAGE_PATH = "uploads/e3ff8f59-29d4-4dc6-83f5-e2f77000f804.png"

response = ollama.chat(
    model="qwen2.5vl:7b",
    messages=[
        {
            "role": "user",
            "content": """
            Look at this skin image and describe only visible
            characteristics such as redness, bumps, dryness,
            scaling, discoloration, swelling, or other visible
            features.

            Do not provide a diagnosis.
            If the image quality is insufficient, say so.
            """,
            "images": [IMAGE_PATH],
        }
    ],
)

print(response["message"]["content"])