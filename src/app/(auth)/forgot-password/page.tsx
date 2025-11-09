import AuthShell from "@/app/(auth)/_components/AuthShell";
import {ForgotPasswordForm} from "@/objects/forms";
import {ForgotPasswordButton} from "@/objects/buttons";

export default function ForgotPassword() {
  return (
    <AuthShell
      label={'FORGOT PASSWORD'}
      image={'/auth/forgot-password.png'}
      forms={ForgotPasswordForm}
      buttons={ForgotPasswordButton}
    />
  )
}