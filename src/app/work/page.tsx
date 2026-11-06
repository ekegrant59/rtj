"use client";

import { useState } from "react";
import PillButton from "@/components/PillButton";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/content";
import styles from "./work.module.css";

const categories = ["All", "Marketing", "Design", "Development"] as const;
type Category = (typeof categories)[number];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Marketing") {
      return (
        project.category === "Marketing" ||
        project.category === "Campaign" ||
        project.categoryBadge.includes("CAMPAIGN")
      );
    }
    if (activeFilter === "Design") {
      return (
        project.category === "Design" ||
        project.category === "Product Design" ||
        project.category === "Brand + Web" ||
        project.categoryBadge.includes("DESIGN") ||
        project.categoryBadge.includes("BRAND")
      );
    }
    if (activeFilter === "Development") {
      return (
        project.category === "Development" ||
        project.categoryBadge.includes("DEVELOPMENT") ||
        project.category === "Brand + Web"
      );
    }
    return true;
  });

  return (
    <>
      <main id="main-content" className={styles.page}>
        {/* Work Hero */}
        <section className={styles.heroSection}>
          <div className="container">
            <span className={styles.heroEyebrow}>WORK</span>
            <h1 className={styles.heroTitle}>
              Work<span className={styles.heroTitleDot} />
            </h1>
            <p className={styles.heroLead}>
              A selection of brands we have marketed, designed and built.
            </p>

            {/* Filter Pills */}
            <div className={styles.filterBar} role="group" aria-label="Filter projects by service">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <PillButton
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    selected={isActive}
                    aria-controls="project-results"
                  >
                    {cat}
                  </PillButton>
                );
              })}
            </div>

            {/* Project Grid */}
            <div id="project-results" className={styles.workGrid} aria-live="polite" aria-atomic="true">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {filteredProjects.length === 0 && (
                <p className={styles.emptyState}>No projects in this category yet. <button type="button" onClick={() => setActiveFilter("All")}>View all work →</button></p>
              )}
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
