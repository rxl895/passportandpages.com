/* Passport & Pages — site behaviour */

/* ---------------------------------------------------------------
   EDIT ME. This one array drives three things at once:
     · the pin on the interactive map
     · the highlighted country underneath it
     · the rubber stamp in the collection grid
   Add a line, and all three appear. `country` must match the map's
   country name (Natural Earth spelling, e.g. "United States of America").
   tone: "red" | "teal" | "gold" | "wish"  (wish = not been yet)
   --------------------------------------------------------------- */

const STAMPS = [
  { country: "Portugal",  code: "LIS", year: "2026", tone: "red",  city: "Lisbon",     lat:  38.72, lon:  -9.14, title: "Seven Hills, Six Espressos",        href: "entry.html" },
  { country: "Japan",     code: "KIX", year: "2025", tone: "teal", city: "Kyoto",      lat:  35.01, lon: 135.77, title: "The Art of Standing Still",         href: "entry.html" },
  { country: "Morocco",   code: "RAK", year: "2025", tone: "gold", city: "Marrakech",  lat:  31.63, lon:  -7.99, title: "Mint Tea & Other Negotiations",     href: "entry.html" },
  { country: "Iceland",   code: "KEF", year: "2025", tone: "teal", city: "Ring Road",  lat:  64.13, lon: -21.90, title: "1,332 km and No Radio",             href: "entry.html" },
  { country: "Argentina", code: "FTE", year: "2024", tone: "red",  city: "El Chaltén", lat: -49.33, lon: -72.89, title: "Walking Toward a Mountain",         href: "entry.html" },
  { country: "Vietnam",   code: "HAN", year: "2024", tone: "teal", city: "Hà Giang",   lat:  22.83, lon: 104.98, title: "The Loop, on a Bike I Couldn't Ride", href: "entry.html" },
  { country: "Italy",     code: "NAP", year: "2024", tone: "gold", city: "Naples",     lat:  40.85, lon:  14.27, title: "An Argument About Pizza",           href: "entry.html" },
  { country: "Peru",      code: "CUZ", year: "2023", tone: "red",  city: "Cusco",      lat: -13.53, lon: -71.97, title: "Altitude, and Other Things",        href: "entry.html" },
  { country: "Greece",    code: "JTR", year: "2023", tone: "teal", city: "Santorini",  lat:  36.39, lon:  25.46, title: "Blue Roofs, White Everything",      href: "entry.html" },
  { country: "Norway",    code: "TOS", year: "2023", tone: "gold", city: "Tromsø",     lat:  69.65, lon:  18.96, title: "Chasing a Light That Wouldn't Come", href: "entry.html" },
  { country: "Georgia",   code: "TBS", year: "2022", tone: "teal", city: "Tbilisi",    lat:  41.72, lon:  44.78, title: "Supra, and How to Survive One",     href: "entry.html" },
  { country: "Mexico",    code: "OAX", year: "2022", tone: "red",  city: "Oaxaca",     lat:  17.07, lon: -96.72, title: "Seven Moles, One Week",             href: "entry.html" },
  { country: "Mongolia",  code: "UBN", year: "—",    tone: "wish", city: "Ulaanbaatar",lat:  47.89, lon: 106.91, title: "" },
  { country: "Namibia",   code: "WDH", year: "—",    tone: "wish", city: "Windhoek",   lat: -22.56, lon:  17.08, title: "" },
];

/* ---------- helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- theme ---------- */
(() => {
  // the saved theme is applied by the inline <head> script, before first paint
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === "night"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "day" : "night";
    try { localStorage.setItem("pp-theme", root.dataset.theme); } catch (e) {}
  });
})();

/* ---------- mobile nav ---------- */
(() => {
  const burger = $("[data-burger]"), nav = $("#nav");
  if (!burger || !nav) return;
  burger.addEventListener("click", () => {
    const open = nav.dataset.open === "true";
    nav.dataset.open = String(!open);
    burger.setAttribute("aria-expanded", String(!open));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.dataset.open = "false"; burger.setAttribute("aria-expanded", "false"); }
  });
})();

/* ---------- scroll reveal ---------- */
(() => {
  const items = $$("[data-reveal]");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      io.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: .08 });
  items.forEach(i => io.observe(i));

  // safety net: nothing stays invisible, whatever the observer does
  setTimeout(() => items.forEach(i => i.classList.add("in")), 2500);
})();

/* ---------- interactive map ---------- */
(() => {
  const host = $("[data-map]");
  if (!host || !window.WORLD) return;

  const { w, h, countries } = window.WORLD;

  // must match the projection baked into world.js
  const LAT_MAX = 84, LAT_MIN = -57;
  const millerY = (lat) => 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * Math.PI / 180));
  const YT = millerY(LAT_MAX), YB = millerY(LAT_MIN);
  const project = (lon, lat) => ({
    x: ((lon + 180) / 360) * 100,
    y: ((YT - millerY(lat)) / (YT - YB)) * 100,
  });

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const mine = new Map(STAMPS.map((s) => [s.country, s]));

  const land = countries.map((c) => {
    const s = mine.get(c.n);
    const cls = s ? (s.tone === "wish" ? "c c--wish" : "c c--visited") : "c";
    const tag = s ? ` data-country="${esc(c.n)}"` : "";
    return `<path class="${cls}"${tag} d="${c.d}"><title>${esc(c.n)}</title></path>`;
  }).join("");

  let firstVisited = true;
  const pins = STAMPS.map((s) => {
    const p = project(s.lon, s.lat);
    const wish = s.tone === "wish";
    const edge = p.x > 74 ? " pin--edge-r" : p.x < 16 ? " pin--edge-l" : "";
    const latest = !wish && firstVisited ? ((firstVisited = false), " pin--latest") : "";
    const label = wish
      ? `${s.city}, ${s.country} — not been yet`
      : `${s.city}, ${s.country}, ${s.year}. Read: ${s.title}`;
    const body = wish
      ? `<span class="pin__soon">On the list</span>`
      : `<span class="pin__title">${esc(s.title)}</span><span class="pin__cta">Read the page →</span>`;
    const card =
      `<span class="pin__card"><span class="pin__where">${esc(s.city)}, ${esc(s.country)}</span>${body}</span>`;
    const t = wish ? "span" : "a";
    const href = wish ? "" : ` href="${esc(s.href)}"`;
    return `<${t} class="pin pin--${s.tone}${edge}${latest}"${href} data-country="${esc(s.country)}"` +
           ` style="left:${p.x.toFixed(2)}%;top:${p.y.toFixed(2)}%" aria-label="${esc(label)}">` +
           `<span class="pin__dot"></span>${card}</${t}>`;
  }).join("");

  host.innerHTML =
    `<svg class="map" viewBox="0 0 ${w} ${h}" role="img" ` +
    `aria-label="World map with a pin on every country visited">${land}</svg>${pins}`;
})();

/* ---------- hovering a stamp lights its pin and its country, and back ---------- */
(() => {
  let lit = [];
  const clear = () => { lit.forEach((el) => el.classList.remove("is-lit")); lit = []; };
  const light = (name) => {
    clear();
    if (!name) return;
    const sel = window.CSS && CSS.escape ? CSS.escape(name) : name.replace(/"/g, '\\"');
    lit = $$(`[data-country="${sel}"]`);
    lit.forEach((el) => el.classList.add("is-lit"));
  };
  const on = (e) => {
    const el = e.target.closest && e.target.closest("[data-country]");
    light(el && el.dataset.country);
  };
  document.addEventListener("mouseover", on);
  document.addEventListener("focusin", on);
  document.addEventListener("mouseleave", clear);
})();

/* ---------- stamp collection ---------- */
(() => {
  const grid = $("[data-stamps]");
  if (!grid) return;

  const stamp = (s, i) => {
    const id = `arc${i}`;
    const rot = (((i * 37) % 13) - 6).toFixed(1);      // deterministic tilt
    const cls = s.tone === "wish" ? "stamp--wish" : `stamp--${s.tone}`;
    const label = s.tone === "wish" ? "Someday" : "Arrived";
    return `
    <div class="stamp ${cls}" data-country="${s.country}" style="--rot:${rot}deg">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="${id}t" d="M16 60a44 44 0 0 1 88 0"/>
          <path id="${id}b" d="M20 60a40 40 0 0 0 80 0"/>
        </defs>
        <circle class="ink" cx="60" cy="60" r="52"/>
        <circle class="ink ink--dash" cx="60" cy="60" r="45"/>
        <text class="txt" font-size="10.5">
          <textPath href="#${id}t" startOffset="50%" text-anchor="middle">${s.country.toUpperCase()}</textPath>
        </text>
        <text class="txt" font-size="7.5" opacity=".7">
          <textPath href="#${id}b" startOffset="50%" text-anchor="middle">${label.toUpperCase()}</textPath>
        </text>
        <text class="txt" x="60" y="57"  font-size="17" text-anchor="middle" letter-spacing="1.5">${s.code}</text>
        <text class="txt" x="60" y="73"  font-size="9"  text-anchor="middle" opacity=".75">${s.year}</text>
        <line class="ink" x1="30" y1="63" x2="90" y2="63" stroke-width="1" opacity=".45"/>
      </svg>
      <span class="stamp__tip">${s.country} · ${s.year}</span>
    </div>`;
  };

  grid.innerHTML = STAMPS.map(stamp).join("");

  const visited = STAMPS.filter(s => s.tone !== "wish").length;
  $$("[data-stamp-count]").forEach((n) => (n.textContent = visited));
})();

/* ---------- journal filters ---------- */
(() => {
  const chips = $$("[data-filter]");
  if (!chips.length) return;
  const cards = $$("[data-region]");
  const empty = $("[data-empty]");

  chips.forEach(chip => chip.addEventListener("click", () => {
    const want = chip.dataset.filter;
    chips.forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
    let shown = 0;
    cards.forEach(card => {
      const hit = want === "all" || card.dataset.region === want;
      card.hidden = !hit;
      if (hit) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }));
})();

/* ---------- newsletter ---------- */
(() => {
  const form = $("[data-signup]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input").value.trim();
    if (!email) return;
    form.innerHTML = `<p class="form__ok">Consider it posted — first postcard lands soon. ✉</p>`;
  });
})();

/* ---------- footer year ---------- */
$$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
