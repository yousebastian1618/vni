'use client'
import styles from './Form.module.scss';
import type {Button as ButtonType, InputElement} from "@/types/types";
import TextInput from "@/components/Form/Inputs/TextInput/TextInput";
import Button from "@/components/Button/Button";
import React, {useCallback, useEffect} from "react";
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
  const { forms, setValue, addForm, convertToParams, resetForm, checkErrors } = useFormStore();

  useEffect(() => {
    if (!forms[label]) {
      addForm(label, form);
    }
  }, [label, form, addForm]);

  const handleChange = useCallback((name: string, value: string | File | null) => {
    setValue(label, name, value)
  }, [label, setValue]);

  const handleClick = async (button: ButtonType) => {
    const hasError = checkErrors(label); // fresh value from the store update
    if (hasError) {
      return;
    }
    await handleClickAction(button, convertToParams(label));
    setTimeout(() => {
      resetForm(label);
    })
  }
  const handleKeydown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      if (buttons) {
        for (const button of buttons) {
          if (button.keyDown) {
            await handleClick(button);
            break;
          }
        }
      }
    }
  }

  if (!forms[label]) {
    return null;
  }

  return (
    <>
      <form className={styles.formContainer} onKeyDown={(e) => handleKeydown(e)}>
        {forms[label].map((formInput: InputElement) => {
          if (formInput.type === 'file') {
            return (
              <FileInput key={formInput.name} inputElement={formInput} onChange={(name, val) => handleChange(name, val)} />
            )
          }
          return (
            <div key={formInput.name}>
              <TextInput
                inputElement={formInput}
                onChange={(name, val) => handleChange(name, val)}
              />
            </div>
          )
        })}
      </form>
      {/*<div className={styles.formFooter}>*/}
      {/*  <FormFooter pageTitle={label} />*/}
      {/*</div>*/}
      <div className={styles.formButtons}>
        {buttons && buttons.map((button, index: number) => {
          return <Button key={index} button={button} handleButtonClick={() => handleClick(button)}/>
        })}
      </div>
    </>
  )
}