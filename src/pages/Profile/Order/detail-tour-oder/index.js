import classNames from "classnames/bind";
import styles from "~/pages/Profile/Profile.module.scss";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { detailTourApi, detailTourOder } from "~/GlobalFunction/Api";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);
function DetailOrderTour() {
  const { id } = useParams();
  const [detailOrder, setDetailOder] = useState({});
  const [tour, setTour] = useState({});
  useEffect(() => {
    if (detailOrder?.detail_order && detailOrder?.detail_order[0]?.id_tour) {
      async function detailData() {
        const data = await detailTourApi(detailOrder?.detail_order[0].id_tour);
        setTour(data);
      }
      detailData();
    }
  }, [detailOrder.detail_order]);
  console.log(tour);

  useEffect(() => {
    async function detailData() {
      const data = await detailTourOder(id);
      setDetailOder(data);
    }
    detailData();
  }, [id]);
  const detailCustommer = detailOrder?.detail_order;
  console.log(detailCustommer);
  return (
    <Container>
      <div className={cx("profile-change-container")}>
        <div className={cx("profile-change-heading")}>
          <h2 style={{ margin: "20px" }}>Thông tin Tour</h2>

          <TableContainer component={Paper} variant="outlined">
            <TableHead>
              <TableRow>
                <TableCell className={cx("headCell")}>Tên Tour</TableCell>
                <TableCell className={cx("headCell")}>Hình ảnh</TableCell>
                <TableCell className={cx("headCell")}>Nơi khởi hành</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {tour?.name_tour}{" "}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  <img
                    style={{ width: "300px" }}
                    src={tour?.img_tour}
                    alt="mota"
                  />
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {tour?.place_go}
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
          <h2 style={{ margin: "20px" }}>Thông tin người đặt Tour</h2>
          <TableContainer component={Paper} variant="outlined">
            <TableHead>
              <TableRow>
                <TableCell className={cx("headCell")}>Tên</TableCell>
                <TableCell className={cx("headCell")}>Email</TableCell>
                <TableCell className={cx("headCell")}>Số điện thoại</TableCell>
                <TableCell className={cx("headCell")}>Địa chỉ</TableCell>
                <TableCell className={cx("headCell")}>Ngày đặt tour</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.name}{" "}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.email}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.phone}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.address}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.order_time}
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>

          <h2 style={{ margin: "20px" }}>Thông tin khách hàng tham gia Tour</h2>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={cx("headCell")}>Tên</TableCell>
                  <TableCell className={cx("headCell")}>Giới tính</TableCell>
                  <TableCell className={cx("headCell")}>CMND</TableCell>
                  <TableCell className={cx("headCell")}>Ngày sinh</TableCell>
                  <TableCell className={cx("headCell")}>Loại khách</TableCell>
                  <TableCell className={cx("headCell")}>Giá vé</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailOrder.detail_order &&
                  detailOrder.detail_order.map((item) => (
                    <TableRow>
                      <TableCell className={cx("bodyCell")} key={item.id}>
                        {item.name_customer}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.sex}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.CMND}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.birth}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.age}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.age === "Người lớn"
                          ? (tour.adult_price ?? "").toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : (tour.child_price ?? "").toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className={cx("footCell")}>
                    Tổng giá tiền
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className={cx("footCell")}>
                    {" "}
                    {(detailOrder?.total_price ?? "").toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={cx("footCell")}>
                    Số tiền đã thanh toán
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className={cx("footCell")}>
                    {detailOrder?.payment?.length > 0
                      ? (
                          detailOrder.payment[0].amount_paid ?? ""
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={cx("footCell")}>
                    Số tiền chưa thanh toán
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className={cx("footCell")}>
                    {detailOrder?.payment?.length > 0
                      ? (
                          detailOrder.payment[0].amount_unpaid ?? ""
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : ""}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
}

export default DetailOrderTour;
