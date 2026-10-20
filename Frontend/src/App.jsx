import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Technology from "./components/Technology";
import SectionHeading from "./components/SectionHeading";
import "./App.css";

function Footer() {
  return (
    <footer className="footer">
      <Link className="brand" to="/">
        isha<span>.</span>
      </Link>
      <p>Designed with curiosity. Built with care.</p>
      <Link to="/#home" className="back-top">
        Back to top ↑
      </Link>
    </footer>
  );
}

function HomePage() {
  return (
    <main>
      <Intro />
      <About />
      <Experience />
      <Projects featured />
      <Technology />
      <Contact />
    </main>
  );
}

function NotFound() {
  return (
    <main className="route-page section-wrap">
      <SectionHeading
        title="/ page not found"
        description="The page may have moved, or the address may be incorrect."
      />
      <Link className="button button-primary" to="/">
        Back to home
      </Link>
    </main>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const frame = requestAnimationFrame(() => {
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView();
      });

      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/experience"
          element={
            <main className="route-page">
              <Experience />
            </main>
          }
        />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
