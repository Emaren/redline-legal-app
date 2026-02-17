import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const INTAKE_STEPS = [
  "Send a short summary of your issue and deadlines.",
  "Receive a scope recommendation and timeline options.",
  "Start work with a clear deliverable checklist.",
];

export default function ContactPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Contact"
        intro="Share your case or project details and we will recommend the right service scope."
      >
        <section className="section-stack">
          <h2 className="section-heading">Intake process</h2>
          <ul className="bullet-list">
            {INTAKE_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>

        <div className="cta-row">
          <a className="cta-button" href="mailto:contact@redlinelegal.ca">
            contact@redlinelegal.ca
          </a>
          <Link className="cta-button alt" href="/services">
            Review Services
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
