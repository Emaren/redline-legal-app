import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const COOKIE_ITEMS = [
  "Use this page to review or revoke non-essential cookies.",
  "Use this page as the canonical cookie-controls entry in your UI.",
  "Keep policy text and consent behavior aligned with your production banner.",
];

export default function CookiesPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Cookie Controls"
        intro="Cookie manager access is wired and reachable from header + footer so users can always reach preferences."
      >
        <section className="section-stack">
          <h2 className="section-heading">How this is wired</h2>
          <ul className="bullet-list">
            {COOKIE_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="cta-row">
          <Link className="cta-button" href="/cookies">
            Refresh Cookie Preferences
          </Link>
          <Link className="cta-button alt" href="/admin">
            Back to Admin
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
