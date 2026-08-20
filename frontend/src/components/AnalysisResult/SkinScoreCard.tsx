interface SkinScoreCardProps {
  score?: number;
  level?: string;
}

export function SkinScoreCard({
  score = 0,
  level = "Analyzing",
}: SkinScoreCardProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(score, 100));
  const offset =
    circumference - (progress / 100) * circumference;

  const strokeColor =
    progress >= 85
      ? "#22C55E"
      : progress >= 70
      ? "#F59E0B"
      : "#EF4444";

  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
      <p className="text-sm uppercase tracking-wider text-blue-100">
        Skin Health Score
      </p>

      <div className="mt-6 flex items-center gap-6">
        <svg width="130" height="130">
          <circle
            cx="65"
            cy="65"
            r={radius}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="8"
            fill="none"
          />

          <circle
            cx="65"
            cy="65"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
          />

          <text
            x="65"
            y="62"
            textAnchor="middle"
            fill="white"
            fontSize="30"
            fontWeight="700"
          >
            {progress}
          </text>

          <text
            x="65"
            y="82"
            textAnchor="middle"
            fill="#BFDBFE"
            fontSize="12"
          >
            /100
          </text>
        </svg>

        <div>
          <h2 className="text-3xl font-bold">{level}</h2>

          <p className="mt-2 max-w-sm text-sm text-blue-100">
            AI estimate based on image quality, visible observations,
            symptoms, and trusted dermatology knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}