import {Button} from "@/types/types";

export const ContactUsButton: Button[] = [
  {
    name: 'submit|inquiry',
    label: 'Submit',
    func: 'crud',
    crudType: 'POST'
  }
]

export const LoginButtons: Button[] = [
  {
    name: 'login',
    label: 'Login',
    func: 'crud',
    crudType: 'POST',
    keyDown: 'enter'
  }
]

export const RegisterButton: Button[] = [
  {
    name: 'signup',
    label: 'Sign Up',
    func: 'crud',
    crudType: 'POST',
  }
]

export const ForgotPasswordButton: Button[] = [
  {
    name: 'submit|forgot-password',
    label: 'Submit',
    func: 'crud',
    crudType: 'POST'
  }
]

export const ResetPasswordButton: Button[] = [
  {
    name: 'resetPassword',
    label: 'Reset',
    func: 'crud',
    crudType: 'POST'
  }
]

export const BackButton: Button = {
  name: 'back',
  label: 'back',
  func: 'crud',
  crudType: 'POST'
}

export const AdminProductsButtons: Button[] = [
  {
    name: 'add|products',
    label: 'ADD +',
    func: 'navigation',
  },
  {
    name: 'select|products',
    label: 'SELECT',
    func: 'navigation',
  },
  {
    name: 'sort|products',
    label: 'SORT',
    func: 'navigation',
  }
]

export const AdminProductsCrudButtons: Button[] = [
  {
    name: 'update|products',
    label: 'UPDATE',
    func: 'crud',
  },
  {
    name: 'delete|products',
    label: 'DELETE',
    func: 'crud',
  },
  {
    name: 'cancel',
    label: 'CANCEL',
    func: 'navigation',
  }
]

export const AdminBlogsButtons: Button[] = [
  {
    name: 'add|blogs',
    label: 'ADD +',
    func: 'navigation',
  },
  {
    name: 'select|blogs',
    label: 'SELECT',
    func: 'navigation',
  },
  {
    name: 'sort|blogs',
    label: 'SORT',
    func: 'navigation',
  }
]

export const AdminBlogsCrudButtons: Button[] = [
  {
    name: 'update|blogs',
    label: 'UPDATE',
    func: 'crud',
  },
  {
    name: 'delete|blogs',
    label: 'DELETE',
    func: 'crud',
  },
  {
    name: 'cancel',
    label: 'CANCEL',
    func: 'navigation',
  }
]