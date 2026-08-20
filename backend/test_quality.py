import asyncio
from fastapi import UploadFile

from app.services.image_quality_service import analyze_image_quality

IMAGE_PATH = "uploads/f1ebccbb-173e-4bfe-ad36-b77c2e4745af.png"   # <-- Change this path

async def main():
    with open(IMAGE_PATH, "rb") as f:
        upload = UploadFile(filename="photo.png", file=f)
        result = await analyze_image_quality(upload)

    print(result)

asyncio.run(main())