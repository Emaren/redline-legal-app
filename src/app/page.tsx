import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const HOME_CARDS = [
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
] as const;

const WHY_LIST = [
  "Clear, fixed-scope support instead of open-ended billable hours.",
  "Tools and workflows built for self-represented litigants.",
  "A practical handoff path when attorney review becomes necessary.",
] as const;

const LINK_CARDS = [
  { href: "/services", title: "Services", body: "Support offerings for legal process and filings." },
  { href: "/pricing", title: "Pricing", body: "Package structure and intake-based scoping." },
  { href: "/resources", title: "Resources", body: "Guides, templates, and practical legal ops references." },
  { href: "/chat", title: "Chat", body: "Client messaging and quick update workspace." },
  { href: "/chat-admin", title: "Chat Admin", body: "Combined console for chat and admin workflow handoff." }, // protected
  { href: "/admin", title: "Admin", body: "Operations and content management workspace." }, // protected
  { href: "/about", title: "About", body: "Mission, audience, and operating model." },
  { href: "/contact", title: "Contact", body: "Intake and next-step coordination." },
  { href: "/cookies", title: "Cookies", body: "Cookie manager access and privacy controls." },
] as const;

const PREFETCH_OFF = new Set<string>(["/admin", "/chat-admin"]);

export default function HomePage() {
  return (
    <SiteShell>
      <PagePanel
        title="Court-ready support built for people without a full legal team."
        intro="Redline Legal helps you prepare filings, organize your case materials, and move through legal process work with less friction and clearer structure."
      >
        <div className="home-grid">
          {HOME_CARDS.map((card) => (
            <article className="info-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>

        <section className="section-stack">
          <h2 className="section-heading">Why clients start here</h2>
          <ul className="bullet-list">
            {WHY_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section-stack">
          <h2 className="section-heading">Everything currently available</h2>
          <div className="link-grid">
            {LINK_CARDS.map((item) => {
              const protectedRoute = PREFETCH_OFF.has(item.href);
              return (
                <Link
                  key={item.href}
                  className="link-card"
                  href={item.href}
                  prefetch={protectedRoute ? false : true}
                >
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="cta-row">
          <Link className="cta-button" href="/services">
            Browse Services
          </Link>
          <Link className="cta-button alt" href="/contact">
            Start Intake
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}