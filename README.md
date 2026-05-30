# Realty Peoples — Static Website

Plain HTML/CSS/JavaScript. No React, no Next.js, no npm, no build step.

## Deploy to Netlify (drag & drop)
1. Go to https://app.netlify.com/drop
2. Drag the **entire `realty-peoples` folder** (or the unzipped contents) onto the page.
3. Done — Netlify gives you a live URL. To use a custom domain, add it in Site settings → Domain management.

(You can also drag the `.zip` straight onto Netlify Drop; it unzips automatically.)

## File structure
```
realty-peoples/
├── index.html         Home
├── residential.html   Residential
├── commercial.html    Commercial
├── cafe.html          Online Cafe (member-gated)
├── about.html         About + team + consult form
├── contact.html       Contact + FAQ
├── login.html         Member login (homeowner / service pro)
├── css/styles.css     All styling (colors & fonts at top in :root)
├── js/data.js         Listings, team, testimonials, channels, FAQs
├── js/i18n.js         All 5 languages (EN/KR/CH/JPN/SPN)
├── js/main.js         Shared header/footer + behavior
├── netlify.toml       Netlify config + security headers
├── robots.txt, sitemap.xml
```

## How to edit
- **Text content / listings / team / FAQs:** `js/data.js`
- **Translations:** `js/i18n.js`
- **Colors & fonts:** top of `css/styles.css` (`:root`)
- **Header & footer (shared everywhere):** `headerHTML()` / `footerHTML()` in `js/main.js`
- **Images:** search each page for `IMG_` comments and swap the URLs (placeholders use Unsplash).
- **Logo:** replace the `LOGO SLOT` box in the footer (`footerHTML()` in `js/main.js`).
- **Slack chat:** in `cafe.html`, find `SLACK EMBED SLOT` and paste your Slack/iframe embed.

## Where do form submissions go? (Netlify Forms — already wired up)
All forms are connected to **Netlify Forms**. Once the site is deployed to Netlify,
submissions are captured automatically — no backend, no code to run.

Forms set up: **contact** (Contact page), **consult** (About page), **newsletter** (email signup).

### To read submissions
Netlify -> open your site -> **Forms** tab -> pick a form -> view/export submissions (CSV).

### To get emailed on each submission (recommended)
Netlify -> Site settings -> **Forms -> Form notifications -> Add notification ->
Email notification** -> enter info@realtypeoples.com (or any address).

Notes:
- Free tier covers 100 submissions/month; a built-in honeypot filters spam.
- Submissions only record on the live Netlify site; local preview just shows the thank-you.
- For newsletters, forward signups to a mail tool (Mailchimp, Beehiiv, etc.) to send campaigns.

## Login — next step
Login is a front-end demo (stored in the browser only). For real accounts, connect
**Supabase Auth** — passwords are hashed by Supabase and never stored by you.
