import styles from './styles.module.scss';
import type {Blog, User} from '@/types/types';
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import React from "react";

type Props = {
  blog: Blog,
  user: User | null
}

export default function BlogComponent({ blog, user }: Props) {

  const editBlog = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  }

  return (
    <div className={styles.container}>
      {user && (
        <span className={styles.editIcon} onClick={(e) => editBlog(e)}>
          <Icon icon={'edit'} />
        </span>
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