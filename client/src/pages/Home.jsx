import { Link } from "react-router-dom";
import { branches, company } from "../config.js";
import {
  buildingTypes,
  projects,
  services,
  steps,
  values,
} from "../data.js";
import ColourStudio from "../components/ColourStudio.jsx";
import {
  AutoVideo,
  Faq,
  RotatingWord,
  VideoShowcase,
} from "../components/Extras.jsx";
import Icon from "../components/Icons.jsx";
import {
  CtaBand,
  Reveal,
  SectionHead,
  usePageTitle,
} from "../components/Shared.jsx";

export default function Home() {
  usePageTitle();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero__grain" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--light">
              Roofing · Aluminium · Interiors
            </span>
            <h1>
              <span className="hero__line">We build</span>
              <RotatingWord />
              <span className="hero__line">that turn heads.</span>
            </h1>
            <p className="hero__lead">
              {company.name} delivers aluminium and stone-coated
              roofing, partitions, doors, windows, suspended
              ceilings and handrails for homes, estates and
              commercial buildings across Lagos and Ogun State.
            </p>
            <div className="hero__actions">
              <Link to="/contact#quote" className="btn btn--accent btn--lg">
                Get a free quote <Icon name="arrow" size={18} />
              </Link>
              <Link to="/projects" className="btn btn--ghost-light btn--lg">
                See our work
              </Link>
            </div>
            <ul className="hero__facts">
              <li>
                <strong>5</strong>
                <span>Specialist services</span>
              </li>
              <li>
                <strong>3</strong>
                <span>Offices in Lagos & Ogun</span>
              </li>
              <li>
                <strong>Free</strong>
                <span>Site inspection & quote</span>
              </li>
            </ul>
          </div>

          <div className="hero__visual">
            <figure className="hero__img hero__img--main">
              <AutoVideo
                src="/videos/hero.mp4"
                poster="/images/maranatha.webp"
              />
              <figcaption>Maranatha Villa, Lagos</figcaption>
            </figure>
            <figure className="hero__img hero__img--side">
              <img
                src="/images/roof-tiles.webp"
                alt="Close view of stone-coated roof tiles"
              />
            </figure>
            <div className="hero__badge">
              <span>Built by</span>
              <strong>Rackolas</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES STRIP ---------- */}
      <div className="strip" aria-hidden="true">
        <div className="strip__track">
          {[...services, ...services].map((s, i) => (
            <span key={i}>
              {s.title} <i>◆</i>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- SERVICES ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Everything your building needs, from roof to rail."
            text={
              "One trusted team for the finishing works that " +
              "make a building look right and last."
            }
          />
          <div className="service-grid">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link
                  to={"/services#" + s.slug}
                  className="service-card has-bg"
                >
                  <img
                    className="service-card__bg"
                    src={s.image}
                    alt=""
                    loading="lazy"
                  />
                  <span className="service-card__icon">
                    <Icon name={s.icon} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <span className="service-card__more">
                    Learn more <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={services.length * 70}>
              <Link to="/contact#quote" className="service-card is-cta">
                <h3>Have a project in mind?</h3>
                <p>
                  Send us the details and get a free, no-obligation
                  quote.
                </p>
                <span className="service-card__more">
                  Request a quote <Icon name="arrow" size={16} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- BUILDING TYPES ---------- */}
      <section className="types">
        <div className="container types__inner">
          <span className="types__label">We work on</span>
          <ul>
            {buildingTypes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <ColourStudio />

      {/* ---------- ABOUT SPLIT ---------- */}
      <section className="section section--tint">
        <div className="container split">
          <Reveal className="split__media">
            <img
              src="/images/facade-orange.webp"
              alt="Aluminium windows on a finished façade"
            />
            <img
              src="/images/tower-dusk.webp"
              alt="Roof and window works at dusk"
              className="split__media-sm"
            />
          </Reveal>
          <div>
            <SectionHead
              eyebrow="Why Rackolas"
              title="Craftsmanship you can see from the street."
              text={
                "We believe a building should be beautiful as " +
                "well as strong. Every roof line, window frame " +
                "and rail we install is measured, fabricated and " +
                "fitted with care."
              }
            />
            <ul className="value-list">
              {values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 80}>
                  <span className="value-list__tick">
                    <Icon name="check" size={18} />
                  </span>
                  <div>
                    <strong>{v.title}</strong>
                    <span>{v.text}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Link to="/about" className="btn btn--outline">
              About our company <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <VideoShowcase />

      {/* ---------- PROJECTS ---------- */}
      <section className="section section--dark">
        <div className="container">
          <div className="row-head">
            <SectionHead
              eyebrow="Recent work"
              title="Projects that speak for themselves."
            />
            <Link to="/projects" className="btn btn--ghost-light">
              View all projects <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="project-row">
            {projects.slice(0, 4).map((p, i) => (
              <Reveal key={p.src} delay={i * 80}>
                <Link to="/projects" className="project-tile">
                  <img src={p.src} alt={p.title} loading="lazy" />
                  <div className="project-tile__info">
                    <small>{p.tag}</small>
                    <span>{p.title}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="How we work"
            title="A simple process, done properly."
          />
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90}>
                <span className="steps__num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Faq />

      {/* ---------- LOCATIONS ---------- */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Visit us"
            title="Three locations, closer to your site."
          />
          <div className="branch-grid">
            {branches.map((b, i) => (
              <Reveal key={b.id} delay={i * 80} className="branch-card">
                <span className="branch-card__icon">
                  <Icon name="pin" size={22} />
                </span>
                <small>{b.label}</small>
                <p>
                  {b.address}
                  <br />
                  {b.area}
                </p>
                <a
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    encodeURIComponent(b.map)
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions <Icon name="arrow" size={16} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
