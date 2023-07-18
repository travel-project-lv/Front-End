import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { detailTourApi } from "~/GlobalFunction/Api";

function TablePrice({ id, month }) {
  const [date, setDate] = useState([]);
  const access_login = localStorage.getItem("access_token");
  const ggtoken = localStorage.getItem("ggtoken");
  const faceId = localStorage.getItem("faceId");
  const [price,setPrice] = useState(null);
  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(id);
      const filteredData = data.date_go.filter((item) => item.month === month);
      setPrice(data.adult_price)
      setDate(filteredData);
    }
    detailData();
  }, [id, month]);
  console.log(date);
  if (date === null) {
    return <div>Loading...</div>;
  }
  function isUpcomingDate(date) {
    // Tạo đối tượng Date cho ngày hiện tại
    const currentDate = new Date();

    // Tạo đối tượng Date cho ngày khởi hành
    const departureDate = new Date(date);

    // Tính toán khoảng cách giữa hai ngày (số mili giây)
    const timeDiff = departureDate.getTime() - currentDate.getTime();

    // Chuyển khoảng cách từ mili giây sang số ngày
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff <= 7 && daysDiff > 1) {
      return true; // Ngày khởi hành là ngày gần tới (trong khoảng 7 ngày)
    } else {
      return false; // Ngày khởi hành không phải là ngày gần tới
    }
  }
  function isPastDate(date) {
    const currentDate = new Date();
    const departureDate = new Date(date);


    return departureDate <= currentDate;
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "280px", fontSize: "20px" }}>
                Ngày khởi hành
              </TableCell>
              <TableCell style={{ fontSize: "20px" }} align="right">
                Hạng tour
              </TableCell>
              <TableCell style={{ fontSize: "20px" }} align="right">
                Số chỗ còn nhận
              </TableCell>
              <TableCell style={{ fontSize: "20px" }} align="right">
                Giá tour
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {date && date.length > 0 ? (
              date.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "16px" }}
                  >
                    {row.date}
                    {isUpcomingDate(row.date) ? (
                      <span style={{ fontSize: "16px", color: "red" }}>
                        {" "}
                        (Sắp khởi hành)
                      </span>
                    ) : (
                      ""
                    )}
                    {isPastDate(row.date) ? <span style={{ fontSize: "16px", color: "red" }}>
                        {" "}
                        (Đã qua)
                      </span> : ""}
                  </TableCell>
                  <TableCell style={{ fontSize: "16px" }} align="right">
                    Tour trọn gói
                  </TableCell>
                  <TableCell style={{ fontSize: "16px" }} align="right">
                    {row.seats === 0 ? (
                      <p style={{ color: "#ff0000", paddingRight: "50px" }}>
                        Hết chỗ
                      </p>
                    ) : (
                      <p style={{ paddingRight: "50px" }}>{row.seats} Chỗ</p>
                    )}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", color: "red" }}
                    align="right"
                  >
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                    {access_login || ggtoken || faceId ? (
                      <Link
                        to={`/booking/tourId/${id}?state=${encodeURIComponent(
                          id
                        )}&date=${encodeURIComponent(
                          row.id
                        )}&seat=${encodeURIComponent(row.seats)}`}
                        style={(row.seats === 0  || isPastDate(row.date)) ? { pointerEvents: "none" } : {}}
                      >
                        <Button
                          variant="contained"
                          style={{ marginLeft: "10px" }}
                          disabled={(row.seats === 0  || isPastDate(row.date))}
                        >
                          Chọn ngày
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        style={row.seats === 0 ? { pointerEvents: "none" } : {}}
                      >
                        {" "}
                        <Button
                          variant="contained"
                          style={{ marginLeft: "10px" }}
                          disabled={row.seats === 0}
                        >
                          Chọn ngày
                        </Button>
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No dates available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TablePrice;
