import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { AppPathname } from "@/i18n/routing";

/**
 * CTA-Link im Hero-Stil (primär = Akzent-Gradient, sekundär = Glass/Card).
 * Nutzt next-intl <Link> für lokalisierte, client-seitige Navigation.
 */
type ButtonLinkProps = {
  href: AppPathname;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  withArrow?: boolean;
  className?: string;
};

const base =
  "group relative inline-flex h-11 md:h-12 items-center justify-center gap-2 rounded-xl px-5 md:px-8 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer";

const variants = {
  primary:
    "bg-gradient-to-b from-primary/90 to-primary text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20",
  secondary:
    "bg-gradient-to-b from-card/80 to-card text-card-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.08)] ring-1 ring-border/60 backdrop-blur-md",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
