import React from "react";
import CTABanner from "@/components/CTABanner";
import { SERVICES_DATA, PROCESS_STEPS } from "@/data/content";
import styles from "./services.module.css";

export const metadata = {
  title: "Services — RTJ",
  description: "What we do. One team covers the whole job, so nothing gets lost between agencies.",
};

export default function ServicesPage() {
  return (
    <>
      <main id="main-content" className={styles.page}>
        {/* Services Hero */}
        <section className={styles.heroSection}>
          <div className="container">
            <span className={styles.heroEyebrow}>SERVICES</span>
            <h1 className={styles.heroTitle}>
              What we do<span className={styles.heroTitleDot} />
            </h1>
            <p className={styles.heroLead}>
              One team covers the whole job, so nothing gets lost between agencies.
            </p>
          </div>
        </section>

        {/* Disciplines & Deliverables */}
        <section className={styles.disciplinesSection}>
          <div className="container">
            {SERVICES_DATA.map((discipline) => (
              <div key={discipline.title} className={styles.disciplineBlock}>
                <div className={styles.leftCol}>
                  <h2 className={styles.disciplineTitle}>{discipline.title}</h2>
                  <p className={styles.disciplineSummary}>{discipline.description}</p>
                </div>

                <div className={styles.deliverablesList}>
                  {discipline.deliverables.map((item) => (
                    <div key={item} className={styles.deliverableItem}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How We Work (Process) */}
        <section className={styles.processSection}>
          <div className="container">
            <span className={styles.processEyebrow}>HOW WE WORK</span>

            <div className={styles.processGrid}>
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className={styles.processCard}>
                  <div className={styles.processNumber}>{step.number}</div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Universal Dark CTA Banner */}
        <CTABanner />
      </main>


    </>
  );
}
