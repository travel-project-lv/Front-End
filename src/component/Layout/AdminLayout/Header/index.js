import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/component/assets/images";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LayersIcon from "@mui/icons-material/Layers";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
  const Search = styled("div")(({ theme }) => ({
    height: 42,
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    fontWeight: 600,
    color: "#ffffff",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "35ch",
        "&:focus": {
          width: "50ch",
        },
      },
    },
  }));

  return (
    <div className={cx("Main-nav")}>
      <div className={cx("logo-header")}>
        <Link to="/admin" className={cx("logo")}>
          <img src={images.logo} alt="Logo" />
          <span>Tour</span>
        </Link>
      </div>
      <div className={cx("nav-header")}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <div className={cx("nav-user")}>
          <Badge badgeContent={4} color="success">
            <MailIcon style={{ fontSize: 24, fill: "#ffffff" }} />
          </Badge>
          <Badge badgeContent={4} color="success">
            <NotificationsIcon style={{ fontSize: 24, fill: "#ffffff" }} />
          </Badge>
          <LayersIcon style={{ fontSize: 24, fill: "#ffffff" }} />
          <Avatar>H</Avatar>
        </div>
      </div>
    </div>
  );
}

export default Header;
