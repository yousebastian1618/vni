import type {Button} from "@/types/types";
import {useHandleClickAction} from "@/actions/clickAction";
import React from "react";

type Props = {
  button: Button,
  handleButtonClick?: (button: Button) => void;
}

export default function Button({ button, handleButtonClick }: Props) {

  const handleClickAction = useHandleClickAction();

  const handleClick = () => {
    (handleButtonClick ?? handleClickAction)(button);
  }

  return (
    <button
      type={"button"}
      className={'modifiedButtonStyle'}
      onClick={() => handleClick()}
    >
      {button.label}
    </button>
  )
}