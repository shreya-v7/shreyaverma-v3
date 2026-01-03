import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/layout/nav';
import Footer from './components/layout/footer';
import { ThemeProvider } from './components/layout/theme-switch';
import { Sherrii } from './components/layout/sherrii';
import { metaData } from './config/config';
import Home from './pages/Home';
import About from './pages/about';
import Diary from './pages/diary';
import BlogDetail from './pages/diary/BlogDetail';
import Projects from './pages/projects';
import Contact from './pages/contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.ogImage} />
        <meta property="og:url" content={metaData.baseUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.name} />
      </Helmet>
      <div className="antialiased flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-20 lg:mb-40">
        <main className="flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/experience" element={<About section="experience" />} />
            <Route path="/about/education" element={<About section="education" />} />
            <Route path="/about/certifications" element={<About section="certifications" />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/diary/music" element={<Diary section="music" />} />
            <Route path="/diary/books" element={<Diary section="books" />} />
            <Route path="/diary/cinema" element={<Diary section="cinema" />} />
            <Route path="/diary/blogs" element={<Diary section="blogs" />} />
            <Route path="/diary/blogs/:id" element={<BlogDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Sherrii />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

