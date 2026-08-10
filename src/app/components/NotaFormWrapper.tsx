"use client";

// next/dynamic with ssr:false MUST be inside a Client Component in App Router.
// This wrapper client component holds the dynamic import, then page.tsx
// (a Server Component) imports this wrapper instead.
import dynamic from "next/dynamic";

const NotaForm = dynamic(() => import("./NotaForm"), {
  ssr: false,
  loading: () => (
    <div
      className="glass-card p-8 flex flex-col items-center justify-center gap-4"
      style={{ minHeight: "400px" }}
    >
      <div
        className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{
          borderColor: "var(--accent-purple)",
          borderTopColor: "transparent",
        }}
      />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Memuat form...
      </p>
    </div>
  ),
});

export default function NotaFormWrapper() {
  return <NotaForm />;
}
