export const site = {
  name: "Maarivo",
  tagline: "AI-powered learning and assessment, connected.",
  description:
    "Maarivo brings lesson planning, assessment, AI tutoring and learning intelligence into one workspace for schools.",
  // Placeholder until the real support inbox is confirmed.
  supportEmail: "support@maarivo.com",
} as const;

export const supportHref = `mailto:${site.supportEmail}?subject=${encodeURIComponent(
  "Tailored version of Maarivo for our school",
)}`;
