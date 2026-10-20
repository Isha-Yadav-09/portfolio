import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    company: "UKG",
    role: "Software Engineering Intern",
    period: "Jan 2026 — Jun 2026",
    highlights: [
      "Designed environment-specific SSRF bypass configuration for the egress-gateway sidecar, separating production and non-production domain lists. Added policy validation and unit tests.",
      "Implemented WCAG 2.1 AA accessibility for the Bryte Control Panel, raising its axe score from 42 to 98; added 35+ Playwright end-to-end tests and re-enabled the accessibility suite in CI.",
      "Automated localization delta exports for the Bryte Control Panel with GitHub Actions, reducing manual effort across releases.",
    ],
    tech: [
      "Angular 21",
      "TypeScript",
      "Playwright",
      "Jest",
      "GitHub Actions",
      "Grafana",
      "Confluence",
      "WCAG 2.1",
      "SCSS",
      "Claude Code",
    ],
  },
  {
    company: "Microsoft",
    role: "Software Engineering Intern",
    period: "May 2025 — Jul 2025",
    project: "SoC-to-SoC RDMA for LM Context Transfer",
    highlights: [
      "Developed C-based system software to live-migrate runtime context between SoCs, using RDMA for high-speed data transfer and TCP for metadata exchange.",
      "Achieved approximately 60× faster data transfer with RDMA kernel bypass and zero-copy.",
      "Used TCP for metadata coordination and PMEM to stage migration data for durability and fast recovery.",
    ],
    tech: [
      "C",
      "RDMA",
      "TCP",
      "PMEM",
      "DMA",
      "SoC",
      "Live Migration",
      "VM",
      "Embedded Systems",
      "Memory Serialization",
      "MobaXterm",
    ],
  },
];

function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(0);
  const experience = experiences[selectedExperience];

  return (
    <section className="section-wrap" id="experience">
      <SectionHeading
        title="/ experience"
        description="Experiences that helped shape the way I build software."
      />

      <div className="experience-layout">
        <div
          className="experience-tabs"
          role="tablist"
          aria-label="Companies"
          aria-orientation="vertical"
        >
          {experiences.map((item, index) => (
            <button
              className={
                selectedExperience === index
                  ? "experience-tab active"
                  : "experience-tab"
              }
              id={`experience-tab-${index}`}
              key={item.company}
              type="button"
              role="tab"
              aria-selected={selectedExperience === index}
              aria-controls="experience-panel"
              tabIndex={selectedExperience === index ? 0 : -1}
              onClick={() => setSelectedExperience(index)}
            >
              {item.company}
            </button>
          ))}
        </div>

        <motion.article
          className="experience-panel"
          key={experience.company}
          id="experience-panel"
          role="tabpanel"
          aria-labelledby={`experience-tab-${selectedExperience}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="experience-panel-heading">
            <h3>
              {experience.role} <span>@ {experience.company}</span>
            </h3>
            <span className="experience-period">{experience.period}</span>
          </div>
          {experience.project && (
            <p className="experience-project">{experience.project}</p>
          )}
          <ul className="experience-highlights">
            {experience.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <h4 className="experience-tools-heading">Tools and technologies</h4>
          <div className="tag-list">
            {experience.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export default Experience;
