import { useState } from "react";
import { useLocation } from "react-router-dom";
import { branches, whatsappLink } from "../config.js";
import { services } from "../data.js";
import Icon, { WhatsAppIcon } from "./Icons.jsx";

const empty = {
  name: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  message: "",
  website: "", // honeypot — real users never fill this
};

export default function QuoteForm() {
  const { state } = useLocation();
  const [form, setForm] = useState({
    ...empty,
    service: state?.service || "",
    message: state?.message || "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(null);

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setSent(form);
      setStatus("done");
      setForm(empty);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  if (status === "done") {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon">
          <Icon name="check" size={32} />
        </span>
        <h3>Thank you — request received.</h3>
        <p>
          Our team will call you shortly to discuss your
          project and arrange a site visit.
        </p>
        <div className="form-success__actions">
          {sent && (
            <a
              className="btn btn--whatsapp"
              target="_blank"
              rel="noreferrer"
              href={whatsappLink(
                "Hello Rackolas, I just requested a quote.\n" +
                  `Name: ${sent.name}\n` +
                  `Phone: ${sent.phone}\n` +
                  `Service: ${sent.service}\n` +
                  (sent.location ? `Location: ${sent.location}\n` : "") +
                  `\n${sent.message}`
              )}
            >
              <WhatsAppIcon size={18} /> Also send on WhatsApp
            </a>
          )}
          <button
            className="btn btn--outline"
            onClick={() => setStatus("idle")}
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="name">Full name *</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={update}
          required
          autoComplete="name"
        />
      </div>

      <div className="field">
        <label htmlFor="phone">Phone number *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={update}
          required
          autoComplete="tel"
          placeholder="080..."
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          autoComplete="email"
        />
      </div>

      <div className="field">
        <label htmlFor="service">Service needed *</label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={update}
          required
        >
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>
      </div>

      <div className="field field--full">
        <label htmlFor="location">Project location</label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={update}
          placeholder="e.g. Lekki, Lagos"
          list="branch-areas"
        />
        <datalist id="branch-areas">
          {branches.map((b) => (
            <option key={b.id} value={b.area} />
          ))}
        </datalist>
      </div>

      <div className="field field--full">
        <label htmlFor="message">Tell us about the project *</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={form.message}
          onChange={update}
          required
          placeholder="Building type, size, timeline..."
        />
      </div>

      <input
        className="hp"
        name="website"
        tabIndex="-1"
        autoComplete="off"
        value={form.website}
        onChange={update}
        aria-hidden="true"
      />

      {status === "error" && (
        <p className="form-error" role="alert">{error}</p>
      )}

      <div className="field--full">
        <button
          className="btn btn--accent btn--lg"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Request free quote"}
        </button>
        <p className="form-note">
          We respond within one working day.
        </p>
      </div>
    </form>
  );
}
