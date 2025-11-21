import {NextRequest, NextResponse} from "next/server";
import {Blog} from "@/types/types";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
  const { id: blogId } = await params;
  const body = await req.json();
  const {
    blog,
    paragraphs,
  }: { blog: Blog; paragraphs: any[] } = body;
  await prisma.blog.update({
    where: { id: blogId },
    data: {
      title: blog.title,
      author: blog.author,
      thumbnail: blog.thumbnail ?? null,
      paragraphs: {
        deleteMany: {},
        create: (paragraphs ?? []).map((p, index: number) => ({
          title: p[0].title,
          paragraph: p[0].paragraph,
          thumbnail: p[0].thumbnail ?? null,
          index: parseInt(p[0].index ?? index)
        })),
      },
    },
  });
  return NextResponse.json("Successfully Updated", { status: 200 });
}