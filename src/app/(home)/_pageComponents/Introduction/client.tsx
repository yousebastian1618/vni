'use client'
import styles from './Introduction.module.scss';
import Image from "next/image";
import {useEffect, useState, useRef} from "react";

export default function IntroductionClient() {

  const totalImages = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 5000);
  }

  const selectDot = (index: number) => {
    setCurrentIndex(index);
    startAutoSlide();
  }

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={styles.introductionContainer}>
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
          {[...Array(totalImages)].map((_, i) => {
            return (
              <div key={i} className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={`/home-page/home-page-${i + 1}.png`}
                  alt={`Home Page Image ${i + 1}`}
                  fill
                  priority={i === 0}
                  draggable={false}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.dots}>
        {[...Array(totalImages)].map((_, i) => {
          return (
            <span key={i}
                  className={`${styles.dot} ${i === currentIndex ? styles.active : styles.inactive}`}
                  onClick={() => selectDot(i)}
            >
            </span>
          )
        })}
      </div>
    </div>
  )
}