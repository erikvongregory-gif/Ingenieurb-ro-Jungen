import { Fragment } from "react";
import type { LegalSection } from "@/content/legal";

function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s]*[^\s.,;:!?)])/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-words text-accent underline-offset-2 hover:underline">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function LegalText({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-14">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{s.heading}</h2>
          <div className="mt-6 space-y-6">
            {s.blocks.map((b, i) => (
              <div key={b.heading ?? i}>
                {b.heading && <h3 className="font-medium text-ink">{b.heading}</h3>}
                {b.paragraphs?.map((p, j) => (
                  <p key={j} className="mt-2 leading-relaxed text-ink-2">{linkify(p)}</p>
                ))}
                {b.bullets && (
                  <ul className="mt-3 space-y-1.5">
                    {b.bullets.map((x, j) => (
                      <li key={j} className="flex gap-3 leading-relaxed text-ink-2">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" />
                        {linkify(x)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
