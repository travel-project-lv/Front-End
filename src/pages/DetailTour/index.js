import { detailTourApi } from "~/GlobalFunction/Api";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailTour.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Container,
  ImageListItem,
  ImageList,
  Box,
} from "@mui/material";
import Itinerary from "./Itinerary";
import axios from "axios";
import Date from "./Date";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import FacebookComment from "../commentFb";

const cx = classNames.bind(styles);

function DetailTour() {
  const { id } = useParams();
  const [detailTour, setDetailTour] = useState({});
  const [weather, setWeather] = useState({});
  const API_KEY_WEATHER = "cd80aaec45724113a6c125437230106";
  console.log(id);
  //Api thời tiết
  useEffect(() => {
    async function getWeather() {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=Da Lat`
        );
        setWeather(response?.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getWeather();
  }, []);
  console.log(weather);
  //Load api của chi tiết tour
  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(id);
      setDetailTour(data);
    }
    detailData();
  }, [id]);
  //List Image của MUI
  function modifyImages(images) {
    return images.map((image, index) => {
      if (index === 0) {
        return {
          ...image,
          rows: 2,
          cols: 2,
        };
      }
      if (index === 3) {
        return {
          ...image,
          cols: 2,
        };
      }
      return image;
    });
  }
  //Chuyển lên đầu trang khi bấm vào 1 sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Chuyển tới danh sách ngày đi khi bấm nút đặt
  const dateRef = useRef(null);
  const handleBookTour = () => {
    dateRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //Slick Slider
  const settingsSlider = {
    lazyLoad: "ondemand",
    dots: true,
    infinite: true,
    arrows: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={cx("detail-container")}>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <div className={cx("detail-infomation-container")}>
          <div className={cx("detail-infomation-col-1")}>
            <div className={cx("detail-id")}>
              <FontAwesomeIcon icon={faTicket} />
              <span>{detailTour?.id_tour}</span>
            </div>
            <h1 className={cx("detail-name-tour")}>{detailTour?.name_tour}</h1>
            <div className={cx("detail-rating")}>
              <div className={cx("number-rating")}>
                <span>9</span>
                <div className={cx("comment-rating")}>
                  <p>Tuyệt vời</p>
                  <p>200 quan tâm</p>
                </div>
              </div>
              <div className={cx("heart-rating")}>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ fontSize: "22px", color: "#fd5056" }}
                />
                <label>126</label>
              </div>
              {/* Hiển thị api thời tiết */}
              <div className={cx("weather-container")}>
                <img src={weather?.current?.condition?.icon} alt="Weather" />
                <p>
                  {" "}
                  {weather?.location?.name} - {weather?.current?.temp_c} ° C -{" "}
                  {weather?.current?.temp_f} ° F
                </p>
              </div>
              {/* /-----------------------------/ */}
            </div>
          </div>
          <div className={cx("detail-infomation-col-2")}>
            <div className={cx("detail-col-pirce")}>
              <span>
                {detailTour?.adult_price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                đ
              </span>{" "}
              / khách
            </div>
            <div className={cx("detail-col-pirce")}>
              <Button
                variant="contained"
                style={{
                  width: "192px",
                  height: "50px",
                  background:
                    "linear-gradient(64.4deg,#fd5056 21.33%,#fe2214 67.61%)",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                onClick={handleBookTour}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginRight: "10px" }}
                />{" "}
                Đặt tour
              </Button>
            </div>
          </div>
        </div>
      </Container>
      {/* Hiển thị List Image của MUI */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <ImageList cols={4} rowHeight={300} style={{ overflow: "hidden" }}>
          {detailTour?.images &&
            Array.isArray(detailTour?.images) &&
            modifyImages(detailTour?.images.slice(0, 4)).map((image) => (
              <ImageListItem key={image.id} cols={image.cols} rows={image.rows}>
                <img
                  src={image.url}
                  alt=""
                  style={{
                    height: "auto",
                    objectFit: "fill",
                    borderRadius: "10px",
                    padding: "1px",
                  }}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Container>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <h2 className={cx("content-tour-heading")}>Những địa điểm tham quan</h2>
        <Slider {...settingsSlider} className={cx("custom-slider")}>
          {detailTour?.images &&
            Array.isArray(detailTour?.images) &&
            modifyImages(detailTour?.images.slice(4)).map((image) => (
              <div>
                <img src={image.url} alt="" className={cx("img-slider")} />
              </div>
            ))}
        </Slider>
      </Container>
      {/* /---------------------------/ */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <h2 className={cx("content-tour-heading")}>Điểm nhấn</h2>
        <Box>
          <p className={cx("content-tour-text")}>{detailTour?.content_tour}</p>
        </Box>
      </Container>
      {/* Lịch trình */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <h2 className={cx("content-tour-heading")}>Lịch trình</h2>
        <Box>
          <Itinerary />
        </Box>
      </Container>
      {/* /---------------------/ */}
      {/* Ngày đi */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }} ref={dateRef}>
        <h2 className={cx("content-tour-heading")}>Bảng giá</h2>
        <Date id={detailTour?.id_tour} />
      </Container>
      {/* Thông tin di chuyển */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <div className={cx("detail-info-container")}>
          <div className={cx("detail-transport-container")}>
            <h2 className={cx("content-tour-heading")}>Chi tiết tour</h2>
            <Box>
              <div className={cx("detail-transport-box")}>
                <h3>Thông tin di chuyển</h3>
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #bdbdbd",
                    height: "208px",
                  }}
                >
                  <div className={cx("detail-transport-info")}>
                    <p style={{ marginTop: "10px" }}>
                      Ngày đi - <span>22/06/2023</span>
                    </p>
                    <div className={cx("detail-transport-location-container")}>
                      <div className={cx("detail-transport-location")}>
                        <h4>TP.Hồ Chí Minh</h4>
                        <h4>(Địa điểm)</h4>
                      </div>
                      <div className={cx("detail-transport-location")}>
                        <h4>TP.Hồ Chí Minh</h4>
                        <h4>(Địa điểm)</h4>
                      </div>
                    </div>
                    <div className={cx("x")}>
                      <Timeline
                        position="left"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          padding: "0px",
                        }}
                      >
                        <TimelineItem sx={{ transform: "rotate(-90deg)" }}>
                          <TimelineSeparator sx={{ marginLeft: "121px" }}>
                            <TimelineDot />
                            <TimelineConnector sx={{ height: "191px" }} />
                          </TimelineSeparator>
                          <TimelineContent
                            sx={{
                              transform: "rotate(90deg)",
                              marginTop: "-188px",
                              padding: "16px",
                            }}
                          >
                            05:30
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem
                          sx={{
                            transform: "rotate(-90deg)",
                            paddingLeft: "0px",
                          }}
                        >
                          <TimelineSeparator
                            sx={{
                              height: "273px",
                              width: "49px",
                              marginLeft: "179px",
                            }}
                          >
                            <TimelineDot />
                          </TimelineSeparator>
                          <TimelineContent
                            sx={{
                              transform: "rotate(90deg)",
                              marginTop: "-254px",
                              padding: "30px 0px",
                            }}
                          >
                            00:00
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </div>
                  </div>
                  <div className={cx("detail-transport-info")}>
                    <p style={{ marginTop: "10px" }}>
                      Ngày về - <span>25/06/2023</span>
                    </p>
                    <div className={cx("detail-transport-location-container")}>
                      <div className={cx("detail-transport-location")}>
                        <h4>TP.Hồ Chí Minh</h4>
                        <h4>(Địa điểm)</h4>
                      </div>
                      <div className={cx("detail-transport-location")}>
                        <h4>TP.Hồ Chí Minh</h4>
                        <h4>(Địa điểm)</h4>
                      </div>
                    </div>
                    <div className={cx("x")}>
                      <Timeline
                        position="left"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          padding: "0px",
                        }}
                      >
                        <TimelineItem sx={{ transform: "rotate(-90deg)" }}>
                          <TimelineSeparator sx={{ marginLeft: "121px" }}>
                            <TimelineDot />
                            <TimelineConnector sx={{ height: "191px" }} />
                          </TimelineSeparator>
                          <TimelineContent
                            sx={{
                              transform: "rotate(90deg)",
                              marginTop: "-188px",
                              padding: "16px",
                            }}
                          >
                            05:30
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem
                          sx={{
                            transform: "rotate(-90deg)",
                            paddingLeft: "0px",
                          }}
                        >
                          <TimelineSeparator
                            sx={{
                              height: "273px",
                              width: "49px",
                              marginLeft: "179px",
                            }}
                          >
                            <TimelineDot />
                          </TimelineSeparator>
                          <TimelineContent
                            sx={{
                              transform: "rotate(90deg)",
                              marginTop: "-254px",
                              padding: "30px 0px",
                            }}
                          >
                            00:00
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </div>
                  </div>
                </div>
              <div style={{marginTop:'10px'}}>
                {" "}
                <h3>Thông tin tập trung</h3>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{fontSize:'15px',margin:'10px 0px'}}>
                    <p>Ngày giờ tập trung</p>
                    <p>Nơi tập trung</p>
                  </div>
                  <div style={{fontSize:'15px'}}>
                    <p>05:00 - 18/07/2023</p>
                    <p>Tập trung tại công ty lữ hành Travel2H</p>
                  </div>
                </div>
              </div>
              </div>
            </Box>
          </div>
          <div>
            <h2 className={cx("content-tour-heading")}>
              Chi tiết khách sạn & Hướng dẫn viên
            </h2>
            <div className={cx("detail-hotel-container")}>
              <Box>
                <div className={cx("detail-hotel-box")}>
                  <h3>Thông tin khách sạn</h3>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontSize:'15px',margin:'10px 0px'}}>
                    <p>Tên khách sạn:</p>
                    <p>Địa chỉ:</p>
                  </div>
                  <div style={{fontSize:'15px'}}>
                    <p>Terracotta Hotel & Resort Đà Lạt</p>
                    <p>Phân khu chức năng 7.9, KDL hồ Tuyền Lâm, Phường 3, Đà Lạt</p>
                  </div>
                  </div>
                </div>
              </Box>
            </div>
            <div className={cx("detail-hotel-container")}>
              <Box>
                <div className={cx("detail-hotel-box")}>
                  <h3>Thông tin hướng dẫn viên</h3>
                  <div>
                    <p>HDV dẫn đoàn</p>
                    <h3>Lê Ngọc Huy</h3>
                    <p>Nhơn Đức - Nhà Bè - TP HCM</p>
                    <p>09090909</p>
                  </div>
                  <div>
                    <p>HDV phụ</p>
                    <h3>Nguyễn Trọng Hiếu</h3>
                    <p>Hiệp Phước - Nhà Bè - TP HCM</p>
                    <p>09090909</p>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
        <div>
          <FacebookComment
            url={`https://travel-react-api.netlify.app/detail/${id}`}
            width={1000}
            numPosts={5}
          />
        </div>
      </Container>
    </div>
  );
}

export default DetailTour;
