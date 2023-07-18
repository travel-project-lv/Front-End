import classNames from "classnames/bind";
import styles from "./ProductDiscount.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLocationDot, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function ProductDisCount({ id,img, name, location, price }) {
  const [activeHeart, setActiveHeart] = useState(false);
  const handleHeart = () => {
    setActiveHeart(!activeHeart);
  };
  return (
    <Link to={`/detail/${id}`} style={{textDecoration:'none'}}>
    <div className={cx("product-box")}>
      <div className={cx("product-img")}>
        <img src={img} alt="Product Img" />
        <div className={cx('discount-container')}>
          <p>-10% this week</p>
        </div>
      </div>
      <div className={cx("product-content")}>
      <div className={cx("favourite-container", `${activeHeart ? 'active' : ''}`)} onClick={handleHeart}>
          <FontAwesomeIcon icon={faHeart} className={cx("favourite-icon")} />
        </div>
        <Chip size="small" avatar={<FontAwesomeIcon icon={faUsers} />} label="Family" sx={{width:"92px",height:"25px",fontSize:"12px",marginBottom:"10px",backgroundColor:"#fef9c3",color:"#854d0e"}}/>
        <span className={cx("number-seat")}>Tour có tổng cộng 40 chỗ</span>
        <div className={cx("container-name-tour")}>
          <span className={cx("name-tour")}>{name}</span>
        </div>
        <div className={cx("location-tour-container")}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={cx("location-tour-icon")}
          />
          <span className={cx("location-tour-text")}>{location}</span>
        </div>
        <div className={cx("line-product")}></div>
        <div className={cx("price-tour-container")}>
          <span className={cx("price-tour-text")}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ /person</span>
          <div className={cx("rating-container")}>
            <FontAwesomeIcon icon={faStar} className={cx("rating-star")} />
            <span className={cx("rating-text")}>4.8</span>
            <span className={cx("rating-number-voted")}>(28)</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ProductDisCount;
