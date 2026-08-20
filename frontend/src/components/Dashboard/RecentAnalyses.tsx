import { Clock3, ChevronRight } from "lucide-react";

const analyses = [
  {
    date: "20 Aug 2026",
    title: "Possible Atopic Dermatitis",
    status: "Low Risk",
  },
  {
    date: "18 Aug 2026",
    title: "Contact Dermatitis",
    status: "Moderate Risk",
  },
  {
    date: "15 Aug 2026",
    title: "Acne Flare-up",
    status: "Low Risk",
  },
];

export function RecentAnalyses() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Analyses
        </h2>

        <button className="flex items-center gap-1 text-blue-600 text-sm font-medium">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {analyses.map((analysis) => (
          <div
            key={analysis.date}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
          >
            <div>
              <h3 className="font-medium">
                {analysis.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-slate-500 text-sm">
                <Clock3 size={14} />
                {analysis.date}
              </div>
            </div>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700 text-xs font-medium">
              {analysis.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}