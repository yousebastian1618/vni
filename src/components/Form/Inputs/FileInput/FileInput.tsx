import styles from './styles.module.scss';
import type {InputElement} from "@/types/types";
import React, {useCallback, useMemo, useRef} from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

type Props = {
  inputElement: InputElement;
  onChange: (name: string, value: File | null) => void;
}

export default function FileInput({ inputElement, onChange }: Props) {
  const { name, label, type, value = null } = inputElement;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addFile = () => {
    if (value) return;
    fileInputRef.current?.click();
  }

  const removeFile = (e: React.MouseEvent<HTMLDivElement>) => {
    onChange(name, null);
    e.stopPropagation();
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        onChange(name, e.target.files[0])
      }
    },
    [name, onChange]
  );

  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value as File);
  }, [value])

  return (
    <div className={styles.container}>
      <span>{label}</span>
      <div className={styles.innerContainer} onClick={addFile}>
        <input type={type}
               ref={fileInputRef}
               className={styles.fileInput}
               onChange={handleChange}
               accept={'image/*'}
               multiple={false}
        />
        {value ? (
          <div className={styles.fileContainer}>
            <div className={styles.xLogoContainer} onClick={(e) => removeFile(e)}>
              <Icon icon={'x'} />
            </div>
            <Image
              className={styles.fileThumbnail}
              src={previewUrl!}
              alt="Thumbnail"
              fill
              draggable={false}
            />
          </div>
        ) : (
          <div className={styles.innerMessage}>
            Click Here To Upload File
          </div>
        )}
      </div>
    </div>
  )
}