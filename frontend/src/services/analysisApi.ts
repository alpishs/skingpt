import type { AnalysisResponse } from "../types/analysis";

const API_URL = "http://localhost:8000/api/v1";

export async function analyzeSkin(
  image: File,
  symptoms: string
): Promise<AnalysisResponse> {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("symptoms", symptoms);

  const response = await fetch(`${API_URL}/analysis`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  return response.json();
}