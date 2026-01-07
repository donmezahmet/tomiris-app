export function AdminInput({ label, value, onChange, type = 'text', placeholder, required = false, error, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border ${
          error ? 'border-red-400/50' : 'border-white/10'
        } text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors`}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

