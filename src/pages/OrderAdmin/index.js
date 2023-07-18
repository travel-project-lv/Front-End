import { useEffect, useState } from "react";
import styles from "./OrderAdmin.module.scss";
import classNames from "classnames/bind";
import { getDetailOrder, getOrderTour } from "~/GlobalFunction/Api";
import { Button, Chip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import dayjs from "dayjs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ModalAdd from "./ModalAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function OrderAdmin() {
  const [order, setOrder] = useState({});
  const [detailOrder, setDetailOrder] = useState({});
  const [listCustomer, setListCustomer] = useState([]);
  const [isAdd,setIsAdd] = useState(false);


  //Api Detail Order
    const handleUpdate = async (idBooking)=>  {
      const data = await getDetailOrder(idBooking);
      setDetailOrder(data);
      setListCustomer(data.detail_order);
    }
  //API Order
  useEffect(() => {
    async function loadTour() {
      const data = await getOrderTour();
      setOrder(data);
    }
    loadTour();
  }, [order]);
  // Dữ liệu cột
  const columns = [
    {
      field: "accept",
      headerName: "Xác nhận",
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            // handleUpdate(params.row.id_tour);
            // handleInputUpdate();
            // handleOpen();
            handleAccept(params.row.id_order_tour)
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            handleDelete(params.row.id_order_tour);
          }}
        >
          <FontAwesomeIcon icon={faXmark}/>
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Sửa",
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            handleUpdate(params.row.id_order_tour);
            handleOpen();
            handleButtonUpdate();
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      ),
    },
    { field: "id_order_tour", headerName: "ID", width: 150 },
    { field: "order_time", headerName: "Thời gian đặt", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "name", headerName: "Tên người đặt", width: 150 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) =>
        params.value === "Yes" ? (
          <Chip label="Đã xác nhận" color="success" sx={{fontSize:'12px'}} />
        ) : (
          <Chip label="Chưa xác nhận" color="error" sx={{fontSize:'12px'}}/>
        ),
    },
    { field: "address", headerName: "Địa chỉ", width: 150 },
  ];
  /// Xử lý mở modal thêm
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleButtonAdd = () => setIsAdd(true);
  const handleButtonUpdate = () => setIsAdd(false);
  // xử lý xóa 
  const handleDelete = (id)=>{
    axios
    .delete(`https://travel2h.click/public_html/api/order/delete/${id}`)
    .then(() => {
      // xóa thành công, cập nhật lại danh sách tour

      const updatedOrder = order.filter((t) => t.id_order_tour !== id);
      setOrder(updatedOrder);
      toast.success("Đơn đặt tour đã được xóa thành công.");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Không thể xóa đơn đặt vì tồn tại chi tiết hóa đơn");
    });
  }
    // xử lý xác nhận
    const handleAccept = (id)=>{
      axios
      .put(`https://travel2h.click/public_html/api/order/accept/${id}`)
      .then(() => {
        // xóa thành công, cập nhật lại danh sách tour
        toast.success("Đơn đặt tour đã được xác nhận");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Không thể xác nhận đơn đặt tour");
      });
    }
  return (
    <div
      style={{
        height: 1000,
        width: "1120px",
        display: "flex",
        flexDirection: "column",
        margin: "50px auto",
      }}
    >
        <ToastContainer position="top-right" autoClose={3000} />
      <div className={cx("heading-container")}>
        <h1 style={{ margin: "40px 0px 40px 20px" }}>Quản lý đơn đặt tour</h1>
        <img src="https://i.imgur.com/BNBtVP9.png" alt="" />
      </div>
      {/* Modal thêm */}
      <div>
        <Button
          variant="contained"
          sx={{ marginBottom: "10px", }}
          onClick={() =>{
            handleOpen();
            handleButtonAdd();
          }}
        >
          <p style={{fontSize:'13px'}}>Thêm đơn đặt tour</p>
        </Button>
        {/* Modal thêm  */}
        <ModalAdd open={open} handleClose={handleClose} order={detailOrder} customer={listCustomer} button={isAdd}/>
      </div>
      <DataGrid
        rows={order}
        columns={columns}
        getRowId={(row) => row.id_order_tour}
        autoHeight
        
        onRowClick={(params, event) => {
          // Xử lý sự kiện onclick ở đây
          console.log('Dòng được click:', params.row);
        }}
        rowHeight={150}
        slots={{ toolbar: GridToolbar ,csvOptions: {
          fileName: 'customerDataBase',
          delimiter: ';',
          utf8WithBom: false,
        },}}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          cursor:"pointer",
          "& .MuiDataGrid-colCell": {
            fontSize: "14px",
          },
          "& .MuiDataGrid-cell, & .MuiDataGrid-colCellTitle, ": {
            fontSize: "14px",
          },
          "& .MuiButtonBase-root": {
            fontSize: "14px",
          },
          "& .MuiInputBase-root": {
            fontSize: "14px",
            padding: "8px",
            border: "1px solid #d5d5d5",
            borderRadius: "10px",
            width: "300px",
            margin: "5px 10px",
          },
          // "& .MuiInputBase-root:after": {
          //     borderBottom:'none'
          // },
        }}
      />
    </div>
  );
}

export default OrderAdmin;
