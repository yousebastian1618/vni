'use client'

import styles from './Home.module.scss';
import NavigationBar from "@/app/(home)/_pageComponents/NavigationBar/NavigationBar";
import Introduction from "@/app/(home)/_pageComponents/Introduction/page";
import About from "@/app/(home)/_pageComponents/About/About";
import ProductSolution from "@/app/(home)/_pageComponents/ProductSolution/ProductSolution";
import RegulatoryCompliance from "@/app/(home)/_pageComponents/RegulatoryCompliance/RegulatoryCompliance";
import Products from "@/app/(home)/_pageComponents/Products/Products";
import FAQ from "@/app/(home)/_pageComponents/FAQ/FAQ";
import {FAQItems} from "@/objects/objects";
import ContactUs from "@/app/(home)/_pageComponents/ContactUs/ContactUs";
import {useEffect, useRef, useState} from "react";

export default function HomeClient() {

  const introRef = useRef<HTMLDivElement | null>(null);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsShrunk(!entry.isIntersecting);
      },
      { threshold: 0.1}
    );

    if (introRef.current) observer.observe(introRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.navigationBar}>
        <NavigationBar shrunk={isShrunk} />
      </div>
      <div className={styles.introduction} ref={introRef}>
        <Introduction />
      </div>
      <div className={styles.about}>
        <About />
      </div>
      <div className={styles.productionSolution}>
        <ProductSolution />
      </div>
      <div className={styles.products}>
        <Products />
      </div>
      <div className={styles.regulatoryCompliance}>
        <RegulatoryCompliance />
      </div>
      <div className={styles.faq}>
        <FAQ faqItems={FAQItems} />
      </div>
      <div className={styles.contactUs}>
        <ContactUs />
      </div>
    </>

  )
}