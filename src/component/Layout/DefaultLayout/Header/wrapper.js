import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/component/assets/images";
import { useState , useEffect } from "react";
import { locationApi } from "~/GlobalFunction/Api";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Wrapper() {
  const [bac, setBac] = useState([]);
  const [trung, setTrung] = useState([]);
  const [tayNam, setTayNam] = useState([]);
  const [dongNam, setDongNam] = useState([]);

  useEffect(() => {
    async function loadBac() {
      const data = await locationApi('mb');
      setBac(data);
    }
    async function loadTrung() {
      const data = await locationApi('mt');
      setTrung(data);
    }
    async function loadTnb() {
      const data = await locationApi('tnb');
      setTayNam(data);
    }
    async function loadDnb() {
      const data = await locationApi('dnb');
      setDongNam(data);
    }
    loadBac();
    loadTrung();
    loadTnb();
    loadDnb();
  }, []);
  return (
    <div className={cx("tour-down-container")}>
      <div className={cx("tour-down-container-main")}>
        <div className={cx("list-tour-container")}>
          <img src={images.nav1} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Miền bắc</li>
            {
              bac.map(tinh => (
                <li><Link to={`/tour?nameTour=${encodeURIComponent(tinh.id_location)}`} style={{textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>{tinh.name_location}</Link></li>
              ))
            }
          </ul>
        </div>
        <div className={cx("list-tour-container")}>
          <img src={images.nav2} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Miền trung</li>
            {
              trung.map(tinh => (
                <li>{tinh.name_location}</li>
              ))
            }
          </ul>
        </div>
        <div className={cx("list-tour-container")}>
          <img src={images.nav3} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Miền tây nam bộ</li>
            {
              tayNam.map(tinh => (
                <li>{tinh.name_location}</li>
              ))
            }
          </ul>
        </div>
        <div className={cx("list-tour-container")}>
          <img src={images.nav4} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Miền đông nam bộ</li>
            {
              dongNam.map(tinh => (
                <li>{tinh.name_location}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
