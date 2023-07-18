import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import styles from "./DateAdmin.module.scss";
import classNames from "classnames/bind";
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { addDateGo, dategoApi, getTour, listGuideApi } from "~/GlobalFunction/Api";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
function DateGoAdmin() {
  const [dateGo, setDateGo] = useState({});
  const [tour, setTour] = useState({});
  const [guide, setGuide] = useState({});
  const [valueDate, setValueDate] = useState("");
  const [valueTour, setValueTour] = useState({});
  const [valueGuide, setValueGuide] = useState({});
  const [valueSeat, setValueSeat] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function detailData() {
      const data = await dategoApi();
      setDateGo(data);
    }
    detailData();
  }, []);
  useEffect(() => {
    async function listTour() {
      const data = await getTour();
      setTour(data);
    }
    listTour();
  }, []);
  useEffect(() => {
    async function listGuide() {
      const data = await listGuideApi();
      setGuide(data);
    }
    listGuide();
  }, []);
  const columns = [
    {
      field: "delete",
      headerName: "Xóa",
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            // handleDelete(params.row.id);
          }}
        >
          Xóa
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Sửa",
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            // handleUpdate(params.row.id);
            // handleInputUpdate();
            // handleOpen();
          }}
        >
          Sửa
        </Button>
      ),
    },
    { field: "id", headerName: "ID", width: 150 },
    { field: "id_tour", headerName: "Mã tour", width: 150 },
    { field: "date", headerName: "Ngày đi", width: 150 },
    { field: "month", headerName: "Tháng", width: 150 },
    { field: "id_guide", headerName: "Mã hướng dẫn viên", width: 150 },
    { field: "seats", headerName: "Số chỗ còn nhận", width: 150 },
  ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnchangeTour = (e, newValue) => {
    setValueTour(newValue);
  };
  const handleOnchangeGuide = (e, newValue) => {
    setValueGuide(newValue);
  };
  const handleAdd = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
    try {
      await addDateGo(
        valueTour?.id_tour,
        valueDate,
        valueGuide?.id,
        valueSeat
      );
      toast.success("Ngày đi đã được lưu thành công.");
      setValueDate("")
      setValueTour({})
      setValueGuide({})
      setValueSeat("")
    } catch (error) {
      console.error(error);
    }
  };
  
  console.log(valueTour, valueGuide, valueSeat, valueDate);
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
        <h1 style={{ margin: "40px 0px 40px 20px" }}>Quản lý ngày đi</h1>
        <img src="https://i.imgur.com/BNBtVP9.png" alt="" />
      </div>
      <div>
        <Button
          variant="contained"
          sx={{ marginBottom: "10px" }}
          onClick={handleOpen}
        >
          Thêm ngày đi
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h4>Thêm ngày đi</h4>
            <div className={cx("datego-body")}>
              <div className={cx("datego-left")}>
                <div style={{ marginBottom: "20px" }}>
                  <p>Chọn tour: </p>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={tour}
                    sx={{ width: 300 }}
                    onChange={handleOnchangeTour}
                    value={valueTour}
                    getOptionLabel={(option) => option.name_tour || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Tour" />
                    )}
                  />
                </div>
                <div>
                  <p>Chọn hướng dẫn viên: </p>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={guide}
                    sx={{ width: 300 }}
                    onChange={handleOnchangeGuide}
                    value={valueGuide}
                    getOptionLabel={(option) => option.name || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Hướng dẫn viên" />
                    )}
                  />
                </div>
              </div>
              <div className={cx("datego-right")}>
                <div style={{ marginBottom: "20px" }}>
                  <p>Chọn ngày:</p>{" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      placeholder="dd/mm/yyyy"
                      sx={{
                        width: 220,
                        ".MuiInputBase-input": { height: 15, fontSize: 16 },
                      }}
                      onChange={(newValue) => {
                        const dateString = dayjs(newValue).format("YYYY-MM-DD");
                        setValueDate(dateString);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} value={valueDate} />
                      )} // thêm đoạn này
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <p>Số chỗ còn nhận:</p>{" "}
                  <TextField
                    id="outlined-basic"
                    label="Số chỗ còn nhận"
                    variant="outlined"
                    value={valueSeat}
                    onChange={(e) => setValueSeat(e.target.value)}
                    style={{width:'220px'}}
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleAdd}>Thêm</Button>
          </Box>
        </Modal>
      </div>
      <DataGrid
        rows={dateGo}
        columns={columns}
        autoHeight
        rowHeight={150}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
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
        }}
      />
    </div>
  );
}

export default DateGoAdmin;
