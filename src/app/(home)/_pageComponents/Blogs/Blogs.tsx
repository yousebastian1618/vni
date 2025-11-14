import styles from './styles.module.scss';
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import BlogComponent from "@/app/(home)/_pageComponents/Blogs/_components/BlogComponent/BlogComponent";
import {MyBlogs} from "@/objects/objects";
import Link from "next/link";

export default function Blogs() {
  return (
    <div className={styles.blogsContainer}>
      <SectionTitle title={'Blogs'} layout={'right'} />
      <div className={styles.blogs}>
        {MyBlogs.map((blog) => {
          return (
            <div key={blog.id} className={styles.blog}>
              <Link href={`/blogs/${blog.id}`}>
                <BlogComponent blog={blog} />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}