import styles from './style.module.scss';
import {useState} from "react";
import {IconMap} from "@/objects/objects";

type Props = {
  icon: string;
  tooltip?: string;
}

export default function Icon({ icon, tooltip }: Props) {

  const [showTooltip, setShowTooltip] = useState(false);

  const getIcon = () => {
    return IconMap[icon].icon;
  }

  return (
    <div className={styles.iconContainer}
         onMouseOver={() => setShowTooltip(true)}
         onMouseLeave={() => setShowTooltip(false)}
    >
      <i className={`${styles.icon} ${getIcon()}`}>
        {tooltip && showTooltip ? (
          <span className={styles.tooltip}>{tooltip}</span>
        ) : (
          <></>
        )}
      </i>
    </div>
  )
}