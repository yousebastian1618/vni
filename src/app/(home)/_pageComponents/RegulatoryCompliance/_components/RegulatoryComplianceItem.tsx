import styles from './RegulatoryComplianceItem.module.scss';
import Image from "next/image";

type Props = {
  item: {
    header: Record<string, string>;
    elements: Record<string, string>[];
    icon: string;
  }
}

export default function RegulatoryComplianceItem({ item }: Props) {
  return (
    <div className={styles.regulatoryComplianceItemContainer}>
      <div className={styles.iconContainer}>
        <Image
          className={styles.icon}
          src={item.icon}
          alt={item.header.label}
          fill
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 10vw"
          draggable={false}
        />
      </div>
      <p className={styles.header}>
        {item.header.label}
      </p>
      <div className={styles.elements}>
        {item.elements.map((elem, index) => {
          return <p key={index}>{elem.label}</p>
        })}
      </div>
    </div>
  )
}