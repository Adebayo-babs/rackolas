import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  branches,
  company,
  mapEmbed,
  whatsappLink,
} from "../config.js";
import Icon, { WhatsAppIcon } from "../components/Icons.jsx";
import QuoteForm from "../components/QuoteForm.jsx";
import {
  PageHero,
  Reveal,
  usePageTitle,
} from "../components/Shared.jsx";

export default function Contact() {
  usePageTitle("Contact Us");
  const { hash } = useLocation();
  const [mapId, setMapId] = useState(branches[0].id);
  const branch = branches.find((b) => b.id === mapId);

  useEffect(() => {
    if (hash !== "#quote") return;
    const el = document.getElementById("quote");
    if (el) setTimeout(() => el.scrollIntoView(), 60);
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your project."
        text="Call, chat on WhatsApp, visit an office or send a request."
        image="/images/tower-orange.webp"
      />

      <section className="section">
        <div className="container contact-cards">
          <Reveal className="contact-card">
            <Icon name="phone" />
            <small>Call us</small>
            <a href={company.phoneHref}>{company.phone}</a>
          </Reveal>
          <Reveal className="contact-card" delay={80}>
            <WhatsAppIcon size={28} />
            <small>WhatsApp</small>
            <a
              href={whatsappLink("Hello Rackolas")}
              target="_blank"
              rel="noreferrer"
            >
              {company.whatsappDisplay}
            </a>
          </Reveal>
          <Reveal className="contact-card" delay={160}>
            <Icon name="mail" />
            <small>Email</small>
            <a href={"mailto:" + company.email}>{company.email}</a>
          </Reveal>
          <Reveal className="contact-card" delay={240}>
            <Icon name="clock" />
            <small>Working hours</small>
            <span>{company.hours}</span>
          </Reveal>
        </div>
      </section>

      <section id="quote" className="section section--tint">
        <div className="container quote-wrap">
          <div className="quote-wrap__intro">
            <span className="eyebrow">Free quote</span>
            <h2>Request a free site visit & quote.</h2>
            <p>
              Fill in the form and our team will call you to
              understand your needs, visit the site and give you
              a clear, itemised quote.
            </p>
            <ul className="check-list">
              <li><Icon name="check" size={18} /> No obligation</li>
              <li><Icon name="check" size={18} /> Free measurement</li>
              <li><Icon name="check" size={18} /> Honest advice</li>
            </ul>
          </div>
          <Reveal className="quote-wrap__form">
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="map-wrap">
            <div className="map-wrap__list">
              <span className="eyebrow">Our offices</span>
              <h2>Find us</h2>
              {branches.map((b) => (
                <button
                  key={b.id}
                  className={
                    "map-branch" + (b.id === mapId ? " is-active" : "")
                  }
                  onClick={() => setMapId(b.id)}
                >
                  <Icon name="pin" size={20} />
                  <span>
                    <strong>{b.label}</strong>
                    {b.address} {b.area}
                  </span>
                </button>
              ))}
            </div>
            <iframe
              key={branch.id}
              title={"Map: " + branch.label}
              src={mapEmbed(branch.map)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
