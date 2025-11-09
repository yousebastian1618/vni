import styles from './styles.module.scss';
import Link from "next/link";

type Props = {
  pageTitle: string;
}

export default function FormFooter({ pageTitle }: Props) {

  let formFooter;
  if (pageTitle === 'LOGIN')  {
    formFooter = (
      <div className={styles.formFooterContainer}>
        <Link className={styles.link} href='/forgot-password'>Forgot Password</Link>
        <span className={styles.formFooterElement}>
          don&apos;t have an account?&nbsp;
          <Link className={styles.link} href={'/register'}>Register</Link>
        </span>
      </div>
    )
  } else if (pageTitle === 'SIGNUP') {
    formFooter = (
      <div className={styles.formFooterContainer}>
        <span className={styles.formFooterElement}>
          Already have an account?&nbsp;go to&nbsp;
        </span>
      </div>
    )
  } else if (pageTitle === 'FORGOT PASSWORD' || pageTitle === 'RESET PASSWORD' || pageTitle === 'REGISTER') {
    formFooter = (
      <div className={styles.formFooterContainer}>
        <span className={styles.formFooterElement}>
          Back to&nbsp;
          <Link className={styles.link} href={'/login'}>Login</Link>
        </span>
      </div>
    )
  }

  return formFooter;
}