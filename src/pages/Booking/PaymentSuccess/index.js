import { Container, Box } from "@mui/material";
import styles from "./PaymentSuccess.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { paymentMoMoStore } from "~/GlobalFunction/Api";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function PaymentSuccess() {
  const id_customer = localStorage.getItem('id_customer');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị từ queryParams
  const id_order = searchParams.get('orderId');
  const amount_paid = searchParams.get('amount');
  const payment_methods = "MOMO"
  // console.log(id_customer,id_order,amount_paid,payment_methods);
  useEffect(()=>{
    const data = paymentMoMoStore(id_customer,id_order,amount_paid,payment_methods);
    console.log(data);
  },[id_customer,id_order,amount_paid,payment_methods])

  return (
    <div>
      <Container
        maxWidth="xl"
        style={{ padding: "20px 68px", marginBottom: "20px" }}
      >
        <Box
          sx={{ width: "100%", marginBottom: "20px" }}
          className={cx("payment-success-container")}
        >
          <div className={cx("heading")}>
            <h5>Đặt tour thành công!! 🎉</h5>
          </div>
          <div className={cx("body")}>
            <div className={cx("heading")} style={{ borderBottom: "none" }}>
              <h5 style={{ fontSize: "24px" }}>Đơn đặt tour của bạn!!</h5>
            </div>
            <div className={cx("tour-container")}></div>
            <div className={cx("body-info-contact")}>
              <div className={cx("body-info-text")}>
                <span>Họ và tên</span>
                <p>Nguyễn Trọng Hiếu</p>
              </div>
              <div className={cx("body-info-text")}>
                <span>Email</span>
                <p>hieu745233@gmail.com</p>
              </div>
              <div className={cx("body-info-text")}>
                <span>Địa chỉ</span>
                <p>Nhà Bè , HCM</p>
              </div>
              <div className={cx("body-info-text")}>
                <span>Điện thoại</span>
                <p>0909090909</p>
              </div>
              <div className={cx("body-info-text")}>
                <span>Ghi chú</span>
                <p>Booking từ travel-react-api.netlify.app</p>
              </div>
            </div>
            <div className={cx("heading")} style={{ borderBottom: "none" }}>
              <h5 style={{ fontSize: "24px" }}>Chi tiết đơn đặt tour!!</h5>
            </div>
            <div className={cx("body-detail-booking")}>
                <div className={cx("label-detail-booking")}>
                  <p>Số booking</p>
                  <p>Số tiền đã thanh toán</p>
                  <p>Ngày đăng ký</p>
                  <p>Hình thức thanh toán</p>
                  <p>Tình trạng</p>
                </div>
                <div className={cx("text-detail-booking")}>
                  <p>
                    <span style={{ color: "#fd5056", fontWeight: "800" }}>
                      11908263713
                    </span>{" "}
                    (Quý khách vui lòng nhớ số booking để thuận tiện cho các
                    giao dịch sau này)
                  </p>
                  <p>8,500,000đ</p>
                  <p>11/06/23 06:40:09</p>
                  <p>Thanh toán qua Momo</p>
                  <p>
                    Booking của quý khách đã được chúng tôi xác nhận thành công
                  </p>
                </div>
              </div>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default PaymentSuccess;
