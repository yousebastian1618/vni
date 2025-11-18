'use client'
import styles from './Form.module.scss';
import type {Button as ButtonType, InputElement} from "@/types/types";
import TextInput from "@/components/Form/Inputs/TextInput/TextInput";
import Button from "@/components/Button/Button";
import {useCallback, useEffect} from "react";
import {useHandleClickAction} from "@/actions/clickAction";
import FormFooter from "@/components/Form/FormFooter/FormFooter";
import FileInput from "@/components/Form/Inputs/FileInput/FileInput";
import {useFormStore} from "@/stores/formStore";

type Props = {
  label: string;
  form: InputElement[];
  buttons?: ButtonType[];
}

export default function Form({ label, form, buttons }: Props) {

  const handleClickAction = useHandleClickAction();

  const { forms, setValue, addForm } = useFormStore();

  useEffect(() => {
    if (!forms[label]) {
      addForm(label, form);
    }
  }, [label, form, addForm]);

  const handleChange = useCallback((name: string, value: string | File | null) => {
    setValue(label, name, value)
  }, [label, setValue]);

  // const setError = useCallback((name: string, error: boolean, errorMessage = "") => {
    // dispatch({ type: 'set_error', name, error, errorMessage });
  // }, [])

  const handleClick = async (button: ButtonType) => {
    await handleClickAction(button, forms[label]);
  }

  if (!forms[label]) {
    return null;
  }

  return (
    <>
      <form className={styles.formContainer}>
        {forms[label].map((formInput: InputElement) => {
          if (formInput.type === 'file') {
            return (
              <FileInput key={formInput.name} inputElement={formInput} onChange={(name, val) => handleChange(name, val)} />
            )
          }
          return (
            <TextInput
              key={formInput.name}
              inputElement={formInput}
              onChange={(name, val) => handleChange(name, val)}
              // onBlur={( name, val ) => {
              //   const required = formInput.required;
              //   const empty = !String(val).trim();
              //   setError(name, required && empty, required && empty ? 'Required' : '');
              // }}
            />
          )
        })}
      </form>
      <div className={styles.formFooter}>
        <FormFooter pageTitle={label} />
      </div>
      <div className={styles.formButtons}>
        {buttons && buttons.map((button, index: number) => {
          return <Button key={index} button={button} handleButtonClick={() => handleClick(button)}/>
        })}
      </div>
    </>
  )
}