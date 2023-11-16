// components/FilterSelect.tsx
import React from 'react';

interface FilterSelectProps {
  label: string;
  options: (string | number)[];
  value: string | number | null;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Dropdown component for filter selection
const FilterSelect: React.FC<FilterSelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4 mr-4">
      <label htmlFor={label} className="text-gray-300 mr-2">
        {label}:
      </label>
      <select
        id={label}
        className="bg-gray-700 text-white rounded p-2"
        value={value !== null ? value.toString() : ''}
        onChange={onChange}
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
