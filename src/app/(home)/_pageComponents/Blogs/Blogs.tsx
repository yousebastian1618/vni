import styles from './styles.module.scss';
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import BlogComponent from "@/app/(home)/_pageComponents/Blogs/_components/BlogComponent/BlogComponent";
import {AdminBlogsButtons, AdminBlogsCrudButtons} from "@/objects/buttons";
import Button from "@/components/Button/Button";
import {useAuth} from "@/contexts/authContext";
import {useEffect, useMemo, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import type { Button as ButtonType, Blog as BlogType } from '@/types/types';
import {useHandleClickAction} from "@/actions/clickAction";
import {useBlogs} from "@/hooks/useBlogs";
import Icon from "@/components/Icon/Icon";

export default function Blogs() {
  const defaultPageSize = 4;
  const draggingItem = useRef<BlogType | null>(null);
  const dragoverItem = useRef<BlogType | null>(null);

  const { blogs, mutateBlogs } = useBlogs();
  const router = useRouter();
  const { user } = useAuth();
  const handleClickAction = useHandleClickAction();

  const [items, setItems] = useState<BlogType[]>([]);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const [selecting, setSelecting] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    if (blogs) {
      const sorted = [...blogs].sort((a, b) => a.index - b.index);
      setItems(sorted);
    }
  }, [blogs]);

  const totalPages = Math.max(0, Math.ceil(items.length / pageSize) - 1);
  const pageItems = useMemo(
    () => items.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [items, pageSize, currentPage]
  )

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
        setPageSize(defaultPageSize);
        if (blogs) {
          const sorted = [...blogs].sort((a, b) => a.index - b.index);
          setItems(sorted);
        }
      } else if (name === 'select|blogs') {
        setPageSize(items.length);
        setSelecting(true);
        setSelectedBlogs([]);
      } else if (name === 'sort|blogs') {
        setPageSize(items.length);
        setSorting(true);
        setSelectedBlogs([]);
      } else if (name === 'add|blogs') {
        router.push('/add-blogs');
      }
    } else if (func === 'crud') {
      if (name === 'update|blogs') {
        await handleClickAction(button, items);
      } else if (name === 'delete|blogs') {
        await handleClickAction(button, selectedBlogs);
      }
      await mutateBlogs();
      setPageSize(defaultPageSize);
      setSelecting(false);
      setSorting(false);
      setSelectedBlogs([]);
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

  const handleOnDragStart = (item: BlogType) => {
    if (!sorting) return;
    draggingItem.current = item;
  }

  const handleOnDragEnter = (item: BlogType) => {
    if (!sorting) return;
    const dragItem = draggingItem.current;
    if (!dragItem) return;
    if (dragItem.id === item.id) return;
    dragoverItem.current = item;
    setItems((prev) => {
      const updated = [...prev];
      const dragIndex = updated.findIndex((p) => p.id === dragItem.id);
      const overIndex = updated.findIndex((p) => p.id  === item.id);
      if (dragIndex === -1 || overIndex === -1) return prev;
      if (dragIndex === overIndex) return prev;
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(overIndex, 0, removed);
      return updated;
    })
  }

  const handleDragEnd = () => {
    if (!sorting) return;
    setItems((prev) =>
      prev.map((item, index) => ({
        ...item,
        index
      }))
    )
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
      <div className={styles.blogListContainer}>
        {!(sorting || selecting) && (
          <div onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
               className={`${styles.arrow} ${currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
            <Icon icon={'arrow_left'} />
          </div>
        )}
        <div className={styles.blogs}>
          {pageItems.map((blog, i) => {
            return (
              <div key={blog.id}
                   className={`${styles.blog} ${selecting && !blogSelected(blog) ? 'opacity-40' : 'opacity-100'}`}
                   onClick={() => toggleClick(blog)}
                   draggable={sorting}
                   onDragStart={() => handleOnDragStart(blog)}
                   onDragEnter={() => handleOnDragEnter(blog)}
                   onDragEnd={handleDragEnd}
                   onDragOver={(e) => e.preventDefault()}
              >
                {sorting && <span className={styles.index}>{i + 1}</span>}
                <BlogComponent blog={blog} user={sorting || selecting ? null : user}/>
              </div>
            )
          })}
        </div>
        {!(sorting || selecting) && (
          <div onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
               className={`${styles.arrow} ${currentPage >= Math.ceil(items.length / pageSize) - 1 ? 'opacity-20 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
            <Icon icon={'arrow_right'} />
          </div>
        )}
      </div>
    </div>
  )
}