"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import { ButtonLink } from "./Button";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}

function Navigation({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <header className={styles.header} onKeyDown={(event) => {
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }}>
      <div className={`container ${styles.inner}`}>
        <Logo />
        <button
          ref={toggleRef}
          type="button"
          className={styles.mobileToggle}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
        >
          <span /><span /><span />
        </button>
        <nav id="primary-navigation" className={styles.nav} data-open={mobileOpen} aria-label="Primary navigation">
          <NavigationLinks className={styles.navLink} activePath={pathname} onNavigate={() => setMobileOpen(false)} />
          <ButtonLink href="/contact" className={styles.cta} onClick={() => setMobileOpen(false)}>
            Start a project
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
