import Link from "next/link";
import { NAV_LINKS } from "@/data/site";

interface NavigationLinksProps {
  className?: string;
  activePath?: string;
  onNavigate?: () => void;
}

export default function NavigationLinks({ className, activePath, onNavigate }: NavigationLinksProps) {
  return NAV_LINKS.map(({ href, label }) => (
    <Link key={href} href={href} className={className} onClick={onNavigate} aria-current={activePath === href ? "page" : undefined}>
      {label}
    </Link>
  ));
}
