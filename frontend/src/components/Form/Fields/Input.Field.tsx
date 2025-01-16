// src/components/forms/Field.tsx
import { Input, Text } from "@chakra-ui/react";
import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  validation?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: string) => boolean | string | Promise<boolean | string>;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  validation = {},
  minLength,
  maxLength,
  pattern,
  validate,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  // Combine all validation rules
  const validationRules: RegisterOptions = {
    required: required ? 'This field is required' : false,
    ...validation,
    ...(minLength && { minLength: { value: minLength, message: `Minimum length is ${minLength}` } }),
    ...(maxLength && { maxLength: { value: maxLength, message: `Maximum length is ${maxLength}` } }),
    ...(pattern && { pattern: { value: pattern, message: 'Invalid format' } }),
    ...(validate && { validate }),
  };

  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {label && (
        <label
          htmlFor={name}
          style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}
        >
          {label}
        </label>
      )}

      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)}
        color= 'primary.900'
        background='primary.200'
        style={{
          display: "block",
          width: "100%",
          padding: "8px",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "16px",
        }}
      />

      {error && (
        <Text color='error.900' marginTop="4px" fontSize= "1rem" fontWeight='bold'>
          {(error.message || "This field is required").toString()}
        </Text>
      )}
    </div>
  );
};

export default InputField;
