'use client'
import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import {MyBlogs} from "@/objects/objects";
import Image from "next/image";
import BlogParagraph from "@/app/blogs/[id]/_components/BlogParagraph/Paragraph";
import Icon from "@/components/Icon/Icon";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import type {Blog} from "@/types/types";

export default function BlogDetail() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const currentBlog = MyBlogs.find((b) => b.id === blogId);
    if (!currentBlog) {
      router.push('/');
      return;
    }
    setBlog(currentBlog);
  }, [blogId]);

  return (
    <div className={styles.container}>
      <Link href={'/'}>
        <button type='button'
                className={`${styles.backButton} modifiedButtonStyle`}
        >
          <Icon icon={'back'} />
          Back
        </button>
      </Link>
      <div className={styles.blogTitle}>
        {blog?.title}
      </div>
      {blog && blog.blogThumbnail !== '' && (
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={blog.blogThumbnail}
            alt={blog.title}
            fill
            draggable={false}
          />
        </div>
      )}
      <div className={styles.paragraphs}>
        {blog?.paragraphs.map((paragraph, index) => {
          return (
            <div key={index} className={styles.paragraph}>
              <BlogParagraph paragraph={paragraph} />
            </div>
          )
        })}
      </div>
    </div>
  )
}