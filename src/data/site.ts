export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Add the real profile URLs and phone number when they are available.
export const SOCIAL_LINKS: ReadonlyArray<{ href: string; label: string }> = [];
export const CONTACT_PHONE: string | null = null;

export const CONTACT_EMAIL = "hello@rtjagency.com";
