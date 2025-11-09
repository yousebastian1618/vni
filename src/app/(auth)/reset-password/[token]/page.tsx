import {apiGET} from "@/actions/apiAction";
import {redirect} from "next/navigation";
import {ResetPasswordClient} from "@/app/(auth)/reset-password/[token]/client";

export default async function ResetPassword({ params }: { params: Promise<{ token: string }> }) {

  const p = await params;
  const res = await apiGET('/api/v1/auth/check-token', {
    token: p.token
  });
  if (!res.ok) {
    redirect('/login');
  }

  return (
    <ResetPasswordClient />
  )
}