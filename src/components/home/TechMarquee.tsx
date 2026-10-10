import { technologies } from "@/content/site";

export function TechMarquee() {
  const items = [...technologies, ...technologies];
  return (
    <section aria-label="Hersteller und Technologien" className="border-y border-line bg-surface/50">
      <div className="flex items-center">
        <p className="label hidden shrink-0 border-r border-line px-8 py-6 md:block">Wir arbeiten mit</p>
        <div className="relative flex-1 overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max gap-14 pr-14 [animation:marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
            {items.map((t, i) => (
              <li key={i} aria-hidden={i >= technologies.length} className="flex items-center gap-14 whitespace-nowrap text-xl font-medium tracking-tight text-ink/55 md:text-2xl">
                {t}
                <span className="size-1.5 rounded-full bg-line-strong" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
