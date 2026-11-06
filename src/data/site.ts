export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Add the real social profile URLs when they are available.
export const SOCIAL_LINKS: ReadonlyArray<{ href: string; label: string }> = [];
export const CONTACT_PHONE: string | null = "+1 (437) 733-5541";

export const CONTACT_EMAIL = "rtjmarketingontario@gmail.com";
