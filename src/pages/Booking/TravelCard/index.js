import styles from "./TravelCard.module.scss";
import classNames from "classnames/bind";
import {
  Container,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { applyDiscount, detailTourApi } from "~/GlobalFunction/Api";
import { HashLoader } from "react-spinners";

const cx = classNames.bind(styles);

function TravelCard({
  quantityAdult,
  quantityChild,
  totalQuantity,
  checkout,
  idTour,
  onUpdateTotalPrice,
  loading,
}) {
  const style = {
    fontSize: "16px",
    borderBottom: "none",
    fontWeight: "500",
    padding: "12px 0px",
  };
  const [detailTour, setDetailTour] = useState({});
  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(idTour);
      setDetailTour(data);
    }
    detailData();
  }, [idTour]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  useEffect(() => {
    if (detailTour && detailTour.adult_price && detailTour.child_price) {
      const adultPrice = parseFloat(detailTour.adult_price);
      const childPrice = parseFloat(detailTour.child_price);
      const newTotalPrice =
        quantityAdult * adultPrice + quantityChild * childPrice;
      setTotalPrice(newTotalPrice);
      setOriginalPrice(newTotalPrice);
    }
  }, [quantityAdult, quantityChild, detailTour]);

  const [discount, setDiscount] = useState("");
  const handleDiscount = async () => {
    // const lastTotal = totalPrice;
    if (discount !== "") {
      const data = await applyDiscount(totalPrice, discount);
      setTotalPrice(data.discounted_total_amount);
    } else {
      setTotalPrice(originalPrice);
    }
  };
  onUpdateTotalPrice(totalPrice);
  console.log(totalPrice);
  return (
    <div>
      <Container>
        <Box className={cx("travel-container")}>
          <div className={cx("heading")}>
            <h5>Tóm tắt chuyến đi</h5>
          </div>
          <div className={cx("image")}>
            <p>Tour trọn gói : {idTour}</p>
            <img src={detailTour.img_tour} alt="" />
          </div>
          <div className={cx("info-tour")}>
            <p>{detailTour.name_tour}</p>
          </div>
          <div>
            <Timeline position="alternate">
              <TimelineItem sx={{ flex: 1 }}>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" variant="outlined">
                    <FontAwesomeIcon
                      icon={faBus}
                      style={{ color: "#4d4aef" }}
                    />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant="h6" component="span">
                    Ngày đi
                  </Typography>
                  <Typography variant="h5">T3, 20-6-2023</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem sx={{ flex: 1 }}>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" variant="outlined">
                    <FontAwesomeIcon
                      icon={faBus}
                      style={{ color: "#4d4aef" }}
                    />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant="h6" component="span">
                    Ngày về
                  </Typography>
                  <Typography variant="h5">T6, 23-6-2023</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
          <div>
            <Paper
              sx={{
                backgroundColor: "transparent",
                marginTop: "10px",
              }}
              variant="outline"
            >
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={style}>Tổng số hành khách</TableCell>
                      <TableCell sx={style} style={{ textAlign: "center" }}>
                        <FontAwesomeIcon
                          icon={faUsers}
                          style={{ marginRight: "8px" }}
                        />
                        {totalQuantity} người
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={style}>Người lớn</TableCell>
                      <TableCell sx={style} style={{ textAlign: "center" }}>
                        {quantityAdult} x {detailTour.adult_price}₫
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={style}>Trẻ em</TableCell>
                      <TableCell sx={style} style={{ textAlign: "center" }}>
                        {quantityChild} x {detailTour.child_price}₫
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ borderBottom: "2px solid #ddd" }}>
                      <TableCell sx={style}>Mã giảm giá</TableCell>
                      <TableCell
                        sx={style}
                        style={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Thêm mã"
                          variant="outlined"
                          sx={{ marginRight: "8px", width: "110px" }}
                          onChange={(e) => setDiscount(e.target.value)}
                        />{" "}
                        <Button
                          variant="contained"
                          sx={{ height: "46px" }}
                          onClick={handleDiscount}
                        >
                          Áp dụng
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={style} style={{ fontSize: "20px" }}>
                        Tổng cộng
                      </TableCell>
                      <TableCell
                        sx={style}
                        style={{
                          textAlign: "center",
                          fontSize: "22px",
                          fontWeight: "600",
                          color: "#fd5056",
                        }}
                      >
                        {totalPrice.toLocaleString()}₫
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
          <div>
            {/* <form onSubmit={checkout} encType="multipart/form-data"> */}
            {loading ? (
              <div className={cx("sweet-loading")}>
                <HashLoader size={80} color={"#4f46e5"} />{" "}
              </div>
            ) : (
              <Button
                variant="contained"
                sx={{ width: "100%", height: "50px", marginTop: "10px" }}
                type="submit"
                onClick={checkout}
              >
                Đặt tour
              </Button>
            )}
            {/* </form> */}
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default TravelCard;
