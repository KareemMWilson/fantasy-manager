// src/components/forms/Form.tsx
import React from "react";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

interface GenericFormProps<FormValues extends FieldValues> {
  methods: UseFormReturn<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  children: React.ReactNode;
}

export function Form<FormValues extends FieldValues>({
  methods,
  onSubmit,
  children,
}: GenericFormProps<FormValues>) {
  return (
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
