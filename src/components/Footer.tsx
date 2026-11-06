import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import { SOCIAL_LINKS } from "@/data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Logo compact />
        <nav className={styles.nav} aria-label="Footer navigation">
          <NavigationLinks className={styles.link} />
        </nav>
        {SOCIAL_LINKS.length > 0 && <div className={styles.socials}>
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>{label}</a>
          ))}
        </div>}
      </div>
    </footer>
  );
}
