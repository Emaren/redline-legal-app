import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HEADER_NAV_ROUTES } from "@/config/site-routes";
import { ThemePicker } from "./theme-picker";

export function SiteShell({ children }: { children: ReactNode }) {
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
              Legal support services for self-represented litigants and small
              business teams.
            </span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary navigation">
          {HEADER_NAV_ROUTES.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <ThemePicker />
      </header>

      <main className="main-content">{children}</main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Redline Legal. All rights reserved.</p>
        <div className="footer-links">
          <Link className="footer-link" href="/admin">
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
