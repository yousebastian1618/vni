import styles from './styles.module.scss';
import Image from "next/image";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingContainer}>
        <Image
          className={styles.loading}
          src={'/loading.gif'}
          alt="Loading..."
          fill
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 10vw"
          draggable={false}
        />
      </div>
      <span>&nbsp;&nbsp;&nbsp;Loading...</span>
    </div>
  )
}