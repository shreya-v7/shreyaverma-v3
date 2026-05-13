# Shreya Verma - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. This project showcases professional experience, education, projects, and a personal diary section with interactive features, particle effects, and a clean, minimalist design.

## 🚀 Live Demo

Visit the live site: [https://shreyaverma.netlify.app](https://shreyaverma.netlify.app)

## ✨ Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite 7 for optimal performance
- **Responsive Design**: Fully responsive layout that works seamlessly on all devices
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Dynamic Routing**: Client-side routing with React Router v6
- **SEO Optimized**: Meta tags and Open Graph support via React Helmet
- **RSS Feeds**: Automatically generated Atom and JSON feeds for blog posts
- **Interactive UI**: Modals, pagination, Spotify embeds, and animated components
- **Particle Effects**: Dynamic particle animations for music, books, cinema, and blog sections
- **Personal Diary**: Showcase music, books, cinema, and blog posts with interactive cards
- **Modular Architecture**: Reusable components, hooks, and utilities for maintainability

## 🛠️ Tech Stack

### Core
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 7.3** - Build tool and dev server
- **React Router 6.26** - Client-side routing

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **@tailwindcss/typography** - Beautiful typography for prose content
- **next-themes** - Theme switching (light/dark mode)

### UI Components & Libraries
- **React Icons** - Comprehensive icon library
- **React Helmet Async** - Document head management

### Content & Media
- **Feed** - RSS feed generation
- **KaTeX** - Math equation rendering
- **Sugar High** - Syntax highlighting

## 📁 Project Structure

```
shreyaverma-v3/
├── public/                    # Static assets
│   ├── fonts/                # Geist font files
│   ├── photos/               # Portfolio photos
│   ├── work/                 # Project images
│   ├── experience/           # Company logos
│   └── education/            # Institution logos
├── src/
│   ├── components/           # Reusable components
│   │   ├── layout/          # Layout components
│   │   │   ├── nav.tsx      # Navigation bar
│   │   │   ├── footer.tsx   # Footer
│   │   │   ├── theme-switch.tsx  # Theme toggle
│   │   │   └── sherrii/     # Interactive assistant
│   │   └── ui/              # UI components
│   │       ├── NavigationButtons.tsx  # Reusable nav buttons
│   │       ├── Pagination.tsx         # Reusable pagination
│   │       ├── SectionHeader.tsx      # Section headers
│   │       ├── SectionRouter.tsx      # Generic section router
│   │       ├── Modal.tsx              # Modal dialogs
│   │       ├── Toast.tsx              # Toast notifications
│   │       └── [Card components]     # Various card types
│   ├── config/              # Configuration files
│   │   └── config.ts        # Site metadata and social links
│   ├── data/                # Data files
│   │   ├── experience.ts    # Work experience
│   │   ├── education.ts     # Education history
│   │   ├── certificates.ts  # Certifications
│   │   ├── projects.ts      # Project portfolio
│   │   ├── diary/           # Personal diary content
│   │   │   ├── books.ts     # Book reviews
│   │   │   ├── cinema.ts    # Movie/show reviews
│   │   │   └── blogs.ts     # Blog posts
│   │   └── sherrii-messages.ts  # Assistant messages
│   ├── hooks/               # Custom React hooks
│   │   ├── useTheme.ts      # Theme detection
│   │   ├── useCompanyModal.ts  # Modal state management
│   │   └── useTechStackColors.ts  # Tech stack color generation
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Landing page
│   │   ├── NotFound.tsx     # 404 page
│   │   ├── about/           # About section
│   │   │   ├── index.tsx    # About page router
│   │   │   ├── AboutPreview.tsx  # Preview page
│   │   │   ├── aboutbody.tsx     # Section router
│   │   │   ├── experience.tsx    # Experience page
│   │   │   ├── education.tsx     # Education page
│   │   │   └── certlist.tsx      # Certifications page
│   │   ├── diary/           # Personal diary section
│   │   │   ├── index.tsx    # Diary page router
│   │   │   ├── DiaryPreview.tsx  # Preview page
│   │   │   ├── diarybody.tsx     # Section router
│   │   │   ├── music.tsx         # Music page
│   │   │   ├── books.tsx         # Books page
│   │   │   ├── cinema.tsx        # Cinema page
│   │   │   ├── blogs.tsx         # Blogs page
│   │   │   └── BlogDetail.tsx   # Individual blog post
│   │   ├── projects/        # Projects section
│   │   │   ├── index.tsx    # Projects page
│   │   │   └── projects-info.tsx  # Projects listing
│   │   └── contact/         # Contact page
│   ├── styles/              # Global styles
│   │   └── global.css       # Global CSS and font definitions
│   ├── types/               # TypeScript definitions
│   │   └── index.ts         # Shared types and interfaces
│   ├── utils/               # Utility functions
│   │   ├── index.ts         # Common utilities
│   │   └── sherrii-positions.ts  # Assistant positioning
│   ├── App.tsx              # Main app component with routing
│   └── main.tsx             # Application entry point
├── scripts/                 # Build scripts
│   └── generate-feed.ts    # RSS feed generator
├── dist/                    # Build output (generated)
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── netlify.toml             # Netlify deployment config
└── package.json             # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or pnpm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shreya-v7/shreyaverma-v3.git
cd shreyaverma-v3
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the project for production (includes type checking and RSS feed generation)
- `npm run preview` - Preview the production build locally

### Build Process

The build process includes:
1. TypeScript type checking
2. Vite production build with optimizations
3. RSS feed generation (atom.xml and feed.json)

## 🎨 Customization

### Updating Personal Information

Edit the configuration file at `src/config/config.ts`:

```typescript
export const metaData = {
  baseUrl: "https://yourdomain.com",
  title: "Your Name",
  name: "Your Name",
  ogImage: "/profile.png",
  description: "Your description",
};

export const socialLinks = {
  twitter: "https://x.com/yourhandle",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  // ... other social links
};
```

### Adding/Updating Content

- **Projects**: Edit `src/data/projects.ts`
- **Experience**: Edit `src/data/experience.ts`
- **Education**: Edit `src/data/education.ts`
- **Certificates**: Edit `src/data/certificates.ts`
- **Diary Content**:
  - Music embeds: configure `SPOTIFY_*` env values
  - Books: `src/data/diary/books.ts`
  - Cinema: `src/data/diary/cinema.ts`
  - Blogs: `src/data/diary/blogs.ts`

### Styling

- Global styles: `src/styles/global.css`
- Tailwind configuration: `tailwind.config.js`
- Component-specific styles use Tailwind utility classes

## 🏗️ Architecture Highlights

### Reusable Components

The project follows a modular architecture with reusable components:

- **NavigationButtons**: Consistent navigation button styling across sections
- **Pagination**: Reusable pagination component with color variants
- **SectionHeader**: Standardized section headers with "View All" links
- **SectionRouter**: Generic router component for sectioned pages
- **Modal**: Reusable modal dialog component
- **Toast**: Toast notification component

### Custom Hooks

- **useTheme**: Theme detection and management
- **useCompanyModal**: Modal state management for company/institution details
- **useTechStackColors**: Dynamic color generation for tech stack badges

### Type Safety

All components and data structures are fully typed with TypeScript. Type definitions are centralized in `src/types/index.ts`.

## 🚢 Deployment

### Netlify (Recommended)

The project includes a `netlify.toml` configuration file. Simply connect your Git repository to Netlify, and it will automatically:

- Use `pnpm` for dependency installation
- Run the build command
- Deploy from the `dist` directory
- Handle client-side routing with redirects

### Other Platforms

The project can be deployed to any static hosting service:

- **Vercel**: Connect your Git repository (auto-detects Vite)
- **GitHub Pages**: Deploy the `dist` folder to the `gh-pages` branch
- **Cloudflare Pages**: Connect repository and set build command
- **Any static host**: Upload the contents of the `dist` folder

### Environment Variables

If needed, create a `.env` file in the root directory:

```env
VITE_BASE_URL=https://yourdomain.com
```

Access them in code using `import.meta.env.VITE_BASE_URL`

Optional: `VITE_PUBLIC_BOOKING_EMBED_URL` enables `/book` and the “Book a time” link on Contact (public embed URL only; never put OAuth secrets in `VITE_*`).

### Spotify Music

The Music page uses Spotify embeds served by `netlify/functions/spotify-playlist.mjs`. Add comma-separated Spotify URLs or IDs locally and in Netlify:

```env
SPOTIFY_PLAYLIST_IDS=https://open.spotify.com/playlist/...
SPOTIFY_TOP_ARTIST_IDS=https://open.spotify.com/artist/...
SPOTIFY_FAVORITE_TRACK_ID=https://open.spotify.com/track/...
VITE_SPOTIFY_API_PROXY_TARGET=http://127.0.0.1:8888
```

For local API testing, run `npm run dev:netlify` and open the local URL Netlify prints.

## 🎯 Key Features Explained

### Theme Switching
Uses `next-themes` for theme management with system preference detection. The theme persists across page reloads.

### Interactive Assistant (Sherrii)
A playful page assistant that displays tech-focused messages. Can be dismissed and restarted via a quirky button.

### Particle Effects
Dynamic particle animations enhance various sections:
- Music notes for the music section
- Book emojis for the books section
- Shooting stars for the cinema section
- Multicolored particles for the blogs section
- Twinkling stars for the diary preview page

### Modal System
Reusable modal system for displaying detailed information about companies, institutions, books, and cinema reviews.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Shreya Verma**
- Portfolio: [https://shreyaverma.netlify.app](https://shreyaverma.netlify.app)
- GitHub: [@shreya-v7](https://github.com/shreya-v7)
- Twitter: [@shreyasapphire](https://x.com/shreyasapphire)
- LinkedIn: [shreya-verma-1sv](https://in.linkedin.com/in/shreya-verma-1sv)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Fonts: [Geist](https://vercel.com/font) by Vercel
- Icons: [React Icons](https://react-icons.github.io/react-icons/)

---

⭐ If you find this project helpful, please consider giving it a star!
