import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import { Button, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { detailCustomerApi } from "~/GlobalFunction/Api";

const cx = classNames.bind(styles);

function InfoCustomer({ value, title, inputName,date }) {
  const idCustomer = localStorage.getItem("id_customer");
  const [isEdit, setIsEdit] = useState(false);
  const [isDate,setIsDate] = useState(date);
  console.log(setIsDate);
  const showUpdateRow = () => {
    setIsEdit(true);
  };

  const hideUpdateRow = () => {
    setIsEdit(false);
  };

  const [detailCustomer, setDetailCustomer] = useState({});
  useEffect(() => {
    async function detailData() {
      const data = await detailCustomerApi(idCustomer);
      setDetailCustomer(data);
    }
    detailData();
  }, [idCustomer]);
  //////////////////
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (Object.keys(detailCustomer).length > 0) {
      setFormData({
        customer_name: detailCustomer.customer_name,
        email: detailCustomer.email,
        address: detailCustomer.address,
        phone: detailCustomer.phone,
        gender: detailCustomer.gender,
        date_of_birth: detailCustomer.date_of_birth,
        permission: detailCustomer.permission,
      });
    }
  }, [detailCustomer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
console.log(formData);
  const handleUpdateSubmit = () => {
    axios
      .put(`https://travel2h.click/public_html/api/user/update/${idCustomer}`, formData)
      .then((response) => {
        console.log(response.data);
        window.location.reload(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleButton = () => {
    handleUpdateSubmit();
    hideUpdateRow();
  };
  console.log(isDate);
  return (
    <div>
      <div className={cx("profile-change-info")}>
        <div className={cx("profile-change-row")}>
          <div style={{ width: "160px" }}>
            <h5>{title}: </h5>
          </div>
          <span>{value}</span>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={showUpdateRow}
            cursor="pointer"
          />
        </div>
        {isEdit && (
          <div className={cx("profile-update-row")}>
            <div style={{ width: "160px" }}></div>
            {!isDate ?  <TextField
              id="outlined-basic"
              label={inputName}
              variant="outlined"
              style={{ width: "200px" }}
              value={formData[inputName]}
              onChange={handleChange}
              name={inputName}
              
            />
            : ""}
           
           <Button variant="contained" onClick={handleButton}>
              Xong
            </Button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default InfoCustomer;
