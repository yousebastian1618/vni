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