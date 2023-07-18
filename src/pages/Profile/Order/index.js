import classNames from "classnames/bind";
import styles from "~/pages/Profile/Profile.module.scss";
import { Box } from "@mui/material";
import CardOrder from "./CardOrder";
import { useEffect, useState } from "react";
import { getOrder } from "~/GlobalFunction/Api";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Order() {
    const [order,setOrder] = useState({});
    const idCustomer = localStorage.getItem('id_customer');
    useEffect(() => {
        async function detailData() {
          const data = await getOrder(idCustomer);
          setOrder(data);
          console.log(order);
        }
        detailData();
      }, [order,idCustomer]);
      
  return (
    <div>
      <Box>
        <div className={cx("profile-change-container")}>
          <div className={cx("profile-change-heading")}>
            <h5>Đơn đặt tour</h5>
            <span>
              Quý khách của thể xem thông tin cơ bản và chi tiết các tour đã đặt
            </span>
          </div>
          <div>
            {Array.isArray(order) && order.map((data)=>(
              <Link to={`/detai_order_tour/${data.order.id_order_tour}`} style={{textDecoration:"none"}}>

                <CardOrder id={data.order.id_order_tour} name={data.order.name} email={data.order.email} idTour={data.dataDate.id_tour}
                
                
                />
                </Link>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Order;
