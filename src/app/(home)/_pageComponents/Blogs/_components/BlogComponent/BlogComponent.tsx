import styles from './styles.module.scss';
import type {Blog, User} from '@/types/types';
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import React from "react";
import Link from "next/link";

type Props = {
  blog: Blog,
  user: User | null
}

export default function BlogComponent({ blog, user }: Props) {

  return (
    <div className={styles.container}>
      {user && (
        <Link href={`/crud-blog/${blog.id}`} onClick={(e) => e.stopPropagation()}>
          <span className={styles.editIcon}>
            <Icon icon={'edit'} />
          </span>
        </Link>
      )}
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={blog.thumbnail}
          alt={blog.title}
          fill
          draggable={false}
        />
      </div>
      <div className={styles.blogInfo}>
        <div className={styles.blogTitle}>
          {blog.title}
        </div>
        <div className={styles.blogAuthor}>
          {blog.author}
        </div>
      </div>
    </div>
  )
}