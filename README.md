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
assets/js/      main.js     — theme, reveals, stamp grid, filters
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

## Add a passport stamp

Open `assets/js/main.js` and add a line to the `STAMPS` array at the top:

```js
{ country: "Kenya", code: "NBO", year: "2026", tone: "teal" },
```

`tone` is `red`, `teal`, `gold`, or `wish` (greyed out = haven't been yet).
The counter on the home page updates itself.

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
