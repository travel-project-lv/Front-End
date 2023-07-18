import { useEffect, useState } from "react";
import firebase from "~/pages/Booking/filebase.config";
import {
  Box,
  Button,
  Container,
  Modal,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import styles from "./Booking.module.scss";
import classNames from "classnames/bind";
import Quantity from "./Quantity";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import TravelCard from "./TravelCard";
import {  toast } from "react-toastify";
// import { HashLoader } from "react-spinners";
// import { signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "~/pages/Booking/filebase.config";
import OtpInput from "otp-input-react";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Booking() {
  //Chuyển lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  /////////////////////////
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    alignContent:'space-between'
  };
  //////////////////////////
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idTour = queryParams.get("state");
  console.log(idTour);
  const id_date = queryParams.get("date");
  const seats = queryParams.get("seat");
  const navigate = useNavigate();
  ////////////////////////
  const id_customer = localStorage.getItem("id_customer");
  const nameSocial = localStorage.getItem("name");
  const emailSocial = localStorage.getItem("email");
  const [email, setEmail] = useState(emailSocial);
  const [name, setName] = useState(nameSocial);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState({
    adultInfo: [],
    childInfo: [],
  });
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity, setChildQuantity] = useState(1);
  const [total_price, setTotalPrice] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const handleUpdateTotalPrice = (newTotalPrice) => {
    setTotalPrice(newTotalPrice);
  };
  //số lượng người lớn
  const handleAdultQuantityChange = (newQuantity) => {
    setAdultQuantity(newQuantity);
  };

  //số lượng trẻ em
  const handleChildQuantityChange = (newQuantity) => {
    setChildQuantity(newQuantity);
  };

  //tổng số lượng
  const totalQuantity = adultQuantity + childQuantity;

  //Thêm dữ liệu vào mảng adultInfo khi nhập từ input của người lớn
  const handleAdultCustomerInfoChange = (info) => {
    const updatedInfo = info.map((customer) => ({
      ...customer,
      age: "Người lớn",
    }));
    setDetail((prevInfo) => ({
      ...prevInfo,
      adultInfo: updatedInfo,
    }));
  };
  console.log(detail);

  //Thêm dữ liệu vào mảng childInfo khi nhập từ input của trẻ em
  const handleChildCustomerInfoChange = (info) => {
    const updatedInfo = info.map((customer) => ({
      ...customer,
      age: "Trẻ em",
    }));
    setDetail((prevInfo) => ({
      ...prevInfo,
      childInfo: updatedInfo,
    }));
  };

  //Xử lý đặt tour
  // const handleCheckout = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setTimeout(async () => {
  //     await axios
  //       .post(`https://travel2h.click/public_html/api/tour/checkout/${idTour}`, {
  //         email,
  //         name,
  //         phone,
  //         address,
  //         id_customer,
  //         id_date,
  //         detail,
  //         total_price,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         const { id_order_tour } = res.data.order;
  //         setLoading(false);
  //         navigate(`/booking/payment/${id_order_tour}/idTour/${idTour}`);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, 1500);
  // };
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
  //Thông báo quá số lượng chỗ
  if (totalQuantity > seats) {
    toast.error("Quá số lượng chỗ");
  }
  //   useEffect(() => {
  //   async function detailData() {
  //     if (ggtoken) {

  //       const data = await detailCustomerSocial(email);
  //       setDetailSocial(data);
  //     }
  //   }
  //   detailData();

  // }, [email,ggtoken]);
  const handleSendCode = () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    const phoneNumber = "+84" + phone;
    console.log(phoneNumber);
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.error("Error sending verification code:", error);
      });
  };
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const submit = () => {
    handleOpen();
    handleSendCode();
  };
  const onCheckout = () => {
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // Phone number successfully verified
        setLoading(true);
        setTimeout(async () => {
          await axios
            .post(`https://travel2h.click/public_html/api/tour/checkout/${idTour}`, {
              email,
              name,
              phone,
              address,
              id_customer,
              id_date,
              detail,
              total_price,
            })
            .then((res) => {
              console.log(res);
              const { id_order_tour } = res.data.order;
              setLoading(false);
              navigate(`/booking/payment/${id_order_tour}/idTour/${idTour}`);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 1500);
      })
      .catch((error) => {
        console.error('Error verifying code:', error);
      });
  };
  console.log(total_price);
  return (
    <>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Xác thực OTP</h3>
            <FontAwesomeIcon icon={faShieldHalved} style={{fontSize:'80px',color:'#1972d2',margin:'10px 0px'}}/>
            <p>Mã xác thực đã được gửi về số điện thoại của bạn đã đăng ký</p>
            <p>Vui lòng nhập mã OTP và xác nhận</p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container "
            ></OtpInput>
            <Button variant="contained" onClick={onCheckout} style={{margin:'16px 0px',width:'100%'}}>Xác thực OTP</Button>
          </Box>
        </Modal>
        <div id="recaptcha-container"></div>
        <Button onClick={handleSendCode}>ZA</Button>
        <Box sx={{ width: "100%", marginBottom: "20px" }}>
          <Stepper alternativeLabel sx={customStyles}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <h2 className={cx("content-tour-heading")}>Tổng quan về chuyến đi</h2>
        <div className={cx("booking-body")}>
          <div className={cx("booking-info-customer")}>
            <div>
              <h3
                className={cx("content-tour-heading")}
                style={{ fontSize: "22px" }}
              >
                Thông tin liên hệ
              </h3>

              <div className={cx("text-field-container")}>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Họ và tên</label>
                    <p style={{ color: "red" }}> *</p>
                  </div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Họ và tên"
                    variant="outlined"
                    value={name}
                    sx={{ width: "385px", marginTop: "10px" }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    helperText={!name ? "Họ tên là bắt buộc" : ""}
                    error={!name}
                  />
                </div>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Email</label>
                    <p style={{ color: "red" }}> *</p>
                  </div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    variant="outlined"
                    value={email}
                    sx={{ width: "385px", marginTop: "10px" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    error={!email}
                    helperText={!email ? "Email là bắt buộc" : ""}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <label>Số điện thoại</label>
                    <p style={{ color: "red" }}> *</p>
                  </div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Số điện thoại"
                    variant="outlined"
                    value={phone}
                    sx={{ width: "385px", marginTop: "10px" }}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    error={!phone}
                    helperText={!phone ? "Số điện thoại là bắt buộc" : ""}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <label>Địa chỉ</label>
                    <p style={{ color: "red" }}> *</p>
                  </div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Địa chỉ"
                    variant="outlined"
                    value={address}
                    sx={{ width: "385px", marginTop: "10px" }}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    error={!address}
                    helperText={!address ? "Địa chỉ là bắt buộc" : ""}
                  />
                </div>
              </div>
            </div>
            <div className={cx("quantity-customer-container")}>
              <h3
                className={cx("content-tour-heading")}
                style={{ fontSize: "22px" }}
              >
                Hành khách
              </h3>
              <div>
                <Quantity
                  title="Người lớn"
                  subtitle="&gt; 12"
                  customerInfo={handleAdultCustomerInfoChange}
                  quantity={handleAdultQuantityChange}
                  seat={seats}
                  totalQuantity={totalQuantity}
                />
                <Quantity
                  title="Trẻ em"
                  subtitle="Từ 5 - 11"
                  customerInfo={handleChildCustomerInfoChange}
                  quantity={handleChildQuantityChange}
                  seat={seats}
                  totalQuantity={totalQuantity}
                />
              </div>
            </div>
          </div>
          <div className={cx("booking-info-tour")}>
            <TravelCard
              quantityAdult={adultQuantity}
              quantityChild={childQuantity}
              totalQuantity={totalQuantity}
              checkout={submit}
              idTour={idTour}
              onUpdateTotalPrice={handleUpdateTotalPrice}
              loading={loading}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Booking;
