import React from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";

import { OtpInput } from "@/components/auth/OtpInput";

interface FormOtpInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  length?: number;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
}

export function FormOtpInput<TFieldValues extends FieldValues>({
  control,
  name,
  length,
  rules,
}: FormOtpInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <OtpInput
          length={length}
          value={String(value ?? "")}
          onChangeText={onChange}
        />
      )}
    />
  );
}

