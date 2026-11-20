import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-150 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-raised",
  accent: "bg-accent text-white hover:bg-accent-deep",
  outline:
    "border border-line-strong bg-surface/70 text-primary hover:border-primary/40 hover:bg-surface",
  ghost: "text-primary hover:bg-surface-muted",
  light: "bg-surface text-primary hover:bg-canvas",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type Shared = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Shared &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributesForLink, "href">)
    | ({ href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

type AnchorHTMLAttributesForLink = {
  target?: string;
  rel?: string;
  "aria-label"?: string;
  id?: string;
};

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
      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-medium whitespace-nowrap ${badgeStyles[variant]} ${className}`}
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
    <div className={`rounded-md border border-line bg-surface ${className}`}>
      {children}
    </div>
  );
}
