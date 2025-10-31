import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");
  useEffect(() => {
    fetchDemo();
  }, []);
  const fetchDemo = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setExampleFromServer(data.message);
    } catch {}
  };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b">
        <div className="container py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Legal Hub
              <span className="block text-foreground/80 text-xl md:text-2xl font-semibold mt-3">One platform for Students, Lawyers, and the Public</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-prose">
              Learn, practice, consult, and book — all in one place. Secure, fast, and designed for real outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-primary" href="/dashboard?role=student">For Students</a>
              <a className="btn-outline" href="/dashboard?role=lawyer">For Lawyers</a>
              <a className="btn-ghost" href="/dashboard?role=public">For Public</a>
            </div>
            <p className="sr-only">{exampleFromServer}</p>
          </div>
          <div className="relative">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-6 border">
              <img src="/placeholder.svg" alt="Dashboard preview" className="rounded-lg w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Why Legal Hub</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Feature title="Mock tests & instant results" desc="Practice with curated questions and see results instantly with explanations." />
          <Feature title="Find & book lawyers" desc="Search by specialization and city, chat securely, and book appointments." />
          <Feature title="Real-time analytics" desc="Track learning progress and earnings with rich, interactive charts." />
        </div>
      </section>

      <section className="container py-8">
        <div className="rounded-2xl border bg-gradient-to-r from-primary/10 via-transparent to-accent/10 p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-muted-foreground">Sign in with Clerk and explore the unified dashboard.</p>
          </div>
          <div className="flex gap-3">
            <a className="btn-primary" href="/dashboard">Open Dashboard</a>
            <a className="btn-outline" href="/dashboard?role=public">Find a lawyer</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border p-6">
      <div className="text-lg font-semibold">{title}</div>
      <p className="text-sm text-muted-foreground mt-2">{desc}</p>
    </div>
  );
}
