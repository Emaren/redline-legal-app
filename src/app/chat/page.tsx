import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const CHAT_CHANNELS = [
  {
    title: "Client updates",
    body: "Share quick status updates and outstanding action items for active matters.",
  },
  {
    title: "Document review thread",
    body: "Coordinate revisions with focused comments before final filing packages.",
  },
  {
    title: "Timeline checkpoints",
    body: "Track approaching deadlines and confirm who owns each next step.",
  },
  {
    title: "Escalation path",
    body: "Flag urgent blockers for same-day review and handoff decisions.",
  },
];

export default function ChatPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Chat Workspace"
        intro="This route is now wired and ready for your live chat integration. Use it for secure client messaging, case updates, and rapid coordination."
      >
        <div className="detail-grid">
          {CHAT_CHANNELS.map((channel) => (
            <article className="detail-card" key={channel.title}>
              <h3>{channel.title}</h3>
              <p>{channel.body}</p>
            </article>
          ))}
        </div>

        <div className="cta-row">
          <Link className="cta-button" href="/contact">
            Open Intake Thread
          </Link>
          <Link className="cta-button alt" href="/admin">
            Go to Admin
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
