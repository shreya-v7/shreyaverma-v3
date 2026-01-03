
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export const Button = ({ active = false, className = '', children, ...props }: ButtonProps) => (
  <button
    className={`px-4 py-2 text-lg font-medium rounded-md transition-colors duration-300 ${
      active ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900' : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

