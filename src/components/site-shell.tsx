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

const PROTECTED_ROUTES = new Set<string>(["/admin", "/chat-admin"]);

function normalizeHref(href: string) {
  if (!href) return href;
  if (href === "/") return "/";
  return href.replace(/\/+$/, "");
}

function isProtectedHref(href: string) {
  return PROTECTED_ROUTES.has(normalizeHref(href));
}

function NavItem({ href, label }: { href: string; label: string }) {
  // CRITICAL: never use next/link for protected routes.
  // This prevents background Next RSC fetches like /admin?_rsc=... which trigger the Basic Auth popup.
  if (isProtectedHref(href)) {
    return (
      <a className="nav-link" href={href} rel="nofollow">
        {label}
      </a>
    );
  }

  return (
    <Link className="nav-link" href={href}>
      {label}
    </Link>
  );
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
            <NavItem key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <ThemePicker />
      </header>

      <main className="main-content">{children}</main>

      <footer className="site-footer">
        <p>© {year} Redline Legal. All rights reserved.</p>
        <div className="footer-links">
          {/* CRITICAL: plain <a> for protected route */}
          <a className="footer-link" href="/admin" rel="nofollow">
            Admin
          </a>

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