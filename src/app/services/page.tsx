import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const SERVICES = [
  {
    title: "Civil and Small Claims filing support",
    body: "Prepare claims, responses, and filing packets with checklist-level quality control.",
  },
  {
    title: "Demand letters and legal writing",
    body: "Draft persuasive letters and structured legal narratives you can submit or send directly.",
  },
  {
    title: "Evidence and exhibit organization",
    body: "Sort records into timelines, exhibit indexes, and hearing-ready binders.",
  },
  {
    title: "Court procedure guidance",
    body: "Understand procedural next steps, deadlines, and hearing preparation tasks.",
  },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Services"
        intro="Focused legal support for process-heavy work where structure and timing matter."
      >
        <div className="detail-grid">
          {SERVICES.map((service) => (
            <article className="detail-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>

        <div className="cta-row">
          <Link className="cta-button" href="/contact">
            Request Scope Call
          </Link>
          <Link className="cta-button alt" href="/pricing">
            View Pricing
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
