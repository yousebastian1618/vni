import styles from './styles.module.scss';
import {useFormStore} from "@/stores/formStore";
import Image from "next/image";

export default function Preview() {

  const { forms, getValue } = useFormStore();

  const getParagraphs = () => {
    let index = 1
    const paragraphs = [];
    while (forms[`Paragraph ${index}`]) {
      paragraphs.push(forms[`Paragraph ${index}`]);
      index += 1;
    }
    return paragraphs;
  }

  const previewUrl = (value: File | string) => {
    if (!value) return null;
    if (typeof(value) === 'string') return value;
    return URL.createObjectURL(value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.blogTitle}>{getValue('Blog', 'title')}</h2>
      <div className={styles.author}>{getValue('Blog', 'author')}</div>
      <div className={styles.blogThumbnailContainer}>
        <Image
          className={styles.blogThumbnail}
          src={previewUrl(getValue('Blog', 'thumbnail')) as string}
          alt="Main Blog"
          fill
          draggable={false}
        />
      </div>
      <div className={styles.paragraphs}>
        {getParagraphs().map((paragraph, index) => {
          return (
            <div key={index} className={styles.paragraph}>
              <div className={styles.paragraphTitle}>
                {paragraph[1].value as string}
              </div>
              {paragraph[0].value && (
                <div className={styles.paragraphThumbnailContainer}>
                  <Image
                    className={styles.paragraphThumbnail}
                    src={previewUrl(paragraph[0].value as File | string) as string}
                    alt={`Paragraph ${index + 1}`}
                    fill
                    draggable={false}
                  />
                </div>
              )}
              <div className={styles.paragraphMessage}>
                {paragraph[2].value as string}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}