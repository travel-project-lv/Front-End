import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Box } from "@mui/material";
import InfoCustomer from "./InfoCustomer";
import { useEffect, useState } from "react";
import {
  detailCustomerApi,
  detailCustomerSocial,
  userFaceio,
} from "~/GlobalFunction/Api";
const cx = classNames.bind(styles);
function Profile() {
  const idCustomer = localStorage.getItem("id_customer");
  const email = localStorage.getItem("email");
  const payload = localStorage.getItem("payload");
  const ggtoken = localStorage.getItem("ggtoken");
  const faceId = localStorage.getItem("faceId");
  const [detailCustomer, setDetailCustomer] = useState({});
  const [detailSocial, setDetailSocial] = useState({});
  useEffect(() => {
    async function detailData() {
      if (ggtoken) {
        const data = await detailCustomerSocial(email);
        setDetailSocial(data);
      } else if (faceId) {
        const data = await userFaceio(payload);
        setDetailCustomer(data);
        localStorage.setItem("id_customer",data[0].id)
      } else {
        const data = await detailCustomerApi(idCustomer);
        setDetailCustomer(data);
      }
    }
    detailData();
  }, [idCustomer, email, ggtoken, faceId, payload]);

  ggtoken
    ? localStorage.setItem("id_customer", detailSocial[0]?.id)
    : console.log("loi");
  console.log(detailSocial[0]?.id);

  return (
    <div>
      <Box>
        <div className={cx("profile-change-container")}>
          <div className={cx("profile-change-heading")}>
            <h5>Thông tin cá nhân</h5>
            <span>
              Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này
              được sử dụng ra sao.
            </span>
          </div>

          <InfoCustomer
            title="Họ và tên"
            value={
              ggtoken || faceId
                ? detailSocial[0]?.customer_name
                : detailCustomer?.customer_name
            }
            inputName="customer_name"
            date={false}
          />
          <InfoCustomer title="Số tour đã đi" value="Chưa có thông tin" />
          <InfoCustomer
            title="Email"
            value={ggtoken || faceId ? detailSocial[0]?.email : detailCustomer?.email}
            inputName="email"  date={true}
          />
          <InfoCustomer
            title="Số điện thoại"
            value={ggtoken || faceId  ? detailSocial[0]?.phone : detailCustomer?.phone}
            inputName="phone"  date={false}
          />
          <InfoCustomer
            title="Ngày sinh"
            value={
              ggtoken || faceId
                ? detailSocial[0]?.date_of_birth
                : detailCustomer?.date_of_birth
            }
            inputName="date_of_birth"
            date={false}
          />
          <InfoCustomer
            title="Giới tính"
            value={ggtoken || faceId ? detailSocial[0]?.gender : detailCustomer?.gender}
            inputName="gender"
            date={false}
          />
          <InfoCustomer title="Quốc tịch" value="Chưa có thông tin"   date={false} />
          <InfoCustomer
            title="Địa chỉ"
            value={ggtoken || faceId ? detailSocial[0]?.address : detailCustomer?.address}
            inputName="address"
            date={false}
          />
          <InfoCustomer title="CMND" value="Chưa có thông tin" 
            date={true}/>
        </div>
      </Box>
    </div>
  );
}

export default Profile;
