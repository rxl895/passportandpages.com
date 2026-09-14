/* Passport & Pages — site behaviour */

/* ---------------------------------------------------------------
   PLACES. One line here gives you three things at once:
     · the pin on the interactive map
     · the highlighted country underneath it
     · the rubber stamp in the collection grid
   `country` must match the map's country name (Natural Earth
   spelling, e.g. "United States of America").
   tone: "red" | "teal" | "gold" | "wish"  (wish = not been yet)
   --------------------------------------------------------------- */

const STAMPS = [
  { country: "Portugal",  code: "LIS", year: "2026", tone: "red",  city: "Lisbon",      lat:  38.72, lon:  -9.14 },
  { country: "Japan",     code: "KIX", year: "2025", tone: "teal", city: "Kyoto",       lat:  35.01, lon: 135.77 },
  { country: "Morocco",   code: "RAK", year: "2025", tone: "gold", city: "Marrakech",   lat:  31.63, lon:  -7.99 },
  { country: "Iceland",   code: "KEF", year: "2025", tone: "teal", city: "Ring Road",   lat:  64.13, lon: -21.90 },
  { country: "Argentina", code: "FTE", year: "2025", tone: "red",  city: "El Chaltén",  lat: -49.33, lon: -72.89 },
  { country: "Vietnam",   code: "HAN", year: "2024", tone: "teal", city: "Hà Giang",    lat:  22.83, lon: 104.98 },
  { country: "Italy",     code: "NAP", year: "2024", tone: "gold", city: "Naples",      lat:  40.85, lon:  14.27 },
  { country: "Norway",    code: "TOS", year: "2023", tone: "gold", city: "Tromsø",      lat:  69.65, lon:  18.96 },
  { country: "Peru",      code: "CUZ", year: "2023", tone: "red",  city: "Cusco",       lat: -13.53, lon: -71.97 },
  { country: "Greece",    code: "JTR", year: "2023", tone: "teal", city: "Santorini",   lat:  36.39, lon:  25.46 },
  { country: "Georgia",   code: "TBS", year: "2022", tone: "teal", city: "Tbilisi",     lat:  41.72, lon:  44.78 },
  { country: "Mexico",    code: "OAX", year: "2022", tone: "red",  city: "Oaxaca",      lat:  17.07, lon: -96.72 },
  { country: "Mongolia",  code: "UBN", year: "—",    tone: "wish", city: "Ulaanbaatar", lat:  47.89, lon: 106.91 },
  { country: "Namibia",   code: "WDH", year: "—",    tone: "wish", city: "Windhoek",    lat: -22.56, lon:  17.08 },
];

/* ---------------------------------------------------------------
   ENTRIES. Every written page, newest first. Add one line and it
   appears on the home page, in the journal, on its country's page,
   and as a "related" card at the foot of neighbouring entries.
     region : europe | asia | africa | americas  (journal filters)
     img    : a filename in assets/img/ without the .svg
     pick   : optional — why a newcomer should start here. Entries
              with a `pick` are the ones featured on start-here.html
   --------------------------------------------------------------- */

const ENTRIES = [
  { title: "Seven Hills, Six Espressos", href: "entry.html",
    country: "Portugal", city: "Lisbon", date: "2026-03-14", mins: 6,
    region: "europe", img: "lisbon",
    blurb: "Four days of climbing, one tram I never caught, and a pastry that genuinely rearranged my afternoon.",
    pick: "The shortest way to hear what this journal sounds like." },

  { title: "The Art of Standing Still", href: "entry.html",
    country: "Japan", city: "Kyoto", date: "2025-11-02", mins: 8,
    region: "asia", img: "kyoto",
    blurb: "Eleven days in a country built for looking closely, and what happened when I finally put the camera away.",
    pick: "The one that changed how I travel, not just where." },

  { title: "Mint Tea & Other Negotiations", href: "entry.html",
    country: "Morocco", city: "Marrakech", date: "2025-09-19", mins: 7,
    region: "africa", img: "marrakech",
    blurb: "The souk is not a shop, it's a conversation. Three days learning to have it badly, then slightly better." },

  { title: "1,332 km and No Radio", href: "entry.html",
    country: "Iceland", city: "Ring Road", date: "2025-06-27", mins: 9,
    region: "europe", img: "reykjavik",
    blurb: "A rented hatchback, a broken aux cable, and the strange peace of driving somewhere that never gets dark.",
    pick: "Longest drive, fewest words, best silence." },

  { title: "Walking Toward a Mountain That Kept Moving", href: "entry.html",
    country: "Argentina", city: "El Chaltén", date: "2025-02-08", mins: 11,
    region: "americas", img: "patagonia",
    blurb: "Patagonia hides its best view behind weather. I waited four days. It was worth three.",
    pick: "The one that took the most patience and gave back the most." },

  { title: "The Loop, on a Bike I Could Not Ride", href: "entry.html",
    country: "Vietnam", city: "Hà Giang", date: "2024-10-21", mins: 10,
    region: "asia", img: "kyoto",
    blurb: "Three hundred kilometres of switchbacks with a clutch hand I did not have on day one." },

  { title: "An Argument About Pizza, Won by Everyone", href: "entry.html",
    country: "Italy", city: "Naples", date: "2024-05-30", mins: 5,
    region: "europe", img: "lisbon",
    blurb: "Naples doesn't do the polite version of anything, and the city is better for it." },

  { title: "Chasing a Light That Wouldn't Come", href: "entry.html",
    country: "Norway", city: "Tromsø", date: "2023-11-18", mins: 8,
    region: "europe", img: "reykjavik",
    blurb: "Six nights of cloud, one clear hour, and a lesson about what you actually travel for." },

  { title: "Altitude, and Other Things I Underestimated", href: "entry.html",
    country: "Peru", city: "Cusco", date: "2023-08-12", mins: 9,
    region: "americas", img: "patagonia",
    blurb: "Coca tea, slow stairs, and the humbling arithmetic of 3,400 metres." },

  { title: "Blue Roofs, White Everything", href: "entry.html",
    country: "Greece", city: "Santorini", date: "2023-07-05", mins: 6,
    region: "europe", img: "lisbon",
    blurb: "A island that has been photographed to death and somehow still knocks the wind out of you." },

  { title: "Supra, and How to Survive One", href: "entry.html",
    country: "Georgia", city: "Tbilisi", date: "2022-09-24", mins: 7,
    region: "asia", img: "kyoto",
    blurb: "Eleven toasts in, a stranger explained his entire family to me. I understood none of it and all of it." },

  { title: "Seven Moles, One Week", href: "entry.html",
    country: "Mexico", city: "Oaxaca", date: "2022-04-16", mins: 6,
    region: "americas", img: "marrakech",
    blurb: "I went for the food and stayed for the funerals, the fireworks and the nine-hour market days." },
];

/* ---------- helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const esc = (t) => String(t).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${+d} ${MONTHS[+m - 1]} ${y}`;
};

const entriesFor = (country) => ENTRIES.filter((e) => e.country === country);

const cardHTML = (e, i = 0) => `
  <article class="card" data-region="${e.region}" data-country="${esc(e.country)}"
           data-reveal style="--d:${((i % 3) * 0.07).toFixed(2)}s">
    <a class="card__media stretch" href="${esc(e.href)}">
      <span class="card__tag">${esc(e.country)}</span>
      <img src="assets/img/${esc(e.img)}.svg" alt="" loading="lazy" width="800" height="600">
    </a>
    <div class="card__body">
      <p class="meta">${esc(e.city)} <i>·</i> ${fmtDate(e.date)} <i>·</i> ${e.mins} min</p>
      <h3>${esc(e.title)}</h3>
      <p>${esc(e.blurb)}</p>
    </div>
  </article>`;

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
    if (e.target.tagName === "A") {
      nav.dataset.open = "false";
      burger.setAttribute("aria-expanded", "false");
    }
  });
})();

/* ---------- projection (shared by the world map and country maps) ---------- */
const MAPPROJ = (() => {
  const LAT_MAX = 84, LAT_MIN = -57;
  const millerY = (lat) => 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * Math.PI / 180));
  const YT = millerY(LAT_MAX), YB = millerY(LAT_MIN);
  return {
    // absolute units inside the world.js viewBox
    px: (lon, w) => ((lon + 180) / 360) * w,
    py: (lat, h) => ((YT - millerY(lat)) / (YT - YB)) * h,
  };
})();

/* ---------- home + journal listings ---------- */
(() => {
  const home = $("[data-latest]");
  if (home) {
    const n = +(home.dataset.latest || 3);
    // skip the featured entry, which already has its own boarding pass
    home.innerHTML = ENTRIES.slice(1, 1 + n).map(cardHTML).join("");
  }

  const all = $("[data-all-entries]");
  if (all) all.innerHTML = ENTRIES.map(cardHTML).join("");

  $$("[data-entry-count]").forEach((el) => (el.textContent = ENTRIES.length));
})();

/* ---------- interactive world map ---------- */
(() => {
  const host = $("[data-map]");
  if (!host || !window.WORLD) return;

  const { w, h, countries } = window.WORLD;
  const mine = new Map(STAMPS.map((s) => [s.country, s]));

  const land = countries.map((c) => {
    const s = mine.get(c.n);
    const cls = s ? (s.tone === "wish" ? "c c--wish" : "c c--visited") : "c";
    const tag = s ? ` data-country="${esc(c.n)}"` : "";
    return `<path class="${cls}"${tag} d="${c.d}"><title>${esc(c.n)}</title></path>`;
  }).join("");

  let firstVisited = true;
  const pins = STAMPS.map((s) => {
    const x = (MAPPROJ.px(s.lon, w) / w) * 100;
    const y = (MAPPROJ.py(s.lat, h) / h) * 100;
    const wish = s.tone === "wish";
    const posts = entriesFor(s.country);
    const edge = x > 74 ? " pin--edge-r" : x < 16 ? " pin--edge-l" : "";
    const latest = !wish && firstVisited ? ((firstVisited = false), " pin--latest") : "";
    const n = posts.length;
    const label = wish
      ? `${s.city}, ${s.country} — not been yet`
      : `${s.country}: ${n} ${n === 1 ? "entry" : "entries"}`;
    const body = wish
      ? `<span class="pin__soon">On the list</span>`
      : `<span class="pin__title">${esc(posts[0] ? posts[0].title : s.country)}</span>` +
        `<span class="pin__cta">Open ${esc(s.country)} →</span>`;
    const card =
      `<span class="pin__card"><span class="pin__where">${esc(s.city)}, ${esc(s.country)}</span>${body}</span>`;
    const t = wish ? "span" : "a";
    const href = wish ? "" : ` href="place.html?c=${encodeURIComponent(s.country)}"`;
    return `<${t} class="pin pin--${s.tone}${edge}${latest}"${href} data-country="${esc(s.country)}"` +
           ` style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%" aria-label="${esc(label)}">` +
           `<span class="pin__dot"></span>${card}</${t}>`;
  }).join("");

  host.innerHTML =
    `<svg class="map" viewBox="0 0 ${w} ${h}" role="img" ` +
    `aria-label="World map with a pin on every country visited">${land}</svg>${pins}`;
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
    const inner = `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="${id}t" d="M16 60a44 44 0 0 1 88 0"/>
          <path id="${id}b" d="M20 60a40 40 0 0 0 80 0"/>
        </defs>
        <circle class="ink" cx="60" cy="60" r="52"/>
        <circle class="ink ink--dash" cx="60" cy="60" r="45"/>
        <text class="txt" font-size="10.5">
          <textPath href="#${id}t" startOffset="50%" text-anchor="middle">${esc(s.country.toUpperCase())}</textPath>
        </text>
        <text class="txt" font-size="7.5" opacity=".7">
          <textPath href="#${id}b" startOffset="50%" text-anchor="middle">${label.toUpperCase()}</textPath>
        </text>
        <text class="txt" x="60" y="57" font-size="17" text-anchor="middle" letter-spacing="1.5">${esc(s.code)}</text>
        <text class="txt" x="60" y="73" font-size="9" text-anchor="middle" opacity=".75">${esc(s.year)}</text>
        <line class="ink" x1="30" y1="63" x2="90" y2="63" stroke-width="1" opacity=".45"/>
      </svg>
      <span class="stamp__tip">${esc(s.country)} · ${esc(s.year)}</span>`;

    const wish = s.tone === "wish";
    const t = wish ? "div" : "a";
    const href = wish ? "" : ` href="place.html?c=${encodeURIComponent(s.country)}"`;
    return `<${t} class="stamp ${cls}"${href} data-country="${esc(s.country)}" style="--rot:${rot}deg">${inner}</${t}>`;
  };

  grid.innerHTML = STAMPS.map(stamp).join("");

  const visited = STAMPS.filter((s) => s.tone !== "wish").length;
  $$("[data-stamp-count]").forEach((n) => (n.textContent = visited));
})();

/* ---------- country page (place.html?c=Portugal) ---------- */
(() => {
  const host = $("[data-place]");
  if (!host) return;

  const want = new URLSearchParams(location.search).get("c") || "";
  const visited = STAMPS.filter((s) => s.tone !== "wish");
  const idx = visited.findIndex((s) => s.country.toLowerCase() === want.toLowerCase());

  if (idx === -1) {
    host.innerHTML = `
      <div class="wrap place-miss">
        <p class="kicker">Not on the map</p>
        <h1>No stamp for that one.</h1>
        <p>Either I haven't been yet, or the link has a typo in it.</p>
        <p><a class="btn btn--solid" href="index.html#stamps">See the whole collection <span class="arw">→</span></a></p>
      </div>`;
    return;
  }

  const s = visited[idx];
  const posts = entriesFor(s.country);
  const prev = visited[(idx - 1 + visited.length) % visited.length];
  const next = visited[(idx + 1) % visited.length];
  const years = posts.map((p) => p.date.slice(0, 4));
  const span = years.length
    ? (years[0] === years[years.length - 1] ? years[0] : `${years[years.length - 1]}–${years[0]}`)
    : s.year;

  document.title = `${s.country} — Passport & Pages`;

  /* a zoomed map of just this country, cropped from the same world data */
  let miniMap = "";
  if (window.WORLD) {
    const { w, h, countries } = window.WORLD;
    const me = countries.find((c) => c.n === s.country);
    if (me) {
      const nums = me.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (let i = 0; i + 1 < nums.length; i += 2) {
        const x = nums[i], y = nums[i + 1];
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
      // frame it as a wide band, with padding, never zoomed past a sane minimum
      const A = 2.4;                                  // viewBox aspect ratio
      const vh = Math.max(y1 - y0, (x1 - x0) / A, 7) * 1.45;
      const vw = vh * A;
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const land = countries.map((c) =>
        `<path class="c${c.n === s.country ? " c--here" : ""}" d="${c.d}"/>`).join("");
      const px = MAPPROJ.px(s.lon, w), py = MAPPROJ.py(s.lat, h);
      miniMap = `
        <div class="minimap" data-reveal>
          <svg viewBox="${(cx - vw / 2).toFixed(1)} ${(cy - vh / 2).toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}"
               role="img" aria-label="Map showing ${esc(s.country)}">
            ${land}
            <circle class="minipin__ring" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(vh * 0.075).toFixed(2)}"/>
            <circle class="minipin" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(vh * 0.037).toFixed(2)}"/>
          </svg>
          <p class="minimap__cap">${esc(s.city)} · ${s.lat.toFixed(2)}°, ${s.lon.toFixed(2)}°</p>
        </div>`;
    }
  }

  const n = posts.length;
  host.innerHTML = `
    <section class="place-hero wrap">
      <p class="kicker"><a href="index.html#stamps">The collection</a></p>
      <div class="place-hero__grid">
        <div>
          <h1>${esc(s.country)}</h1>
          <p class="place-hero__meta">
            ${n} ${n === 1 ? "page" : "pages"} <i>·</i> ${esc(span)} <i>·</i> ${esc(s.city)} <i>·</i> ${esc(s.code)}
          </p>
        </div>
        <div class="place-hero__stamp" data-stamps-one></div>
      </div>
    </section>

    ${miniMap ? `<section class="wrap">${miniMap}</section>` : ""}

    <section class="section wrap">
      <div class="sec-head">
        <div>
          <p class="kicker">From ${esc(s.country)}</p>
          <h2>${n === 1 ? "The page" : "The pages"}</h2>
        </div>
        <a class="link-more" href="journal.html">Whole journal <span>→</span></a>
      </div>
      <div class="cards">${posts.map(cardHTML).join("")}</div>
    </section>

    <section class="wrap">
      <nav class="place-nav" aria-label="Other countries">
        <a class="place-nav__side" href="place.html?c=${encodeURIComponent(prev.country)}">
          <span>Previous stamp</span><b>← ${esc(prev.country)}</b>
        </a>
        <a class="place-nav__mid" href="index.html#stamps">All ${visited.length} countries</a>
        <a class="place-nav__side place-nav__side--r" href="place.html?c=${encodeURIComponent(next.country)}">
          <span>Next stamp</span><b>${esc(next.country)} →</b>
        </a>
      </nav>
    </section>`;

  const one = $("[data-stamps-one]");
  if (one) one.innerHTML = renderSingleStamp(s);
})();

/* one stamp, rendered standalone (used on country pages) */
function renderSingleStamp(s) {
  const id = "arcone";
  return `
    <div class="stamp stamp--${s.tone}" style="--rot:-5deg">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="${id}t" d="M16 60a44 44 0 0 1 88 0"/>
          <path id="${id}b" d="M20 60a40 40 0 0 0 80 0"/>
        </defs>
        <circle class="ink" cx="60" cy="60" r="52"/>
        <circle class="ink ink--dash" cx="60" cy="60" r="45"/>
        <text class="txt" font-size="10.5">
          <textPath href="#${id}t" startOffset="50%" text-anchor="middle">${esc(s.country.toUpperCase())}</textPath>
        </text>
        <text class="txt" font-size="7.5" opacity=".7">
          <textPath href="#${id}b" startOffset="50%" text-anchor="middle">ARRIVED</textPath>
        </text>
        <text class="txt" x="60" y="57" font-size="17" text-anchor="middle" letter-spacing="1.5">${esc(s.code)}</text>
        <text class="txt" x="60" y="73" font-size="9" text-anchor="middle" opacity=".75">${esc(s.year)}</text>
        <line class="ink" x1="30" y1="63" x2="90" y2="63" stroke-width="1" opacity=".45"/>
      </svg>
    </div>`;
}

/* ---------- start here: the handpicked entries ---------- */
(() => {
  const host = $("[data-picks]");
  if (!host) return;
  const picks = ENTRIES.filter((e) => e.pick);
  host.innerHTML = picks.map((e, i) => `
    <article class="pick" data-reveal style="--d:${(i * 0.08).toFixed(2)}s">
      <a class="pick__media" href="${esc(e.href)}">
        <img src="assets/img/${esc(e.img)}.svg" alt="" loading="lazy" width="800" height="600">
      </a>
      <div class="pick__body">
        <p class="meta">${esc(e.country)} <i>·</i> ${fmtDate(e.date)} <i>·</i> ${e.mins} min</p>
        <h3><a href="${esc(e.href)}">${esc(e.title)}</a></h3>
        <p class="pick__why">${esc(e.pick)}</p>
      </div>
    </article>`).join("");
})();

/* ---------- related entries at the foot of a post ---------- */
(() => {
  const host = $("[data-related]");
  if (!host) return;
  const here = host.dataset.related;                    // this entry's title
  const me = ENTRIES.find((e) => e.title === here) || ENTRIES[0];

  // same continent first, then most recent, never the entry you're reading
  const rest = ENTRIES.filter((e) => e.title !== me.title);
  rest.sort((a, b) => {
    const ra = a.region === me.region ? 0 : 1;
    const rb = b.region === me.region ? 0 : 1;
    return ra - rb || b.date.localeCompare(a.date);
  });
  host.innerHTML = rest.slice(0, 3).map(cardHTML).join("");
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

/* ---------- journal filters ---------- */
(() => {
  const chips = $$("[data-filter]");
  if (!chips.length) return;
  const empty = $("[data-empty]");

  chips.forEach((chip) => chip.addEventListener("click", () => {
    const want = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    let shown = 0;
    $$("[data-region]").forEach((card) => {
      const hit = want === "all" || card.dataset.region === want;
      card.hidden = !hit;
      if (hit) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }));
})();

/* ---------- newsletter ---------- */
(() => {
  $$("[data-signup]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value.trim();
      if (!email) return;
      form.innerHTML = `<p class="form__ok">Consider it posted — first postcard lands soon. ✉</p>`;
    });
  });
})();

/* ---------- footer year ---------- */
$$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---------- scroll reveal (last: everything above is in the DOM by now) ---------- */
(() => {
  const items = $$("[data-reveal]");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      io.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: .08 });
  items.forEach((i) => io.observe(i));

  // safety net: nothing stays invisible, whatever the observer does
  setTimeout(() => items.forEach((i) => i.classList.add("in")), 2500);
})();
