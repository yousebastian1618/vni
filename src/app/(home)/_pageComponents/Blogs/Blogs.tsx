import styles from './styles.module.scss';
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import BlogComponent from "@/app/(home)/_pageComponents/Blogs/_components/BlogComponent/BlogComponent";
import {MyBlogs} from "@/objects/objects";
import Link from "next/link";
import {AdminBlogsButtons, AdminBlogsCrudButtons} from "@/objects/buttons";
import Button from "@/components/Button/Button";
import {useAuth} from "@/contexts/authContext";
import {useState} from "react";
import {useRouter} from "next/navigation";
import type { Button as ButtonType, Blog as BlogType } from '@/types/types';

export default function Blogs() {

  const router = useRouter();
  const { user } = useAuth();


  const [selecting, setSelecting] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState<BlogType[]>([]);
  const [sortedBlogs, setSortedBlogs] = useState<BlogType[]>([]);

  const blogs = MyBlogs;

  const toggleAdminBlogButtons = () => {
    if (selecting) {
      return AdminBlogsCrudButtons.filter((button) => button.label !== 'DELETE');
    }
    if (sorting) {
      return AdminBlogsCrudButtons.filter((button) => button.label !== 'UPDATE');
    }
    return AdminBlogsButtons;
  }

  const onHandleClick = (button: ButtonType) => {
    const { func, name } = button;
    if (func === 'navigation') {
      if (name === 'cancel') {
        setSelecting(false);
        setSorting(false);
        setSelectedBlogs([]);
        setSortedBlogs([]);
      } else if (name === 'select|blogs') {
        setSelecting(true);
        setSelectedBlogs([]);
      } else if (name === 'sort|blogs') {
        setSorting(true);
        setSortedBlogs([]);
      } else if (name === 'add|blogs') {
        router.push('/add-blogs');
      }
    } else if (func === 'crud') {

    }
  }

  return (
    <div className={styles.blogsContainer}>
      <SectionTitle title={'Blogs'} layout={'right'} />
      <div className={styles.adminButtons}>
        {user && toggleAdminBlogButtons().map((button, index) => {
          return (
            <div key={index} className={styles.button}>
              <Button button={button} handleButtonClick={() => onHandleClick(button)}/>
            </div>
          )
        })}
      </div>
      <div className={styles.blogs}>
        {blogs.map((blog) => {
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