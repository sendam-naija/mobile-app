import React from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";

import { AppInput, type AppInputProps } from "@/components/ui/AppInput";

type FormAppInputProps<TFieldValues extends FieldValues> = Omit<
  AppInputProps,
  "value" | "onChangeText" | "onBlur"
> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  formatValue?: (value: string) => string;
};

export function FormAppInput<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  formatValue,
  ...inputProps
}: FormAppInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) => (
        <AppInput
          value={String(value ?? "")}
          onBlur={onBlur}
          onChangeText={(text) =>
            onChange(formatValue ? formatValue(text) : text)
          }
          {...inputProps}
        />
      )}
    />
  );
}

export default FormAppInput;
