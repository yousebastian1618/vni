'use client'
import styles from './ProductSolutionItem.module.scss';
import Image from "next/image";

type Props = {
  item: {
    header: Record<string, string>;
    elements: Record<string, string>[];
    icon: string;
    message: string;
  }
}

export default function ProductSolutionItem({ item }: Props) {
  return (
    <div className={styles.productSolutionItem}>
      <div className={styles.productSolutionLeft}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={item.icon}
            alt={item.header.label}
            fill
            draggable={false}
          />
        </div>
        <div className={styles.title}>
          {item.header.label}
        </div>
        <div className={styles.elementsContainer}>
          {item.elements.map((elem, index) => {
            return <span key={index} className={styles.element}>{elem.label}</span>
          })}
        </div>
      </div>
      <div className={styles.productSolutionRight}>
        <p dangerouslySetInnerHTML={{ __html: item.message }}></p>
      </div>
    </div>
  )
}