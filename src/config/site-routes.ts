export type SiteRoute = {
  href: string;
  label: string;
  description: string;
  inHeaderNav?: boolean;
};

export const SITE_ROUTES: SiteRoute[] = [
  {
    href: "/",
    label: "Home",
    description: "Overview of services and entry points.",
    inHeaderNav: true,
  },
  {
    href: "/services",
    label: "Services",
    description: "Support offerings for legal process and filings.",
    inHeaderNav: true,
  },
  {
    href: "/pricing",
    label: "Pricing",
    description: "Package structure and intake-based scoping.",
    inHeaderNav: true,
  },
  {
    href: "/resources",
    label: "Resources",
    description: "Guides, templates, and practical legal ops references.",
    inHeaderNav: true,
  },
  {
    href: "/chat",
    label: "Chat",
    description: "Client messaging and quick update workspace.",
    inHeaderNav: true,
  },
  {
    href: "/chat-admin",
    label: "Chat Admin",
    description: "Combined console for chat and admin workflow handoff.",
  },
  {
    href: "/admin",
    label: "Admin",
    description: "Operations and content management workspace.",
    inHeaderNav: true,
  },
  {
    href: "/about",
    label: "About",
    description: "Mission, audience, and operating model.",
    inHeaderNav: true,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Intake and next-step coordination.",
    inHeaderNav: true,
  },
  {
    href: "/cookies",
    label: "Cookies",
    description: "Cookie manager access and privacy controls.",
    inHeaderNav: true,
  },
];

export const HEADER_NAV_ROUTES = SITE_ROUTES.filter(
  (route) => route.inHeaderNav,
);

export const INTERNAL_PAGE_ROUTES = SITE_ROUTES.filter(
  (route) => route.href !== "/",
);
