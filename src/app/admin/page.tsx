import Link from "next/link";
import { INTERNAL_PAGE_ROUTES } from "@/config/site-routes";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const ADMIN_TASKS = [
  "Review daily intake submissions and pending responses.",
  "Update service and pricing content before publishing.",
  "Track open case milestones and escalation requests.",
];

export default function AdminPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Admin Workspace"
        intro="This page is directly accessible from navigation and currently protected with temporary nginx basic auth while we implement in-app auth."
      >
        <section className="section-stack">
          <h2 className="section-heading">Operational checklist</h2>
          <ul className="bullet-list">
            {ADMIN_TASKS.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </section>

        <section className="section-stack">
          <h2 className="section-heading">Quick jump links</h2>
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
          <Link className="cta-button" href="/cookies">
            Open Cookie Controls
          </Link>
          <Link className="cta-button alt" href="/chat">
            Open Chat Route
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
