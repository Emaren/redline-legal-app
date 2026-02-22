"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PagePanel } from "@/components/page-panel";
import { SiteShell } from "@/components/site-shell";

type ChatMessage = {
  sender: "user" | "admin" | string;
  message: string;
  timestamp: string;
};

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
] as const;

const API_BASE = (process.env.NEXT_PUBLIC_REDLINE_API_BASE || "https://api.redlinelegal.ca").replace(/\/+$/, "");

function apiUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

function safeSessionId(): string {
  // Prefer persisted session_id so the user stays in the same thread.
  try {
    const existing = localStorage.getItem("chat_session_id");
    if (existing) return existing;

    const id =
      (typeof crypto !== "undefined" && "randomUUID" in crypto && crypto.randomUUID()) ||
      `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    localStorage.setItem("chat_session_id", id);
    return id;
  } catch {
    return `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}

function fmtTime(ts: string) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString();
}

export default function ChatPage() {
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSessionId(safeSessionId());
  }, []);

  const historyUrl = useMemo(() => {
    if (!sessionId) return "";
    return apiUrl(`/chat/history?session_id=${encodeURIComponent(sessionId)}`);
  }, [sessionId]);

  const fetchMessages = useCallback(async () => {
    if (!historyUrl) return;
    try {
      const res = await fetch(historyUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`history ${res.status}`);
      const data = await res.json();
      const next = Array.isArray(data?.messages) ? (data.messages as ChatMessage[]) : [];
      setMessages(next);
      setError("");
    } catch {
      setError("Couldn’t load chat right now. Refresh and try again.");
    }
  }, [historyUrl]);

  // Poll chat
  useEffect(() => {
    if (!sessionId) return;
    fetchMessages();
    const t = window.setInterval(fetchMessages, 4000);
    return () => window.clearInterval(t);
  }, [sessionId, fetchMessages]);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = newMessage.trim();
      if (!trimmed || !sessionId || isSending) return;

      setIsSending(true);
      setError("");

      try {
        const res = await fetch(apiUrl("/chat/send"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            message: trimmed,
            sender: "user",
          }),
        });

        if (!res.ok) throw new Error(`send ${res.status}`);

        setNewMessage("");
        await fetchMessages();
      } catch {
        setError("Message didn’t send. Try again.");
      } finally {
        setIsSending(false);
      }
    },
    [newMessage, sessionId, isSending, fetchMessages],
  );

  return (
    <SiteShell>
      <PagePanel
        title="Chat Workspace"
        intro="Send a quick note and we’ll reply in this thread. For privacy, avoid sensitive personal identifiers unless requested."
      >
        {/* Keep the new “channel” look */}
        <div className="detail-grid">
          {CHAT_CHANNELS.map((channel) => (
            <article className="detail-card" key={channel.title}>
              <h3>{channel.title}</h3>
              <p>{channel.body}</p>
            </article>
          ))}
        </div>

        {/* Live chat (old functionality, new styling) */}
        <section className="mt-8">
          <div className="detail-card">
            <h3>Live Thread</h3>
            <p style={{ marginTop: 6 }}>
              Your messages are <span className="font-semibold text-green-600">RIGHT / green</span>. Admin replies are{" "}
              <span className="font-semibold text-blue-600">LEFT / blue</span>.
            </p>

            <div
              ref={scrollRef}
              className="mt-4 rounded-2xl border p-4"
              style={{
                borderColor: "var(--border)",
                background: "var(--card-bg)",
                maxHeight: 520,
                overflowY: "auto",
              }}
            >
              {messages.length === 0 ? (
                <p style={{ color: "var(--text-muted)", margin: 0 }}>No messages yet. Say hello 👋</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {messages.map((msg, i) => {
                    const isAdmin = msg.sender === "admin"; // admin = LEFT/BLUE
                    return (
                      <div
                        key={`${msg.timestamp}-${i}`}
                        className={`flex w-full ${isAdmin ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className="max-w-[85%] rounded-2xl border px-4 py-2"
                          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                        >
                          <div
                            className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
                              isAdmin ? "text-blue-600" : "text-green-600"
                            }`}
                          >
                            {msg.message}
                          </div>
                          <div className="mt-1 text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
                            {isAdmin ? "Redline" : "You"} • {fmtTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="mt-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message…"
                  className="flex-1 rounded-xl border px-3 py-2"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                    color: "var(--text-primary)",
                  }}
                />
                <button className="cta-button" type="submit" disabled={isSending || !sessionId}>
                  {isSending ? "Sending…" : "Send"}
                </button>
              </div>

              {error ? (
                <p className="text-sm" style={{ color: "var(--text-muted)", margin: 0 }}>
                  {error}
                </p>
              ) : null}
            </form>
          </div>
        </section>

        <div className="cta-row">
          <Link className="cta-button" href="/contact">
            Open Intake Thread
          </Link>
          <Link className="cta-button alt" href="/chat-admin">
            Go to Chat Admin
          </Link>
        </div>
      </PagePanel>
    </SiteShell>
  );
}