from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile, HTTPException


UPLOAD_DIR = Path("uploads")
MAX_FILE_SIZE = 5 * 1024 * 1024

ALLOWED_CONTENT_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


async def save_image(image: UploadFile) -> str:
    if image.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG, and WebP images are supported.",
        )

    content = await image.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image size must be less than 5 MB.",
        )

    UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    extension = ALLOWED_CONTENT_TYPES[image.content_type]

    filename = f"{uuid4()}{extension}"
    file_path = UPLOAD_DIR / filename

    file_path.write_bytes(content)

    return str(file_path)