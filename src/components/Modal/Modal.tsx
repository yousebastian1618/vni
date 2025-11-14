import styles from './styles.module.scss';
import {useModal} from "@/contexts/modalContext";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useAuth} from "@/contexts/authContext";

export default function Modal() {

  const { modalType, modalTitle, modalButtons, modalList, modalMain, closeModal, selectModalMain } = useModal();
  const { user } = useAuth();

  const pageSize = 5;
  const [firstIndex, setFirstIndex ] = useState(0);
  const [lastIndex, setLastIndex ] = useState(pageSize);

  useEffect(() => {
    if (modalList && modalList.length > 0 && modalMain) {
      const index = modalList.indexOf(modalMain);
      setFirstIndex(Math.min(index, modalList.length - pageSize));
      setLastIndex(Math.min(index + pageSize, modalList.length))
    }
  }, [modalList])

  const handleIndexChange = (index: number) => {
    setFirstIndex((i) => {
      let newIndex = i + index;
      if (newIndex < 0) {
        newIndex = 0;
      }
      if (newIndex > modalList!.length - pageSize) {
        newIndex = modalList!.length - pageSize;
      }
      return newIndex;
    })
    setLastIndex((i) => {
      let newIndex = i + index;
      if (newIndex > modalList!.length) {
        newIndex = modalList!.length;
      }
      if (newIndex < pageSize) {
        newIndex = pageSize
      }
      return newIndex;
    })
  }

  return (
    <div className={styles.container}>
      <span className={styles.closeIcon} onClick={() => closeModal()}>
        <Icon icon={'x'} />
      </span>
      {modalType === 'products' && (
        <>
          {user && (
            <div className={styles.modalButtons}>
              {modalButtons.map((button, index) => {
                return (
                  <div key={index}>
                    <Button button={button} />
                  </div>
                )
              })}
            </div>
          )}
          <div className={styles.modalTitle}>
            {modalTitle}
          </div>
          <div className={`${styles.modalMain} ${user ? styles.adminModalMain : ''}`}>
            <Image
              className={styles.image}
              src={modalMain.url}
              alt={modalTitle}
              fill
              draggable={false}
            />
          </div>
          <div className={styles.modalBody}>
            <div className={styles.products}>
              <div className={styles.icon}
                   onClick={() => handleIndexChange(-1)}
                   style={{'opacity' : firstIndex === 0  ? '0.2' : '1', pointerEvents: firstIndex === 0 ? 'none' : 'auto'}}
              >
                <Icon icon={'arrow_left'} />
              </div>
              {modalList && modalList.slice(firstIndex, lastIndex).map((product, index) => {
                return (
                  <div key={index}
                       className={`${styles.productImageContainer} ${modalMain.key === product.key ? styles.selected : ''}`}
                       onClick={() => selectModalMain(product)}
                  >
                    <Image
                      className={styles.productImage}
                      src={product.url}
                      alt={product.key}
                      fill
                      draggable={false}
                    />
                  </div>
                )
              })}
              <div className={styles.icon}
                   onClick={() => handleIndexChange(1)}
                   style={{'opacity' : lastIndex === modalList!.length  ? '0.2' : '1', pointerEvents: lastIndex === modalList!.length ? 'none' : 'auto'}}
              >
                <Icon icon={'arrow_right'} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}