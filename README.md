# Passport & Pages

Static site for **passportandpages.com** — *half passport, half paperback.*
No build step, no dependencies, no framework. Plain HTML/CSS/JS.

```
index.html      home — hero, featured entry, recent pages, stamps, field notes
journal.html    full archive with region filters
entry.html      single-entry template (copy this for each new post)
about.html      about page
404.html        not-found page
assets/css/     style.css   — all styling, tokens at the top
assets/js/      main.js     — theme, reveals, map, stamp grid, filters
                world.js    — baked country outlines (generated; don't edit)
assets/img/     SVG illustrations (swap for your own photos)
CNAME           for GitHub Pages custom domain
```

## Preview locally

```bash
cd passportandpages
python3 -m http.server 8000
# open http://localhost:8000
```

## Add a new journal entry

1. `cp entry.html posts/kyoto-standing-still.html` (or keep it flat, your call).
2. Edit the `<title>`, description, `<h1>`, dek, and body copy.
3. Margin notes are `<p class="marginal">…</p>` — on wide screens they float into
   the margin in handwriting. Add `marginal--r` to send one to the right side.
4. Add a card for it in `journal.html` and on the home page. Copy an existing
   `<article class="card">` block; `data-region` must be one of
   `europe · asia · africa · americas` for the filters to catch it.

## Add a place (map pin + stamp, one line)

Open `assets/js/main.js` and add a line to the `STAMPS` array at the top. This
single array drives **three** things: the pin on the map, the highlighted
country underneath it, and the rubber stamp in the collection grid.

```js
{ country: "Kenya", code: "NBO", year: "2026", tone: "teal",
  city: "Nairobi", lat: -1.29, lon: 36.82,
  title: "Two Weeks and a Very Old Land Cruiser", href: "entry.html" },
```

- `country` must match the map's spelling (Natural Earth names — e.g.
  `"United States of America"`, `"Czechia"`, `"Bosnia and Herzegovina"`).
  If a country doesn't light up, that's why.
- `tone` is `red`, `teal`, `gold`, or `wish`. A `wish` entry draws a dashed
  outline and a hollow pin, isn't clickable, and doesn't count toward the total.
- `lat` / `lon` in decimal degrees — grab them from any map. North and east are
  positive, south and west negative.
- The counters on the home page update themselves.

## About the map

The map is plain inline SVG — no Leaflet, no Mapbox, no tile server, no API key,
and no network requests at runtime. `assets/js/world.js` holds country outlines
generated from Natural Earth 110m data, projected (Miller cylindrical) and
simplified ahead of time. It's ~80KB and you should never need to edit it.

Pins are absolutely-positioned HTML over the SVG, placed in percentage
coordinates, so they scale with the map and stay keyboard-focusable. Hovering a
pin, a stamp, or a country lights all three. On narrow screens the map scrolls
sideways instead of shrinking to illegibility.

If you'd rather have a real zoomable slippy map later, Leaflet + OpenStreetMap
would drop into the same `<div data-map>` container.

## Change the colours

Everything lives in `:root` at the top of `assets/css/style.css` — paper, ink,
stamp vermilion, customs teal, gold. Change them there and the whole site follows,
including the dark "night flight" theme just below.

## Swap in real photos

Replace the files in `assets/img/` (keep the names, or update the `src`
attributes). Images are `4/3` on cards and `16/9`-ish on the featured pass;
anything close works — they're `object-fit: cover`.

## Deploy

Any static host. Pick one:

**Netlify** — drag this folder onto app.netlify.com/drop, then
Site settings → Domain management → add `passportandpages.com`, and point your
registrar's DNS at Netlify's nameservers.

**Vercel** — `npx vercel --prod` from this folder, then add the domain in the
project's Domains tab.

**GitHub Pages** — push to a repo, Settings → Pages → deploy from `main`.
The `CNAME` file is already here; at your registrar add an `ALIAS`/`A` record for
the apex to GitHub's IPs and a `CNAME` for `www` to `<user>.github.io`.

## The email form

`data-signup` is currently a friendly no-op — it just swaps in a thank-you.
To make it real, point the `<form>` at your provider (Buttondown, ConvertKit,
Mailchimp) and delete the newsletter block at the bottom of `main.js`.
