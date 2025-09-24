
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'w-full sm:w-auto text-center px-6 py-3 border text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'border-transparent text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    secondary: 'border-gray-500 text-gray-200 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
