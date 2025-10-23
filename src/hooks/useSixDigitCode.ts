import { useState, useRef } from 'react';

export const useSixDigitCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Автоматический переход к следующему инпуту через ref
    if (digit !== '' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const deletionKeys = ['Backspace', 'Delete'];

    if (deletionKeys.includes(e.key) && code[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newCode[i] = pastedData[i];
      }
    }
    setCode(newCode);
  };

  const resetCode = () => {
    setCode(['', '', '', '', '', '']);
    inputsRef.current[0]?.focus(); // Фокус на первый инпут после сброса
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputsRef.current[index] = el;
  };

  const isFormValid = code.every(digit => digit !== '');
  const fullCode = code.join('');

  return {
    code,
    fullCode,
    isFormValid,
    handleChange,
    handleKeyDown,
    handlePaste,
    resetCode,
    setInputRef
  };
};