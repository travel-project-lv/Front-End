import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import images from "~/component/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faTwitterSquare,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("Footer-main")}>
      <div className={cx("Footer-container")}>
        <div className={cx("Footer-flex")}>
          <div className={cx("logo-container")}>
            <img src={images.logo} alt="Logo" />
            <p>Travel</p>
          </div>
          <div className={cx("social-container")}>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              className={cx("icon-social")}
            />
            <p>Facebook</p>
          </div>
          <div className={cx("social-container")}>
            <FontAwesomeIcon
              icon={faTwitterSquare}
              className={cx("icon-social")}
            />
            <p>Twitter</p>
          </div>
          <div className={cx("social-container")}>
            <FontAwesomeIcon icon={faYoutube} className={cx("icon-social")} />
            <p>Youtube</p>
          </div>
          <div className={cx("social-container")}>
            <FontAwesomeIcon icon={faInstagram} className={cx("icon-social")} />
            <p>Instagram</p>
          </div>
        </div>
        <div className={cx("Footer-flex")}>
          <ul>
            <li className={cx('Footer-header')}>Dịch vụ</li>
            <li>Tour trong nước</li>
            <li>Vé máy bay</li>
            <li>Thuê xe</li>
            <li>Tuyển dụng</li>
            <li>Bảo hiểm du lịch</li>
          </ul>
        </div>
        <div className={cx("Footer-flex")}>
          <ul>
            <li className={cx('Footer-header')}>Chăm sóc khách hàng</li>
            <li>Thẻ khách hàng</li>
            <li>Travel Voucher</li>
            <li>Bảo hiểm Covid 19</li>
            <li>Ý kiến khách hàng</li>
            <li>Phiếu góp ý</li>
          </ul>
        </div>
        <div className={cx("Footer-flex")}>
          <ul>
            <li className={cx('Footer-header')}>Liên hệ</li>
            <li>Giới thiệu</li>
            <li>Chi nhánh</li>
            <li>Quy định bảo vệ</li>
            <li>Điều khoản chung</li>
            <li>Quy định thanh toán</li>
          </ul>
        </div>
        <div className={cx("Footer-flex")}>
          <ul>
            <li className={cx('Footer-header')}>Thông tin</li>
            <li>Tuyến điểm</li>
            <li>Tin du lịch</li>
            <li>Tin lữ hành</li>
            <li>Tin địa điểm hot</li>
            <li>Tin mới</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
