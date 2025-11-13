'use client'

import styles from './ProductSolution.module.scss';
import {ProductSolutionItems} from "@/objects/objects";
import ProductSolutionItem from "@/app/(home)/_pageComponents/ProductSolution/_components/ProductSolutionItem/ProductSolutionItem";
import Image from "next/image";
import {useEffect, useRef} from "react";

export default function ProductSolution() {

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.fadeInStyle);
          }
        },
        {threshold: 0.3}
      );
      observer.observe(el);
    })
  }, []);

  return (
    <div className={styles.productSolutionContainer}>
      <div className={styles.title}>
        <div id={styles.title1}>Support You</div>
        <div id={styles.title2}>
          <span id={styles.textIdea}>IDEA</span>
          &nbsp;to&nbsp;
          <span id={styles.textShelf}>SHELF</span>
        </div>
      </div>
      <div className={styles.productSolutionItemsContainer}>
        {ProductSolutionItems.map((item, index) => {
          return (
            <div key={index} className={styles.productSolution} ref={(el: HTMLDivElement | null) => {
              refs.current[index] = el;
            }}>
              <ProductSolutionItem item={item} />
              {index !== ProductSolutionItems.length - 1 ?
                (
                  <div className={styles.arrowIconContainer}>
                    <Image
                      className={styles.arrow}
                      src={'/down-arrow.png'}
                      alt={'Down Arrow'}
                      fill
                      sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 10vw"
                      draggable={false}
                    />
                  </div>
                ) :
                (
                  <></>
                )
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}