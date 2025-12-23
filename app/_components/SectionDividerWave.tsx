export default function SectionDividerWave() {
  return (
    <svg
      className="section-divider-wave"
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sectionDividerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eef2ff" stopOpacity="0.55" />
          <stop offset="65%" stopColor="#f6f7ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 70 C260 100 520 50 820 80 C1040 100 1180 85 1200 75 L1200 140 L0 140 Z"
        fill="url(#sectionDividerGrad)"
      />
    </svg>
  );
}

