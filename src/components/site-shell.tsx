import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemePicker } from "./theme-picker";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/chat", label: "Chat" },
  { href: "/admin", label: "Admin" }, // protected
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cookies", label: "Cookies" },
] as const;

const PREFETCH_OFF = new Set<string>(["/admin", "/admin/", "/chat-admin", "/chat-admin/"]);

function normalizeHref(href: string) {
  if (!href) return href;
  if (href === "/") return "/";
  return href.replace(/\/+$/, "");
}

function shouldPrefetch(href: string) {
  const normalized = normalizeHref(href);
  return !PREFETCH_OFF.has(normalized) && !PREFETCH_OFF.has(`${normalized}/`);
}

export function SiteShell({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Redline Legal Home">
          <span className="brand-mark">
            <Image
              src="/branding/redline-logo-original-transparent.png"
              alt="Redline Legal logo"
              width={60}
              height={60}
              priority
            />
          </span>
          <span className="brand-copy">
            <span className="brand-name">Redline Legal</span>
            <span className="brand-tagline">
              Legal support services for self-represented litigants and small business teams.
            </span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className="nav-link"
              href={item.href}
              prefetch={shouldPrefetch(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ThemePicker />
      </header>

      <main className="main-content">{children}</main>

      <footer className="site-footer">
        <p>© {year} Redline Legal. All rights reserved.</p>
        <div className="footer-links">
          <Link className="footer-link" href="/admin" prefetch={false}>
            Admin
          </Link>
          <Link className="footer-link" href="/cookies">
            Manage Cookies
          </Link>
          <a className="footer-link" href="mailto:contact@redlinelegal.ca">
            contact@redlinelegal.ca
          </a>
        </div>
      </footer>
    </div>
  );
}