import type { AnalysisResponse } from "../../types/analysis";

interface AnalysisResultProps {
  result: AnalysisResponse;
}

export function AnalysisResult({
  result,
}: AnalysisResultProps) {
  return (
    <>
      <div className="result-header">
        <div>
          <h2 className="result-title">
            Analysis Result
          </h2>

          <p className="result-subtitle">
            Your image has been received successfully.
          </p>
        </div>

        <span className="status">
          {result.status}
        </span>
      </div>

      <div className="result-section">
        <h3>Symptoms</h3>

        <p>
          {result.symptoms || "No symptoms provided."}
        </p>
      </div>

      <div className="result-placeholder">
        <span className="result-placeholder-icon">
          ✦
        </span>

        <div>
          <strong>AI analysis coming next</strong>

          <p>
            The multimodal AI layer will analyze the
            image and symptoms here.
          </p>
        </div>
      </div>

      <p className="disclaimer">
        SkinGPT provides AI-assisted information and is
        not a substitute for professional medical advice.
      </p>
    </>
  );
}