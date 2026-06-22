import { Check } from "lucide-react";
import type { RichSection } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Rendert eine Liste von Inhaltsabschnitten als gestaltete Prose im Hero-Look:
 * Sans-Überschrift, ruhige, gut lesbare Absätze und Aufzählungen mit Akzent.
 */
export function RichSections({
  sections,
  className,
}: {
  sections: RichSection[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-14 md:gap-20", className)}>
      {sections.map((section) => (
        <div key={section.heading} className="max-w-3xl">
          <h2 className="font-sans font-bold tracking-tight text-foreground text-2xl sm:text-3xl">
            {section.heading}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm md:text-lg font-light leading-relaxed text-foreground/80"
              >
                {paragraph}
              </p>
            ))}
          </div>
          {section.bullets && (
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="group flex items-start gap-3 text-foreground/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30 transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <span className="text-sm md:text-base leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
