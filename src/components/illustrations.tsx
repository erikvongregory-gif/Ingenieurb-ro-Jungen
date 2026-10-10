/** Linienzeichnungen im Stil technischer Skizzen. Werden per data-reveal="draw" gezeichnet. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Roboterarm über Förderband (Automation). */
export function RobotArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden data-reveal="draw">
      <g {...stroke}>
        <path d="M20 196 H300" />
        <rect x="150" y="170" width="150" height="16" rx="8" />
        <circle cx="166" cy="178" r="4" />
        <circle cx="284" cy="178" r="4" />
        <rect x="200" y="148" width="34" height="22" rx="2" />
        <rect x="248" y="152" width="26" height="18" rx="2" />
        <path d="M48 196 V176 H96 V196" />
        <circle cx="72" cy="164" r="12" />
        <path d="M72 152 L104 92" />
        <circle cx="104" cy="92" r="9" />
        <path d="M104 92 L176 76" />
        <circle cx="176" cy="76" r="7" />
        <path d="M176 83 V112" />
        <path d="M166 112 H186 M166 112 V126 M186 112 V126" />
      </g>
      <path d="M210 40 h36 M228 22 v36" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="228" cy="40" r="12" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
    </svg>
  );
}

/** Altes Rack → neues Rack (Retrofit / Migration). */
export function MigrationArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden data-reveal="draw">
      <g {...stroke} strokeDasharray="4 5" opacity="0.55" data-nodraw>
        <rect x="20" y="62" width="104" height="96" rx="6" />
        <path d="M38 76 V144 M58 76 V144 M78 76 V144 M98 76 V144" />
      </g>
      <g {...stroke}>
        <rect x="196" y="56" width="104" height="108" rx="6" />
        <rect x="208" y="70" width="16" height="80" rx="2" />
        <rect x="230" y="70" width="16" height="80" rx="2" />
        <rect x="252" y="70" width="16" height="80" rx="2" />
        <rect x="274" y="70" width="16" height="80" rx="2" />
        <path d="M20 190 H300" />
      </g>
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M138 110 H182" />
        <path d="M172 100 L182 110 L172 120" />
      </g>
      <circle cx="216" cy="80" r="2.5" fill="var(--color-ok)" />
      <circle cx="238" cy="80" r="2.5" fill="var(--color-ok)" />
      <circle cx="260" cy="80" r="2.5" fill="var(--color-ok)" />
      <circle cx="282" cy="80" r="2.5" fill="var(--color-signal)" />
    </svg>
  );
}
