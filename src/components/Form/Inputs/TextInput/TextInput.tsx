'use client'
import React, { memo, useCallback } from 'react';
import styles from './TextInput.module.scss';
import type { InputElement } from "@/types/types";

type Props = {
  inputElement: InputElement;
  onChange: (name: string, value: string) => void;
};

function TextInputBase({ inputElement, onChange }: Props) {
  const { name, label, type, value = "", error, errorMessage } = inputElement;


  const handleChange = useCallback(
    (v: string) => onChange(name, v),
    [name, onChange]
  )

  const commonProps = {
    className: styles.inputElement,
    placeholder: label ?? "Type here...",
    value: value as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e.target.value),
    'aria-invalid': error || undefined,
    'aria-describedby': error ? `${name}-error` : undefined,
    name: name,
    type: type
  };

  return (
    <div className={styles.inputContainer}>
      <span className={styles.inputLabel}>
        {label}
        {error && <span className={styles.errorMessage}>&nbsp;&nbsp;({errorMessage})</span>}
      </span>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={10} />
      ) : (
        <input {...commonProps} />
      )}
    </div>
  )
}

const TextInput = memo(TextInputBase, (prev, next) => {
  const a = prev.inputElement;
  const b= next.inputElement;
  return (
    a.name === b.name &&
    a.label === b.label &&
    a.type === b.type &&
    a.value === b.value &&
    a.error === b.error &&
    a.errorMessage === b.errorMessage
  );
});

export default TextInput;