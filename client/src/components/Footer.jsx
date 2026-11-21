import { Link } from "react-router-dom";
import { branches, company, whatsappLink } from "../config.js";
import { services } from "../data.js";
import { Logo } from "./Header.jsx";
import Icon, { WhatsAppIcon } from "./Icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__tag">“{company.tagline}.”</p>
          <p className="footer__contact">
            <a
              href={whatsappLink("Hello Rackolas")}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={16} /> {company.whatsappDisplay}
            </a>
            <a href={"mailto:" + company.email}>
              <Icon name="mail" size={16} /> {company.email}
            </a>
          </p>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={"/services#" + s.slug}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/contact#quote">Request a quote</Link></li>
          </ul>
        </div>

        <div>
          <h4>Our offices</h4>
          <ul className="footer__branches">
            {branches.map((b) => (
              <li key={b.id}>
                <span>{b.label}</span>
                {b.address} {b.area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>
          © {year} {company.name}. All rights reserved.
        </span>
        <span>Roofing · Aluminium · Ceilings · Handrails</span>
      </div>
    </footer>
  );
}
