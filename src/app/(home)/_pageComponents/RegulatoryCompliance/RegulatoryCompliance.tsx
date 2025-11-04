import styles from './RegulatoryCompliance.module.scss';
import {RegulatoryComplianceItems, RegulatoryComplianceMessage} from "@/objects/objects";
import RegulatoryComplianceItem from "@/app/(home)/_pageComponents/RegulatoryCompliance/_components/RegulatoryComplianceItem";

export default function RegulatoryCompliance() {
  return (
    <div className={styles.regulatoryComplianceContainer}>
      <div className={styles.title}>
        <div id={styles.title1}>Take Your Product</div>
        <div id={styles.title2}>
          From
          <span id={styles.textIdea}>SUBMISSION</span>
          to
          <span id={styles.textShelf}>APPROVAL</span>
        </div>
      </div>
      <div className={styles.regulatoryComplianceItemsContainer}>
        <p
          className={styles.regulatoryComplianceMessage}
          dangerouslySetInnerHTML={{ __html: RegulatoryComplianceMessage}}
        >
        </p>
        <div className={styles.regulatoryComplianceItems}>
          {RegulatoryComplianceItems.map((item, index) => {
            return <RegulatoryComplianceItem key={index} item={item} />
          })}
        </div>
      </div>
    </div>
  )
}