import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { BELIEFS } from "@/data/content";
import styles from "./about.module.css";

export const metadata = {
  title: "About — RTJ",
  description: "Small team. Big standards. RTJ is a marketing, design and development agency built for brands that are tired of managing three suppliers to do one job.",
};

const expertise = [
  {
    title: "Marketing",
    description: "We know how to get the right people to pay attention, and what makes them act.",
    metric: "[5+] Campaigns delivered",
  },
  {
    title: "Design",
    description: "Identity, interfaces and product design made with craft and tested with real users.",
    metric: "[3+] Brands built",
  },
  {
    title: "Development",
    description: "Fast, clean and secure websites and apps, built to be maintained and to grow.",
    metric: "[5+] Sites launched",
  },
];

const process = [
  {
    title: "Plan",
    description: "Whiteboards, briefs and the first big idea.",
    image: "/images/process-plan.webp",
    alt: "Planning a project with handwritten notes on a whiteboard",
  },
  {
    title: "Design",
    description: "Layouts, type and colour, argued over and refined.",
    image: "/images/process-design.webp",
    alt: "A designer working on layouts and interfaces at a desk",
  },
  {
    title: "Build",
    description: "Where the design becomes a working product.",
    image: "/images/process-build.webp",
    alt: "Developing a digital product with code and a tablet",
  },
];

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className={styles.page}>
        <section className={styles.heroSection}>
          <div className="container">
            <span className={styles.eyebrow}>About</span>
            <h1 className={styles.heroTitle}>
              Small team. Big<br />standards<span className={styles.heroTitleDot} />
            </h1>
            <p className={styles.heroLead}>
              RTJ is a marketing, design and development agency, built for brands that are tired of managing three suppliers to do one job.
            </p>
          </div>
        </section>

        <section className={styles.storySection} aria-labelledby="our-story">
          <div className={`container ${styles.storyGrid}`}>
            <h2 id="our-story" className={styles.storyHeading}>Our story</h2>
            <div className={styles.storyCopy}>
              <p>RTJ started with a frustration we kept running into. A brand would hire one agency for the campaign, another for the design and a third for the website. Each did good work on its own. None of them were working from the same idea.</p>
              <p>So we built the agency we wanted to hire: one team that handles marketing, design and development together. The strategy behind the campaign also shapes the brand, and the brand shapes the site. Nothing gets lost in a handover, because there is no handover.</p>
              <p>That is still how we work. Small team, one brief, and standards high enough that every part of a project looks like it came from the same hand.</p>
            </div>
          </div>
        </section>

        <section className={styles.expertiseSection} aria-labelledby="our-expertise">
          <div className="container">
            <span className={styles.eyebrow}>Our expertise</span>
            <h2 id="our-expertise" className={styles.expertiseHeading}>Three disciplines.<br />One standard.</h2>
            <div className={styles.expertiseGrid}>
              {expertise.map((item) => (
                <div key={item.title}>
                  <h3 className={styles.expertiseTitle}>{item.title}</h3>
                  <p className={styles.expertiseDescription}>{item.description}</p>
                  <p className={styles.metric}>{item.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.processSection} aria-labelledby="how-we-work">
          <div className="container">
            <h2 id="how-we-work" className={styles.eyebrow}>How we work</h2>
            <div className={styles.processGrid}>
              {process.map((step, index) => (
                <div key={step.title} className={styles.processCard}>
                  <div className={styles.processImage} data-position={index}>
                    <Image src={step.image} alt={step.alt} fill sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1440px) 29vw, 395px" />
                  </div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDescription}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.beliefsSection} aria-labelledby="our-beliefs">
          <div className="container">
            <div className={styles.beliefsInner}>
              <h2 id="our-beliefs" className={styles.eyebrow}>What we believe</h2>
              <div className={styles.beliefsGrid}>
                {BELIEFS.map((belief) => (
                  <div key={belief.title}>
                    <h3 className={styles.beliefTitle}>{belief.title}</h3>
                    <p className={styles.beliefDescription}>{belief.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <CTABanner />
      </main>
    </>
  );
}
