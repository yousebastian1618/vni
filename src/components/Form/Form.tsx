import styles from './Form.module.scss';
import {Button as ButtonType, InputElement} from "@/types/types";
import TextInput from "@/components/Form/Inputs/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { useReducer } from "react";

type Props = {
  form: InputElement[];
  buttons: ButtonType[];
}

export default function Form({ form, buttons }: Props) {
  return (
    <>
      <form className={styles.formContainer}>
        {form.map(( formInput: InputElement, index: number) => {
          return (
            <TextInput key={index} inputElement={formInput} />
          )
        })}
      </form>
      <div className={styles.formButtons}>
        {buttons.map((button, index: number) => {
          return <Button key={index} button={button} />
        })}
      </div>
    </>
  )
}