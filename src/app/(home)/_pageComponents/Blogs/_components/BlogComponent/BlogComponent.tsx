import styles from './styles.module.scss';
import type { Blog } from '@/types/types';
import Image from "next/image";

type Props = {
  blog: Blog
}

export default function BlogComponent({ blog }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={blog.blogThumbnail}
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