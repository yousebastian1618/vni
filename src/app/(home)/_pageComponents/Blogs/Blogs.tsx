import styles from './styles.module.scss';
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import BlogComponent from "@/app/(home)/_pageComponents/Blogs/_components/BlogComponent/BlogComponent";
import {MyBlogs} from "@/objects/objects";
import {AdminBlogsButtons, AdminBlogsCrudButtons} from "@/objects/buttons";
import Button from "@/components/Button/Button";
import {useAuth} from "@/contexts/authContext";
import {useState} from "react";
import {useRouter} from "next/navigation";
import type { Button as ButtonType, Blog as BlogType } from '@/types/types';
import {useHandleClickAction} from "@/actions/clickAction";

export default function Blogs() {

  const router = useRouter();
  const { user } = useAuth();
  const handleClickAction = useHandleClickAction();


  const [selecting, setSelecting] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState<BlogType[]>([]);
  const [sortedBlogs, setSortedBlogs] = useState<BlogType[]>([]);

  const blogs = MyBlogs;

  const toggleAdminBlogButtons = () => {
    if (selecting) {
      return AdminBlogsCrudButtons.filter((button) => button.label !== 'UPDATE');
    }
    if (sorting) {
      return AdminBlogsCrudButtons.filter((button) => button.label !== 'DELETE');
    }
    return AdminBlogsButtons;
  }

  const onHandleClick = async (button: ButtonType) => {
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
      if (name === 'update|blogs') {
         await handleClickAction(button, blogs);
      } else if (name === 'delete|blogs') {
        await handleClickAction(button, selectedBlogs);
      }
    }
  }

  const toggleClick = (blog: BlogType) => {
    if (sorting) return;
    if (!selecting) {
      router.push(`/blogs/${blog.id}`);
      return;
    }
    toggleSelectingBlog(blog);
  }

  const toggleSelectingBlog = (blog: BlogType) => {
    setSelectedBlogs((selected) => {
      if (!blogSelected(blog)) {
        return [...selected, blog]
      }
      return selected.filter((i) => i.id !== blog.id);
    })
  }

  const blogSelected = (blog: BlogType) => {
    return selectedBlogs.some((i) => i.id === blog.id);
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
        {blogs.map((blog, i) => {
          return (
            <div key={blog.id}
                 className={`${styles.blog} ${selecting && !blogSelected(blog) ? 'opacity-40' : 'opacity-100'}`}
                 onClick={() => toggleClick(blog)}
                 draggable={sorting}
            >
              {sorting && <span className={styles.index}>{i + 1}</span>}
              <BlogComponent blog={blog} user={sorting || selecting ? null : user}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}