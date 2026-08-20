import { ClipboardPen } from "lucide-react";

interface SymptomCardProps {
  symptoms: string;
  onChange: (value: string) => void;
}

export function SymptomCard({
  symptoms,
  onChange,
}: SymptomCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <ClipboardPen className="text-indigo-600" />

        <h2 className="text-lg font-semibold">
          Describe Symptoms
        </h2>
      </div>

      <textarea
        rows={8}
        value={symptoms}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Example: Redness and itching on my left hand for 3 days. Mild dryness after bathing."
        className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="font-medium text-slate-700 text-sm">
          Include details like
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Itching",
            "Burning",
            "Pain",
            "Dryness",
            "Swelling",
            "Duration",
            "Body Location",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-200 px-3 py-1 text-slate-600 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}