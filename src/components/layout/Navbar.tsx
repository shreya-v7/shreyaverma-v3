import { Link } from "react-router-dom";
import { ThemeSwitch } from "./ThemeSwitch";
import { metaData } from "../../config/config";

const navItems = {
  "/about": {name: "About"},
  "/diary": { name: "Diary" },
  "/projects": { name: "Projects" },
  "/contact": { name: "Contact" },
};

export function Navbar() {
  return (
    <nav className="mb-12 py-4 lg:mb-16">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div className="flex items-center">
          <Link to="/" className="text-[28px] font-semibold tracking-tight">
            {metaData.title}
          </Link>
        </div>
        <div className="mt-6 flex flex-row items-center gap-4 md:mt-0 md:ml-auto">
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
