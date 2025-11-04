import styles from './AboutInfo.module.scss';

type Props = {
  item: {
    title: string;
    body: string;
    image: string;
  },
  layout: 'left' | 'right';
}

export default function AboutInfo({ item, layout }: Props) {
  return (
    <div className={styles.aboutInfoContainer}>
      <div
        className={`${styles.aboutTitle} ${layout === 'left' ? 'title-left' : 'title-right'}`}>
        {item.title}
      </div>
      <p
        className={`${styles.aboutMessage} 'font-style'`}
        dangerouslySetInnerHTML={{ __html: item.body }}
      >
      </p>
    </div>
  )
}