import AuthShell from "@/app/(auth)/_components/AuthShell";
import {RegisterForm} from "@/objects/forms";
import {RegisterButton} from "@/objects/buttons";

export default function Register() {
  return (
    <AuthShell
      label={'REGISTER'}
      image={'/auth/register.png'}
      forms={RegisterForm}
      buttons={RegisterButton}
    />
  )
}