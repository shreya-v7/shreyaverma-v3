import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AmbientBg } from './components/layout/AmbientBg';
import { Navbar } from './components/layout/nav';
import Footer from './components/layout/footer';
import { ThemeProvider } from './components/layout/theme-switch';
import { Sherrii } from './components/layout/sherrii';
import { Preloader } from './components/ui/Preloader';
import ScrollProgress from './components/ui/ScrollProgress';
import { useImagePreloader } from './hooks/useImagePreloader';
import { metaData } from './config/config';
import Home from './pages/Home';
import About from './pages/about';
import Diary from './pages/diary';
import BlogPostRedirect from './pages/diary/BlogPostRedirect';
import Projects from './pages/projects';
import Contact from './pages/contact';
import Book from './pages/book';
import NotFound from './pages/NotFound';
import FoodPlan from './pages/secret/FoodPlan';
import { DIARY_BLOGS_PATH, DIARY_MOVIES_PATH, DIARY_NOTES_PATH } from './config/sectionNav';
import { SECRET_FOOD_PLAN_PATH } from './config/secretRoutes';

/** Old URLs served blog posts under /diary/movies/:id */
function RedirectOldMoviesPostToBlogs() {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`${DIARY_BLOGS_PATH}/${id}`} replace />;
}

function App() {
  const { loading, progress } = useImagePreloader();

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
      <ScrollProgress />
      <AmbientBg />
      <Preloader loading={loading} progress={progress} />
      <div className={`relative z-10 antialiased flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-20 lg:mb-40 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <main className="flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/experience" element={<About section="experience" />} />
            <Route path="/about/education" element={<About section="education" />} />
            <Route path="/about/certifications" element={<About section="certifications" />} />
            <Route path="/about/achievements" element={<About section="achievements" />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/diary/music" element={<Diary section="music" />} />
            <Route path="/diary/books" element={<Diary section="books" />} />
            <Route path="/diary/cinema" element={<Diary section="cinema" />} />
            <Route path={DIARY_MOVIES_PATH} element={<Diary section="movies" />} />
            <Route path={DIARY_NOTES_PATH} element={<Navigate to={DIARY_BLOGS_PATH} replace />} />
            <Route path={DIARY_BLOGS_PATH} element={<Diary section="blogs" />} />
            <Route path={`${DIARY_BLOGS_PATH}/:id`} element={<BlogPostRedirect />} />
            <Route path={`${DIARY_MOVIES_PATH}/:id`} element={<RedirectOldMoviesPostToBlogs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path={SECRET_FOOD_PLAN_PATH} element={<FoodPlan />} />
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
