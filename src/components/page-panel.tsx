import type { ReactNode } from "react";

type PagePanelProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export function PagePanel({ title, intro, children }: PagePanelProps) {
  return (
    <section className="page-panel">
      <h1 className="page-title">{title}</h1>
      <p className="page-intro">{intro}</p>
      {children}
    </section>
  );
}
