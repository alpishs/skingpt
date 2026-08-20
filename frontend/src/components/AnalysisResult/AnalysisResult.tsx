
import { SkinScoreCard } from "./SkinScoreCard";
import type { AnalysisResponse } from "../../types/analysis";
import {
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

interface AnalysisResultProps {
  result: AnalysisResponse;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Analysis Result
          </h2>

          <p className="mt-2 text-slate-500">
            AI-assisted analysis based on your uploaded image and symptoms.
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {result.status.toUpperCase()}
        </span>
      </div>

      {/* AI Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
        <Sparkles size={16} />
        AI-generated analysis
      </div>

      {/* Safety Banner */}
      <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <ShieldAlert className="mt-1 text-amber-600" />

        <div>
          <h3 className="font-semibold text-amber-700">
            Not a diagnosis
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            SkinGPT provides educational AI-assisted information.
            It cannot confirm a medical condition from an image alone.
            Consult a qualified healthcare professional for diagnosis
            or treatment.
          </p>
        </div>
      </div>

      <SkinScoreCard
        score={result.skin_score}
        level={result.skin_level}
      />
      
      {/* Symptoms */}
      <Section title="Symptoms">
        <p className="rounded-xl bg-slate-50 p-4 text-slate-700">
          {result.symptoms || "No symptoms provided."}
        </p>
      </Section>

      {/* Image Quality */}
      <Section title="Image Quality">
        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 font-medium capitalize text-green-700">
          {result.image_quality}
        </span>
      </Section>

      {/* Visual Observations */}
      <Section title="Visible Observations">
        <div className="space-y-3">
          {result.visual_observations?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
            >
              <CheckCircle2 className="mt-1 text-green-600" size={18} />

              <p className="text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Uncertainties */}
      {result.uncertainties?.length > 0 && (
        <Section title="Uncertainties">
          <div className="space-y-3">
            {result.uncertainties.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4"
              >
                <AlertTriangle
                  className="mt-1 text-yellow-600"
                  size={18}
                />

                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Possible Explanations */}
      {result.possible_conditions?.length > 0 && (
        <Section title="Possible Explanations">
          <div className="grid gap-4">
            {result.possible_conditions.map((condition, index) => (
              <div
                key={index}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-5"
              >
                <h4 className="font-semibold text-blue-700">
                  {condition.name}
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {condition.reason}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Recommendations */}
      {result.recommendations?.length > 0 && (
        <Section title="General Recommendations">
          <div className="space-y-3">
            {result.recommendations.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-green-50 p-4 text-green-700"
              >
                • {item}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Confidence */}
      {result.confidence && (
        <Section title="AI Confidence">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 font-medium capitalize text-indigo-700">
            {result.confidence}
          </span>
        </Section>
      )}

      {/* References */}
      {(result.references ?? []).length > 0 && (
        <Section title="Trusted References">
          <div className="space-y-3">
            {(result.references ?? []).map((ref, index) => (
              <a
                key={index}
                href={ref.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="text-blue-600" size={18} />

                  <div>
                    <p className="font-medium text-slate-800">
                      {ref.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      {ref.source}
                    </p>
                  </div>
                </div>

                <span className="text-blue-600 text-sm font-medium">
                  Open →
                </span>
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs leading-6 text-slate-500">
          {result.disclaimer ||
            "SkinGPT provides AI-assisted educational information and should not be used as a substitute for professional medical advice."}
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {children}
    </section>
  );
}