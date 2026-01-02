import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  active?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  active = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 text-lg font-medium rounded-md transition-colors duration-300';
  
  const variantClasses = active
    ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
    : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

