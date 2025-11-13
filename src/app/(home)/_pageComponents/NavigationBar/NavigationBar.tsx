import styles from './NavigationBar.module.scss';
import Image from "next/image";
import {NavigationBarItems} from "@/objects/objects";
import {useMemo} from "react";
import {useAuth} from "@/contexts/authContext";

type Props = {
  shrunk: boolean;
  onQuickLinkClick: (sectionId: string) => void;
}

export default function NavigationBar({ shrunk, onQuickLinkClick }: Props) {

  const { user, logout } = useAuth();
  const navigationBarElements = useMemo(() => {
    return user
      ? NavigationBarItems
      : NavigationBarItems.filter((item) => item.name !== "logout");
  }, [user]);

  const handleClick = async (item: { name: string, label: string }) => {
    if (item.name === 'logout') {
      await logout();
      return;
    }
    onQuickLinkClick(item.name);
  }

  return (
    <div className={`${styles.navigationBarContainer} ${shrunk ? styles.shrunk : ''}`}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={'/logo.png'}
          alt='Vitali Nutrition Logo'
          fill
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 10vw"
          draggable={false}
        />
      </div>
      <div className={styles.navigationBarItemsContainer}>
        {navigationBarElements.map((item) => {
          return <span key={item.name} onClick={() => handleClick(item)}>{item.label}</span>
        })}
      </div>
    </div>
  )
}