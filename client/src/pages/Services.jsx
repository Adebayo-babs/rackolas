import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { services } from "../data.js";
import Icon from "../components/Icons.jsx";
import { Faq } from "../components/Extras.jsx";
import {
  CtaBand,
  PageHero,
  Reveal,
  usePageTitle,
} from "../components/Shared.jsx";

export default function Services() {
  usePageTitle("Our Services");
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView(), 60);
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Specialist works, one trusted team."
        text={
          "Roofing, aluminium and interior finishing for " +
          "residential, commercial and estate projects."
        }
        image="/images/roof-wide.webp"
      />

      <nav className="service-tabs" aria-label="Services">
        <div className="container service-tabs__inner">
          {services.map((s) => (
            <a key={s.slug} href={"#" + s.slug}>
              <Icon name={s.icon} size={18} /> {s.title}
            </a>
          ))}
        </div>
      </nav>

      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={
            "section service-detail" +
            (i % 2 ? " section--tint is-flipped" : "")
          }
        >
          <div className="container split">
            <Reveal className="service-detail__media">
              <img src={s.image} alt={s.title} loading="lazy" />
              <span className="service-detail__num">0{i + 1}</span>
            </Reveal>
            <Reveal delay={100}>
              <span className="service-card__icon">
                <Icon name={s.icon} />
              </span>
              <h2>{s.title}</h2>
              <p className="lead">{s.short}</p>
              <p>{s.body}</p>
              <ul className="check-list">
                {s.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={18} /> {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact#quote"
                state={{ service: s.title }}
                className="btn btn--accent"
              >
                Get a quote for this <Icon name="arrow" size={18} />
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      <Faq />
      <CtaBand />
    </>
  );
}
