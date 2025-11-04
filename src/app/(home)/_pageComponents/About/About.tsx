'use client'
import styles from './About.module.scss';
import {AboutItems} from "@/objects/objects";
import AboutInfo from "@/app/(home)/_pageComponents/About/_components/AboutInfo/AboutInfo";
import Image from "next/image";

export default function About() {

  return (
    <div className={styles.aboutContainer}>
      {AboutItems.map((item, index) => {
        return (
          <div key={index}>
            {index % 2 === 0 ?
              (
                <div className={styles.leftLayout}>
                  <div className={styles.aboutInfo}>
                    <AboutInfo item={item} layout={'left'} />
                  </div>
                  <div className={styles.imageContainer}>
                    <Image
                      className={styles.image}
                      src={item.image}
                      alt="About Image"
                      fill
                      draggable={false}
                    />
                  </div>
                </div>
              ) :
              (
                <div className={styles.rightLayout}>
                  <div className={styles.imageContainer}>
                    <Image
                      className={styles.image}
                      src={item.image}
                      alt="About Image"
                      fill
                      draggable={false}
                    />
                  </div>
                  <div className={styles.aboutInfo}>
                    <AboutInfo item={item} layout={'right'} />
                  </div>
                </div>
              )
            }
          </div>
        )
      })}
    </div>
  )
}