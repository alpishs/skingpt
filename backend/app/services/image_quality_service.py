
import cv2
import numpy as np
from fastapi import UploadFile

BLUR_THRESHOLD = 100
LOW_LIGHT_THRESHOLD = 60
HIGH_LIGHT_THRESHOLD = 220
MIN_WIDTH = 512
MIN_HEIGHT = 512


async def analyze_image_quality(image: UploadFile):
    """
    Analyze uploaded image quality before AI inference.
    """

    image.file.seek(0)
    image_bytes = await image.read()

    np_image = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Invalid image uploaded.")

    height, width = img.shape[:2]

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
    brightness = gray.mean()

    suggestions = []
    checks = {}

    # Blur
    if blur_score < BLUR_THRESHOLD:
        checks["blur"] = "Fail"
        suggestions.append(
            "Image appears blurry. Please retake the photo."
        )
    else:
        checks["blur"] = "Pass"

    # Lighting
    if brightness < LOW_LIGHT_THRESHOLD:
        checks["lighting"] = "Too Dark"
        suggestions.append(
            "Increase lighting before taking the photo."
        )
    elif brightness > HIGH_LIGHT_THRESHOLD:
        checks["lighting"] = "Too Bright"
        suggestions.append(
            "Reduce harsh lighting or flash."
        )
    else:
        checks["lighting"] = "Pass"

    # Resolution
    if width < MIN_WIDTH or height < MIN_HEIGHT:
        checks["resolution"] = "Low Resolution"
        suggestions.append(
            "Use a higher-resolution image."
        )
    else:
        checks["resolution"] = f"{width} x {height}"

    # Quality Score
    score = 100

    if blur_score < BLUR_THRESHOLD:
        score -= 30

    if brightness < LOW_LIGHT_THRESHOLD or brightness > HIGH_LIGHT_THRESHOLD:
        score -= 20

    if width < MIN_WIDTH or height < MIN_HEIGHT:
        score -= 20

    score = max(score, 0)

    if score >= 85:
        status = "good"
    elif score >= 60:
        status = "acceptable"
    else:
        status = "poor"

    image.file.seek(0)

    return {
        "quality_score": score,
        "status": status,
        "blur_score": round(float(blur_score), 2),
        "brightness": round(float(brightness), 2),
        "resolution": f"{width} x {height}",
        "quality_checks": checks,
        "quality_suggestions": suggestions,
    }