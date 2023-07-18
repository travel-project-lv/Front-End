import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { Skeleton } from "@mui/material";

const cx = classNames.bind(styles);

function ProductLoading() {

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
}


export default ProductLoading;
