import {Button as ButtonType} from "@/types/types";

type Props = {
  button: ButtonType
}

export default function Button({ button }: Props) {
  return (
    <button
      type={"button"}
      className={'modifiedButtonStyle'}
    >
      {button.label}
    </button>
  )
}