import Link from "next/link";

export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#171B35" />
      <path
        d="M8 22.5V10.5L16 18L24 10.5V22.5"
        stroke="white"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="9" r="2.4" fill="#9886E9" />
    </svg>
  );
}

export function Brand({
  href = "/",
  inverse = false,
  compact = false,
}: {
  href?: string;
  inverse?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 rounded-md"
      aria-label="Maarivo home"
    >
      <BrandMark />
      {!compact && (
        <span
          className={`font-brand text-[20px] font-semibold tracking-[-0.035em] ${
            inverse ? "text-white" : "text-primary"
          }`}
        >
          Maarivo
        </span>
      )}
    </Link>
  );
}
