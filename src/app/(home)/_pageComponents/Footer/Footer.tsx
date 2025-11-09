import styles from './style.module.scss';
import Image from "next/image";
import {ContactInfo, FooterItems} from "@/objects/objects";
import Icon from "@/components/Icon/Icon";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={'/logo.png'}
            alt="Logo"
            fill
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 10vw"
            draggable={false}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.footerItemsContainer}>
          {FooterItems.map((footerItem, index) => {
            return (
              <div key={index} className={styles.footerItem}>
                <h3 className={styles.footerItemTitle}>{footerItem.header.label.toUpperCase()}</h3>
                {footerItem.elements.map((item, idx) => {
                  return (
                    <span className={`${styles.footerItemElement} ${footerItem.header.name === 'quick-link' ? styles.quickLink : ''}`} key={idx}>
                      {item.label}
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className={styles.contactInfoContainer}>
          {ContactInfo.map((item, index) => {
            return (
              <div key={index} className={styles.contactInfoItem}>
                <Icon icon={item.icon} />
                <div className={styles.info} dangerouslySetInnerHTML={{ __html: item.info}}>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}