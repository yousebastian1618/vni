'use client'
import {useApiAction} from "@/actions/apiAction";
import styles from "@/app/(home)/_pageComponents/Products/Products.module.scss";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Icon from "@/components/Icon/Icon";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";

export default function Products() {

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const totalPages = Math.max(0, Math.ceil(items.length / pageSize) - 1);
  const pageItems = useMemo(
    () => items.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [items, pageSize, currentPage]
  );

  const { apiGET } = useApiAction();

  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width < 900) setPageSize(5);
      else if (width < 1400) setPageSize(7);
      else setPageSize(10);
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await apiGET('/products');
      setItems(res.data ?? []);
    })()
  }, []);

  return (
    <div className={styles.container}>
      <SectionTitle title={'What Our Customers Have Launched With Us'} layout={'left'} />
      <div className={styles.productsContainer}>
        <div className={styles.arrow} onClick={() => setCurrentPage(p => Math.max(0, p - 1))}>
          <Icon icon={'arrow_left'} />
        </div>
        <div className={styles.products}>
          {pageItems.map((item: { key: string, url: string}, i: number) => {
            return (
              <div key={i} className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={item.url}
                  alt={`Product ${i}`}
                  fill
                  priority={i < pageSize}
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 80vw, 80vw"
                  draggable={false}
                />
              </div>
            )
          })}
        </div>
        <div className={styles.arrow} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
          <Icon icon={'arrow_right'} />
        </div>
      </div>
    </div>
  )
}