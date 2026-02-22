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
] as const;

const API_BASE = (process.env.NEXT_PUBLIC_REDLINE_API_BASE || "https://api.redlinelegal.ca").replace(/\/+$/, "");

function apiUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

function fmtTime(ts: string) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString();
}

export default function ChatAdminPage() {
  const [sessions, setSessions] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reply, setReply] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sessionsUrl = useMemo(() => apiUrl("/chat/sessions"), []);
  const historyUrl = useMemo(() => {
    if (!selectedSession) return "";
    return apiUrl(`/chat/history?session_id=${encodeURIComponent(selectedSession)}`);
  }, [selectedSession]);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch(sessionsUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`sessions ${res.status}`);
      const data = await res.json();
      const next = Array.isArray(data?.sessions) ? (data.sessions as string[]) : [];
      setSessions(next);
      setError("");
      if (!selectedSession && next.length > 0) setSelectedSession(next[0]);
    } catch {
      setError("Couldn’t load sessions.");
    }
  }, [sessionsUrl, selectedSession]);

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
      setError("Couldn’t load messages for this session.");
    }
  }, [historyUrl]);

  // Load + poll session list
  useEffect(() => {
    fetchSessions();
    const t = window.setInterval(fetchSessions, 6000);
    return () => window.clearInterval(t);
  }, [fetchSessions]);

  // Load + poll messages for selected session
  useEffect(() => {
    if (!selectedSession) return;
    fetchMessages();
    const t = window.setInterval(fetchMessages, 3000);
    return () => window.clearInterval(t);
  }, [selectedSession, fetchMessages]);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const sendReply = useCallback(async () => {
    const trimmed = reply.trim();
    if (!trimmed || !selectedSession || isSending) return;

    setIsSending(true);
    setError("");

    try {
      const res = await fetch(apiUrl("/chat/send"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: selectedSession,
          message: trimmed,
          sender: "admin",
        }),
      });

      if (!res.ok) throw new Error(`send ${res.status}`);

      setReply("");
      await fetchMessages();
    } catch {
      setError("Reply didn’t send. Try again.");
    } finally {
      setIsSending(false);
    }
  }, [reply, selectedSession, isSending, fetchMessages]);

  return (
    <SiteShell>
      <PagePanel
        title="Chat Admin Console"
        intro="Sessions on the left, thread on the right. Admin messages are LEFT/blue. User messages are RIGHT/green."
      >
        {/* Keep the new “block” look */}
        <div className="detail-grid">
          {CHAT_ADMIN_BLOCKS.map((block) => (
            <article className="detail-card" key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </article>
          ))}
        </div>

        {/* Functional admin console */}
        <section className="mt-8">
          <div className="grid gap-4 lg:grid-cols-[280px,1fr]">
            <aside className="detail-card">
              <div className="flex items-center justify-between gap-2">
                <h3 style={{ margin: 0 }}>Sessions</h3>
                <button className="cta-button alt" onClick={fetchSessions} type="button">
                  Refresh
                </button>
              </div>

              <div className="mt-3 grid gap-2">
                {sessions.length === 0 ? (
                  <p style={{ color: "var(--text-muted)", margin: 0 }}>No sessions yet.</p>
                ) : (
                  sessions.map((sid) => (
                    <button
                      key={sid}
                      type="button"
                      onClick={() => setSelectedSession(sid)}
                      className="w-full rounded-xl border px-3 py-2 text-left text-sm"
                      style={{
                        borderColor: "var(--border)",
                        background: selectedSession === sid ? "var(--surface)" : "transparent",
                        color: "var(--text-primary)",
                      }}
                    >
                      <div className="font-semibold break-all">{sid}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Click to open
                      </div>
                    </button>
                  ))
                )}
              </div>
            </aside>

            <main className="detail-card">
              {!selectedSession ? (
                <p style={{ color: "var(--text-muted)", margin: 0 }}>Select a session to view messages.</p>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 style={{ margin: 0 }}>Session: {selectedSession}</h3>
                    <div className="flex gap-2">
                      <Link className="cta-button alt" href="/chat">
                        Open Chat
                      </Link>
                      <Link className="cta-button alt" href="/admin">
                        Open Admin
                      </Link>
                    </div>
                  </div>

                  <div
                    ref={scrollRef}
                    className="mt-3 rounded-2xl border p-4"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                      maxHeight: 520,
                      overflowY: "auto",
                    }}
                  >
                    {messages.length === 0 ? (
                      <p style={{ color: "var(--text-muted)", margin: 0 }}>No messages yet.</p>
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
                                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
                              >
                                <div
                                  className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
                                    isAdmin ? "text-blue-600" : "text-green-600"
                                  }`}
                                >
                                  {msg.message}
                                </div>
                                <div className="mt-1 text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
                                  {isAdmin ? "Admin" : "User"} • {fmtTime(msg.timestamp)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type a reply…"
                      className="flex-1 rounded-xl border px-3 py-2"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--surface)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <button className="cta-button" type="button" onClick={sendReply} disabled={isSending}>
                      {isSending ? "Sending…" : "Send"}
                    </button>
                  </div>

                  {error ? (
                    <p className="mt-2 text-sm" style={{ color: "var(--text-muted)", margin: 0 }}>
                      {error}
                    </p>
                  ) : null}
                </>
              )}
            </main>
          </div>
        </section>

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