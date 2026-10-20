import { ArrowUpRight } from "lucide-react";

function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const query = new URLSearchParams({ subject, body });

    window.location.href = `mailto:ishayadav1012@gmail.com?${query}`;
  }

  return (
    <section className="section-wrap contact-section" id="contact">
      <div className="contact-copy">
        <h2>
          Have a good idea?
          <br />
          <span>Let&apos;s build it.</span>
        </h2>
        <p>
          Have an opportunity, project, or interesting problem to discuss? Send
          me a message.
        </p>
        <a className="contact-email" href="mailto:ishayadav1012@gmail.com">
          ishayadav1012@gmail.com <ArrowUpRight size={17} />
        </a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          placeholder="Jane Smith"
          required
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me a little about what you have in mind..."
          rows="4"
          required
        />

        <button className="button button-primary submit-button">
          Send via email
          <ArrowUpRight size={17} />
        </button>

        <p className="form-status">
          Your email app will open with your message ready to send.
        </p>
      </form>
    </section>
  );
}

export default Contact;
