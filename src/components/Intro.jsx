import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import HeroSimulation from "./HeroSimulation";

function Intro() {
  return (
    <section className="hero section-wrap" id="home">
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1>
          hi, <HeroSimulation /> here.
        </h1>

        <p className="hero-description">
          I enjoy working at both ends of the stack: crafting thoughtful
          experiences people love to use and building the systems that make
          them fly.
        </p>

        <div className="hero-actions">
          <a
            className="button button-primary"
            href="mailto:ishayadav1012@gmail.com"
          >
            <Mail size={18} aria-hidden="true" />
            Say hi!
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Intro;
