export function AdminSelect({ label, value, onChange, options, placeholder, required = false, error, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border ${
          error ? 'border-red-400/50' : 'border-white/10'
        } text-white focus:outline-none focus:border-primary-400 transition-colors`}
        {...props}
      >
        {placeholder && (
          <option value="" className="bg-dark-800">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={typeof option === 'string' ? option : option.value}
            value={typeof option === 'string' ? option : option.value}
            className="bg-dark-800"
          >
            {typeof option === 'string' ? option : option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

