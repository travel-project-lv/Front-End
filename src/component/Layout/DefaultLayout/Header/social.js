import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);


function Social({img}) {
    return ( 
        <div className={cx("social-respon")}>
            <FontAwesomeIcon icon={img} />
        </div>
     );
}

export default Social;