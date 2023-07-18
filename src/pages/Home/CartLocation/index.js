import classNames from "classnames/bind";
import styles from "./CartLocation.module.scss"

const cx = classNames.bind(styles)

function CartLocation({img,heading,decription}) {
    return ( 
        <div className={cx('cart-location-container')}>
            <div className={cx('cart-location-img')}>
                <img src={img} alt="Cart Location" />
            </div>
            <div className={cx('cart-location-content')}>
                <h2 className={cx('cart-location-h2')}>{heading}</h2>
                <span className={cx('cart-location-decription')}>{decription}</span>
            </div>
        </div>
     );
}

export default CartLocation;