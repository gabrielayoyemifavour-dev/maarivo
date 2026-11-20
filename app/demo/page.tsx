import type { Metadata } from "next";
import { DemoDashboard } from "@/components/demo/demo-dashboard";

export const metadata: Metadata = {
  title: "Demo workspace — Maarivo",
  description: "Explore sample Maarivo workspaces for teachers, students, school leaders and parents.",
};

export default function DemoPage() {
  return <DemoDashboard />;
}
