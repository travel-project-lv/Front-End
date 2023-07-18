import { Autocomplete, Container, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { detailTourApi, listCustomerOfDate } from "~/GlobalFunction/Api";

function DetailTourAdmin() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Tour = queryParams.get("state")
    ? JSON.parse(queryParams.get("state"))
    : null;
  const [date, setDate] = useState({});
  const [valueDate,setValueDate] = useState({});
  const [listCustomer,setListCustomer] = useState({});

  const handleOnChangeDate = (e, newValue) => {
    setValueDate(newValue);
  };

  console.log(valueDate);

  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(Tour.id_tour);
      setDate(data.date_go);
    }
    detailData();
  }, [Tour.id_tour]);
  console.log(date);
  useEffect(() => {
    async function detailData() {
      const data = await listCustomerOfDate(valueDate?.id);
      setListCustomer(data);
    }
    detailData();
  }, [valueDate.id]);

  console.log(listCustomer);
  
  const columns = [
    { field: "name_customer", headerName: "Họ và tên", width: 150 },
    { field: "sex", headerName: "Giới tính", width: 150 },
    { field: "CMND", headerName: "Căn cước công dân", width: 150 },
    { field: "birth", headerName: "Ngày sinh", width: 150 },
    { field: "age", headerName: "Loại khách", width: 150 },
  ];

  return (
    <Container>
      <h3>Tên tour: {Tour.name_tour}</h3>
      <h4>Id Tour: {Tour.id_tour}</h4>
      <p>Nơi khởi hành: {Tour.place_go}</p>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={date}
        sx={{ width: 300 }}
        onChange={handleOnChangeDate}
        value={valueDate}
        getOptionLabel={(option) => option.date || ""}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

<DataGrid
        rows={listCustomer}
        columns={columns}
        getRowId={(row) => row.id}
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

    </Container>
  );
}

export default DetailTourAdmin;
