import styles from "./PayMethods.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Radio,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getDetailOrder, detailTourApi } from "~/GlobalFunction/Api";
import DetailCustomerTable from "./DetailCustomerTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faQrcode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const cx = classNames.bind(styles);

function PayMothods() {
  const [orderTime, setOrderTime] = useState(null);
  //Chuyển lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const steps = ["Nhập thông tin", "Thanh toán"];
  // CSS base Stepper MUI
  const customStyles = {
    "& .MuiStepLabel-iconContainer": {
      marginRight: "8px", // Tăng khoảng cách giữa icon và chữ
    },
    "& .MuiStepLabel-label": {
      fontSize: "14px", // Tăng kích thước chữ
    },
    "& .MuiStepIcon-root": {
      fontSize: "30px", // Tăng kích thước của icon
    },
    justifyContent: "flex-start",
  };
  /// Lấy dữ liệu url
  const { idBooking, idTour } = useParams();
  //Load api của chi tiết tour
  const [detailOrder, setDetailOrder] = useState({});
  const [listCustomer, setListCustomer] = useState([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    async function detailData() {
      const data = await getDetailOrder(idBooking);
      setDetailOrder(data);
      setListCustomer(data.detail_order);
      setTotal(data.total_price)
      const apiOrderTime = data.order_time;

      // Tạo đối tượng Date từ dữ liệu order_time
      const orderDateTime = new Date(apiOrderTime);

      // Cộng thêm 1 ngày
      orderDateTime.setDate(orderDateTime.getDate() + 1);

      // Cập nhật state với ngày giờ đã cộng thêm
      setOrderTime(orderDateTime);
    }
    detailData();
  }, [idBooking]);
  //////////////////
  // const orderTime = detailOrder.order_time;
  // const formatDate = format(new Date(orderTime),'dd/MM/yyyy HH:mm:ss')
  const [selectRadio, setSelectRadio] = useState("tm");
  const [selectRadioPrice, setSelectRadioPrice] = useState("50");
  const idCustomer = localStorage.getItem('id_customer');

  const handleRadio = (e) => {
    setSelectRadio(e.target.value);
  };
  const handleRadioPrice = (e) => {
    setSelectRadioPrice(e.target.value);
  };
  console.log(selectRadio);
  ////////////////
  const [detailTour, setDetailTour] = useState({});
  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(idTour);
      setDetailTour(data);
    }
    detailData();
  }, [idTour]);
  console.log(detailTour);
  //---------------------------//
  // Thanh toán online
  const handlePayment = () => {
    axios
      .options("https://travel2h.click/public_html/api/create-payment")
      .then((res) => {
        axios
          .post("https://travel2h.click/public_html/api/create-payment", { amount: total })
          .then((res) => {
            const { vnpUrl } = res.data;
            // setPaymentVN(prevState => ({...prevState,vnpUrl}));
            window.location.href = vnpUrl;
          })
          .catch((error) => {
            console.error("Error creating payment:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating payment:", error);
      });
  };
  const handleMomo = async () => {
    try {
      //const response = await axios.post("https://travel2h.click/public_html/api/momo-payment", {
      const response = await axios.post(
        "https://travel2h.click/public_html/api/momo-payment",
        {
          amount: selectRadioPrice === "100" ? total : total/2,
          orderId: idBooking,
          idCustomer: idCustomer,
        }
      );
      console.log(response);
      const { payUrl } = response.data;
      window.location.href = payUrl;

      // console.log(payUrl); // Chuyển hướng người dùng đến URL thanh toán Momo
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi
    }
  };
  // Xử lý khi chọn các phương thức thanh toán
  const selectPayment = () => {
    if (selectRadio === "momo") {
      handleMomo();
    } else {
      handlePayment();
    }
  };
  //-------------------------//
  /////Tính tổng tiền//////

  // const handleTotalPrice = (listCustomer, detailTour) => {
  //   let totalPrice = 0;
  //   listCustomer.forEach((row) => {
  //     const adultPrice = detailTour?.adult_price
  //       ? detailTour?.adult_price
  //       : "0";
  //     const childPrice = detailTour?.child_price
  //       ? detailTour?.child_price
  //       : "0";
  //     const price =
  //       row.age === "Người lớn"
  //         ? parseFloat(adultPrice)
  //         : parseFloat(childPrice);
  //     totalPrice += price;
  //   });
  //   return totalPrice;
  // };
  // console.log(total);
  // const totalTest = handleTotalPrice(listCustomer, detailTour);
  // useEffect(() => {
  //   setTotal(totalTest);
  // }, [totalTest]);
  ///---------------------///
  return (
    <div>
      <Container
        maxWidth="xl"
        style={{ padding: "20px 68px", marginBottom: "20px" }}
      >
        <Box sx={{ width: "100%", marginBottom: "20px" }}>
          <Stepper alternativeLabel activeStep={1} sx={customStyles}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <h2 className={cx("content-tour-heading")}>Thanh toán</h2>
        <Box
          sx={{ width: "100%", marginBottom: "20px" }}
          className={cx("payment-body")}
        >
          <div className={cx("body-left-payment")}>
            <div className={cx("info-contact")}>
              <div className={cx("heading")}>
                <h5>Thông tin liên lạc</h5>
              </div>
              <div className={cx("body-info-contact")}>
                <div className={cx("body-info-text")}>
                  <span>Họ và tên</span>
                  <p>{detailOrder.name}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Email</span>
                  <p>{detailOrder.email}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Địa chỉ</span>
                  <p>{detailOrder.address}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Điện thoại</span>
                  <p>{detailOrder.phone}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Ghi chú</span>
                  <p>Booking từ travel-react-api.netlify.app</p>
                </div>
              </div>
            </div>
            <div className={cx("detail-booking")}>
              <div className={cx("heading")}>
                <h5>Chi tiết booking</h5>
              </div>
              <div className={cx("body-detail-booking")}>
                <div className={cx("label-detail-booking")}>
                  <p>Số booking</p>
                  <p>Giá booking</p>
                  <p>Số tiền đã thanh toán</p>
                  <p>Số tiền còn lại</p>
                  <p>Ngày đăng ký</p>
                  <p>Hình thức thanh toán</p>
                  <p>Tình trạng</p>
                  <p>Thời hạn thanh toán</p>
                </div>
                <div className={cx("text-detail-booking")}>
                  <p>
                    <span style={{ color: "#fd5056", fontWeight: "800" }}>
                      {idBooking}
                    </span>{" "}
                    (Quý khách vui lòng nhớ số booking để thuận tiện cho các
                    giao dịch sau này)
                  </p>
                  <p>{total.toLocaleString()}đ</p>
                  <p>0₫</p>
                  <p>{total.toLocaleString()}đ</p>
                  <p>{detailOrder.order_time}</p>
                  <p>
                    <div className={cx("payment-methods")}>
                      <div className={cx("payment-box")}>
                        <div className={cx("payment-text")}>
                          <FontAwesomeIcon icon={faMoneyBill} />
                          <p>Tiền mặt</p>
                        </div>
                        <Radio
                          checked={selectRadio === "tm"}
                          onChange={handleRadio}
                          value="tm"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </div>
                      <div className={cx("payment-box")}>
                        <div className={cx("payment-text")}>
                          <FontAwesomeIcon icon={faQrcode} />
                          <p>Thanh toán VNPay</p>
                        </div>
                        <Radio
                          checked={selectRadio === "vnpay"}
                          onChange={handleRadio}
                          value="vnpay"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "B" }}
                        />
                      </div>
                      <div className={cx("payment-box")}>
                        <div className={cx("payment-text")}>
                          <FontAwesomeIcon icon={faQrcode} />
                          <p>Thanh toán MoMo</p>
                        </div>
                        <Radio
                          checked={selectRadio === "momo"}
                          onChange={handleRadio}
                          value="momo"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "B" }}
                        />
                      </div>
                    </div>
                  </p>
                  <p>
                    Booking của quý khách đã được chúng tôi xác nhận thành công
                  </p>
                  <p>
                    <span style={{ color: "#fd5056", fontWeight: "800" }}>
                      {orderTime?.toLocaleString("vi-VN")}
                    </span>{" "}
                    (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn
                    thanh toán trên)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("body-right-payment")}>
            <div className={cx("heading")}>
              <h5>Phiếu xác nhận booking</h5>
            </div>
            <div className={cx("product")}>
              <p style={{ marginTop: "10px" }}>{detailTour.name_tour}</p>
              <span>
                Số booking:{" "}
                <span style={{ color: "#fd5056", fontWeight: "800" }}>
                  {idBooking}
                </span>
              </span>
            </div>
            <div className={cx("detail")}>
              <div className={cx("detail-label")}>
                <div>
                  <p>Mã tour</p>
                </div>
                <div>
                  <p>Hành trình</p>
                </div>
                <div>
                  <p>Ngày đi</p>
                </div>
                <div>
                  <p>Ngày về</p>
                </div>
                <div>
                  <p>Nơi khởi hành</p>
                </div>
              </div>
              <div className={cx("detail-text")}>
                <div>
                  <span>{detailTour.id_tour}</span>
                </div>
                <div>
                  <span>HCM - QUY NHƠN - HCM</span>
                </div>
                <div>
                  <span>15/06/2023</span>
                </div>
                <div>
                  <span>18/06/2023</span>
                </div>
                <div>
                  <span>{detailTour.place_go}</span>
                </div>
              </div>
            </div>
            <div className={cx("qr-code")}>
              <img
                src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://travel.com.vn/du-lich/track-booking-no-230610308457/tra-cuu-booking.aspx?utm_source=BookingSearch%26utm_medium=referral%26utm_campaign=qrcode&choe=UTF-8"
                alt="QR"
              />
            </div>
            <div
              style={{
                height: "188px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span>
                Để xem thông tin chương trình tour mới nhất Quý khách có thể
                dùng điện thoại để quét mã QR bên cạnh để truy cập vào website.
              </span>
              <span style={{ marginTop: "10px" }}>
                Để cài phần mềm quét mã QR Code quý khách có thể tìm trong kho
                ứng dụng của điện thoại với từ khóa sau: QRCode Scanner, QRCode
                Reader,..
              </span>
            </div>
            <div style={{ display: "flex" ,margin:'10px 0px'}}>
              <div className={cx("payment-box")}>
                <div className={cx("payment-text")}>
                  <p>Trả trước 50%</p>
                </div>
                <Radio
                  checked={selectRadioPrice === "50"}
                  onChange={handleRadioPrice}
                  value="50"
                  name="radio-buttons"

                />
              </div>
              <div className={cx("payment-box")}>
                <div className={cx("payment-text")}>
                  <p>Trả toàn bộ</p>
                </div>
                <Radio
                  checked={selectRadioPrice === "100"}
                  onChange={handleRadioPrice}
                  value="100"
                  name="radio-buttons"

                />
              </div>
            </div>
            <Button
              style={{
                color: "#ffffff",
                backgroundColor: "#fd5056",
                width: "100%",
                height: "38px",
                marginTop: "20px",
              }}
              variant="contained"
              onClick={selectPayment}
            >
              Thanh toán
            </Button>
          </div>
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        style={{ padding: "20px 68px", marginBottom: "20px" }}
      >
        <div className={cx("info-customer")}>
          <div className={cx("heading")}>
            <h5>Thông tin khách hàng</h5>
          </div>
          <div className={cx("body-info-customer")}>
            <DetailCustomerTable
              listCustomer={listCustomer}
              dataTour={detailTour}
              totalPrice={total}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PayMothods;
