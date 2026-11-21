import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { company, whatsappLink } from "../config.js";
import { faqs, heroWords } from "../data.js";
import Icon, { WhatsAppIcon } from "./Icons.jsx";
import { Reveal, SectionHead } from "./Shared.jsx";

/* ---------- Opening animation (once per visit) ---------- */
export function Preloader() {
  const [state, setState] = useState(() => {
    try {
      return sessionStorage.getItem("rk-seen") ? "gone" : "show";
    } catch {
      return "show";
    }
  });

  useEffect(() => {
    if (state !== "show") return;
    try {
      sessionStorage.setItem("rk-seen", "1");
    } catch {
      /* storage unavailable */
    }
    const t1 = setTimeout(() => setState("leave"), 1500);
    const t2 = setTimeout(() => setState("gone"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [state]);

  if (state === "gone") return null;

  return (
    <div className={"preloader" + (state === "leave" ? " is-leaving" : "")}>
      <svg viewBox="0 0 120 100" width="120" height="100">
        <path className="pl-roof" d="M10 50 60 12l50 38" />
        <path className="pl-wall" d="M26 44v46h68V44" />
        <path className="pl-win" d="M60 58v32M44 72h32" />
      </svg>
      <strong>RACKOLAS</strong>
      <small>Distinctive Limited</small>
    </div>
  );
}

/* ---------- Thin progress bar while scrolling ---------- */
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${pct})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}

/* ---------- Rotating word in the hero ---------- */
export function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((n) => (n + 1) % heroWords.length),
      2200
    );
    return () => clearInterval(id);
  }, []);
  return (
    <span className="rotator" aria-live="polite">
      <span key={i} className="rotator__word">
        {heroWords[i]}
      </span>
    </span>
  );
}

/* ---------- Video that plays only while on screen ---------- */
export function AutoVideo({ src, poster, className, controls }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
    />
  );
}

/* ---------- On-site video showcase ---------- */
export function VideoShowcase() {
  return (
    <section className="section showcase">
      <div className="container showcase__grid">
        <Reveal className="showcase__phone">
          <AutoVideo
            src="/videos/site-walkthrough.mp4"
            poster="/videos/walk-poster.webp"
            controls
          />
          <span className="showcase__live">
            <i /> On site
          </span>
        </Reveal>
        <div>
          <SectionHead
            eyebrow="Watch our work"
            title="Walk through a finished Rackolas site."
            text={
              "Real footage from one of our residential projects " +
              "in Lagos: stone-coated roofing across multiple " +
              "blocks and aluminium windows on every floor."
            }
          />
          <ul className="check-list">
            <li><Icon name="check" size={18} /> Clean, straight roof lines</li>
            <li><Icon name="check" size={18} /> Neatly sealed window frames</li>
            <li><Icon name="check" size={18} /> Finished to the same standard on every block</li>
          </ul>
          <div className="hero__actions">
            <Link to="/projects" className="btn btn--outline">
              See more projects <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ accordion ---------- */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container faq">
        <div>
          <SectionHead
            eyebrow="FAQ"
            title="Questions clients often ask."
            text="Can't find your answer? Send us a message on WhatsApp."
          />
          <a
            className="btn btn--whatsapp"
            href={whatsappLink("Hello Rackolas, I have a question.")}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={18} /> Ask on WhatsApp
          </a>
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={"faq__item" + (isOpen ? " is-open" : "")}>
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {f.q}
                  <span className="faq__plus" aria-hidden="true" />
                </button>
                <div className="faq__answer">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sticky action bar on phones ---------- */
export function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick contact">
      <a href={company.phoneHref}>
        <Icon name="phone" size={20} />
        Call
      </a>
      <a
        href={whatsappLink("Hello Rackolas, I'd like to make an enquiry.")}
        target="_blank"
        rel="noreferrer"
        className="is-wa"
      >
        <WhatsAppIcon size={20} />
        WhatsApp
      </a>
      <Link to="/contact#quote" className="is-quote">
        <Icon name="arrow" size={20} />
        Free quote
      </Link>
    </nav>
  );
}
