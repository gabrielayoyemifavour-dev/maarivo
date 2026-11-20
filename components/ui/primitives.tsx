import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-raised",
  accent: "bg-accent text-white hover:bg-accent-deep",
  outline:
    "border border-line-strong bg-surface text-primary hover:border-primary/40 hover:bg-surface-muted",
  ghost: "text-primary hover:bg-surface-muted",
  light: "bg-surface text-primary hover:bg-surface-muted",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[15px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

type Shared = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorHTMLAttributesForLink = {
  target?: string;
  rel?: string;
  "aria-label"?: string;
  id?: string;
};

type ButtonProps = Shared &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributesForLink, "href">)
    | ({
        href?: never;
      } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >)
  );

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    if (href.startsWith("mailto:") || href.startsWith("http")) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

const badgeStyles: Record<BadgeVariant, string> = {
  neutral: "bg-surface-muted text-muted-strong",
  accent: "bg-accent-soft text-accent-deep",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[15px] font-medium whitespace-nowrap ${badgeStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line bg-surface ${className}`}>
      {children}
    </div>
  );
}
