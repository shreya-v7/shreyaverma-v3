import { Link } from "react-router-dom";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../../config/config";

const navItems = {
  "/about": {name: "About"},
  "/diary": { name: "Diary" },
  "/projects": { name: "Projects" },
  "/contact": { name: "Contact" },
};

export function Navbar() {
  return (
    <nav className="lg:mb-16 mb-12 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-[28px] font-semibold tracking-tight">
            {metaData.title}
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              to={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
