import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
const cx = classNames.bind(styles);

function Banner({img}) {
    return ( 
        <div className={cx("banner-container")}>
            <img src={img} alt="Banner" />
        </div>
     );
}

export default Banner;