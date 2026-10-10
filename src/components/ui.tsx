import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function Label({ children, className, index }: { children: React.ReactNode; className?: string; index?: string }) {
  return (
    <p className={cn("label flex items-center gap-3", className)}>
      {index && <span className="text-accent">{index}</span>}
      <span className="h-px w-6 bg-line-strong" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "primary", className, external }: ButtonProps) {
  const styles = cn(
    "group inline-flex items-center gap-3 rounded-full py-3 pl-6 pr-3 text-[0.95rem] font-medium transition-colors duration-300",
    variant === "primary" && "bg-ink text-white hover:bg-accent",
    variant === "secondary" && "border border-line-strong bg-surface/60 text-ink hover:border-ink",
    variant === "ghost" && "text-ink hover:text-accent",
    className,
  );
  const icon = (
    <span
      className={cn(
        "grid size-8 place-items-center overflow-hidden rounded-full transition-colors duration-300",
        variant === "primary" ? "bg-white/12" : "bg-ink/6 group-hover:bg-ink group-hover:text-white",
      )}
    >
      <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.8} />
    </span>
  );
  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={styles} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={styles}>
      {children}
      {icon}
    </Link>
  );
}

/** Feine Trennlinie, die beim Scrollen von links wächst. */
export function Rule({ className }: { className?: string }) {
  return <div data-reveal="rule" className={cn("h-px w-full bg-line", className)} aria-hidden />;
}
