import { useState, ChangeEvent, useCallback } from 'react';

export function useInputsAndValidation() {
  const [inputs, setInputs] = useState({} as any);
  const [errors, setErrors] = useState({} as any);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent) => {
    const { target } = event;
    const { value, name, validationMessage } = target as HTMLInputElement;
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(target.closest('form')?.checkValidity() || false);
  };

  const resetForm = useCallback(
    (newInputs = {}, newErrors = {}, newIsValid = false) => {
      setInputs(newInputs), setErrors(newErrors), setIsValid(newIsValid), setSubmitError(null);
    },
    [setInputs, setErrors, setIsValid]
  );

  return { submitError, setSubmitError, inputs, setInputs, errors, setErrors, isValid, setIsValid, handleChange, resetForm };
}
