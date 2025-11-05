import type { InputElement } from "@/types/types";

export type FormAction =
  { type: 'set_value'; name: string; value: string } |
  { type: 'set_error'; name: string; error: boolean; errorMessage: string } |
  { type: 'reset'; initial: InputElement[] }

export function formReducer(state: InputElement[], action: FormAction) {
  switch (action.type) {
    case "set_value":
      return state.map((input) =>
        input.name === action.name ? {...input, value: action.value } : input
      );
    case 'set_error':
      return state.map((input) =>
        input.name === action.name ? {...input, error: action.error, errorMessage: action.errorMessage} : input
      );
    case 'reset':
      return action.initial.map((i: InputElement) => ({ ...i, value: "", error: false, errorMessage: "" }))
    default:
      return state;
  }
}
