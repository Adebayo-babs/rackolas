import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { company, whatsappLink } from "../config.js";
import Icon, { WhatsAppIcon } from "./Icons.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={"logo" + (light ? " logo--light" : "")}
      aria-label={company.name + " home"}
    >
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <path d="M4 20 20 6l16 14" className="lm-roof" />
          <path d="M10 18v16h20V18" className="lm-wall" />
          <path d="M20 22v12M14 27h12" className="lm-win" />
        </svg>
      </span>
      <span className="logo__text">
        <strong>RACKOLAS</strong>
        <small>Distinctive Limited</small>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={"header" + (scrolled ? " is-scrolled" : "")}>
      <div className="topbar">
        <div className="container topbar__inner">
          <span>
            <Icon name="clock" size={14} /> {company.hours}
          </span>
          <a
            href={whatsappLink("Hello Rackolas, I'd like to make an enquiry.")}
            target="_blank"
            rel="noreferrer"
            className="topbar__wa"
          >
            <WhatsAppIcon size={15} /> {company.whatsappDisplay}
          </a>
        </div>
      </div>

      <div className="container header__inner">
        <Logo />

        <nav
          className={"nav" + (open ? " is-open" : "")}
          aria-label="Main"
        >
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact#quote" className="btn btn--accent nav__cta">
            Get a free quote
          </Link>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
