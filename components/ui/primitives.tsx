import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[background-color,border-color,color,scale] duration-150 ease-out active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-raised",
  accent: "bg-accent text-primary hover:bg-[#A795EE]",
  outline:
    "border border-line-strong bg-surface text-primary hover:border-primary/35 hover:bg-accent-soft/50",
  ghost: "text-primary hover:bg-accent-soft",
  light: "bg-white text-primary hover:bg-accent-soft",
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
  neutral: "bg-[#F0EFF5] text-[#55546A]",
  accent: "bg-accent-soft text-[#5B48A6]",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-[#956522]",
  danger: "bg-[#FBECEC] text-danger",
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
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ${badgeStyles[variant]} ${className}`}
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
    <div
      className={`rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(23,27,53,0.03)] ${className}`}
    >
      {children}
    </div>
  );
}
