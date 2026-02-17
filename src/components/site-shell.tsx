import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemePicker } from "./theme-picker";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Redline Legal Home">
          <span className="brand-mark">
            <Image
              src="/redline-logo-transparent.png"
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
          {NAV_LINKS.map((item) => (
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
        <a className="footer-link" href="mailto:contact@redlinelegal.ca">
          contact@redlinelegal.ca
        </a>
      </footer>
    </div>
  );
}
