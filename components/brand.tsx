import Link from "next/link";

export function BrandMark({
  size = 32,
  inverse = false,
}: {
  size?: number;
  inverse?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill={inverse ? "#FFFFFF" : "#111318"}
      />
      <path
        d="M8 22.5V10.5L16 18L24 10.5V22.5"
        stroke={inverse ? "#111318" : "#FFFFFF"}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="9" r="2.4" fill="#5B3DF5" />
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
      className="inline-flex items-center gap-2.5 rounded-sm"
      aria-label="Maarivo home"
    >
      <BrandMark inverse={inverse} />
      {!compact && (
        <span
          className={`font-brand text-[21px] font-semibold ${inverse ? "text-white" : "text-primary"}`}
        >
          Maarivo
        </span>
      )}
    </Link>
  );
}
