import { CONTACT_EMAIL } from "@/data/site";
import { ButtonLink } from "./Button";
import styles from "./CTABanner.module.css";

export default function CTABanner() {
  return (
    <section className={styles.ctaSection} aria-labelledby="project-cta-heading">
      <div className={`container ${styles.inner}`}>
        <h2 id="project-cta-heading" className={styles.heading}>
          Tell us what<br />you&apos;re building<span className={styles.headingDot} aria-hidden="true" />
        </h2>
        <div className={styles.actions}>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email}>{CONTACT_EMAIL}</a>
          <ButtonLink href="/contact" tone="accent">Start a project</ButtonLink>
        </div>
      </div>
    </section>
  );
}
