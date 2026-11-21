import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studio } from "../data.js";
import Icon from "./Icons.jsx";
import { Reveal } from "./Shared.jsx";

/* Ground-floor and first-floor window positions */
const sideWindows = [150, 240, 500, 590];

function Window({ x, y, w, h, frame, glass }) {
  const mid = x + w / 2;
  return (
    <g>
      <rect
        x={x - 4}
        y={y - 4}
        width={w + 8}
        height={h + 8}
        rx="2"
        fill={frame}
        className="cs-anim"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={glass}
        className="cs-anim"
      />
      <path
        d={`M${x} ${y + h * 0.7} L${x + w * 0.6} ${y} H${x + w * 0.9}
            L${x} ${y + h}Z`}
        fill="#fff"
        opacity="0.22"
      />
      <rect
        x={mid - 2}
        y={y}
        width="4"
        height={h}
        fill={frame}
        className="cs-anim"
      />
      <rect
        x={x - 8}
        y={y + h + 4}
        width={w + 16}
        height="6"
        fill="#fff"
        opacity="0.9"
      />
    </g>
  );
}

function House({ roof, frame, glass, wall }) {
  return (
    <svg
      viewBox="0 0 800 520"
      className="cs-house"
      role="img"
      aria-label="Illustration of a building with the selected colours"
    >
      <defs>
        <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe3f3" />
          <stop offset="1" stopColor="#f6efe2" />
        </linearGradient>
        <pattern
          id="cs-tiles"
          width="26"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 13.5H26M0 0q6.5 9 13 0q6.5 9 13 0"
            fill="none"
            stroke="#000"
            strokeOpacity="0.28"
            strokeWidth="1.4"
          />
        </pattern>
        <linearGradient id="cs-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* sky & sun */}
      <rect width="800" height="520" fill="url(#cs-sky)" />
      <circle cx="680" cy="80" r="38" fill="#f6c46a" opacity="0.8" />
      <g fill="#fff" opacity="0.85">
        <ellipse cx="150" cy="80" rx="60" ry="16" />
        <ellipse cx="190" cy="68" rx="40" ry="16" />
        <ellipse cx="540" cy="120" rx="50" ry="12" />
      </g>

      {/* ground */}
      <rect y="470" width="800" height="50" fill="#9fb48a" />
      <rect y="470" width="800" height="8" fill="#7f9a6c" />
      <ellipse cx="400" cy="476" rx="330" ry="10" fill="#000" opacity="0.12" />

      {/* walls */}
      <rect
        x="120"
        y="232"
        width="560"
        height="238"
        fill={wall}
        className="cs-anim"
      />
      <rect x="120" y="232" width="560" height="238" fill="url(#cs-shade)" />
      <rect x="120" y="348" width="560" height="8" fill="#000" opacity="0.06" />

      {/* centre tower */}
      <rect
        x="320"
        y="214"
        width="160"
        height="256"
        fill={wall}
        className="cs-anim"
      />
      <rect x="320" y="214" width="160" height="256" fill="#000" opacity="0.04" />

      {/* main roof */}
      <polygon
        points="88,238 236,120 564,120 712,238"
        fill={roof}
        className="cs-anim"
      />
      <polygon points="88,238 236,120 564,120 712,238" fill="url(#cs-tiles)" />
      <polygon points="88,238 236,120 260,120 120,238" fill="#000" opacity="0.15" />
      <rect x="84" y="236" width="632" height="9" fill="#fff" />

      {/* tower gable roof */}
      <polygon
        points="300,222 400,134 500,222"
        fill={roof}
        className="cs-anim"
      />
      <polygon points="300,222 400,134 500,222" fill="url(#cs-tiles)" />
      <polygon points="300,222 400,134 400,222" fill="#fff" opacity="0.08" />
      <path d="M296 224 400 132 504 224" fill="none" stroke="#fff" strokeWidth="7" />
      <circle cx="400" cy="186" r="13" fill={glass} stroke={frame} strokeWidth="5" className="cs-anim" />

      {/* first floor windows */}
      {sideWindows.map((x) => (
        <Window key={"u" + x} x={x} y={262} w={60} h={70} frame={frame} glass={glass} />
      ))}
      <Window x={350} y={246} w={100} h={84} frame={frame} glass={glass} />

      {/* balcony handrail */}
      <g className="cs-anim">
        <rect x="334" y="338" width="132" height="6" rx="2" fill={frame} />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x={340 + i * 11}
            y="344"
            width="3"
            height="22"
            fill={frame}
          />
        ))}
        <rect x="330" y="366" width="140" height="5" fill="#fff" />
      </g>

      {/* ground floor windows */}
      {sideWindows.map((x) => (
        <Window key={"g" + x} x={x} y={380} w={60} h={62} frame={frame} glass={glass} />
      ))}

      {/* door */}
      <rect x="360" y="384" width="80" height="86" fill={frame} className="cs-anim" />
      <rect x="366" y="390" width="32" height="80" fill={glass} className="cs-anim" />
      <rect x="402" y="390" width="32" height="80" fill={glass} className="cs-anim" />
      <rect x="392" y="425" width="3" height="16" fill="#fff" />
      <rect x="405" y="425" width="3" height="16" fill="#fff" />
      <rect x="350" y="466" width="100" height="6" fill="#d9d4c8" />

      {/* plants */}
      <g fill="#5c8a4d">
        <circle cx="110" cy="458" r="18" />
        <circle cx="132" cy="462" r="13" />
        <circle cx="690" cy="458" r="18" />
        <circle cx="668" cy="462" r="13" />
      </g>
    </svg>
  );
}

function Swatches({ label, options, value, onChange }) {
  return (
    <fieldset className="cs-group">
      <legend>
        {label}
        <span>{value.name}</span>
      </legend>
      <div className="cs-swatches">
        {options.map((o) => (
          <button
            key={o.name}
            type="button"
            title={o.name}
            aria-label={label + ": " + o.name}
            aria-pressed={o.name === value.name}
            className={o.name === value.name ? "is-active" : ""}
            style={{ "--sw": o.hex }}
            onClick={() => onChange(o)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default function ColourStudio() {
  const navigate = useNavigate();
  const [roof, setRoof] = useState(studio.roof[1]);
  const [frame, setFrame] = useState(studio.frame[0]);
  const [glass, setGlass] = useState(studio.glass[2]);
  const [wall, setWall] = useState(studio.wall[0]);

  function sendCombo() {
    const message =
      "I like this combination from your Colour Studio:\n" +
      `Roof: ${roof.name}\nWindow frames: ${frame.name}\n` +
      `Glass: ${glass.name}\nWalls: ${wall.name}\n\n` +
      "My project: ";
    navigate("/contact#quote", { state: { message } });
  }

  return (
    <section className="section studio" id="colour-studio">
      <div className="container studio__grid">
        <div className="studio__intro">
          <Reveal>
            <span className="eyebrow eyebrow--light">Colour Studio</span>
            <h2>See your building before we build it.</h2>
            <p>
              Mix roof, frame, glass and wall colours to find a
              finish you love. When you're happy, send it to us
              with your quote request.
            </p>
          </Reveal>

          <div className="studio__controls">
            <Swatches label="Roof tiles" options={studio.roof} value={roof} onChange={setRoof} />
            <Swatches label="Window frames" options={studio.frame} value={frame} onChange={setFrame} />
            <Swatches label="Glass" options={studio.glass} value={glass} onChange={setGlass} />
            <Swatches label="Walls" options={studio.wall} value={wall} onChange={setWall} />
          </div>

          <button className="btn btn--accent btn--lg" onClick={sendCombo}>
            Quote me this look <Icon name="arrow" size={18} />
          </button>
        </div>

        <Reveal className="studio__canvas" delay={120}>
          <House roof={roof.hex} frame={frame.hex} glass={glass.hex} wall={wall.hex} />
          <p className="studio__note">
            Illustration only. Exact shades vary by manufacturer;
            we bring real samples to your site visit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
