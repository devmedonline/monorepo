import { useEffect } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";


export function useFormResetDefaultValues<T extends FieldValues>(
  defaultValues: Partial<T> | undefined,
  form: { reset: UseFormReset<any> },
) {
  useEffect(() => {
    if (defaultValues) form.reset(defaultValues);
  }, [defaultValues, form]);
}
