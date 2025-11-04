import type { InputElement } from "@/types/types";


// import type { InputElement } from "@/types/types";
//
// export type FormAction =
//   | { type: 'SET_VALUE'; name: string; value: string }
//   | { type: 'SET_ERROR'; name: string; error: boolean; message: string }
//   | { type: "RESET"; initial: InputElement[] };
//
// export function formReducer(state: InputElement[], action: FormAction): InputElement[] {
//   switch (action.type) {
//     case "SET_VALUE":
//       return state.map((input) =>
//         input.name === action.name ? {...input, value: action.value } : input
//       );
//
//     case "SET_ERROR":
//       return state.map((input) =>
//         input.name === action.name ? {...input, error: action.error, errorMessage: action.message } : input
//       );
//
//     case "RESET":
//       return action.initial.map((i) =>({ ...i, value: "", error: false, errorMessage: ""}));
//
//     default:
//       return state;
//   }
// }