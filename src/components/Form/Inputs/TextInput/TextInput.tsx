'use client'
import React, { memo, useCallback } from 'react';
import styles from './TextInput.module.scss';
import type { InputElement } from "@/types/types";

type Props = {
  inputElement: InputElement;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string, value: string) => void;
};

function TextInputBase({ inputElement, onChange, onBlur }: Props) {
  const { name, label, type, value = "", error, errorMessage } = inputElement;


  const handleChange = useCallback(
    (v: string) => onChange(name, v),
    [name, onChange]
  )

  const handleBlur = useCallback(
    (v: string) => onBlur?.(name, v),
    [name, onBlur]
  )

  const commonProps = {
    className: styles.inputElement,
    placeholder: label ?? "Type here...",
    value: value as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e.target.value),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => handleBlur?.(e.target.value),
    'aria-invalid': error || undefined,
    'aria-describedby': error ? `${name}-error` : undefined,
    name: name
  };

  return (
    <div className={styles.inputContainer}>
      <span className={styles.inputLabel}>{label}</span>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={10} />
      ) : (
        <input {...commonProps} />
      )}

      {error && (
        <div id={`${name}-error`} className={styles.inputError}>
          {errorMessage || "Invalid value"}
        </div>
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







// 'use client'
// import styles from './TextInput.module.scss';
// import {InputElement} from "@/types/types";
//
// type Props = {
//   inputElement: InputElement;
// }
//
// export default function TextInput({ inputElement }: Props) {
//
//   const handleChange = (value: string) => {
//     inputElement.value = value;
//   }
//
//   if (inputElement.type === 'textarea') {
//     return (
//       <div className={styles.inputContainer}>
//         <span className={styles.inputLabel}>
//           {inputElement.label}
//         </span>
//         <textarea
//           className={styles.inputElement}
//           onChange={(e) => handleChange(e.target.value)}
//           rows={10}
//           // value={inputElement.value}
//           placeholder={inputElement.label}
//         />
//       </div>
//     )
//   }
//   return (
//     <div className={styles.inputContainer}>
//       <span className={styles.inputLabel}>
//         { inputElement.label}
//       </span>
//       <input
//         className={styles.inputElement}
//         // value={inputElement.value}
//         placeholder={inputElement.label}
//         onChange={(e) => handleChange(e.target.value)}
//       />
//     </div>
//
//   )
// }