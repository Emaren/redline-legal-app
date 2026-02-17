import Link from "next/link";
import { INTERNAL_PAGE_ROUTES } from "@/config/site-routes";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const HIGHLIGHTS = [
  {
    title: "Document drafting",
    body: "Demand letters, declarations, and filings prepared with plain-language review.",
  },
  {
    title: "Case organization",
    body: "Evidence, timelines, and exhibits arranged so you can present clearly in court.",
  },
  {
    title: "Court process support",
    body: "Step-by-step help with filing tasks, deadlines, and procedural prep.",
  },
  {
    title: "Small business operations",
    body: "Contracts, notices, and routine legal workflows tailored to founder-level teams.",
  },
];

const SUPPORT_ITEMS = [
  "Clear, fixed-scope support instead of open-ended billable hours.",
  "Tools and workflows built for self-represented litigants.",
  "A practical handoff path when attorney review becomes necessary.",
];

export default function Home() {
  return (
    <SiteShell>
      <PagePanel
        title="Court-ready support built for people without a full legal team."
        intro="Redline Legal helps you prepare filings, organize your case materials, and move through legal process work with less friction and clearer structure."
      >
        <div className="home-grid">
          {HIGHLIGHTS.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <section className="section-stack">
          <h2 className="section-heading">Why clients start here</h2>
          <ul className="bullet-list">
            {SUPPORT_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section-stack">
          <h2 className="section-heading">Everything currently available</h2>
          <div className="link-grid">
            {INTERNAL_PAGE_ROUTES.map((route) => (
              <Link className="link-card" href={route.href} key={route.href}>
                <strong>{route.label}</strong>
                <span>{route.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="cta-row">
          <Link href="/services" className="cta-button">
            Browse Services
          </Link>
          <Link href="/contact" className="cta-button alt">
            Start Intake
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
