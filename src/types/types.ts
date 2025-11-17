type InputType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'file';
type CrudType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';
type CheckErrors = Record<string, {criteria: string; message: string }>

export type InputElement = {
  name: string;
  label: string;
  type: InputType;
  value: string | number | readonly string[] | File | undefined | null;
  required: boolean;
  error: boolean;
  errorMessage: string;
  checkErrors: CheckErrors
}

export type Button = {
  name: string;
  label: string;
  func: 'navigation' | 'crud';
  color?: string;
  backgroundColor?: string;
  hoveringColor?: string;
  route?: string;
  crudType?: CrudType;
  keyDown?: string;
}

export type User = {
  id: string;
  email: string;
}

export type Product = {
  key: string;
  url: string;
  index: number;
}

export type Blog = {
  id: string;
  index: number;
  title: string;
  author: string;
  blogThumbnail: string;
  created: Date,
  paragraphs: BlogParagraph[];
}

export type BlogParagraph = {
  paragraphTitle: string;
  paragraph: string;
  thumbnail: string;
  index: number;
}