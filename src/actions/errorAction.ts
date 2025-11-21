'use client'

import {InputElement} from "@/types/types";


export function errorHandling(form: InputElement) {
  const checkError = form.checkErrors;
  for (const key in checkError) {
    if (key === 'NOT_EMPTY') {
      if (!checkNotEmpty(form.value as string | File)) {
        return checkError[key].message;
      }
    }
    if (key === 'FORMAT') {
      if (!checkFormat(checkError[key].criteria, form.value as string)) {
        return checkError[key].message;
      }
    }
  }
  return ''
}

const checkNotEmpty = (value: string | File) => {
  return !(value === undefined || value === null || value === '');
}
const checkFormat = (criteria: string, value: string) => {
  if (criteria === 'EMAIL') {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  }
  return true;
}