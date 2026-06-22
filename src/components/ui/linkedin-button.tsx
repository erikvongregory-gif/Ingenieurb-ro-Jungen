import { cn } from "@/lib/utils";

/** Offizielles LinkedIn-Logo (Markenzeichen) als Inline-SVG. */
function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

/**
 * Echter LinkedIn-Button im Markendesign (LinkedIn-Blau + offizielles Logo).
 * Öffnet das Profil in einem neuen Tab; externer, sicherer Link.
 */
export function LinkedInButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2.5 rounded-xl bg-[#0A66C2] px-5 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_24px_rgba(10,102,194,0.35)] ring-1 ring-[#0A66C2]/40 transition-transform duration-200 hover:scale-[1.02] hover:bg-[#004182] active:scale-[0.98] md:h-12",
        className,
      )}
    >
      <LinkedInLogo className="h-5 w-5" />
      {label}
    </a>
  );
}
