import { Brain, Image, Database } from "lucide-react";

const steps = [
  {
    icon: Image,
    title: "Analyzing image",
  },
  {
    icon: Brain,
    title: "Understanding visible skin features",
  },
  {
    icon: Database,
    title: "Searching trusted dermatology knowledge",
  },
];

export function LoadingState() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-6">
        SkinGPT is working...
      </h2>

      <div className="space-y-5">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex items-center gap-4"
            >
              <div className="rounded-full bg-blue-100 p-3 animate-pulse">
                <Icon className="text-blue-600" />
              </div>

              <div>
                <p className="font-medium">
                  {step.title}
                </p>

                <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full animate-pulse rounded-full bg-blue-600 w-2/3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-slate-500">
        This usually takes 10–20 seconds depending on your AI model.
      </p>
    </div>
  );
}