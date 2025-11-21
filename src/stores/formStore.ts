import { create } from 'zustand';
import type {Button, InputElement} from "@/types/types";
import {errorHandling} from "@/actions/errorAction";

type FormState = {
  forms: Record<string, InputElement[]>;
  buttons?: Button[];
}

type FormAction = {
  addForm: (formName: string, form: InputElement[]) => void;
  getForm: (formName: string) => InputElement[];
  setForm: (formName: string, obj: any) => void;
  setValue: (formName: string, name: string, value: string | File | number | null) => void;
  getValue: (formName: string, name: string) => any;
  convertToParams: (formName: string) => Record<string, string>;
  getContents: (formName: string) => FormData;
  swapFormNames: (formName1: string, formName2: string) => void;
  checkErrors: (formName: string) => boolean;
  setError: (formName: string, name: string, errorMessage: string) => void;
  removeError: (formName: string, name: string) => void;
  resetForm: (formName: string) => void;
  removeForm: (formName: string) => void;
  removeAll: () => void;
}

export const useFormStore = create<FormState & FormAction>((set, get) => ({
  forms: {},
  buttons: [],
  addForm: (formName, form) => {
    return set((state) => ({
      forms: {
        ...state.forms,
        [formName]: [...form]
      }
    }))
  },
  getForm: (formName) => {
    return get().forms[formName] ?? [];
  },
  getValue: (formName, name) => {
    const form = get().forms[formName];
    if (!form) return undefined;
    const field = form.find((i) => i.name === name);
    return field?.value;
  },
  convertToParams: (formName: string) => {
    const form = get().forms[formName];
    if (!form) return {};
    const obj: Record<string, any> = {};
    const formData = new FormData();
    form.forEach((i: InputElement) => {
      if (i.value instanceof File) {
        if (formName.includes('Paragraph') || formName.includes('Blog')) {
          formData.append('key', formName);
          formData.append('file', i.value);
          formData.append('location', 'blogs/')
        }

      } else {
        obj[i.name] = i.value;
      }
    });
    if (formName.includes('Paragraph')) {
      obj['index'] = formName.split(' ')[1];
    }
    return [obj, formData];
  },
  setForm: (formName: string, obj: any)=> {
    return set((state) => {
      const form = state.forms[formName];
      if (!form) return state;
      const updatedForm = form.map((input) => {
        if (Object.prototype.hasOwnProperty.call(obj, input.name)) {
          return {
            ...input,
            value: obj[input.name],
          };
        }
        return input;
      });
      return {
        forms: {
          ...state.forms,
          [formName]: updatedForm,
        },
      };
    });
  },
  getContents: (formName: string) => {
    const form = get().forms[formName];
    if (!form) return new FormData();
    const formData = new FormData();
    formData.append('key', formName);
    form.forEach((i) => {
      if (i.value instanceof File) {
        formData.append('file', i.value);
      }
    })
    return formData;
  },
  setValue: (formName, name, value) => {
    return set((state) => {
      const form = state.forms[formName];
      if (!form) return state;
      return {
        forms: {
          ...state.forms,
          [formName]: form.map((input) => {
            return input.name === name ? { ...input, value } : input
          })
        }
      }
    })
  },
  swapFormNames: (formName1, formName2) => {
    return set((state) => {
      const updatedForms = {...state.forms};
      [updatedForms[formName1], updatedForms[formName2]] = [updatedForms[formName2], updatedForms[formName1]];
      return {
        forms: updatedForms
      }
    })
  },
  checkErrors: (formName) => {
    let hasError = false;

    set((state) => {
      const form = state.forms[formName];
      if (!form) return state;

      const updatedForm = form.map((input) => {
        let error: boolean;
        let errorMessage: string;
        errorMessage = errorHandling({ ...input, error: false, errorMessage: "" });
        error = errorMessage !== "";

        if (error) hasError = true;

        return {
          ...input,
          error,
          errorMessage,
        };
      });

      return {
        ...state,
        forms: {
          ...state.forms,
          [formName]: updatedForm,
        },
      };
    });

    return hasError;
  },
  setError: (formName, name, errorMessage) => {
    return set((state) => {
      const form = state.forms[formName];
      if (!form) return state;
      return {
        forms: {
          ...state.forms,
          [formName]: form.map((input) => {
            return input.name === name ? { ...input, error: true, errorMessage: errorMessage } : input;
          })
        }
      }
    })
  },
  removeError: (formName, name) => {
    return set((state) => {
      const form = state.forms[formName];
      if (!form) return state;
      return {
        forms: {
          ...state.forms,
          [formName]: form.map((input) => {
            return input.name === name ? { ...input, error: false, errorMessage: '' } : input;
          })
        }
      }
    })
  },
  resetForm: (formName) => {
    return set((state) => {
      const form = state.forms[formName];
      if (!form) return state;
      return {
        forms: {
          ...state.forms,
          [formName]: form.map((input) => {
            return {...input, value: '', error: false, errorMessage: ''}
          })
        }
      }
    })
  },
  removeForm: (formName) => {
    return set((state) => {
      const updatedForm = {...state.forms};
      delete updatedForm[formName];
      return {
        forms: updatedForm
      }
    })
  },
  removeAll: () => {
    return set(() => ({
      forms: {},
      buttons: []
    }))
  }
}))