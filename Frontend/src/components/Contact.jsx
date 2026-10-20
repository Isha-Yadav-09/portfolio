import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not send your message.");
      }

      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(
        error.message === "Failed to fetch"
          ? "Backend unavailable. Please start the Node.js server."
          : error.message
      );
    } finally {
      setSubmitting(false);
    }
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
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me a little about what you have in mind..."
          rows="4"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          required
        />

        <button
          className="button button-primary submit-button"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send message"}
          <ArrowUpRight size={17} />
        </button>

        {status && (
          <p className="form-status" role="status">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;
