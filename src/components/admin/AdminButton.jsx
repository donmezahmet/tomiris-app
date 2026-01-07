import { Loader2 } from 'lucide-react';

export function AdminButton({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  icon: Icon,
  ...props
}) {
  const baseClasses = 'px-4 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary-400 text-dark-900 hover:bg-primary-300',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {Icon && !loading && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

