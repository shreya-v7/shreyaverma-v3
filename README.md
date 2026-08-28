# Shreya Verma

Personal portfolio: ML systems, AI engineering, and the work around it. Live at [shreyaverma.netlify.app](https://shreyaverma.netlify.app).

React 18, TypeScript, Vite 7, Tailwind, React Router v6. Deployed on Netlify.

## Features

- About sections: Industry, Education, Research, Leadership, Honors
- Project grid with Agentic / AI / Research filters
- Diary: blogs (Substack plus a local Medium piece), books, music (Spotify), cinema
- Click-through modals for industry, education, leadership, books, and cinema
- Light / dark theme with system preference
- Sherrii, a small floating assistant with rotating notes
- Profile image preloaded; below-the-fold images lazy-load

## Tech stack

- React 18.3, TypeScript 5.5, Vite 7.3
- React Router 6.26
- Tailwind CSS 3.4, next-themes
- React Helmet Async, React Icons, Swiper
- Netlify Functions for Spotify embeds and Substack posts

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About preview |
| `/about/experience` | Industry (labeled Industry in the nav) |
| `/about/education` | Education |
| `/about/research` | Research |
| `/about/leadership` | Leadership |
| `/about/honors` | Honors (awards, publications, scholarships, hackathons, speaking, certifications) |
| `/diary` | Diary preview |
| `/diary/blogs` | Writing |
| `/diary/books` | Books |
| `/diary/music` | Music |
| `/diary/cinema` | Cinema |
| `/projects` | Projects |
| `/contact` | Contact |

Old URLs return HTTP 301: `/about/certifications` and `/about/achievements` to `/about/honors`; `/diary/movies` to `/diary/cinema`. In-app redirects still cover local Vite.

## Project structure

```
shreyaverma-v3/
├── public/                 # Static assets
│   ├── work/               # Project images
│   ├── experience/         # Company logos
│   ├── education/          # School logos
│   ├── leadership/         # Org logos
│   └── certs/              # Certificate images
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, theme, Sherrii
│   │   ├── music/          # Spotify stage and favorite track
│   │   ├── achievement/    # Honor rows
│   │   ├── seo/            # Helmet title, OG, canonical, JSON-LD
│   │   └── ui/             # Cards, modal, pagination, SiteImage
│   ├── config/             # Site metadata and section nav
│   ├── data/               # Experience, education, research, leadership, projects, diary, honors
│   ├── hooks/              # Blog posts, company modal, diary particles
│   ├── lib/                # Spotify and Substack fetch helpers
│   ├── pages/              # Home, About, Diary, Projects, Contact
│   ├── styles/
│   ├── types/
│   └── utils/
├── netlify/functions/      # spotify-playlist, substack-posts
├── netlify.toml
└── package.json
```

## Getting started

Node 22 is what Netlify uses. npm is the install path the deploy config expects.

```bash
git clone https://github.com/shreya-v7/shreyaverma-v3.git
cd shreyaverma-v3
npm install
cp .env.example .env   # then fill in Spotify / Substack if you need those pages
npm run dev
```

Vite serves the app at [http://localhost:3000](http://localhost:3000). If that port is taken, Vite picks the next one (often 3001 or 3002).

For Spotify and Substack locally, run Netlify Dev so `/api/*` hits the functions:

```bash
npm run dev:netlify
```

Then open the URL Netlify prints (usually port 8888). Vite still proxies `/api` to `VITE_SPOTIFY_API_PROXY_TARGET` (default `http://127.0.0.1:8888`).

## Scripts

- `npm run dev` - Vite with HMR
- `npm run dev:netlify` - Vite plus Netlify functions
- `npm run build` - `tsc` then Vite production build
- `npm run preview` - preview the `dist` folder

## Content

| What | Where |
| --- | --- |
| Name, socials, meta | `src/config/config.ts` |
| Industry | `src/data/experience.ts` |
| Education | `src/data/education.ts` |
| Research | `src/data/research.ts` |
| Leadership | `src/data/leadership.ts` |
| Projects | `src/data/projects.ts` |
| Certificates | `src/data/certificates.ts` |
| Honors list | `src/data/achievements/` |
| Books / cinema | `src/data/diary/books.ts`, `src/data/diary/cinema.ts` |
| Local blog posts | `src/data/diary/blogs.ts` (shown with Substack) |
| Sherrii copy | `src/data/sherrii-messages.ts` |

Set `metaData.baseUrl` if the live origin changes. It is used for canonical, Open Graph, JSON-LD, and `public/sitemap.xml`. `public/robots.txt` points at that sitemap.

Substack posts are listed on `/diary/blogs` and open on Substack or Medium. They are not duplicated as first-party article URLs, so they are omitted from the sitemap.

### Spotify

```env
SPOTIFY_PLAYLIST_IDS=
SPOTIFY_TOP_ARTIST_IDS=
SPOTIFY_FAVORITE_TRACK_ID=
VITE_SPOTIFY_API_PROXY_TARGET=http://127.0.0.1:8888
```

Values can be full Spotify URLs or IDs. Playlists and artists are comma-separated. Served by `netlify/functions/spotify-playlist.mjs`.

### Substack

```env
SUBSTACK_PUBLICATION_URL=@yourhandle
```

Slug or full `https://yourname.substack.com` also works. Public posts appear on `/diary/blogs`. Paid-only posts are skipped. If the function is missing, the page shows an error, not a fake feed.

Do not commit `.env`.

## Deploy

Netlify reads `netlify.toml`: npm install, `npm run build`, publish `dist`, SPA fallback to `index.html`, and `/api/*` rewritten to functions. Set the same env vars in the Netlify UI.

Any static host that can serve `dist` will run the UI. Spotify and Substack need the Netlify functions (or another backend that implements those two `/api` routes).

## License

MIT.

## Author

**Shreya Verma**
- Site: [shreyaverma.netlify.app](https://shreyaverma.netlify.app)
- GitHub: [shreya-v7](https://github.com/shreya-v7)
- LinkedIn: [shreya-verma-1sv](https://in.linkedin.com/in/shreya-verma-1sv)
- X: [shreyasapphire](https://x.com/shreyasapphire)
- Instagram: [shreyaver.ma](https://www.instagram.com/shreyaver.ma)
