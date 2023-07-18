import styles from "./NewsAdmin.module.scss";
import classNames from "classnames/bind";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
// import images from "~/component/assets/images";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {  TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getNews } from "~/GlobalFunction/Api";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
//  import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";


// import { render } from "@testing-library/react";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

// const editorConfiguration = {
//     toolbar: [ 'heading',
//     '|',
//     'bold',
//     'italic',
//     'link',
//     'bulletedList',
//     'numberedList',
//     'alignment',
//     '|',
//     'undo',
//     'redo', ]
// };

// import { CKEditor } from "@ckeditor/ckeditor5-react";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
const cx = classNames.bind(styles);
function NewsAdmin() {
  const [news, setNews] = useState({});
  // const [showNews, setShowNews] = useState({});
  const fileInputRef = useRef(null);
  const [inputUpdate, setInputUpdate] = useState(false);
  // const handleInputUpdate = () => setInputUpdate(true);
  const handleInputAdd = () => setInputUpdate(false);
  const navigate = useNavigate();



  //API Product
  useEffect(() => {
    async function loadNews() {
      const data = await getNews();
      setNews(data);
    }
    loadNews();
  }, []);
  const columns = [
    {
      field: "delete",
      headerName: "Xóa",
      width: 110,
      renderCell: () => (
        <Button variant="contained" color="secondary">
          Xóa
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Sửa",
      width: 110,
      renderCell: () => (
        <Button variant="contained" color="secondary">
          Sửa
        </Button>
      ),
    },
    { field: "id_news", headerName: "ID", width: 190 },
    { field: "title_news", headerName: "Tiêu đề", width: 190 },
    { field: "date", headerName: "Ngày đăng tải", width: 190 },
    {
      field: "img_news",
      headerName: "Ảnh tin tức",
      width: 190,
      renderCell: (params) => (
        <img
          src={params.row.img_news}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt="Ảnh"
        />
      ),
    },
  ];
  

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleInputAdd();
    resetFrom();
  };
  const [id_news, setIdNews] = useState("");
  const [title_news, setTitleNews] = useState("");
  const [date, setDateNews] = useState("");
  const [content_news, setContentNews] = useState("");
  const [img_news, setImgNews] = useState(null);
  console.log(img_news);
  console.log(content_news);
  const resetFrom = () => {
    setIdNews("");
    setTitleNews("");
    setDateNews("");
    setContentNews("");
    setImgNews(null);

  };
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id_news", id_news);
    formData.append("title_news", title_news);
    formData.append("date", date);
    formData.append("content_news", content_news);
    formData.append("img_news", img_news);
    axios
      .post("https://travel2h.click/public_html/api/news/store", formData)
      .then((response) => {
        console.log(response.data);
        resetFrom();
        toast.success("Tin đã được thêm thành công.");
        setTimeout(() => {
          navigate("/admin/news");
        }, 3000); // chuyển hướng sau 2 giây
      })
      .catch((error) => {
        console.log(error);
        toast.error("Mã tin đã tồn tại trong hệ thống");
      });
  };

 
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContentNews(data);
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
        <h1 style={{ margin: "40px 0px 40px 20px" }}>Quản lý tin tức</h1>
        <img src="https://i.imgur.com/BNBtVP9.png" alt="" />
      </div>
      <div>
        <Button
          variant="contained"
          sx={{ marginBottom: "10px" }}
          onClick={handleOpen}
        >
          Thêm tin tức
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
              {/* {inputUpdate ? "Sửa" : "Thêm"} khách hàng */}
            </Typography>
            <form
              className={cx("store-input-container")}
            onSubmit={handleAdd}
            enctype="multipart/form-data"
            >
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Id: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Id"
                    id="outlined-size-normal"
                    value={id_news}
                    onChange={(e) => setIdNews(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tiêu đề: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Tiêu đề"
                    id="outlined-size-normal"
                    value={title_news}
                    onChange={(e) => setTitleNews(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ngày đăng: </label>
                </div>
                <div className={cx("input-container")}>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      placeholder="dd/mm/yyyy"
                      sx={{
                        width: 210,
                        ".MuiInputBase-input": { height: 3, fontSize: 12 },
                      }}
                      onChange={(newValue) => {
                        const dateString = dayjs(newValue).format("DD/MM/YYYY");
                        setDateNews(dateString);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} value={date} />
                      )} // thêm đoạn này
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ảnh tin tức: </label>
                </div>
                <div className={cx("input-container")}>
                  <Button sx={{ width: "210px" }} component="label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImgNews(e.target.files[0])}
                      ref={fileInputRef}
                    />
                  </Button>
                </div>
              </div>

              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Nội dung tin tức: </label>
                </div>
                <div className={cx("input-container")}>
                  <CKEditor
                    editor={Editor}
                    data={content_news}
                    config={{
                      toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'alignment',
                        '|',
                        'undo',
                        'redo',
                        'fontSize',
                        'fontColor',
                        'imageInsert'

                      ]
                    }}
                    onReady={(editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle('height', '300px', editor.editing.view.document.getRoot());
                        writer.setStyle('width', '600px', editor.editing.view.document.getRoot());
                      });
                    }}
                    onChange={handleEditorChange}


                  />

                  {/* <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  /> */}
                </div>
              </div>

              <Button
                variant="contained"
                sx={{ marginTop: "10px" }}
                type="submit"
              >
                {inputUpdate ? "Sửa" : "Thêm"} Tin tức
              </Button>
            </form>
          </Box>

        </Modal>
      </div>
      <DataGrid
        rows={news}
        columns={columns}
        getRowId={(row) => row.id_news}
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
            padding:'8px',
            border:'1px solid #d5d5d5',
            borderRadius:'10px',
            width:'300px',
            margin:'5px 10px'
          },
        }}
      />
    </div>
  )

}

export default NewsAdmin;
