'use client'
import styles from './TextInput.module.scss';
import {InputElement} from "@/types/types";

type Props = {
  inputElement: InputElement;
}

export default function TextInput({ inputElement }: Props) {

  const handleChange = (value: string) => {
    inputElement.value = value;
  }

  if (inputElement.type === 'textarea') {
    return (
      <div className={styles.inputContainer}>
        <span className={styles.inputLabel}>
          {inputElement.label}
        </span>
        <textarea
          className={styles.inputElement}
          onChange={(e) => handleChange(e.target.value)}
          rows={10}
          // value={inputElement.value}
          placeholder={inputElement.label}
        />
      </div>
    )
  }
  return (
    <div className={styles.inputContainer}>
      <span className={styles.inputLabel}>
        { inputElement.label}
      </span>
      <input
        className={styles.inputElement}
        // value={inputElement.value}
        placeholder={inputElement.label}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>

  )
}