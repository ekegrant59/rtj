import React from "react";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, SERVICES_DATA } from "@/data/content";
import styles from "./page.module.css";

export default function Home() {
  const featuredProjects = PROJECTS;

  return (
    <>
      <main id="main-content" className={styles.page}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <span className={styles.heroEyebrow}>MARKETING / DESIGN / DEVELOPMENT</span>
            <h1 className={styles.heroTitle}>
              Three skills. One<br />
              team. Work you<br />
              can&apos;t ignore<span className={styles.heroTitleDot} />
            </h1>
            <div className={styles.heroBottomRow}>
              <p className={styles.heroLead}>
                We plan the campaign, design the brand and build the{" "}
                website, so nothing gets lost between agencies.
              </p>
              <div>
                <Link href="/work" className={styles.seeWorkLink}>
                  See our work &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section className={styles.workSection}>
          <div className="container">
            <div className={styles.sectionHeaderRow}>
              <h2 className={styles.sectionHeading}>Selected work</h2>
              <Link href="/work" className={styles.allProjectsLink}>
                ALL PROJECTS &rarr;
              </Link>
            </div>
            <div className={styles.workGrid}>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className={styles.whatWeDoSection}>
          <div className="container">
            <div className={styles.whatWeDoHeader}>
              <span className="eyebrow">WHAT WE DO</span>
            </div>

            <div>
              {SERVICES_DATA.map((service) => (
                <div key={service.title} className={styles.disciplineRow}>
                  <h3 className={styles.disciplineTitle}>{service.title}</h3>
                  <p className={styles.disciplineDesc}>{service.description}</p>
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
