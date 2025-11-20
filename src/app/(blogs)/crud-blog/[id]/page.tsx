'use client'
import {useEffect, useState} from "react";
import {useBlogs} from "@/hooks/useBlogs";
import { useParams } from 'next/navigation';
import BlogSeed from "@/app/(blogs)/crud-blog/_components/BlogSeed/BlogSeed";
import {Blog} from "@/types/types";

export default function cRudBlog() {

  const { blogs } = useBlogs();
  const [detectedBlog, setDetectedBlog] = useState<Blog | null>(null);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (blogs) {
      const found = blogs.find((i) => i.id === id);
      if (found  !== undefined) {
        setDetectedBlog(found);
      }
    }
  }, [blogs]);

  if (!detectedBlog) {
    return (
      <div>Not detected</div>
    )
  }
  return (
    <BlogSeed blog={detectedBlog} />
  )
}