# Jet Exclusive Concierge — Website

Production website for **Jet Exclusive Concierge (JEC)**, a premium airport protocol and concierge service operating at MMIA Lagos and NAIA Abuja.

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS** with custom brand tokens
- **Framer Motion** for all animations
- **React Router v6** for navigation
- **React Hook Form** + **Formspree** for the enquiry form
- **react-icons** for social icons
- Fonts: **Cormorant Garamond** (headlines) + **Inter** (body) via Google Fonts

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build:

```bash
npm run preview
```

---

## Connecting Formspree

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy your **form ID** (looks like `xabc1234`).
3. Open `src/pages/Contact.jsx`.
4. Find this line near the top:

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/FORMSPREE_ENDPOINT'
```

5. Replace `FORMSPREE_ENDPOINT` with your actual form ID:

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xabc1234'
```

---

## Updating Video Sources

The site uses three Pexels videos served as direct MP4 files:

| Page | Variable | Current Source |
|------|----------|---------------|
| Home (`/`) | `VIDEO_SRC` in `src/pages/Home.jsx` | Luxury car arriving at night |
| Protocol (`/protocol`) | `VIDEO_SRC` in `src/pages/Protocol.jsx` | Car driving at night |
| Contact (`/contact`) | `VIDEO_SRC` in `src/pages/Contact.jsx` | Lagos sunset skyline |

To update a video:
1. Download or locate an MP4 direct URL.
2. Replace the `VIDEO_SRC` constant at the top of the relevant page file.

On mobile (< 768px), all videos are hidden and replaced with a CSS gradient + grain texture for performance.

---

## Deploying to Vercel

### Option A — Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# From the project root
vercel

# For production
vercel --prod
```

### Option B — GitHub Integration

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel auto-detects Vite. Leave all settings as defaults.
5. Click **Deploy**.

The `vercel.json` file already contains the SPA rewrite rule so all client-side routes (`/protocol`, `/standard`, `/contact`) work correctly on Vercel.

---

## Brand Tokens (Tailwind)

| Token | Hex |
|-------|-----|
| `brand-purple` | `#2e1261` |
| `brand-red` | `#F02232` |
| `brand-dark` | `#0a0a0f` |
| `brand-white` | `#FFFFFF` |
| `brand-muted` | `#a0a0b0` |

Configured in `tailwind.config.js`.

---

## Design Rules

- **Red** is used **only** on: CTA buttons, checkbox checked state, trust signal lines (Standard page), "Enquire →" links (Protocol page).
- **Zero border radius** anywhere — all elements are sharp-edged.
- **Cormorant Garamond** = all headlines and display text only.
- **Inter** = everything else (body, labels, nav, captions).
- Section padding: 140px vertical (desktop) / 80px (mobile).

---

## Social Links

| Platform | URL |
|----------|-----|
| Instagram | https://www.instagram.com/jetexclusiveconcierge |
| TikTok | https://www.tiktok.com/@jetexclusiveconcierge |
| Facebook | https://www.facebook.com/jetexclusiveconcierge |
| Twitter/X | https://x.com/jetexclusiveltd |
| LinkedIn | https://www.linkedin.com/company/jetexclusiveconcierge |
