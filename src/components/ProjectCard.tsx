import Image from "next/image";
import type { Project } from "@/data/content";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      style={{ backgroundColor: project.bgColor }}
      aria-label={`${project.categoryBadge} — ${project.title}`}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1440px) 44vw, 628px"
        className={styles.image}
      />
      <Image src={project.logo} alt="" width={200} height={140} className={styles.projectLogo} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{project.categoryBadge}</span>
        <h3 className={styles.title}>{project.title}</h3>
      </div>
    </a>
  );
}
