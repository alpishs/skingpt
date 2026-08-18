import { useState } from "react";

import { ImageUploader } from "../../components/ImageUploader/ImageUploader";
import { SymptomForm } from "../../components/SymptomForm/SymptomForm";
import { AnalysisResult } from "../../components/AnalysisResult/AnalysisResult";
import { analyzeSkin } from "../../services/analysisApi";
import type { AnalysisResponse } from "../../types/analysis";

export function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!image) {
      setError("Please upload a skin image.");
      return;
    }

    if (!symptoms.trim()) {
      setError("Please describe your symptoms.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await analyzeSkin(
        image,
        symptoms.trim()
      );

      setResult(response);
    } catch {
      setError(
        "We couldn't analyze your image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <h1>SkinGPT</h1>
          <p>AI-assisted skin analysis</p>
        </header>

        <section className="card">
          <ImageUploader
            onImageSelected={setImage}
          />

          <SymptomForm
            symptoms={symptoms}
            onChange={setSymptoms}
          />

          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Skin"}
          </button>

          {error && (
            <div className="error">
              {error}
            </div>
          )}
        </section>

        {result && (
          <section className="card result-card">
            <AnalysisResult result={result} />
          </section>
        )}
      </div>
    </main>
  );
}