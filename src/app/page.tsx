'use client'
import styles from './App.module.scss';
import HomePage from "@/app/(home)/page";

export default function App() {
  return (
    <div className={styles.appContainer}>
      <HomePage />
    </div>
  );
}
