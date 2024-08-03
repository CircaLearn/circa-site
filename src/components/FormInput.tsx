"use client";

import React, { useState, ChangeEvent, useEffect } from "react";

type FormInputProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showValidation: boolean;
};

export default function FormInput({
  name,
  value,
  placeholder,
  onChange,
  showValidation,
}: FormInputProps) {
  const [internalShowValidation, setInternalShowValidation] =
    useState(showValidation);

  useEffect(() => {
    setInternalShowValidation(showValidation);
  }, [showValidation]);

  const handleFocus = () => {
    setInternalShowValidation(false);
  };

  const handleBlur = () => {
    if (showValidation) {
      setInternalShowValidation(true);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full p-1 border rounded ${
          internalShowValidation && !value
            ? "border-rose-500"
            : "border-gray-300"
        }`}
      />
      {internalShowValidation && !value && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-rose-400 animate-pulse"></div>
      )}
    </div>
  );
}
