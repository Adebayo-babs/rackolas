import { useEffect, useMemo, useState } from "react";
import { projects } from "../data.js";
import Icon from "../components/Icons.jsx";
import {
  CtaBand,
  PageHero,
  Reveal,
  usePageTitle,
} from "../components/Shared.jsx";

const filters = ["All", "Roofing", "Windows"];

export default function Projects() {
  usePageTitle("Our Projects");
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const list = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.tag.includes(filter)),
    [filter]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((a) => (a + 1) % list.length);
      if (e.key === "ArrowLeft")
        setActive((a) => (a - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, list.length]);

  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title="Work we are proud to put our name on."
        text="A selection of recent roofing and aluminium projects."
        image="/images/maranatha.webp"
      />

      <section className="section">
        <div className="container">
          <div className="filters" role="tablist">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? "is-active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="gallery">
            {list.map((p, i) => (
              <Reveal key={p.src} delay={(i % 4) * 70}>
                <button
                  className="project-tile"
                  onClick={() => setActive(i)}
                  aria-label={"View " + p.title}
                >
                  <img src={p.src} alt={p.title} loading="lazy" />
                  <div className="project-tile__info">
                    <small>{p.tag}</small>
                    <span>{p.title}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {active !== null && list[active] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            className="lightbox__close"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <Icon name="close" />
          </button>
          <button
            className="lightbox__nav is-prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active - 1 + list.length) % list.length);
            }}
          >
            <Icon name="arrow" />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={list[active].src} alt={list[active].title} />
            <figcaption>
              <strong>{list[active].title}</strong>
              <span>{list[active].tag}</span>
            </figcaption>
          </figure>
          <button
            className="lightbox__nav"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active + 1) % list.length);
            }}
          >
            <Icon name="arrow" />
          </button>
        </div>
      )}

      <CtaBand />
    </>
  );
}
