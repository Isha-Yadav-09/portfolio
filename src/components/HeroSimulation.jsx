import { useEffect, useRef } from "react";

function createTextParticles() {
  const particles = [];
  const textCanvas = document.createElement("canvas");
  textCanvas.width = 440;
  textCanvas.height = 220;
  const textContext = textCanvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!textContext) return particles;

  textContext.font = "700 142px Arial, sans-serif";
  textContext.textAlign = "center";
  textContext.textBaseline = "middle";
  textContext.fillStyle = "#fff";
  textContext.fillText("ISHA", textCanvas.width / 2, textCanvas.height / 2, 410);

  const pixels = textContext.getImageData(
    0,
    0,
    textCanvas.width,
    textCanvas.height,
  ).data;
  let index = 0;
  for (let y = 0; y < textCanvas.height; y += 3) {
    for (let x = 0; x < textCanvas.width; x += 3) {
      if (pixels[(y * textCanvas.width + x) * 4 + 3] < 100) continue;

      const seed = index * 7919;
      particles.push({
        x: (x - textCanvas.width / 2) / 220,
        y: (y - textCanvas.height / 2) / 110,
        phase: (seed % 1000) / 1000,
        size: 0.8 + ((seed % 9) / 9) * 1.2,
      });
      index += 1;
    }
  }

  return particles;
}

function HeroSimulation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const particles = createTextParticles();
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const pointer = { x: -1, y: -1 };
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let visible = true;
    let animationFrame = 0;
    let startTime = performance.now();

    const render = (now) => {
      animationFrame = 0;
      if (!width || !height) return;

      const elapsed = motionPreference.matches ? 0 : (now - startTime) / 1000;
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = width * 0.59;
      const radiusY = height * 0.72;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(radiusX, radiusY),
      );
      glow.addColorStop(0, "rgba(100, 255, 218, 0.10)");
      glow.addColorStop(0.55, "rgba(100, 255, 218, 0.035)");
      glow.addColorStop(1, "rgba(10, 25, 47, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        const { x, y, phase, size } = particle;
        const time = elapsed * (0.55 + phase * 0.3);
        const waveX = Math.sin(y * 8 + x * 3 + time) * 0.018;
        let pointX = centerX + (x + waveX) * radiusX;
        let pointY =
          centerY +
          (y + Math.sin(x * 5 - time * 0.8 + phase * 6.28) * 0.025) *
            radiusY;

        const pointerDistance = Math.hypot(
          pointX - pointer.x,
          pointY - pointer.y,
        );
        const pointerInfluence = Math.max(
          0,
          1 - pointerDistance / (Math.min(width, height) * 0.2),
        );
        if (pointerInfluence) {
          const direction = pointerDistance || 1;
          pointX +=
            ((pointX - pointer.x) / direction) * pointerInfluence * 18;
          pointY +=
            ((pointY - pointer.y) / direction) * pointerInfluence * 18;
        }

        const shimmer = 0.72 + Math.sin(elapsed * 1.6 + phase * 6.28) * 0.18;
        const alpha = Math.min(0.95, shimmer + pointerInfluence * 0.28);

        context.beginPath();
        context.arc(
          pointX,
          pointY,
          size * (1 + pointerInfluence),
          0,
          Math.PI * 2,
        );
        context.fillStyle =
          x + y > 0.15
            ? `rgba(100, 255, 218, ${alpha})`
            : `rgba(136, 180, 190, ${alpha * 0.72})`;
        context.fill();
      }

      if (visible && !motionPreference.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const scheduleRender = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      startTime = performance.now();
      scheduleRender();
    };

    const movePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      scheduleRender();
    };

    const clearPointer = () => {
      pointer.x = -1;
      pointer.y = -1;
      scheduleRender();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) scheduleRender();
      else if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });
    visibilityObserver.observe(canvas);

    canvas.addEventListener("pointermove", movePointer);
    canvas.addEventListener("pointerleave", clearPointer);
    motionPreference.addEventListener("change", scheduleRender);
    resize();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", movePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
      motionPreference.removeEventListener("change", scheduleRender);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <span className="hero-name-particles">
      <canvas
        ref={canvasRef}
        className="simulation-container"
        aria-hidden="true"
      />
      <span className="visually-hidden">ISHA</span>
    </span>
  );
}

export default HeroSimulation;
