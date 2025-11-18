import {InputElement} from "@/types/types";

export const ContactUsForm: InputElement[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "First name cannot be empty"
      }
    }
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Last name cannot be empty"
      }
    }
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Last name cannot be empty"
      },
      "FORMAT": {
        criteria: "EMAIL",
        message: "Email does not have the right format"
      }
    }
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Subject cannot be empty"
      }
    }
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Subject cannot be empty"
      }
    }
  }
]

export const LoginForm: InputElement[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Subject cannot be empty"
      },
      "FORMAT": {
        criteria: "EMAIL",
        message: "Invalid email format"
      }
    }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      }
    }
  }
]

export const RegisterForm: InputElement[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Subject cannot be empty"
      },
      "FORMAT": {
        criteria: "EMAIL",
        message: "Invalid email format"
      }
    }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      }
    }
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      },
      "MATCH": {
        criteria: "password",
        message: "Password does not match"
      }
    }
  }
]

export const ForgotPasswordForm: InputElement[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Subject cannot be empty"
      },
      "FORMAT": {
        criteria: "EMAIL",
        message: "Invalid email format"
      }
    }
  }
]

export const ResetPasswordForm: InputElement[] = [
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      }
    }
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      },
      "MATCH": {
        criteria: "newPassword",
        message: "Password does not match"
      }
    }
  }
]

export const AddBlogForms: InputElement[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Title cannot be empty"
      }
    }
  },
  {
    name: 'author',
    label: 'Author',
    type: 'text',
    value: '',
    required: false,
    error: false,
    errorMessage: '',
    checkErrors: {
    }
  },
  {
    name: 'mainThumbnail',
    label: 'Main Thumbnail',
    type: 'file',
    value: '',
    required: false,
    error: false,
    errorMessage: '',
    checkErrors: {
    }
  },
]

export const AddBlogParagraphForm: InputElement[] = [
  {
    name: 'paragraphThumbnail',
    label: 'Paragraph Thumbnail',
    type: 'file',
    value: '',
    required: false,
    error: false,
    errorMessage: '',
    checkErrors: {
    }
  },
  {
    name: 'paragraphTitle',
    label: 'Paragraph Title',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Paragraph Title cannot be empty"
      }
    }
  },
  {
    name: 'paragraph',
    label: 'Paragraph',
    type: 'textarea',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Paragraph Title cannot be empty"
      }
    }
  },
]