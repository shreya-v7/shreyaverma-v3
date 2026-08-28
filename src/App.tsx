import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ThemeProvider } from './components/layout/ThemeSwitch';
import { Sherrii } from './components/layout/sherrii';
import Home from './pages/Home';
import About from './pages/about';
import Diary from './pages/diary';
import Projects from './pages/projects';
import Contact from './pages/contact';
import NotFound from './pages/NotFound';
import { DIARY_BLOGS_PATH, DIARY_CINEMA_PATH, DIARY_MOVIES_PATH } from './config/sectionNav';

function App() {
  return (
    <ThemeProvider>
      <div className="relative z-10 antialiased flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-20 lg:mb-40">
        <div className="flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/experience" element={<About section="experience" />} />
              <Route path="/about/education" element={<About section="education" />} />
              <Route path="/about/research" element={<About section="research" />} />
              <Route path="/about/leadership" element={<About section="leadership" />} />
              <Route path="/about/honors" element={<About section="honors" />} />
              <Route path="/about/certifications" element={<Navigate to="/about/honors" replace />} />
              <Route path="/about/achievements" element={<Navigate to="/about/honors" replace />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/diary/music" element={<Diary section="music" />} />
              <Route path="/diary/books" element={<Diary section="books" />} />
              <Route path={DIARY_CINEMA_PATH} element={<Diary section="cinema" />} />
              <Route path={DIARY_MOVIES_PATH} element={<Navigate to={DIARY_CINEMA_PATH} replace />} />
              <Route path={DIARY_BLOGS_PATH} element={<Diary section="blogs" />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Sherrii />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
