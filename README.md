# Passport & Pages

**Live: https://passportandpages.com**

A travel journal — *half passport, half paperback.* Static site with no build
step, no dependencies and no framework. Plain HTML, CSS and JS; the only thing
you need to work on it is a text editor and a browser.

```
index.html      home — hero, featured entry, recent pages, map, stamps, notes
start-here.html curated entry point for new readers
journal.html    full archive with region filters
place.html      country page — place.html?c=Portugal (one template, all countries)
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

If that errors with `Address already in use`, a server is already running on
that port — just open the URL, or pick another port.

## Add a new journal entry

Two steps.

**1. Write the page.** `cp entry.html lisbon-2.html`, then edit the `<title>`,
description, `<h1>`, dek and body. Margin notes are `<p class="marginal">…</p>` —
on wide screens they float into the margin in handwriting; add `marginal--r` to
send one to the right. Set the related-entries container at the foot of the page
to the new title: `<div class="cards" data-related="Your New Title"></div>`.

**2. List it.** Add one line to the `ENTRIES` array at the top of
`assets/js/main.js`:

```js
{ title: "The Loop, on a Bike I Could Not Ride", href: "hagiang.html",
  country: "Vietnam", city: "Hà Giang", date: "2024-10-21", mins: 10,
  region: "asia", img: "kyoto",
  blurb: "Three hundred kilometres of switchbacks with a clutch hand I did not have on day one." },
```

That one line puts the entry on the home page, in the journal (with its
continent filter), on its country's page, and into the "keep reading" cards at
the foot of related entries. Nothing else to update.

- `date` is `YYYY-MM-DD` and the list is **newest first** — order matters.
- `region` is `europe`, `asia`, `africa` or `americas` (the journal filters).
- `img` is a filename in `assets/img/` without the `.svg`.
- Add `pick: "why a newcomer should start here"` and the entry is featured on
  **start-here.html** in handwriting. Keep it to three or four picks.

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

## Country pages

`place.html` is one template that serves every country — `place.html?c=Japan`,
`place.html?c=Peru`, and so on. It builds itself from `STAMPS` and `ENTRIES`:
the country's stamp, a locator map cropped from the same world data, every entry
written there, and previous/next links around the collection. Add a country to
`STAMPS` and its page exists immediately; there is nothing to generate.

Map pins and stamps both link here, so a reader who clicks Portugal on the map
lands on everything Portuguese rather than on a single post.

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

## Publishing a change

`git push` is the publish button. There is no dashboard and no build step.

```bash
git add -A
git commit -m "Add the Kyoto entry"
git push
```

GitHub Pages redeploys automatically; the change is live in about a minute.
Hard-reload (Cmd+Shift+R) if you still see the old version — GitHub's CDN caches
for 10 minutes, so an unchanged-looking page is usually just cache.

## How the hosting is wired up

Set up on 14 Sep 2026. You shouldn't need to touch any of this again, but here
it is in case something breaks or you move hosts.

**GitHub Pages** serves `main` from the repo root
(`Settings → Pages → Deploy from a branch → main → /`). The repo has to stay
**public** — Pages won't serve a private repo on the free plan.

**The `CNAME` file** in this folder is what tells Pages the custom domain is
`passportandpages.com`. Don't delete it; Pages rewrites its own copy and losing
it drops the custom domain.

**DNS lives at Spaceship** (nameservers `launch1/launch2.spaceship.net`), under
Domain Manager → the domain → Advanced DNS:

| Type  | Host  | Value             |
|-------|-------|-------------------|
| A     | `@`   | `185.199.108.153` |
| A     | `@`   | `185.199.109.153` |
| A     | `@`   | `185.199.110.153` |
| A     | `@`   | `185.199.111.153` |
| CNAME | `www` | `rxl895.github.io`|

Those four IPs are GitHub's apex servers. The `www` CNAME is what makes
`www.passportandpages.com` redirect to the bare domain.

**HTTPS** is a Let's Encrypt certificate that GitHub issues and renews on its
own — nothing to do, nothing to pay. *Enforce HTTPS* in Pages settings is what
upgrades plain `http://` visitors to `https://`.

### If the site ever goes down

1. `curl -sI https://passportandpages.com/` — `Server: GitHub.com` means Pages
   is answering and the problem is in the content, not the hosting.
2. `dig +short passportandpages.com` — should return the four `185.199.*` IPs.
   If it returns something else, Spaceship parking has crept back; re-add the
   records above.
3. Check the repo is still public, and that `CNAME` still exists on `main`.

### Moving to another host

Nothing here is GitHub-specific except `CNAME`. Netlify and Vercel both serve
this folder as-is (and from a private repo, if you'd rather it not be public) —
point them at the repo, then swap the DNS records above for theirs.

## The email form

`data-signup` is currently a friendly no-op — it just swaps in a thank-you.
To make it real, point the `<form>` at your provider (Buttondown, ConvertKit,
Mailchimp) and delete the newsletter block at the bottom of `main.js`.
