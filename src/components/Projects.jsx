import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, GitBranch } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import interviewPreview from "../../interview.png";
import shellcraftPreview from "../../Shell.png";
import portfolioPreview from "../../portfolio.png";

const projects = [
  {
    number: "01",
    name: "InterviewAI",
    category: "AI-Powered Mock Interview & Resume Prep Platform",
    description:
      "AI-powered interview preparation and resume tools, personalized to each role.",
    link: "https://github.com/Isha-Yadav-09/Interview-Ai",
    image: interviewPreview,
    imageAlt: "InterviewAI project preview",
  },
  {
    number: "02",
    name: "ShellCraft",
    category: "Custom Unix Shell · C",
    description:
      "A custom C shell with pipelines, job control, and useful everyday commands.",
    link: "https://github.com/Isha-Yadav-09/ShellCraft",
    image: shellcraftPreview,
    imageAlt: "ShellCraft running in a macOS terminal",
  },
  {
    number: "03",
    name: "Personal Portfolio",
    category: "Responsive Portfolio Website",
    description:
      "A responsive portfolio for my experience, projects, and technologies.",
    image: portfolioPreview,
    imageAlt: "Personal portfolio homepage preview",
  },
];

function ProjectArtwork({ project }) {
  return (
    <div className={`project-cover${project.cover ? ` project-cover-${project.cover}` : ""}`}>
      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={project.number === "01" ? "eager" : "lazy"}
        />
      ) : project.cover === "terminal" ? (
        <div className="terminal-art" aria-hidden="true">
          <div className="terminal-art-bar">
            <i />
            <i />
            <i />
            <span>shellcraft</span>
          </div>
          <div className="terminal-art-lines">
            <p>
              <b>isha@mac</b> <span>~ %</span> ./my_shell
            </p>
            <p>
              Welcome to <strong>ShellCraft</strong>
            </p>
            <p>
              <b>isha@mac</b> <span>~ %</span> ls -la
            </p>
            <p className="terminal-output">
              src&nbsp;&nbsp; README.md&nbsp;&nbsp; Makefile
            </p>
            <p>
              <b>isha@mac</b> <span>~ %</span> <em>█</em>
            </p>
          </div>
        </div>
      ) : (
        <div className="portfolio-art" aria-hidden="true">
          <div className="portfolio-art-nav">
            <span>
              isha<span className="portfolio-art-accent">.</span>
            </span>
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="portfolio-art-content">
            <span className="portfolio-art-kicker">SOFTWARE ENGINEER</span>
            <strong>hi, Isha here.</strong>
            <i />
            <div>
              <b>about</b>
              <b>experience</b>
              <b>projects</b>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ProjectArtwork.propTypes = {
  project: PropTypes.shape({
    cover: PropTypes.string,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string,
  }).isRequired,
};

function ProjectCover({ project, onPrevious, onNext, showOverlay = true }) {
  return (
    <div
      className={`project-cover-frame${showOverlay ? " project-cover-frame-featured" : ""}`}
    >
      <ProjectArtwork project={project} />
      {showOverlay && (
        <>
          <div className="project-cover-overlay">
            <div className="project-cover-copy">
              <span className="project-category">{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
            {project.link && (
              <a
                className="project-cover-link"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} on GitHub`}
              >
                <GitBranch size={18} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            )}
          </div>
          <div className="project-cover-arrows">
            <button
              type="button"
              aria-label="Previous project"
              onClick={onPrevious}
            >
              <ArrowLeft size={19} />
            </button>
            <button type="button" aria-label="Next project" onClick={onNext}>
              <ArrowRight size={19} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

ProjectCover.propTypes = {
  project: ProjectArtwork.propTypes.project,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  showOverlay: PropTypes.bool,
};

function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];

  function showProject(index) {
    setActiveProject((index + projects.length) % projects.length);
  }

  return (
    <section className="section-wrap" id="projects">
      <SectionHeading
        title="/ projects"
        description="A selection of things I have built and the technologies behind them."
        actionLabel="View all projects"
        actionTo="/projects"
      />

      <div
        className="project-carousel"
        role="region"
        aria-label="Featured projects"
        aria-roledescription="carousel"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") showProject(activeProject - 1);
          if (event.key === "ArrowRight") showProject(activeProject + 1);
        }}
      >
        <motion.article
          className="featured-project-card"
          key={project.number}
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeProject + 1} of ${projects.length}: ${project.name}`}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ProjectCover
            project={project}
            onPrevious={() => showProject(activeProject - 1)}
            onNext={() => showProject(activeProject + 1)}
          />
        </motion.article>

        <div className="project-carousel-controls">
          <div className="project-carousel-pagination" aria-label="Choose project">
            {projects.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={index === activeProject ? "active" : ""}
                aria-label={`Show project ${index + 1}: ${item.name}`}
                aria-current={index === activeProject ? "true" : undefined}
                onClick={() => showProject(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <main className="projects-page section-wrap">
      <SectionHeading
        title="/ all projects"
        description="A collection of projects I have worked on, from full-stack applications to systems software."
      />

      <div className="projects-archive-grid">
        {projects.map((project, index) => (
          <motion.article
            className="archive-project-card"
            key={project.number}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <ProjectCover project={project} showOverlay={false} />
            <div className="archive-project-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.link ? (
                <a
                  className="archive-project-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={17} aria-hidden="true" />
                  View on GitHub
                </a>
              ) : (
                <Link className="archive-project-link" to="/">
                  View portfolio
                  <GitBranch size={17} aria-hidden="true" />
                </Link>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}

function Projects({ featured = false }) {
  return featured ? <FeaturedProjects /> : <ProjectsPage />;
}

Projects.propTypes = {
  featured: PropTypes.bool,
};

export default Projects;
