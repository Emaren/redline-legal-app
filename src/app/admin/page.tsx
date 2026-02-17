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
        intro="This page is now directly accessible from navigation. Authentication is not added yet, so treat this as a staging admin surface until we lock access."
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
          <a className="cta-button" href="/Manage-Cookies.php">
            Open Cookie Manager
          </a>
          <Link className="cta-button alt" href="/chat">
            Open Chat Route
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
