import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {Blog} from "@/types/types";
import {deleteObjects} from "@/lib/cloudflare";

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
  try {
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
              title: p[0].title,
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
    return NextResponse.json("Successfully Uploaded", { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    await prisma.$transaction(
      body.map((b: Blog) => prisma.blog.update({
        where: { id: b.id },
        data: { index: b.index }
      }))
    )
    return NextResponse.json("Successfully Updated", { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }

}

export async function DELETE(req: NextRequest) {
  try {
    const blogs = await req.json();
    const ids = blogs.map((blog: Blog) => blog.id);
    const keys: string[] = [];
    for (const blog of blogs) {
      keys.push(`blogs/${blog.thumbnail}`);
      for (const paragraph of blog.paragraphs) {
        if (paragraph.thumbnail) {
          keys.push(`blogs/${paragraph.thumbnail}`);
        }
      }
    }
    await prisma.blog.deleteMany({
      where: {
        id: { in: ids }
      }
    })
    const remaining = await prisma.blog.findMany({
      orderBy: { index: 'asc' },
      select: { id: true }
    })
    const reindex = remaining.map((blog, newIndex) => {
      return prisma.blog.update({
        where: { id: blog.id },
        data: { index: newIndex }
      })
    })
    await prisma.$transaction(reindex);
    await deleteObjects(keys);
    return NextResponse.json('Successfully Deleted', { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}