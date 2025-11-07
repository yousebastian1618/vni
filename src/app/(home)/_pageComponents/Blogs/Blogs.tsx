import styles from './Blogs.module.scss';
import SectionTitle from "@/components/SectionTitle/SectionTitle";

export default function Blogs() {
  return (
    <div className={styles.blogsContainer}>
      <SectionTitle title={'Blogs'} layout={'right'} />
    </div>
  )
}