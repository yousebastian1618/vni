'use client'
import {useApiAction} from "@/actions/apiAction";
import {redirect} from "next/navigation";
import {ResetPasswordClient} from "@/app/(auth)/reset-password/[token]/client";

export default async function ResetPassword({ params }: { params: Promise<{ token: string }> }) {

  const { apiGET } = useApiAction();

  const p = await params;
  const res = await apiGET('/api/v1/auth/check-token', {
    token: p.token
  });
  if (res.status !== 200) {
    redirect('/login');
  }

  return (
    <ResetPasswordClient />
  )
}