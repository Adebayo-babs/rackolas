import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { company, whatsappLink } from "../config.js";
import Icon, { WhatsAppIcon } from "./Icons.jsx";

/* Fades children in when they scroll into view */
export function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      {...rest}
      className={
        "reveal" + (shown ? " is-in" : "") +
        (rest.className ? " " + rest.className : "")
      }
      style={{ transitionDelay: delay + "ms", ...rest.style }}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, text, center }) {
  return (
    <Reveal className={"section-head" + (center ? " is-center" : "")}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" className="page-hero__bg" />
      <div className="container page-hero__inner">
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>Ready to start your project?</h2>
          <p>
            Get a free site visit and a clear, itemised quote.
          </p>
        </div>
        <div className="cta-band__actions">
          <Link to="/contact#quote" className="btn btn--accent">
            Request a quote <Icon name="arrow" size={18} />
          </Link>
          <a
            href={whatsappLink(
              "Hello Rackolas, I'd like to discuss a project."
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btn--whatsapp"
          >
            <WhatsAppIcon size={18} /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={whatsappLink(
        "Hello Rackolas, I'd like to enquire about a project."
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${company.name}`
      : `${company.name} | Roofing & Aluminium Works, Lagos`;
  }, [title]);
}
