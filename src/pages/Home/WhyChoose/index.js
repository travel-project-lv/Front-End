import classNames from "classnames/bind";
import styles from "./WhyChoose.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

function WhyChooseBox({icon,heading,des}) {
  return (
    <div className={cx("why-choose-content")}>
      <FontAwesomeIcon icon={icon} className={cx("why-choose-content-icon")} />
      <h2>{heading}</h2>
      <span className={cx("why-choose-content-des")}>{des}</span>
    </div>
  );
}

export default WhyChooseBox;
