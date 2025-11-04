import styles from './Products.module.scss';
import SectionTitle from "@/components/SectionTitle/SectionTitle";

export default function Products() {
  return (
    <div className={styles.productsContainer}>
      <SectionTitle title={'What Our Customers Have Launched With Us'} layout={'left'} />
    </div>
  )
}