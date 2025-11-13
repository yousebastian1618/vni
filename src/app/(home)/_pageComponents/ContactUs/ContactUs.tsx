import styles from './ContactUs.module.scss';
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import {ContactUsMessage} from "@/objects/objects";
import Form from "@/components/Form/Form";
import {ContactUsForm} from "@/objects/forms";
import {ContactUsButton} from "@/objects/buttons";

export default function ContactUs() {
  return (
    <>
      <SectionTitle title={'Contact Us'} layout={'right'} />
      <div className={styles.contactUsContainer}>
        <div className={styles.contactUsFormContainer}>
          <p className={styles.contactUsMessage}
             dangerouslySetInnerHTML={{ __html: ContactUsMessage }}
          >
          </p>
          <Form label={'CONTACT US'} form={ContactUsForm} buttons={ContactUsButton} />
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={'/contact-us.png'}
            alt={'Contact Us Image'}
            fill
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 10vw"
            draggable={false}
          />
        </div>
      </div>
    </>
  )
}