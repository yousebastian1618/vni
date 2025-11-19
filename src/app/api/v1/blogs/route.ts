import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      index: 'asc'
    },
    include: {
      paragraphs: {
        orderBy: {
          index: "asc",
        },
      },
    },
  });
  const allBlogs = blogs.map((blog) => ({
    ...blog,
    thumbnail: blog.thumbnail
      ? `/api/v1/thumbnail?key=${encodeURIComponent(
        "blogs/" + blog.thumbnail
      )}`
      : null,
    paragraphs: blog.paragraphs.map((p) => ({
      ...p,
      thumbnail: p.thumbnail
        ? `/api/v1/thumbnail?key=${encodeURIComponent(
          "blogs/" + p.thumbnail
        )}`
        : null,
    })),
  }));
  return NextResponse.json(allBlogs);
}

export async function POST(req: NextRequest) {
  const {blog, paragraphs} = await req.json();
  const blogData = Array.isArray(blog) ? blog[0] :blog;
  await prisma.$transaction([
    prisma.blog.updateMany({
      data: {
        index: { increment: 1 }
      }
    }),
    prisma.blog.create({
      data: {
        title: blogData.title,
        author: blogData.author,
        thumbnail: blogData.thumbnail ?? null,
        index: 0,
        paragraphs: {
          create: (paragraphs ?? []).map((p: any) => ({
            title: p[0].paragraphTitle,
            paragraph: p[0].paragraph,
            thumbnail: p[0].thumbnail ?? null,
            index: parseInt(p[0].index)
          }))
        }
      },
      include: {
        paragraphs: true
      }
    })
  ])
  return NextResponse.json({ ok: true });
}