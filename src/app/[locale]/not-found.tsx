import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";

/** Lokalisierte 404-Seite (innerhalb des Sprach-Layouts). */
export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <Container
      size="narrow"
      className="flex min-h-[70dvh] flex-col items-center justify-center pt-32 text-center"
    >
      <p className="font-sans font-extrabold tracking-tighter text-primary/70 text-7xl md:text-8xl">
        404
      </p>
      <h1 className="mt-6 font-sans font-extrabold tracking-tighter text-foreground text-3xl md:text-4xl">
        {t("h1")}
      </h1>
      <p className="mt-4 text-foreground/75">{t("intro")}</p>
      <div className="mt-8">
        <ButtonLink href="/" withArrow>
          {t("back")}
        </ButtonLink>
      </div>
    </Container>
  );
}
