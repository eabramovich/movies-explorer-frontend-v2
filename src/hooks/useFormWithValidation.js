import React, { useCallback } from "react";
import { emailRegex, message } from "../utils/constants";

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value.trim();
    if (name === "email") {
      const isValidEmail = emailRegex.test(value);
      const errorMessage = (!isValidEmail && !target.validationMessage) ? message.validationMessage.incorrectEmail : target.validationMessage;
      setErrors({ ...errors, [name]: errorMessage });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
