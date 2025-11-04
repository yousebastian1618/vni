'use client'

import styles from './ProductSolution.module.scss';
import {ProductSolutionItems} from "@/objects/objects";
import ProductSolutionItem from "@/app/(home)/_pageComponents/ProductSolution/_components/ProductSolutionItem/ProductSolutionItem";
import Image from "next/image";

export default function ProductSolution() {
  return (
    <div className={styles.productSolutionContainer}>
      <div className={styles.title}>
        <div id={styles.title1}>Support You</div>
        <div id={styles.title2}>
          <span id={styles.textIdea}>IDEA</span>
          to
          <span id={styles.textShelf}>SHELF</span>
        </div>
      </div>
      <div className={styles.productSolutionItemsContainer}>
        {ProductSolutionItems.map((item, index) => {
          return (
            <div key={index}>
              <ProductSolutionItem item={item} />
              {index !== ProductSolutionItems.length - 1 ?
                (
                  <div className={styles.arrowIconContainer}>
                    <Image
                      className={styles.arrow}
                      src={'/down-arrow.png'}
                      alt={'Down Arrow'}
                      fill
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