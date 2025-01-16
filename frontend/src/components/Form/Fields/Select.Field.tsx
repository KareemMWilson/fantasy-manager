// src/components/forms/SelectField.tsx
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface SelectFieldProps {
  name: string
  label?: string
  options: { label: string; value: string }[]
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}

      <select id={name} {...register(name)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p style={{ color: 'red' }}>{error.message as string}</p>}
    </div>
  )
}


export default SelectField