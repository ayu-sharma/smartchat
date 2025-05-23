import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary', // primary, secondary, ghost, danger
  size = 'md', // sm, md, lg
  icon: Icon,
  iconPosition = 'left', // left, right
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const loadingStyles = 'relative text-transparent transition-none hover:text-transparent';
  
  const buttonStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled || loading ? disabledStyles : ''}
    ${loading ? loadingStyles : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={buttonStyles}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {Icon && iconPosition === 'left' && (
        <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`w-4 h-4 ${children ? 'ml-2' : ''}`} />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 