import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const ABOUT_ITEMS = [
  {
    title: "Mission",
    body: "Make legal process work more accessible by delivering practical execution support at clear scope and pace.",
  },
  {
    title: "Who we serve",
    body: "Self-represented litigants and small business operators who need high-leverage legal operations support.",
  },
  {
    title: "How we work",
    body: "Collaborative drafting, process checklists, and document systems that help clients stay deadline-ready.",
  },
  {
    title: "When attorneys are needed",
    body: "If your matter requires legal representation, we can help prepare a clean handoff package for counsel.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PagePanel
        title="About Redline Legal"
        intro="We focus on the operational side of legal work so clients can stay organized, informed, and prepared."
      >
        <div className="detail-grid">
          {ABOUT_ITEMS.map((item) => (
            <article className="detail-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="cta-row">
          <Link className="cta-button" href="/contact">
            Talk With Us
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
