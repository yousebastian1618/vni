'use client'
import styles from "@/app/(home)/_pageComponents/Products/Products.module.scss";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Icon from "@/components/Icon/Icon";
import Image from "next/image";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useProducts} from "@/hooks/useProducts";
import {useModal} from "@/contexts/modalContext";
import {AdminProductsButtons, AdminProductsCrudButtons} from "@/objects/buttons";
import Button from "@/components/Button/Button";
import {useAuth} from "@/contexts/authContext";
import type {Button as ButtonType, Product as ProductType} from "@/types/types";
import {useHandleClickAction} from "@/actions/clickAction";

export default function Products() {
  const defaultPageSize = 10;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const draggingItem = useRef<ProductType | null>(null);
  const dragoverItem = useRef<ProductType | null>(null);

  const { products, mutateProducts } = useProducts();
  const { openModal } = useModal();
  const { user } = useAuth();
  const handleClickAction = useHandleClickAction();

  const [items, setItems] = useState<ProductType[]>([]);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const [selecting, setSelecting] = useState(false);
  const [sorting, setSorting] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (products) {
      const sorted = [...products].sort((a, b) => a.index - b.index);
      setItems(sorted);
    }
  }, [products]);

  const totalPages = Math.max(0, Math.ceil(items.length / pageSize) - 1);
  const pageItems = useMemo(
    () => items.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [items, pageSize, currentPage]
  );

  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width < 900) setPageSize(5);
      else if (width < 1400) setPageSize(7);
      else setPageSize(defaultPageSize);
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  const toggleAdminProductsButtons = () => {
    if (selecting) {
      return AdminProductsCrudButtons.filter((button) => button.label !== 'UPDATE');
    }
    if (sorting) {
      return AdminProductsCrudButtons.filter((button) => button.label !== 'DELETE');
    }
    return AdminProductsButtons;
  }

  const toggleProductClick = (item: ProductType) => {
    if (sorting) return;
    if (!selecting) {
      openModal(
        'products',
        'Sample Products',
        item,
        AdminProductsButtons,
        products
      )
    } else {
      toggleSelectingProduct(item);
    }
  }

  const toggleSelectingProduct = (item: ProductType) => {
    setSelectedProducts((selected) => {
      if (!itemSelected(item)) {
        return [...selected, item];
      }
      return selected.filter((i) => i.key !== item.key);
    })
  }

  const itemSelected = (item: ProductType) => {
    return selectedProducts.some((i) => i.key === item.key);
  }

  const addProduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (const file of e.target.files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('location', 'products/');
      const button = {...AdminProductsButtons[0]}
      button.func = 'crud';
      await handleClickAction(button, formData);
    }
    await mutateProducts();
  }

  const onHandleClick = async (button: ButtonType) => {
    const { name, func } = button;
    if (func === 'navigation') {
      if (name === 'add|products') {
        fileInputRef.current?.click();
      } else if (name === 'select|products') {
        setPageSize(items.length)
        setSelecting(true);
        setSelectedProducts([]);
      } else if (name === 'sort|products') {
        setPageSize(items.length)
        setSorting(true);
      } else if (name === 'cancel') {
        setSelecting(false);
        setSorting(false);
        setSelectedProducts([]);
        setPageSize(defaultPageSize);
        if (products) {
          const sorted = [...products].sort((a, b) => a.index - b.index);
          setItems(sorted);
        }
      }
    } else {
      if (selecting) {
        await handleClickAction(button, selectedProducts);
        await mutateProducts();
        setSelecting(false);
        setSorting(false);
        setSelectedProducts([]);
      } else if (sorting) {
        await handleClickAction(button, items);
        await mutateProducts();
        setSelecting(false);
        setSorting(false);
        setSelectedProducts([]);
      }
    }
  }

  const handleOnDragStart = (item: ProductType) => {
    if (!sorting) return;
    draggingItem.current = item;
  }
  const handleOnDragEnter = (item: ProductType) => {
    if (!sorting) return;
    const dragItem = draggingItem.current;
    if (!dragItem) return;
    if (dragItem.key === item.key) return;
    dragoverItem.current = item;
    setItems((prev) => {
      const updated = [...prev];
      const dragIndex = updated.findIndex((p) => p.key === dragItem.key);
      const overIndex = updated.findIndex((p) => p.key === item.key);
      if (dragIndex === -1 || overIndex === -1) return prev;
      if (dragIndex === overIndex) return prev;
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(overIndex, 0, removed);
      return updated;
    })
  }
  const handleDragEnd = () => {
    if (!sorting) return;
    setItems((prev) =>
      prev.map((item, index) => ({
        ...item,
        index
      }))
    )
  }

  return (
    <div className={styles.container}>
      <SectionTitle title={'What Our Customers Have Launched With Us'} layout={'left'} />
      {user && (
        <div className={styles.modalButtons}>
          {toggleAdminProductsButtons().map((button, index) => {
            return (
              <div key={index}>
                <Button button={button} handleButtonClick={() => onHandleClick(button)} />
              </div>
            )
          })}
        </div>
      )}
      <input id="addProduct"
             type={'file'}
             style={{ 'display': 'none' }}
             ref={fileInputRef}
             multiple={true}
             accept={'image/*'}
             onChange={addProduct}
      />
      <div className={styles.productsContainer}>
        {!(sorting || selecting) && (
          <div className={`${styles.arrow} ${currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
               onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          >
            <Icon icon={'arrow_left'} />
          </div>
        )}
        <div className={styles.products}>
          {pageItems.map((item: ProductType, i: number) => {
            return (
              <div key={i}
                   className={styles.imageContainer}
                   onClick={() => toggleProductClick(item)}>
                {sorting && <div className={styles.imageIndex}>{i+1}</div>}
                <Image
                  className={`${styles.image} ${selecting && !itemSelected(item) ? 'opacity-20' : 'opacity-100'}`}
                  onDragStart={() => handleOnDragStart(item)}
                  onDragEnter={() => handleOnDragEnter(item)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  src={item.url}
                  alt={`Product ${i}`}
                  fill
                  priority={i < pageSize}
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 80vw, 80vw"
                  draggable={sorting}
                />
              </div>
            )
          })}
        </div>
        {!(sorting || selecting) && (
          <div className={`${styles.arrow} ${currentPage >= Math.ceil(items.length / pageSize) - 1 ? 'opacity-20 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            <Icon icon={'arrow_right'} />
          </div>
        )}
      </div>
    </div>
  )
}