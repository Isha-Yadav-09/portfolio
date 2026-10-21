import SectionHeading from "./SectionHeading";

function About() {
  return (
    <section className="section-wrap about-section" id="about">
      <SectionHeading title="/ about me" />

      <div className="about-content">
        <img
          className="about-photo"
          src={`${import.meta.env.BASE_URL}Isha_Yadav_photo.jpeg`}
          alt="Isha Yadav"
          loading="lazy"
        />
        <div className="about-bio">
          <p>
            Hey, I&apos;m <strong>Isha Yadav</strong>, a software engineer and
            Computer Science graduate from <strong>NIT Silchar</strong> (CGPA:
            9.34). I&apos;ve previously interned at <strong>UKG</strong> and{" "}
            <strong>Microsoft</strong>, working on application security,
            frontend development, and systems software.
          </p>
          <h3>Technologies I work with:</h3>
          <ul>
            <li>C++, C, Python</li>
            <li>JavaScript, React.js</li>
            <li>HTML, CSS</li>
          </ul>
          <p>Outside tech, I love reading manga and watching anime!</p>
        </div>
      </div>
    </section>
  );
}

export default About;
