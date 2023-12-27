import { useEffect } from "react";
import { FieldErrors } from "react-hook-form";

export function useVibrateOnFormError(formErrorObject: FieldErrors<any>) {
  useEffect(() => {
    const hasError = Object.values(formErrorObject).length > 0;

    if (typeof window.navigator.vibrate === "function" && hasError) {
      window.navigator.vibrate(200);
    }
  }, [formErrorObject]);
}
