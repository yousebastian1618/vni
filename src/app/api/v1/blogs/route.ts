import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const blogs = await prisma.blog.findMany();
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const {blog, paragraphs} = await req.json();
  console.log('blog: ', blog);
  console.log('paragraphs: ', paragraphs);
  return NextResponse.json({ ok: true });
}