import styles from './NavigationBar.module.scss';
import Image from "next/image";
import {NavigationBarItems} from "@/objects/objects";

type Props = {
  shrunk: boolean;
}

export default function NavigationBar({ shrunk }: Props) {

  return (
    <div className={`${styles.navigationBarContainer} ${shrunk ? styles.shrunk : ''}`}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={'/logo.png'}
          alt='Vitali Nutrition Logo'
          fill
          draggable={false}
        />
      </div>
      <div className={styles.navigationBarItemsContainer}>
        {NavigationBarItems.map((item) => {
          return <span key={item.name}>{item.label}</span>
        })}
      </div>
    </div>
  )
}