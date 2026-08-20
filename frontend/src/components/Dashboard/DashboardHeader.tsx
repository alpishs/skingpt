import { Sparkles } from "lucide-react";

export function DashboardHeader() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
      <div className="mb-4 flex items-center gap-2 text-blue-100">
        <Sparkles className="h-5 w-5" />

        <span className="font-medium">
          Multimodal AI + Trusted Medical RAG
        </span>
      </div>

      <h1 className="mb-4 text-4xl font-bold leading-tight">
        Understand skin concerns with AI-assisted analysis.
      </h1>

      <p className="max-w-2xl leading-7 text-blue-100">
        Upload a skin image, describe your symptoms, and receive
        AI-generated visual observations, educational explanations,
        recommendations, and trusted dermatology references.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
          Qwen2.5-VL
        </span>

        <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
          FastAPI
        </span>

        <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
          PostgreSQL + pgvector
        </span>

        <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
          React + TypeScript
        </span>
      </div>
    </section>
  );
}