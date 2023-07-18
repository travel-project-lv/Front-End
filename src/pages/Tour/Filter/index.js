import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import Annyang from "annyang";

const cx = classNames.bind(styles);

function Filter({
  handleInput,
  nameTour,
  handleKeyPress,
  priceTour,
  handleSliderChange,
}) {
  const [speechText, setSpeechText] = useState({});
  console.log(speechText);
  const handleSpeechRecognition = () => {
    Annyang.start({ autoRestart: false, continuous: false });
    Annyang.addCallback("result", (phrases) => {
      const searchQuery = phrases[0]; // Lấy cụm từ đầu tiên trong kết quả nhận dạng giọng nói
      setSpeechText(searchQuery);
      Annyang.abort(); // Dừng nhận dạng giọng nói sau khi nhận được kết quả
    });
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1000000,
      label: "1Tr",
    },
    {
      value: 3000000,
      label: "3Tr",
    },
    {
      value: 5000000,
      label: "5Tr",
    },
    {
      value: 7000000,
      label: "7Tr",
    },
    {
      value: 10000000,
      label: "10Tr",
    },
  ];

  return (
    <div>
      <div className={cx("titile-container")}>
        <span className={cx("title-filter")}>Lọc kết quả</span>
      </div>
      <div className={cx("filter-main")}>
        <div className={cx("tour-filter")}>
          <span>Tìm theo tên</span>
          <TextField
            id="outlined-basic"
            label="Nhập tên"
            variant="outlined"
            sx={{ width: 290 }}
            onKeyPress={handleKeyPress}
            value={nameTour}
            onChange={handleInput}
          />
        </div>
        <div className={cx("tour-filter")}>
          <span>Loại hình du lịch</span>
          <FormControl sx={{ minWidth: 290 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Loại hình
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" label="Loại hình">
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="Tour trọn gói">Tour trọn gói</MenuItem>
              <MenuItem value="Tour gia đình">Tour gia đình</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={cx("tour-filter")}>
          <span>Địa điểm du lịch</span>
          <FormControl sx={{ minWidth: 290 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Địa điểm
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" label="Loại hình">
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
              <MenuItem value="Hà Nội">Hà Nội</MenuItem>
              <MenuItem value="Phú Quốc">Phú Quốc</MenuItem>
              <MenuItem value="Đà Lạt">Đà Lạt</MenuItem>
              <MenuItem value="Vũng Tàu">Vũng Tàu</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={cx("tour-filter")}>
          <span>Ngày đi</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              placeholder="dd/mm/yyyy"
              sx={{
                width: 290,
                ".MuiInputBase-input": { height: 3, fontSize: 12 },
              }}
            />
          </LocalizationProvider>
        </div>
        <div className={cx("tour-filter")}>
          <span>Số người</span>
          <FormControl sx={{ minWidth: 290 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Số người
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" label="Số người">
              <MenuItem value="1 Người">1 Người</MenuItem>
              <MenuItem value="2 Người">2 Người</MenuItem>
              <MenuItem value="3-5 Người">3-5 Người</MenuItem>
              <MenuItem value="5+ Người">5+ Người</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={cx("tour-filter")}>
          <span>Ngân sách của quý khách</span>
          <Box sx={{ width: 290 }}>
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              value={priceTour}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              max={10000000}
              step={1000000}
              disableSwap
              marks={marks}
              sx={{
                color: "#ffbf44",
                "& .MuiSlider-thumb": {
                  color: "#fff",
                  width: "15px",
                  height: "15px",
                },

                "& .MuiSlider-rail": {
                  opacity: 0.5,
                  backgroundColor: "#bfbfbf",
                },
              }}
              //  getAriaValueText={valuetext}
            />
            <Typography gutterBottom sx={{ border: "1px" , fontSize:'16px',marginTop:'20px',color:'#fd5056',fontWeight:500 }}>
              Price:{" "}
              {priceTour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
            </Typography>
          </Box>
        </div>
        <div className={cx("tour-filter")}>
          <span>Hiển thị những chuyến đi có</span>
          <FormControl sx={{ width: 290 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Khuyến mãi"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Tour hot"
            />
          </FormControl>
        </div>
        <div>
          <Button onClick={handleSpeechRecognition}>Voice Search</Button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
