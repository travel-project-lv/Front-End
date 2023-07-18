import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Contact.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function ContactList({icon,text}) {
    return ( 
        <div className={cx("our-contact")}>
            <FontAwesomeIcon icon={icon} />
            <p>{text}</p>
        </div>
     );
}

export default ContactList;