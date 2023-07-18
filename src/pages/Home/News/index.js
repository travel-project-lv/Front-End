import classNames from "classnames/bind";
import styles from "./News.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function News({width,height,font,title,background}) {
  return (
    <div className={cx("news-left-box")} style={{maxWidth:width,height:height,background:`url(${background}) no-repeat center/cover`}}>
      <Link className={cx("news-left-box-fill")}></Link>
      <div className={cx("news-left-box-content")}>
        <Link className={cx("news-left-content-position")}>Nha trang</Link>
        <h3>
          <Link className={cx("news-left-content-text")} style={{fontSize:font}}>
            {title}
          </Link>
        </h3>
        <span style={{ color: "#ffffff" }}>Tin tức - 20/05/2023</span>
      </div>
    </div>
  );
}

export default News;
