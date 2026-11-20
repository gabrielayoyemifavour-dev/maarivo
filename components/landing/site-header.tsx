"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/primitives";
import { supportHref } from "@/lib/site";

const nav = [
  { label: "Platform", href: "#platform" },
  { label: "Roles", href: "#audience" },
  { label: "How it works", href: "#workflow" },
  { label: "Trust", href: "#trust" },
  { label: "Demo", href: "/demo" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/90 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Brand />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md text-sm font-medium text-[#4E4D63] transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/demo" variant="ghost" size="sm">
            Open demo
          </Button>
          <Button href={supportHref} size="sm">
            <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
            Get a tailored version
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-primary lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <nav
            id="mobile-navigation"
            className="shell flex flex-col py-3"
            aria-label="Mobile navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-primary hover:bg-accent-soft"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
              <Button href="/demo" variant="outline" size="md">
                Open demo
              </Button>
              <Button href={supportHref} size="md">
                <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
                Get a tailored version
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
