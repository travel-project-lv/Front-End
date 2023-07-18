import styles from "./TourAdmin.module.scss";
import classNames from "classnames/bind";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Switch, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { getTour } from "~/GlobalFunction/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
const cx = classNames.bind(styles);
function TourAdmin() {
  const [tour, setTour] = useState({});
  const [showTour, setShowTour] = useState({});
  const fileInputRef = useRef(null);
  const [inputUpdate, setInputUpdate] = useState(false);
  const handleInputUpdate = () => setInputUpdate(true);
  const handleInputAdd = () => setInputUpdate(false);
  const navigate = useNavigate();
  //API Product
  useEffect(() => {
    async function loadTour() {
      const data = await getTour();
      setTour(data);
    }
    loadTour();
  }, []);

  const handleCellClick = (params, event) => {
    const { field } = params;
    
    if (field === "delete") {
      handleDelete(params.row.id_tour);
    } else if (field === "update") {
      handleUpdate(params.row.id_tour);
      handleInputUpdate();
      handleOpen();
    } else {
      const stateParam = encodeURIComponent(JSON.stringify(params.row));
      const url = `/admin/tour/${params.row.id_tour}?state=${stateParam}`;
      window.location.href = url;
    }
  };

  const columns = [
    {
      field: "delete",
      headerName: "Xóa",
      width: 110,
      renderCell: (params,event) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleCellClick(params, event)
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
      renderCell: (params,event) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleCellClick(params, event)
          }}
        >
          Sửa
        </Button>
      ),
    },
    { field: "id_tour", headerName: "ID", width: 150 },
    { field: "name_tour", headerName: "Tên tour", width: 150 },
    { field: "content_tour", headerName: "Nội dung tour", width: 150 },
    { field: "place_go", headerName: "Nơi khởi hành", width: 150 },
    { field: "child_price", headerName: "Giá trẻ em", width: 150 },
    { field: "adult_price", headerName: "Giá người lớn", width: 150 },
    {
      field: "img_tour",
      headerName: "Ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.img_tour}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt="Ảnh"
        />
      ),
    },
    { field: "best_seller", headerName: "Tour giảm giá", width: 150 },
    { field: "hot_tour", headerName: "Tour hot", width: 150 },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleInputAdd();
    resetFrom();
  };
  //thêm tour
  const [id_tour, setIdTour] = useState("");
  const [name_tour, setNameTour] = useState("");
  const [content_tour, setContentTour] = useState("");
  const [place_go, setPlaceGo] = useState("");
  const [child_price, setChildPrice] = useState("");
  const [adult_price, setAdultPrice] = useState("");
  const [img_tour, setImgTour] = useState(null);
  const [best_seller, setBestSeller] = useState(1);
  const [hot_tour, setHotTour] = useState(1);
  console.log(img_tour);
  const resetFrom = () => {
    setIdTour("");
    setNameTour("");
    setContentTour("");
    setPlaceGo("");
    setChildPrice("");
    setAdultPrice("");
    setImgTour(null);
    setBestSeller("");
    setHotTour("");
  };
  const handleAdd = () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("id_tour", id_tour);
    formData.append("name_tour", name_tour);
    formData.append("content_tour", content_tour);
    formData.append("place_go", place_go);
    formData.append("child_price", child_price);
    formData.append("adult_price", adult_price);
    formData.append("img_tour", img_tour);
    formData.append("best_seller", best_seller);
    formData.append("hot_tour", hot_tour);
    axios
      .post("https://travel2h.click/public_html/api/tour/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        resetFrom();
        toast.success("Tour đã được lưu thành công.");
        setTimeout(() => {
          navigate("/admin/tour");
        }, 3000); // chuyển hướng sau 2 giây
      })
      .catch((error) => {
        console.log(error);
        toast.error("Mã tour đã tồn tại trong hệ thống");
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://travel2h.click/public_html/api/tour/delete/${id}`)
      .then(() => {
        // xóa thành công, cập nhật lại danh sách tour

        const updatedTour = tour.filter((t) => t.id_tour !== id);
        setTour(updatedTour);
        toast.success("Tour đã được xóa thành công.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Không thể xóa tour vì tồn tại hóa đơn");
      });
  };
  const handleUpdate = (id) => {
    axios
      .get(`https://travel2h.click/public_html/api/tour/show/${id}`)
      .then((response) => {
        setShowTour(response.data);
        setIdTour(response.data.id_tour);
        setNameTour(response.data.name_tour);
        setContentTour(response.data.content_tour);
        setPlaceGo(response.data.place_go);
        setChildPrice(response.data.child_price);
        setAdultPrice(response.data.adult_price);
        setImgTour(response.data.img_tour);
        setBestSeller(response.data.best_seller);
        setHotTour(response.data.hot_tour);
        console.log(showTour);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(img_tour);
  const handleUpdateSubmit = (id) => {
    // // e.preventDefault();
    const formData = new FormData();
    formData.append("id_tour", id_tour);
    formData.append("name_tour", name_tour);
    formData.append("content_tour", content_tour);
    formData.append("place_go", place_go);
    formData.append("child_price", child_price);
    formData.append("adult_price", adult_price);
    formData.append("img_tour", img_tour);
    formData.append("best_seller", best_seller);
    formData.append("hot_tour", hot_tour);
    axios
      .put(`https://travel2h.click/public_html/api/tour/update/${id}`, {
        name_tour,
        content_tour,
        place_go,
        child_price,
        adult_price,
        img_tour,
        best_seller,
        hot_tour,
        formData
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Tour đã được cập nhật thành công.");
        setTimeout(() => {
          navigate("/admin/tour");
        }, 3000); // chuyển hướng sau 2 giây
      })
      .catch((error) => {
        console.log(error);
        toast.error("Mã tour đã tồn tại trong hệ thống");
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUpdate) {
      handleUpdateSubmit(id_tour);
    } else {
      handleAdd();
    }
  };
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
        <h1 style={{ margin: "40px 0px 40px 20px" }}>Quản lý tour du lịch</h1>
        <img src="https://i.imgur.com/BNBtVP9.png" alt="" />
      </div>
      <div>
        <Button
          variant="contained"
          sx={{ marginBottom: "10px" }}
          onClick={handleOpen}
        >
          Thêm tour
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "26px" }}
            >
              {inputUpdate ? "Sửa" : "Thêm"} tour
            </Typography>
            <form
              className={cx("store-input-container")}
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
            >
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Mã tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Mã tour"
                    id="outlined-size-normal"
                    value={id_tour}
                    onChange={(e) => setIdTour(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tên tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Tên tour"
                    id="outlined-size-normal"
                    value={name_tour}
                    onChange={(e) => setNameTour(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Nội dung tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Nội dung tour"
                    id="outlined-size-normal"
                    value={content_tour}
                    onChange={(e) => setContentTour(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Nơi khởi hành: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Nơi khởi hành"
                    id="outlined-size-normal"
                    value={place_go}
                    onChange={(e) => setPlaceGo(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Giá trẻ em: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Giá trẻ em"
                    id="outlined-size-normal"
                    value={child_price}
                    onChange={(e) => setChildPrice(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Giá người lớn: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Giá người lớn"
                    id="outlined-size-normal"
                    value={adult_price}
                    onChange={(e) => setAdultPrice(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ảnh tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <Button sx={{ width: "210px" }} component="label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImgTour(e.target.files[0])}
                      ref={fileInputRef}
                      name="img_tour"
                    />
                  </Button>
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tour giảm giá: </label>
                </div>
                <div className={cx("input-container")}>
                  <Switch
                    checked={best_seller === 1}
                    defaultChecked={best_seller === 1 ? true : undefined}
                    onChange={(e) => setBestSeller(e.target.checked ? 1 : 0)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tour hot: </label>
                </div>
                <div className={cx("input-container")}>
                  <Switch
                    checked={hot_tour === 1}
                    defaultChecked={hot_tour === 1 ? true : undefined}
                    onChange={(e) => setHotTour(e.target.checked ? 1 : 0)}
                  />
                </div>
              </div>
              <Button
                variant="contained"
                sx={{ marginTop: "10px" }}
                type="submit"
              >
                {inputUpdate ? "Sửa" : "Thêm"} tour
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      <DataGrid
        rows={tour}
        columns={columns}
        getRowId={(row) => row.id_tour}
        autoHeight
        onCellClick={handleCellClick}
        rowHeight={150}
        slots={{ toolbar: GridToolbar }}
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
            padding:'8px',
            border:'1px solid #d5d5d5',
            borderRadius:'10px',
            width:'300px',
            margin:'5px 10px'
          },
          // "& .MuiInputBase-root:after": {
          //     borderBottom:'none'
          // },
        }}
      />
    </div>
  );
}

export default TourAdmin;
