import {
  Activity,
  Database,
  Image,
  ShieldCheck,
} from "lucide-react";

const cards = [
  {
    title: "Analyses",
    value: "12",
    subtitle: "Completed AI analyses",
    icon: Activity,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Images",
    value: "15",
    subtitle: "Uploaded images",
    icon: Image,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Knowledge Base",
    value: "24",
    subtitle: "Medical documents indexed",
    icon: Database,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "AI Safety",
    value: "100%",
    subtitle: "Reference-backed responses",
    icon: ShieldCheck,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
];

export function StatsCards() {
  return (
    <section className="grid gap-5 md:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}
            >
              <Icon className={`h-6 w-6 ${card.color}`} />
            </div>

            <p className="text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {card.value}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </section>
  );
}