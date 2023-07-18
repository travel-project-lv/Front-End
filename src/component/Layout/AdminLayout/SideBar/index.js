import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faChartLine } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function SideBar() {
  const [open, setOpen] = useState(false);
  const [openManage, setOpenManage] = useState(false);
  const handleOpenManage = () => {
    setOpenManage(!openManage);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={cx("Sidebar-container")}>
      <div className={cx("Sidebar-hello")}>
        <Avatar>H</Avatar>
        <div className={cx("Sidebar-hello-box")}>
          <span className={cx("Sidebar-hello-name")}>Hizrian</span>
          <span className={cx("Sidebar-hello-rule")}>Administrator</span>
        </div>
      </div>
      <div className={cx("Sidebar-dashboard")}>
        <Link to="/admin" style={{textDecoration:'none'}}>
        {/* Thống kê */}
        <ListItemButton
          onClick={handleOpen}
          className={cx("Sidebar-dashboard-box")}
        >
          <ListItemIcon sx={{ minWidth: "45px" }}>
            <FontAwesomeIcon
              icon={faChartLine}
              sx={{ fontSize: 20 }}
              className={cx("Sidebar-dashboard-icon")}
            />
          </ListItemIcon>
          <div
            style={{
              width: "170px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Thống kê</span>
            {open ? (
              <ExpandLess sx={{ marginLeft: 1 }} />
            ) : (
              <ExpandMore sx={{ marginLeft: 1 }} />
            )}
          </div>
        </ListItemButton>
        </Link>
        {/* Quản lý */}
        <ListItemButton
          onClick={handleOpenManage}
          className={cx("Sidebar-dashboard-box")}
        >
          <ListItemIcon sx={{ minWidth: "45px" }}>
            <FontAwesomeIcon
              icon={faBarsProgress}
              sx={{ fontSize: 20 }}
              className={cx("Sidebar-dashboard-icon")}
            />
          </ListItemIcon>
          <div
            style={{
              width: "170px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Quản lý</span>
            {openManage ? (
              <ExpandLess sx={{ marginLeft: 1 }} />
            ) : (
              <ExpandMore sx={{ marginLeft: 1 }} />
            )}
          </div>
        </ListItemButton>
        <Collapse in={openManage} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/admin/tour" className={cx("router-manage")}>
              <ListItemButton sx={{ pl: 4, fontSize: "16px" }}>
                <ListItemText
                  primary="Quản lý tour du lịch"
                  sx={{ ".MuiListItemText-primary": { fontSize: "14px" } }}
                />
              </ListItemButton>
            </Link>
            <Link to="/admin/user" className={cx("router-manage")}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Quản lý khách hàng"
                  sx={{ ".MuiListItemText-primary": { fontSize: "14px" } }}
                />
              </ListItemButton>
            </Link>
            <Link to="/admin/news" className={cx("router-manage")}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Quản lý tin tức"
                  sx={{ ".MuiListItemText-primary": { fontSize: "14px" } }}
                />
              </ListItemButton>
            </Link>
            <Link to="/admin/order" className={cx("router-manage")}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Quản lý đơn đặt tour"
                  sx={{ ".MuiListItemText-primary": { fontSize: "14px" } }}
                />
              </ListItemButton>
            </Link>
            <Link to="/admin/datego" className={cx("router-manage")}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Quản lý ngày đi"
                  sx={{ ".MuiListItemText-primary": { fontSize: "14px" } }}
                />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </div>
    </div>
  );
}

export default SideBar;
