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
import Blogs from "@/app/(home)/_pageComponents/Blogs/Blogs";
import Footer from "@/app/(home)/_pageComponents/Footer/Footer";

export default function HomeClient() {

  const introRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const rcRef = useRef<HTMLDivElement | null>(null);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsShrunk(!entry.isIntersecting);
      },
      { threshold: 0.1}
    );

    if (introRef.current) observer.observe(introRef.current);

    const aboutEl = aboutRef.current;
    const rcEl = rcRef.current;

    if (!aboutEl || !rcEl) return;

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutEl.classList.add(styles.fadeInStyle);
        }
      }
    )
    const rcObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rcEl.classList.add(styles.fadeInStyle);
        }
      }
    )
    aboutObserver.observe(aboutEl);
    rcObserver.observe(rcEl);


    return () => {
      observer.disconnect();
      aboutObserver.disconnect();
      rcObserver.disconnect();
    }
  }, []);

  const handleQuickLinkClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <>
      <div className={styles.top}>
        <div className={styles.navigationBar}>
          <NavigationBar shrunk={isShrunk} onQuickLinkClick={(sectionId: string) => handleQuickLinkClick(sectionId)}/>
        </div>
        <div className={styles.introduction} ref={introRef}>
          <Introduction />
        </div>
      </div>
      <div className={styles.mainBody}>
        <div className={styles.about} id="about" ref={aboutRef}>
          <About />
        </div>
        <div className={styles.productionSolution} id={'productSolution'}>
          <ProductSolution />
        </div>
        <div className={styles.products}>
          <Products />
        </div>
        <div className={styles.regulatoryCompliance} id={'regulatoryCompliance'} >
          <div className={styles.regulatoryComplianceContainer} ref={rcRef}>
            <RegulatoryCompliance />
          </div>
        </div>
        <div className={styles.blogs} id={'blogs'}>
          <Blogs />
        </div>
        <div className={styles.faq}>
          <FAQ faqItems={FAQItems} />
        </div>
        <div className={styles.contactUs} id={'contactUs'}>
          <ContactUs />
        </div>
      </div>
      <div className={'horizontalLine'} />
      <div className={styles.footer}>
        <Footer onQuickLinkClick={(sectionId: string) => handleQuickLinkClick(sectionId)}/>
      </div>
    </>

  )
}