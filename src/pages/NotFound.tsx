import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiHome, FiUser, FiBook, FiFolder, FiMail } from 'react-icons/fi';

export default function NotFound() {
  const pages = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/about', label: 'About', icon: FiUser },
    { path: '/about/experience', label: 'Experience', icon: FiUser },
    { path: '/about/education', label: 'Education', icon: FiUser },
    { path: '/about/certifications', label: 'Certifications', icon: FiUser },
    { path: '/diary', label: 'Diary', icon: FiBook },
    { path: '/projects', label: 'Projects', icon: FiFolder },
    { path: '/contact', label: 'Contact', icon: FiMail },
  ];

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Shreya Verma</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className="text-center py-16">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Oops! Wrong landing</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">The page you're looking for doesn't exist. Try one of these:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {pages.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-500 hover:shadow-md transition-all duration-300 group"
            >
              <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <FiHome className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </>
  );
}

