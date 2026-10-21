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
          I’m a software engineer who loves figuring out how things work. I’ve
          worked on systems software at Microsoft and built secure, accessible
          web experiences at UKG. Outside of work, I enjoy exploring new ideas,
          building side projects, and getting lost in a good anime.
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
