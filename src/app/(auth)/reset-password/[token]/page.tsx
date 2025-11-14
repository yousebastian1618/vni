'use client'
import {useApiAction} from "@/actions/apiAction";
import {redirect} from "next/navigation";
import {ResetPasswordClient} from "@/app/(auth)/reset-password/[token]/client";

export default async function ResetPassword({ params }: { params: Promise<{ token: string }> }) {

  const { apiGET } = useApiAction();

  const p = await params;
  const res = await apiGET('/auth/check-token', {
    token: p.token
  });
  if (!res) {
    redirect('/login');
  }

  return (
    <ResetPasswordClient />
  )
}