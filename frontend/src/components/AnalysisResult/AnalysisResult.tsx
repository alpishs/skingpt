import type { AnalysisResponse } from "../../types/analysis";

interface AnalysisResultProps {
  result: AnalysisResponse;
}

export function AnalysisResult({
  result,
}: AnalysisResultProps) {
  return (
    <>
      {/* Header */}
      <div className="result-header">
        <div>
          <h2 className="result-title">
            Analysis Result
          </h2>

          <p className="result-subtitle">
            AI-assisted analysis based on your image and symptoms.
          </p>
        </div>

        <span className="status">
          {result.status}
        </span>
      </div>

      {/* AI Generated Badge */}
      <div className="ai-generated-badge">
        <span className="ai-generated-icon">
          ✦
        </span>

        <span>
          AI-generated analysis
        </span>
      </div>

      {/* Safety Banner */}
      <div className="safety-banner">
        <div className="safety-banner-icon">
          ⓘ
        </div>

        <div>
          <strong>
            Not a diagnosis
          </strong>

          <p>
            This analysis is for informational purposes only.
            SkinGPT cannot confirm a medical condition from an
            image. Please consult a qualified healthcare
            professional for diagnosis or treatment.
          </p>
        </div>
      </div>

      {/* Symptoms */}
      <div className="result-section">
        <h3>
          Symptoms
        </h3>

        <p>
          {result.symptoms || "No symptoms provided."}
        </p>
      </div>

      {/* Image Quality */}
      <div className="result-section">
        <h3>
          Image Quality
        </h3>

        <span className="quality-badge">
          {result.image_quality}
        </span>
      </div>

      {/* Visual Observations */}
      <div className="result-section">
        <h3>
          Visible Observations
        </h3>

        {result.visual_observations?.length > 0 ? (
          <ul className="observation-list">
            {result.visual_observations.map(
              (observation, index) => (
                <li key={index}>
                  {observation}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>
            No visual observations available.
          </p>
        )}
      </div>

      {/* Uncertainties */}
      {result.uncertainties?.length > 0 && (
        <div className="result-section uncertainty-section">
          <h3>
            Uncertainties
          </h3>

          <ul className="observation-list">
            {result.uncertainties.map(
              (uncertainty, index) => (
                <li key={index}>
                  {uncertainty}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Possible Explanations */}
      {result.possible_conditions?.length > 0 && (
        <div className="result-section">
          <h3>
            Possible Explanations
          </h3>

          <div className="condition-list">
            {result.possible_conditions.map(
              (condition, index) => (
                <div
                  key={index}
                  className="condition-card"
                >
                  <strong>
                    {condition.name}
                  </strong>

                  <p>
                    {condition.reason}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations?.length > 0 && (
        <div className="result-section">
          <h3>
            General Recommendations
          </h3>

          <ul className="observation-list">
            {result.recommendations.map(
              (recommendation, index) => (
                <li key={index}>
                  {recommendation}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Professional Help */}
      {result.seek_professional_help && (
        <div className="professional-help-banner">
          <strong>
            Consider speaking with a healthcare professional
          </strong>

          <p>
            Based on the available information, professional
            evaluation may be appropriate.
          </p>
        </div>
      )}

      {/* AI Confidence */}
      {result.confidence && (
        <div className="result-section">
          <h3>
            AI Confidence
          </h3>

          <span className="quality-badge">
            {result.confidence}
          </span>
        </div>
      )}

      {/* References */}
      {(result.references ?? []).length > 0 && (
        <div className="result-section">
          <h3>
            References
          </h3>

          <div className="reference-list">
            {(result.references ?? []).map(
              (reference, index) => (
                <a
                  key={index}
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="reference-card"
                >
                  <strong>
                    {reference.title}
                  </strong>

                  <span>
                    {reference.source}
                  </span>
                </a>
              )
            )}
          </div>
        </div>
      )}

      {/* Final Disclaimer */}
      <p className="disclaimer">
        {result.disclaimer ||
          "SkinGPT provides AI-assisted information and is not a substitute for professional medical advice."}
      </p>
    </>
  );
}