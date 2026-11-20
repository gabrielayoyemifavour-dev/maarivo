import type { Metadata } from "next";
import { DemoDashboard } from "@/components/demo/demo-dashboard";

export const metadata: Metadata = {
  title: "Demo workspace — Maarivo",
  description: "Explore a sample Maarivo teacher workspace with representative data.",
};

export default function DemoPage() {
  return <DemoDashboard />;
}
