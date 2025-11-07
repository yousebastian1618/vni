import {Button} from "@/types/types";

export const ContactUsButton: Button[] = [
  {
    name: 'submit|inquiry',
    label: 'Submit',
    function: 'crud',
    crudType: 'POST'
  }
]

export const LoginButtons: Button[] = [
  {
    name: 'login',
    label: 'Login',
    function: 'crud',
    crudType: 'POST',
    keyDown: 'enter'
  }
]

export const RegisterButton: Button[] = [
  {
    name: 'signup',
    label: 'Sign Up',
    function: 'crud',
    crudType: 'POST',
  }
]

export const ForgotPasswordButton: Button[] = [
  {
    name: 'submit|forgot-password',
    label: 'Submit',
    function: 'crud',
    crudType: 'POST'
  }
]

export const ResetPasswordButton: Button[] = [
  {
    name: 'resetPassword',
    label: 'Reset',
    function: 'crud',
    crudType: 'POST'
  }
]