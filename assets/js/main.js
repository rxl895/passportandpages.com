/* Passport & Pages — site behaviour
   ---------------------------------------------------------------
   EDIT ME: the STAMPS array below drives the "Stamp Collection"
   grid on the home page. Add a country, it appears. That's it.
   tone: "teal" | "red" | "gold" | "wish" (wish = not yet visited)
   --------------------------------------------------------------- */

const STAMPS = [
  { country: "Portugal",   code: "LIS", year: "2026", tone: "red"  },
  { country: "Japan",      code: "KIX", year: "2025", tone: "teal" },
  { country: "Morocco",    code: "RAK", year: "2025", tone: "gold" },
  { country: "Iceland",    code: "KEF", year: "2025", tone: "teal" },
  { country: "Argentina",  code: "FTE", year: "2024", tone: "red"  },
  { country: "Vietnam",    code: "HAN", year: "2024", tone: "teal" },
  { country: "Italy",      code: "NAP", year: "2024", tone: "gold" },
  { country: "Peru",       code: "CUZ", year: "2023", tone: "red"  },
  { country: "Greece",     code: "JTR", year: "2023", tone: "teal" },
  { country: "Norway",     code: "TOS", year: "2023", tone: "gold" },
  { country: "Georgia",    code: "TBS", year: "2022", tone: "teal" },
  { country: "Mexico",     code: "OAX", year: "2022", tone: "red"  },
  { country: "Mongolia",   code: "UBN", year: "—",    tone: "wish" },
  { country: "Namibia",    code: "WDH", year: "—",    tone: "wish" },
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
    <div class="stamp ${cls}" style="--rot:${rot}deg">
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
  const n = $("[data-stamp-count]");
  if (n) n.textContent = visited;
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
