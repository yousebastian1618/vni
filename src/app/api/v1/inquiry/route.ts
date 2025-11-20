import {resend} from '@/lib/mail';
import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.SEND_EMAIL;
    const { firstName, lastName, email, subject, message } = await req.json();
    if (!(adminEmail && fromEmail)) return NextResponse.json({ ok: false });
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: subject,
      text: `From ${firstName} ${lastName} - ${email}\n\nMessage: \n${message}`
    });
    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}