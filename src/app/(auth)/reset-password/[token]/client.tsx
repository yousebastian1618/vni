'use client'
import AuthShell from "@/app/(auth)/_components/AuthShell";
import {ResetPasswordForm} from "@/objects/forms";
import {ResetPasswordButton} from "@/objects/buttons";

export async function ResetPasswordClient() {

  return (
    <AuthShell
      label={'RESET PASSWORD'}
      image={'/auth/reset-password.png'}
      forms={ResetPasswordForm}
      buttons={ResetPasswordButton}
    />
  )
}