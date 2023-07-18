import styles from "./Quantity.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);

function Quantity({
  title,
  subtitle,
  customerInfo,
  quantity,
  seat,
  totalQuantity,
}) {
  const [quantityAdult, setQuantityAdult] = useState(1);
  

  const [customers, setCustomer] = useState([
    {
      name_customer: "",
      gender: "",
      date: "",
      CMND: "",
    },
  ]);
  console.log(customers);
  //lấy số lượng cho component cha xài
  useEffect(() => {
    quantity(quantityAdult);
  });

  // Xử lý tăng số lương và tăng form
  const handleAddQuantity = () => {
    if (totalQuantity < seat) {
      setQuantityAdult((prevQuantity) => prevQuantity + 1);
      setCustomer([...customers, { name_customer: "", gender: "", date: "" }]);
    }
  };

  // Xử lý giảm số lương và giảm form
  const handleMinusQuantity = () => {
    if (quantityAdult >= 1) {
      setQuantityAdult((prevQuantity) => prevQuantity - 1);
    }
    setCustomer(customers.slice(0, quantityAdult - 1));
  };

  // Xử lý khi nhập dữ liệu vào input
  const handleCustomerInfoChange = (index, field, value) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index][field] = value;
    setCustomer(updatedCustomers);
    customerInfo(updatedCustomers);
  };
  // console.log(customers);
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={cx("quantity-customer-box")}>
        <div className={cx("quantity-customer-title")}>
          <h4>{title}</h4>
          <p>{subtitle} tuổi</p>
        </div>
        <div className={cx("quantity-customer-number")}>
          <span>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={cx("btn-quantity")}
              onClick={handleAddQuantity}
            />
          </span>
          <span className={cx("number-quantity")}>{quantityAdult}</span>
          <span>
            <FontAwesomeIcon
              icon={faCircleMinus}
              className={cx("btn-quantity")}
              onClick={handleMinusQuantity}
            />
          </span>
        </div>
      </div>
      <div className={cx("customer-container")}>
        <div className={cx("heading-form")}>
          <span>Họ và tên</span>
          <span>Giới tính</span>
          <span>Ngày sinh</span>
          <span>Chứng minh thư</span>
        </div>
        {customers.map((customer, index) => (
          <div key={index} className={cx("customer-form")}>
            <TextField
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
              value={customer.name_customer}
              onChange={(e) =>
                handleCustomerInfoChange(index, "name_customer", e.target.value)
              }
              className={cx("input-info")}
            />
            <FormControl style={{ width: "150px" }}>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={customer.sex}
                onChange={(e) =>
                  handleCustomerInfoChange(index, "gender", e.target.value)
                }
                label="Age"
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                placeholder="dd/mm/yyyy"
                sx={{
                  width: 220,
                  ".MuiInputBase-input": { height: 15, fontSize: 16 },
                }}
                onChange={(newValue) => {
                  const currentDate = dayjs(); // Lấy ngày hiện tại
                  const selectedDateValue = dayjs(newValue, 'DD/MM/YYYY');
                  const age = currentDate.diff(selectedDateValue, 'year');
                  let showWarning = false; // Biến cờ để kiểm tra cảnh báo
                
                  if (title === "Người lớn" && age < 12) {
                    showWarning = true;
                    toast.warning("Tuổi người lớn phải lớn hơn 12 tuổi");
                  } else if (title === "Trẻ em" && age > 12) {
                    showWarning = true;
                    toast.warning("Tuổi trẻ em phải nhỏ hơn 12 tuổi");
                  }
                
                  if (!showWarning) {
                    const dateString = selectedDateValue.format("YYYY-MM-DD");
                    handleCustomerInfoChange(index, "date", dateString);
                    setSelectedDate(newValue); // Cập nhật giá trị được render
                  } else {
                    setSelectedDate(null); // Đặt giá trị được render thành null
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} value={customers[index].date} />
                )}
                value={selectedDate}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label="CMND"
              variant="outlined"
              value={customer.CMND}
              onChange={(e) =>
                handleCustomerInfoChange(index, "CMND", e.target.value)
              }
              className={cx("input-info")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quantity;
