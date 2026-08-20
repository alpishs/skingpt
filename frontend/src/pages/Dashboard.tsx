import { useState } from "react";

import { Navbar } from "../components/Navbar/Navbar";
import { DashboardHeader } from "../components/Dashboard/DashboardHeader";
import { StatsCards } from "../components/Dashboard/StatsCards";
import { UploadCard } from "../components/Dashboard/UploadCard";
import { SymptomCard } from "../components/Dashboard/SymptomCard";
import { RecentAnalyses } from "../components/Dashboard/RecentAnalyses";

import { AnalysisResult } from "../components/AnalysisResult/AnalysisResult";
import { LoadingState } from "../components/LoadingState/LoadingState";
import { analyzeSkin } from "../services/analysisService";
import type { AnalysisResponse } from "../types/analysis";

export default function Dashboard() {
  const [image, setImage] = useState<File | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<AnalysisResponse | null>(null);

  async function handleAnalysis() {
    if (!image) return;

    setLoading(true);

    try {
      const response = await analyzeSkin({
        image,
        symptoms,
      });
      console.log("Analysis Response:", response);
      setResult(response);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <DashboardHeader />

        <StatsCards />

        <section className="grid gap-6 lg:grid-cols-2">
          <UploadCard onImageSelected={setImage} />

          <SymptomCard
            symptoms={symptoms}
            onChange={setSymptoms}
          />
        </section>

        <button
        onClick={handleAnalysis}
        disabled={loading || !image}
        className="group w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
        {loading ? (
            <span className="flex items-center justify-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            AI is analyzing your skin image...
            </span>
        ) : (
            "Analyze Skin with AI"
        )}
        </button>

        {loading && <LoadingState />}

        {!loading && result && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <AnalysisResult result={result} />
        </section>
        )}

        <RecentAnalyses />
      </main>
    </>
  );
}