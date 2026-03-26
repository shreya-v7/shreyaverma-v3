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
  const resolvedActiveId = buttons.some((b) => b.id === activeId)
    ? activeId
    : buttons[0]?.id ?? '';

  return (
    <div className="flex justify-center items-center mb-8 flex-wrap gap-2">
      {buttons.map((button) => (
        <Link 
          key={button.id} 
          to={button.path} 
          aria-current={resolvedActiveId === button.id ? 'page' : undefined}
          className={[
            'inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-xl',
            'transition-all duration-200 ease-in-out',
            'border backdrop-blur-[2px]',
            resolvedActiveId === button.id
              ? 'z-10 bg-neutral-900 text-neutral-50 border-neutral-900 shadow-sm dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
              : 'bg-neutral-100/70 text-neutral-800 border-neutral-200 hover:bg-neutral-200/80 hover:border-neutral-300 dark:bg-neutral-800/60 dark:text-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700/60 dark:hover:border-neutral-600',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
          ].join(' ')}
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
};

