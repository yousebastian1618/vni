import AuthShell from "@/app/(auth)/_components/AuthShell";
import {LoginForm} from "@/objects/forms";
import {LoginButtons} from "@/objects/buttons";

export default function Login() {
  return (
    <AuthShell
      label={'LOGIN'}
      image={'/auth/login.png'}
      forms={LoginForm}
      buttons={LoginButtons}
    />
  )
}