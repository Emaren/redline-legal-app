import Link from "next/link";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

const RESOURCE_TRACKS = [
  {
    title: "Case preparation checklists",
    body: "Build your filing sequence, evidence stack, and hearing prep in the right order.",
  },
  {
    title: "Template library",
    body: "Starter drafts for common court letters, declarations, and response formats.",
  },
  {
    title: "Process guides",
    body: "Plain-language walkthroughs for service, filing, deadlines, and follow-up steps.",
  },
  {
    title: "Client updates",
    body: "Status notes and practical legal operations content for self-represented clients.",
  },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <PagePanel
        title="Resources"
        intro="This section is ready for your existing pages, templates, and practical guides. We can wire each card to its final destination next."
      >
        <div className="detail-grid">
          {RESOURCE_TRACKS.map((resource) => (
            <article className="detail-card" key={resource.title}>
              <h3>{resource.title}</h3>
              <p>{resource.body}</p>
            </article>
          ))}
        </div>

        <div className="cta-row">
          <Link className="cta-button" href="/contact">
            Request a Resource
          </Link>
          <Link className="cta-button alt" href="/services">
            Back to Services
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}
