// ------------------------------------------------------------
// Company details — edit everything about the business here.
// Phone, email and WhatsApp were not provided by the client:
// replace the placeholder values before going live.
// ------------------------------------------------------------

export const company = {
  name: "Rackolas Distinctive Limited",
  shortName: "Rackolas",
  tagline: "Where the finger of God beautifies structure",
  phone: "+234 803 956 0473",
  phoneHref: "tel:+2348039560473",
  whatsapp: "2348039560473", // digits only, no +
  whatsappDisplay: "+234 803 956 0473",
  email: "info@rackolas.com", // TODO: client's real email
  hours: "Mon – Sat, 8:00am – 6:00pm",
};

export const branches = [
  {
    id: "surulere",
    label: "Head Office",
    address: "64, Alhaji Basorun Street,",
    area: "Off Dopemu, Surulere, Lagos",
    map: "64 Alhaji Basorun Dopemu Lagos Nigeria",
  },
  {
    id: "aluminium-village",
    label: "Workshop & Showroom",
    address: "16, Adebiyi Ayopo Street,",
    area: "Aluminium Village, Lagos",
    map: "Aluminium Village Dopemu Lagos Nigeria",
  },
  {
    id: "ogun",
    label: "Ogun State Branch",
    address: "103, Ejigun Agbede,",
    area: "Ogun State",
    map: "Agbede Ogun State Nigeria",
  },
];

export const mapEmbed = (query) =>
  "https://maps.google.com/maps?q=" +
  encodeURIComponent(query) +
  "&z=14&output=embed";

export const whatsappLink = (text = "") =>
  `https://wa.me/${company.whatsapp}` +
  (text ? `?text=${encodeURIComponent(text)}` : "");
