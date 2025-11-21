import {Button} from "@/types/types";

export const LoginButtons: Button[] = [
  {
    name: 'auth|/login',
    label: 'Login',
    func: 'crud',
    crudType: 'POST',
    keyDown: 'enter'
  }
]

export const RegisterButton: Button[] = [
  {
    name: 'auth|/signup',
    label: 'Sign Up',
    func: 'crud',
    crudType: 'POST',
  }
]

export const ForgotPasswordButton: Button[] = [
  {
    name: 'auth|/forgot-password',
    label: 'Submit',
    func: 'crud',
    crudType: 'POST'
  }
]

export const ResetPasswordButton: Button[] = [
  {
    name: 'auth|/reset-password',
    label: 'Reset',
    func: 'crud',
    crudType: 'POST'
  }
]

export const AdminProductsButtons: Button[] = [
  {
    name: 'addProducts',
    label: 'ADD +',
    func: 'navigation',
  },
  {
    name: 'selectProducts',
    label: 'SELECT',
    func: 'navigation',
  },
  {
    name: 'sortProducts',
    label: 'SORT',
    func: 'navigation',
  }
]

export const AdminProductsCrudButtons: Button[] = [
  {
    name: 'update|/products',
    label: 'UPDATE',
    func: 'crud',
  },
  {
    name: 'delete|/products',
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
    name: 'addBlogs',
    label: 'ADD +',
    func: 'navigation',
  },
  {
    name: 'selectBlogs',
    label: 'SELECT',
    func: 'navigation',
  },
  {
    name: 'sortBlogs',
    label: 'SORT',
    func: 'navigation',
  }
]

export const AdminBlogsCrudButtons: Button[] = [
  {
    name: 'update|/blogs',
    label: 'UPDATE',
    func: 'crud',
  },
  {
    name: 'delete|/blogs',
    label: 'DELETE',
    func: 'crud',
  },
  {
    name: 'cancel',
    label: 'CANCEL',
    func: 'navigation',
  }
]

export const AdminBlogsAddButtons: Button[] = [
  {
    name: 'addParagraph',
    label: 'Add Paragraph +',
    func: 'navigation'
  }
]

export const AdminBlogRemovalButton: Button = {
  name: 'removeParagraph',
  label: 'Remove Paragraph -',
  func: 'navigation',
  color: 'var(--main-color)',
  backgroundColor: 'white'
}

export const AdminCrudBlogsButtons: Button[] = [
  {
    name: 'previewBlogs',
    label: 'PREVIEW',
    func: 'navigation',
  },
  {
    name: 'cancel',
    label: 'CANCEL',
    func: 'navigation',
  },
  {
    name: 'gobackBlogs',
    label: 'GO BACK',
    func: 'navigation',
  },
  {
    name: 'create|/blogs',
    label: 'SUBMIT',
    func: 'crud',
  }
]

export const ContactUsButton: Button[] = [
  {
    name: 'create|/inquiry',
    label: 'Submit',
    func: 'crud',
    crudType: 'POST'
  }
]