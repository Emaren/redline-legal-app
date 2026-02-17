import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const CHAT_ADMIN_BLOCKS = [
  {
    title: "Conversation queue",
    body: "Monitor active client threads, pending questions, and unresolved messages.",
  },
  {
    title: "Admin actions",
    body: "Review intake quality, update service content, and track follow-up ownership.",
  },
  {
    title: "Escalation lane",
    body: "Flag high-risk matters for fast review and controlled attorney handoff.",
  },
  {
    title: "Audit trail",
    body: "Keep communication notes and decision context tied to each active matter.",
  },
];

export default function ChatAdminPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Chat Admin Console"
        intro="Legacy route restored. Use this combined page as a bridge between client chat operations and administrative case management."
      >
        <div className="detail-grid">
          {CHAT_ADMIN_BLOCKS.map((block) => (
            <article className="detail-card" key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </article>
          ))}
        </div>

        <div className="cta-row">
          <Link className="cta-button" href="/chat">
            Open Chat
          </Link>
          <Link className="cta-button alt" href="/admin">
            Open Admin
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
