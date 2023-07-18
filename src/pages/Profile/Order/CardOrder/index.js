import {
  faCalendarDay,
  faEnvelope,
  faMapLocation,
  faSignature,
  faStar,
  faTicketAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@mui/material";
import classNames from "classnames/bind";
import styles from "~/pages/Profile/Profile.module.scss";
import { useEffect, useState } from "react";
import { detailTourApi } from "~/GlobalFunction/Api";
const cx = classNames.bind(styles);

function CardOrder({id,name,email,idTour}) {
    const [detail,setDetailTour] = useState({});
    useEffect(() => {
        async function detailData() {
          const data = await detailTourApi(idTour);
          setDetailTour(data);
        }
        detailData();
      }, [idTour]);
      console.log(detail);
  return (
    <div>
      <div className={cx("product-box")}>
        <div className={cx("product-img")}>
          <img src={detail.img_tour} alt="Product Img" />
          <div className={cx("discount-container")}>
            <p>-10% this week</p>
          </div>
        </div>
        <div className={cx("product-content")}>
          <Chip
            size="small"
            avatar={<FontAwesomeIcon icon={faUsers} />}
            label="Family"
            sx={{
              width: "92px",
              height: "25px",
              fontSize: "12px",
              marginBottom: "10px",
              backgroundColor: "#fef9c3",
              color: "#854d0e",
            }}
          />
          <div className={cx("container-name-tour")}>
            <span className={cx("name-tour")}>
                {detail.name_tour}
            </span>
          </div>
          <div className={cx("location-tour-container")}>
            <div>
              <FontAwesomeIcon
                icon={faMapLocation}
                className={cx("location-tour-icon")}
              />
              <span className={cx("location-tour-text")}>{detail.place_go}</span>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={cx("location-tour-icon")}
              />
              <span className={cx("location-tour-text")}>{detail.date_back}</span>
            </div>
          </div>
          <div className={cx("info-order")}>
            <div>
                <FontAwesomeIcon icon={faTicketAlt} className={cx("location-tour-icon")} />
                <span>{id}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faSignature} className={cx("location-tour-icon")} />
                <span>{name}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faEnvelope} className={cx("location-tour-icon")} />
                <span>{email}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faUsers} className={cx("location-tour-icon")} />
                <span>3</span>
            </div>
          </div>
          <div className={cx("line-product")}></div>
          <div className={cx("price-tour-container")}>
            <span className={cx("price-tour-text")}>7,000,000đ /person</span>
            <div className={cx("rating-container")}>
              <FontAwesomeIcon icon={faStar} className={cx("rating-star")} />
              <span className={cx("rating-text")}>4.8</span>
              <span className={cx("rating-number-voted")}>(28)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardOrder;
