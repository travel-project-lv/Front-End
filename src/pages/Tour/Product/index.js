import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function ProductList({ id, img, name, location, price, des }) {
  const [activeHeart, setActiveHeart] = useState(false);
  const handleHeart = () => {
    setActiveHeart(!activeHeart);
  };

  return (
    <Link to={`/detail/${id}`} style={{textDecoration:'none'}}>
    <div className={cx("product-box")}>
      <div className={cx("product-img")}>
        <img src={img} alt="Product Img" />
        <div className={cx("discount-container")}>
          <p>-10% this week</p>
        </div>
      </div>
      <div className={cx("product-content")}>
        <div
          className={cx(
            "favourite-container",
            `${activeHeart ? "active" : ""}`
          )}
          onClick={handleHeart}
        >
          <FontAwesomeIcon icon={faHeart} className={cx("favourite-icon")} />
        </div>
        <span className={cx("number-seat")}>Tour đi trong 4N3Đ</span>
        <div className={cx("container-name-tour")}>
          <span className={cx("name-tour")}>{name}</span>
        </div>
        <div className={cx("container-des-tour")}>
          <span className={cx("des-tour")}>{des}</span>
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
          <span className={cx("price-tour-text")}>{price}đ /person</span>
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
const loading = () => {
  return (
    <div className={cx("product-box")}>
      <div className={cx("product-img")}>
        <Skeleton variant="rectangular" width={457} height={356} />
      </div>
      <div className={cx("product-content")}>
        <div style={{position:'absolute',top:'20px',right:'10px'}}>
          <Skeleton variant="circular" width={32} height={32} />
        </div>
        <span className={cx("number-seat")}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </span>
        <div className={cx("container-name-tour")}>
          <span className={cx("name-tour")}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </span>
        </div>
        <div className={cx("container-des-tour")}>
          <span className={cx("des-tour")}>
            <Skeleton variant="rectangular" width={410} height={60} />
          </span>
        </div>
        <div className={cx("location-tour-container")}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <div className={cx("price-tour-container")}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={210}/>
          <div className={cx("rating-container")}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={110} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductList.loading = loading;

export default ProductList;
