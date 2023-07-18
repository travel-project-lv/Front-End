import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./News.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const cx = classNames.bind(styles);


function News() {
    const [news, setNews] = useState([]);
    // const [fistNews, setFistnews] = useState({});
    useEffect(() => {
         async function loadNews(){
        await axios.get("https://travel2h.click/public_html/api/news").then((res) => {
            setNews(res.data.data);
            // const latest = news[news.length - 1];
            // setFistnews(latest);
        });                  
    }
    loadNews();
    }, [news]);

    return (
        <Container>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />}
            >

                <Link to="/" style={{ fontSize: "13px" }}>
                    Trang Chủ
                </Link>
                <Link style={{ fontSize: "13px" }}>
                    Tin Tức</Link>
            </Breadcrumbs>
            <h1 className={cx("header")}>Trang Tin tức</h1>
            <div className={cx("heading-flex")}>

                <p>Tin tức du lịch</p>
                <p>Cẩm nang du lịch</p>
                <p>Kinh nghiệm du lịch</p>
            </div>
            <div className={cx("title-container")}>
                <div className={cx("title-left")}>
                    <div className={cx("img-left")}>
                        <img src="https://media.vietravel.com/images/news/nhung-luu-y-khi-chuan-bi-di-du-lich-singapore-dip-he-2023.jpg"alt="hinhanh"/>
                    </div>
                    <div className={cx("content-left")}>
                        <p style={{ color: "rgb(253, 80, 86)" }}>Tin tức dữ liệu</p>
                        <Link style={{ textDecoration: "none", fontWeight: "700" ,fontSize:"32px"}}>Những lưu ý khi chuẩn bị đi du lịch Singapore dịp hè 2023</Link>
                        <p style={{fontSize:"13px"}}>2023-06-03</p>
                    </div>
                </div>
                <div className={cx("title-right")}>



                    {news.map((newItem) => (
                        <Link to={`/detailnews/${newItem.id_news}`}  style={{ textDecoration:"none" }} >
                                    <div className={cx("box-right")}>
                            <div className={cx("img-right")}>
                                <img src={newItem.img_news} alt="hinhanh" />
                            </div>
                            <div className={cx("content-right")}>
                                <p style={{ color: "rgb(253, 80, 86)" }}>Tin tức dữ liệu</p>
                                <p style={{ textDecoration: "none", fontWeight: "600" }}>{newItem.title_news}</p>
                                <p>{newItem.date}</p>
                            </div>
                        </div>
                        </Link>
                   
            
                    ))};
                </div>

            </div>
        </Container>

    );
}

export default News;