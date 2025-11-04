'use client'
import styles from './FAQ.module.scss';
import Image from "next/image";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

type Props = {
  faqItems: {
    index: number;
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ faqItems }: Props) {

  const [currentFaqIndex, setCurrentFaqIndex] = useState(-1);

  const selectFaq = (index: number) => {
    setCurrentFaqIndex(currentFaqIndex === index ? -1 : index);
  }

  return (
    <>
      <SectionTitle title={'FAQ'} layout={'left'} />
      <div className={styles.faqContainer}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={'/faq.png'}
            alt={'FAQ image'}
            fill
            draggable={false}
          />
        </div>
        <div className={styles.faqItems}>
          {faqItems.map((item, index) => {
            return (
              <div key={index} className={styles.qaContainer}>
                <div className={'horizontalLine'} />
                <div
                  className={styles.question}
                  onClick={() => selectFaq(index)}
                >
                  {item.index}. {item.question}
                </div>
                <div
                  className={styles.answer}
                  style={{ display: currentFaqIndex === index ? 'block' : 'none'}}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                >
                </div>
                {index === faqItems.length - 1 ? (
                  <div className={'horizontalLine'} />
                ) : (<></>)}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}