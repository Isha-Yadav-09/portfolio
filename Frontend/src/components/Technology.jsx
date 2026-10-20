import { useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";

const technologies = [
  { name: "C", icon: "fa-solid fa-c", color: "#64ffda" },
  { name: "C++", icon: "fa-solid fa-code", color: "#86a8ff" },
  { name: "JavaScript", icon: "fa-brands fa-js", color: "#f3d66b" },
  { name: "Python", icon: "fa-brands fa-python", color: "#83b5f2" },
  { name: "HTML", icon: "fa-brands fa-html5", color: "#f08b65" },
  { name: "CSS", icon: "fa-brands fa-css3-alt", color: "#80a9f7" },
  { name: "React", icon: "fa-brands fa-react", color: "#73d9ee" },
  { name: "Angular", icon: "fa-brands fa-angular", color: "#ee8091" },
  { name: "Node.js", icon: "fa-brands fa-node-js", color: "#8acb81" },
  { name: "Express", icon: "fa-solid fa-server", color: "#cbd6ef" },
  { name: "MongoDB", icon: "fa-solid fa-leaf", color: "#77c99b" },
  { name: "SQL", icon: "fa-solid fa-database", color: "#82b2e9" },
  { name: "NumPy", icon: "fa-solid fa-calculator", color: "#83b5f2" },
  { name: "Pandas", icon: "fa-solid fa-table", color: "#b5a3f2" },
  { name: "Matplotlib", icon: "fa-solid fa-chart-line", color: "#a7bded" },
  { name: "Scikit-learn", icon: "fa-solid fa-brain", color: "#f1ad73" },
  { name: "TypeScript", icon: "fa-solid fa-code", color: "#77a9f8" },
  { name: "Playwright", icon: "fa-solid fa-masks-theater", color: "#8acb81" },
  { name: "Jest", icon: "fa-solid fa-vial", color: "#df9292" },
  { name: "Git", icon: "fa-brands fa-git-alt", color: "#f08b65" },
];

const animationSpeed = 0.05; // HTML used 0.032, previous React used 0.08
const fadeMargin = 0.22;
const visibleBubbleCount = 5;

function getUPathPosition(progress, width, height) {
  const t = ((progress % 1) + 1) % 1;
  const inverse = 1 - t;

  const p0 = { x: width + 140, y: height * 0.15 };
  const p1 = { x: width / 2, y: height * 0.85 }; // bottom dip of the U
  const p2 = { x: -140, y: height * 0.15 };

  const x = inverse * inverse * p0.x + 2 * inverse * t * p1.x + t * t * p2.x;
  const y = inverse * inverse * p0.y + 2 * inverse * t * p1.y + t * t * p2.y;

  const opacity =
    t < fadeMargin
      ? t / fadeMargin
      : t > 1 - fadeMargin
        ? (1 - t) / fadeMargin
        : 1;

  return {
    x,
    y,
    opacity: Math.max(0, Math.min(1, opacity)),
    scale: 0.75 + 0.45 * Math.sin(t * Math.PI),
  };
}

function Technology() {
  const stageRef = useRef(null);
  const bubbleRefs = useRef([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const bubbles = Array.from({ length: visibleBubbleCount }, (_, index) => ({
      progress: index / visibleBubbleCount,
      technologyIndex: index,
    }));

    // Counter for the next technology to enter; avoids duplicates on screen
    let nextIndex = visibleBubbleCount % technologies.length;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId;
    let lastTime = performance.now();

    function renderBubbles() {
      const { width, height } = stage.getBoundingClientRect();

      bubbles.forEach((bubble, index) => {
        const element = bubbleRefs.current[index];
        if (!element) return;

        const inner = element.firstElementChild; // NEW

        const technology = technologies[bubble.technologyIndex];
        const icon = element.querySelector(".technology-bubble-icon");
        const name = element.querySelector(".technology-bubble-name");

        element.setAttribute("aria-label", technology.name);
        icon.className = `technology-bubble-icon ${technology.icon}`;
        icon.style.color = technology.color;
        name.textContent = technology.name;

        const position = getUPathPosition(bubble.progress, width, height);
        element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${position.scale})`;
        inner.style.opacity = position.opacity; // CHANGED: was element.style.opacity
        element.style.zIndex = String(Math.round(position.scale * 50));
        element.style.pointerEvents = position.opacity < 0.05 ? "none" : "auto";
      });
    }

    function animate(currentTime) {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!pausedRef.current) {
        bubbles.forEach((bubble) => {
          bubble.progress += animationSpeed * deltaTime;

          if (bubble.progress >= 1) {
            bubble.progress %= 1;
            bubble.technologyIndex = nextIndex;
            nextIndex = (nextIndex + 1) % technologies.length;
          }
        });
        renderBubbles();
      }

      frameId = window.requestAnimationFrame(animate);
    }

    renderBubbles();

    const resizeObserver = new ResizeObserver(renderBubbles);
    resizeObserver.observe(stage);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion && frameId === undefined) {
        lastTime = performance.now();
        frameId = window.requestAnimationFrame(animate);
      } else if (!entry.isIntersecting && frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
        frameId = undefined;
      }
    });
    observer.observe(stage);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="section-wrap technology-section" id="skills">
      <SectionHeading
        title="/ technology"
        description="A few of the tools and technologies I work with."
      />

      <div
        className="technology-path-stage"
        ref={stageRef}
        // onMouseEnter={() => { pausedRef.current = true; }}
        // onMouseLeave={() => { pausedRef.current = false; }}
        // onFocusCapture={() => { pausedRef.current = true; }}
        // onBlurCapture={(event) => {
        //   if (!event.currentTarget.contains(event.relatedTarget)) {
        //     pausedRef.current = false;
        //   }
        // }}
        role="group"
        aria-label="Technologies moving along an animated path. Hover or focus to pause."
      >
        <div className="technology-path-glow technology-path-glow-left" />
        <div className="technology-path-glow technology-path-glow-right" />
        {Array.from({ length: visibleBubbleCount }).map((_, index) => (
          <div
            className="technology-bubble"
            key={`technology-bubble-${index}`}
            tabIndex={0}
            ref={(element) => { bubbleRefs.current[index] = element; }}
            role="img"
            aria-label="technology item"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
            onFocus={() => { pausedRef.current = true; }}
            onBlur={() => { pausedRef.current = false; }}
          >
            <div className="technology-bubble-inner">
              <i className="technology-bubble-icon" aria-hidden="true"></i>
              <span className="technology-bubble-name"></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Technology;