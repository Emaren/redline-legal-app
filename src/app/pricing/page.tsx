import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const PRICING_PACKAGES = [
  {
    title: "Starter filing package",
    body: "One procedural objective with drafting and filing support.",
    bullets: [
      "Single motion, claim, or response package",
      "Timeline and filing checklist",
      "Revision pass before submission",
    ],
  },
  {
    title: "Active case package",
    body: "Ongoing help for litigants managing multiple filings and deadlines.",
    bullets: [
      "Rolling document support",
      "Case calendar and evidence structure",
      "Priority turnaround windows",
    ],
  },
  {
    title: "Small business legal ops",
    body: "Recurring support for contract, notice, and dispute workflow tasks.",
    bullets: [
      "Contract and notice templates",
      "Document review queue",
      "Monthly support cadence",
    ],
  },
];

export default function PricingPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Pricing"
        intro="Packages are scoped up front so costs stay predictable. Final pricing is set after intake based on workload and timeline."
      >
        <div className="detail-grid">
          {PRICING_PACKAGES.map((pkg) => (
            <article className="detail-card" key={pkg.title}>
              <h3>{pkg.title}</h3>
              <p>{pkg.body}</p>
              <ul className="bullet-list">
                {pkg.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="cta-row">
          <Link className="cta-button" href="/contact">
            Book Intake
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
