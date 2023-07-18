import classNames from "classnames/bind";
import styles from "~/pages/Profile/Profile.module.scss";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {  ExpandLess, ExpandMore, Password } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);


function ProfileInfo() {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
  
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const avt = localStorage.getItem("picture");

    return ( 
        <Box>
        <div className={cx("profile-info-container")}>
          <div className={cx("profile-name-container")}>
            {avt ? <img
              src={avt}
              alt=""
            /> : <img
            src="https://cdn-icons-png.flaticon.com/512/146/146037.png?w=740&t=st=1689340738~exp=1689341338~hmac=249f34566cf05d7895f780c522dbb4ce00ebb604a09748b205889d74a9f99632"
            alt=""
            style={{width:'96px',height:'96px'}}
          />}
 
            <div className={cx("profile-name-box")}>
              <h5>{name}</h5>
              <span>{email}</span>
            </div>
          </div>
          <div>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary="Tài khoản"
                  sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "18px",
                      fontWeight: "700",
                    },
                  }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                  <Link to="/profile" style={{textDecoration:"none"}}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </ListItemIcon>
                    <ListItemText primary="Thông tin cá nhân" sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "14px",
                      fontWeight: "400",
                      color:'#757575'
                    },
                  }}/>
                  </ListItemButton>
                  </Link>
                  <Link to="/profile/changepass" style={{textDecoration:"none"}}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Password />
                    </ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "14px",
                      fontWeight: "400",
                      color:'#757575'
                    },
                  }}/>
                  </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </List>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Link to="/profile/order" style={{textDecoration:'none',color:"#000000"}}>
              <ListItemButton>
                <ListItemText
                  primary="Đơn đặt tour"
                  sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "18px",
                      fontWeight: "700",
                    },
                  }}
                />
                </ListItemButton>
                </Link>
            </List>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <ListItemText
                  primary="Danh sách yêu thích"
                  sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "18px",
                      fontWeight: "700",
                    },
                  }}
                />
                </ListItemButton>
            </List>
          </div>
        </div>
      </Box>
     );
}

export default ProfileInfo;