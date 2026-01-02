# Shreya Verma - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. This project showcases professional experience, education, projects, blog posts, and certifications with a clean, minimalist design and dark mode support.

## 🚀 Live Demo

Visit the live site: [https://shreyaverma.netlify.app](https://shreyaverma.netlify.app)

## ✨ Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for optimal performance
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Dynamic Routing**: Client-side routing with React Router
- **SEO Optimized**: Meta tags and Open Graph support via React Helmet
- **RSS Feeds**: Automatically generated Atom and JSON feeds for blog posts
- **3D Graphics**: Interactive 3D components using Three.js and React Three Fiber
- **Rich Content**: Support for code highlighting, math equations (KaTeX), tweets, and YouTube embeds

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router** - Client-side routing

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **@tailwindcss/typography** - Beautiful typography for prose content
- **next-themes** - Theme switching (light/dark mode)

### UI Components & Libraries
- **Material-UI** - Component library
- **React Icons** - Icon library
- **Embla Carousel** - Carousel/slider components
- **React Spring** - Animation library
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js

### Content & Media
- **React Tweet** - Twitter/X embed support
- **React YouTube** - YouTube video embeds
- **KaTeX** - Math equation rendering
- **Sugar High** - Syntax highlighting

## 📁 Project Structure

```
shreyaverma-v3/
├── public/                 # Static assets (images, fonts, etc.)
│   ├── fonts/             # Geist font files
│   ├── photos/            # Portfolio photos
│   ├── work/              # Project images
│   ├── experience/        # Company logos
│   └── education/         # Institution logos
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/       # Layout components (Nav, Footer, Theme)
│   │   └── ui/           # UI components (Button, Accordion)
│   ├── config/           # Configuration files
│   ├── data/             # Data files (projects, blogs, experience, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   │   ├── about/        # About page and sections
│   │   ├── blog/         # Blog listing page
│   │   ├── contact/      # Contact page
│   │   └── projects/     # Projects page
│   ├── styles/           # Global styles and CSS
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── scripts/              # Build scripts
│   └── generate-feed.ts  # RSS feed generator
├── dist/                 # Build output (generated)
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
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
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

The build process:
1. Type checks the code with TypeScript
2. Builds the project with Vite
3. Generates RSS feed files (atom.xml and feed.json)

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
  // ... other social links
};
```

### Adding/Updating Content

- **Projects**: Edit `src/data/projects.ts`
- **Blog Posts**: Edit `src/data/blogs.ts`
- **Experience**: Edit `src/data/experience.ts`
- **Education**: Edit `src/data/education.ts`
- **Certificates**: Edit `src/data/certificates.ts`

### Styling

- Global styles: `src/styles/global.css`
- Tailwind configuration: `tailwind.config.js`
- Component-specific styles can be added using Tailwind classes or CSS modules

## 🏗️ Building for Production

```bash
npm run build
```

This will:
- Type-check all TypeScript files
- Build optimized production bundles
- Generate RSS feed files
- Output everything to the `dist/` directory

The `dist/` directory contains everything needed to deploy to any static hosting service.

## 🚢 Deployment

The project can be deployed to any static hosting service:

- **Netlify**: Connect your Git repository or drag and drop the `dist` folder
- **Vercel**: Connect your Git repository (Vercel will auto-detect Vite)
- **GitHub Pages**: Deploy the `dist` folder to the `gh-pages` branch
- **Any static host**: Upload the contents of the `dist` folder

### Environment Variables

If you need to set environment variables, create a `.env` file in the root directory:

```env
VITE_BASE_URL=https://yourdomain.com
```

Access them in code using `import.meta.env.VITE_BASE_URL`

## 🎯 Key Features Explained

### Theme Switching
The app uses `next-themes` for theme management with system preference detection. Users can toggle between light and dark modes.

### RSS Feeds
The build process automatically generates `atom.xml` and `feed.json` files in the `dist` directory for blog syndication.

### Routing
Client-side routing is handled by React Router. All routes are defined in `src/App.tsx`.

### Type Safety
The project uses TypeScript with strict null checks. Type definitions are centralized in `src/types/index.ts`.

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

---

⭐ If you find this project helpful, please consider giving it a star!
