import styles from './styles.module.scss';
import {useStatus} from "@/contexts/statusContext";

export default function StatusBar() {

  const { statusType, statusMessage } = useStatus();

  return (
    <div className={`${styles.container} ${statusType === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
      <div className={styles.message}>
        {statusMessage}
      </div>
    </div>
  )
}