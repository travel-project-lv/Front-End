import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function DetailCustomerTable({ listCustomer ,dataTour , totalPrice}) {
  // const totalPrice = (listCustomer,dataTour)=>{
  //   let total = 0;
  //   listCustomer.forEach((row)=>{
  //     const adultPrice = dataTour.adult_price ? dataTour.adult_price.replace(/,/g, "") : "0";
  //     const childPrice = dataTour.child_price ? dataTour.child_price.replace(/,/g, "") : "0";
  //     const price = row.age === "Người lớn" ? parseFloat(adultPrice) : parseFloat(childPrice);
  //     total += price;
  //   })
  //   return total;
  // }
  // const total = totalPrice(listCustomer,dataTour)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: "18px" }}>Họ và tên</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Ngày sinh</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Giới tính</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Địa chỉ</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Độ tuổi</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Giá tour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCustomer.map((row) => (
              <TableRow>
                <TableCell style={{ fontSize: "16px" }}>
                  {row.name_customer}
                </TableCell>
                <TableCell style={{ fontSize: "16px" }}>{row.birth}</TableCell>
                <TableCell style={{ fontSize: "16px" }}>{row.sex}</TableCell>
                <TableCell style={{ fontSize: "16px" }}></TableCell>
                <TableCell style={{ fontSize: "16px" }}>{row.age}</TableCell>
                <TableCell style={{ fontSize: "16px" }}>
                  <span style={{ color: "#fd5056", fontWeight: "800" }}>
                    {row.age === "Người lớn" ? dataTour.adult_price : dataTour.child_price} đ
                  </span>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={4} colSpan={4} />
              <TableCell colSpan={2} style={{ fontSize: "16px" }} align="right">
                Tổng thành tiền:{" "}
                <span style={{ color: "#fd5056", fontWeight: "800" }}>
                  {totalPrice.toLocaleString()}đ
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DetailCustomerTable;
