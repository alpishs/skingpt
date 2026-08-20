import type { AnalysisResponse } from "../types/analysis";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

interface AnalyzeSkinRequest {
  image: File;
  symptoms: string;
}

export async function analyzeSkin({
  image,
  symptoms,
}: AnalyzeSkinRequest): Promise<AnalysisResponse> {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("symptoms", symptoms);

  const response = await fetch(`${API_BASE_URL}/api/v1/analysis`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image.");
  }

  return response.json();
}