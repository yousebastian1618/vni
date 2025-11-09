'use client'

import styles from './styles.module.scss';
import type {Button as ButtonType, InputElement} from "@/types/types";
import Image from "next/image";
import Form from "@/components/Form/Form";
import Link from "next/link";

type Props = {
  label: string;
  image: string;
  forms: InputElement[];
  buttons: ButtonType[]
}

export default function AuthShell({ label, image, forms, buttons }: Props) {
  return (
    <div className={styles.authShellContainer}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={image}
          alt={label}
          fill
          draggable={false}
        />
      </div>
      <div className={styles.authFormContainer}>
        <Link className={styles.logoContainer} href={'/'}>
          <Image
            className={styles.logo}
            src={'/logo.png'}
            alt="Logo"
            fill
            draggable={false}
          />
        </Link>
        <div className={styles.formContainer}>
          <h3 className={styles.label}>{label}</h3>
          <div className={styles.form}>
            <Form label={label} form={forms} buttons={buttons}/>
          </div>
        </div>
      </div>
    </div>
  )
}