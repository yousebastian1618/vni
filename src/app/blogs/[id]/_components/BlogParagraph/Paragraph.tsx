import styles from './styles.module.scss';
import type { BlogParagraph } from "@/types/types";
import Image from "next/image";

type Props = {
  paragraph: BlogParagraph
}

export default function BlogParagraph({ paragraph }: Props) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.paragraphTitle}>
          {paragraph.title}
        </div>
        {(paragraph.thumbnail && paragraph.thumbnail !== '') && (
          <div className={styles.thumbnailContainer}>
            <Image
              className={styles.thumbnail}
              src={paragraph.thumbnail}
              alt={paragraph.title}
              fill
              draggable={false}
            />
          </div>
        )}
        <div className={styles.paragraph}>
          {paragraph.paragraph}
        </div>
      </div>
    </>
  )
}