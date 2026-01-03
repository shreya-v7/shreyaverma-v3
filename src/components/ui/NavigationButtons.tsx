import { Link } from 'react-router-dom';

interface NavigationButton {
  id: string;
  label: string;
  path: string;
}

interface NavigationButtonsProps {
  buttons: NavigationButton[];
  activeId: string;
}

export const NavigationButtons = ({ buttons, activeId }: NavigationButtonsProps) => {
  return (
    <div className="flex justify-center items-center mb-8 flex-wrap gap-2">
      {buttons.map((button) => (
        <Link 
          key={button.id} 
          to={button.path} 
          className={`
            px-3 py-1.5 text-sm font-medium rounded-full
            transition-all duration-200 ease-in-out
            ${activeId === button.id 
              ? 'bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 shadow-md' 
              : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }
          `}
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
};

