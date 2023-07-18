import styles from "./LoginAdmin.module.scss";
import classNames from "classnames/bind";
import images from "~/component/assets/images";
import { TextField, Button } from "@mui/material";

const cx = classNames.bind(styles);

function LoginAdminLayout() {
  return (
    <div className={cx("login-admin-container")}>
      <div className={cx("login-admin-box")}>
        <img src={images.logo} alt="Logo" />
        <h1 className={cx("login-admin-title")}>Sign In</h1>
        <TextField
          fullWidth
          label="Email"
          id="fullWidth"
          sx={{
            width: 448,
            marginTop: "10px",
            "& .MuiInputBase-root": {
              borderRadius: "6px",
            },
          }}
          placeholder="example@example.com"
          type="text"
        />
        <TextField
          fullWidth
          label="Password"
          id="fullWidth"
          sx={{
            width: 448,
            marginTop: "10px",
            "& .MuiInputBase-root": {
              borderRadius: "6px",
            },
          }}
          type="password"
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4f46e5",
            height: "48px",
            width: "448px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#4338ca",
            },
            "& .MuiButton-label": {
              borderRadius: "9999px",
            },
            marginTop: "25px",
            fontWeight: 700,
            fontSize: 16,
          }}
          type="submit"
        >
          Đăng nhập
        </Button>
        <span style={{fontSize:16,opacity:0.5,fontWeight:400,marginTop:10}}>Forgot your password?</span>
      </div>
    </div>
  );
}

export default LoginAdminLayout;
