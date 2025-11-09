'use client'
import styles from './Form.module.scss';
import type {Button as ButtonType, InputElement} from "@/types/types";
import TextInput from "@/components/Form/Inputs/TextInput/TextInput";
import Button from "@/components/Button/Button";
import {useCallback, useEffect, useReducer} from "react";
import {formReducer} from "@/components/Form/formReducer";
import {useHandleClickAction} from "@/actions/clickAction";
import FormFooter from "@/components/Form/FormFooter/FormFooter";

type Props = {
  label: string;
  form: InputElement[];
  buttons?: ButtonType[];
}

export default function Form({ label, form, buttons }: Props) {

  const handleClickAction = useHandleClickAction();

  const [state, dispatch] = useReducer(
    formReducer,
    form,
    (initial) => initial.map(i => ({
      ...i,
      value: i.value ?? "",
      error: i.error ?? false,
      errorMessage: i.errorMessage ?? ""
    }))
  );

  useEffect(() => {
    dispatch({ type: 'reset', initial: form });
  }, [form])

  const setValue = useCallback((name: string, value: string) => {
    dispatch({ type: 'set_value', name, value})
  }, []);

  const setError = useCallback((name: string, error: boolean, errorMessage = "") => {
    dispatch({ type: 'set_error', name, error, errorMessage });
  }, [])

  const handleClick = async (button: ButtonType) => {
    await handleClickAction(button, state);
  }

  return (
    <>
      <form className={styles.formContainer}>
        {state.map(( formInput: InputElement) => {
          return (
            <TextInput
              key={formInput.name}
              inputElement={formInput}
              onChange={(name, val) => setValue(name, val)}
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