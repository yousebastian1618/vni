import {deleteObjects, putObject} from "@/lib/cloudflare";
import {NextRequest, NextResponse} from "next/server";
import { v4 as uuid } from "uuid";
import { prisma } from '@/lib/prisma';

export async function GET() {
  const allProducts = await prisma.product.findMany({
    orderBy: {
      index: 'asc'
    }
  });
  const products = allProducts.map((product) => {
    return {
      key: product.id,
      url: `/api/v1/thumbnail?key=${encodeURIComponent('products/' + product.id)}`,
      index: product.index
    }
  })
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }
  const loc = form.get('location') ?? '';
  const id = uuid();
  const key = `${loc}${id}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = file.type || "application/octet-stream";

  await prisma.$transaction([
    prisma.product.updateMany({
      data: {
        index: { increment: 1 },
      }
    }),
    prisma.product.create({
      data: {
        index: 0,
        id
      }
    })
  ])
  await putObject(key, buffer, contentType);
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const updatedProducts = await req.json();
  await prisma.$transaction(
    updatedProducts.map((p: { key: string, url: string, index: number }) => prisma.product.update({
      where: { id: p.key },
      data: { index: p.index }
    }))
  )
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const keys = body.map((item: {key: string, url: string, index: number}) => item.key);
  await prisma.product.deleteMany({
    where: {
      id: { in: keys }
    }
  })
  const remaining = await prisma.product.findMany({
    orderBy: { index: 'asc' },
    select: { id: true }
  })
  const reindex = remaining.map((product, newIndex) => {
    return prisma.product.update({
      where: { id: product.id },
      data: { index: newIndex }
    })
  })
  await prisma.$transaction(reindex);
  const updatedKeys = keys.map((key: string) => `products/${key}`)
  await deleteObjects(updatedKeys);
  return NextResponse.json({ ok: true });
}