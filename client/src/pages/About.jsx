import { company } from "../config.js";
import { steps, values } from "../data.js";
import Icon from "../components/Icons.jsx";
import {
  CtaBand,
  PageHero,
  Reveal,
  SectionHead,
  usePageTitle,
} from "../components/Shared.jsx";

export default function About() {
  usePageTitle("About Us");

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Building beauty into every structure."
        text={company.tagline + "."}
        image="/images/dusk-complex.webp"
      />

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Who we are"
              title="A Lagos company with a passion for finishing well."
            />
            <Reveal className="prose">
              <p>
                {company.name} is a roofing and aluminium works
                company serving homeowners, developers and
                businesses in Lagos and Ogun State. From our head
                office in Surulere, our workshop in Aluminium
                Village and our Ogun State branch, we deliver
                finishing works that make buildings stand out.
              </p>
              <p>
                Our name stands for distinction. We are guided by
                the belief that it is the finger of God that
                beautifies structure, and we bring that same
                spirit of excellence and honesty to every job,
                large or small.
              </p>
              <p>
                Whether it is a new estate, a commercial building
                or a single home, you get one dependable team for
                roofing, partitions, doors and windows, ceilings
                and handrails.
              </p>
            </Reveal>
          </div>
          <Reveal className="split__media">
            <img
              src="/images/roof-wide.webp"
              alt="Roofing works on an apartment complex"
            />
            <img
              src="/images/tower-final.webp"
              alt="Finished roof and windows"
              className="split__media-sm"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="mv-grid">
            <Reveal className="mv-card">
              <span className="eyebrow">Our mission</span>
              <p>
                To deliver durable, beautiful roofing and
                aluminium works through skilled craftsmanship,
                quality materials and honest service.
              </p>
            </Reveal>
            <Reveal className="mv-card mv-card--dark" delay={100}>
              <span className="eyebrow eyebrow--light">Our vision</span>
              <p>
                To be the most trusted name for building
                finishing works in Nigeria, known for quality
                that lasts.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="What we stand for"
            title="Our promise on every project."
          />
          <div className="value-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="value-card">
                <span className="value-list__tick">
                  <Icon name="check" size={18} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHead
            center
            eyebrow="How we work"
            title="From first call to final handover."
          />
          <ol className="steps steps--dark">
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

      <CtaBand />
    </>
  );
}
