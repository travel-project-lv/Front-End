import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/component/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "./wrapper";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import {
  faChevronDown,
  faEarth,
  faGlobe,
  faHeadphones,
  faHome,
  faMagnifyingGlass,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Social from "./social";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function Header() {
  const token = localStorage.getItem("access_token");
  const ggtoken = localStorage.getItem("ggtoken");
  const avt = localStorage.getItem("picture");
  const faceId = localStorage.getItem("faceId");
  const navigate = useNavigate();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenTravelRespon, setIsOpenTravelRespon] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("ggtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("picture");
    localStorage.removeItem("id_customer");
    localStorage.removeItem("name");
    localStorage.removeItem("idgg");
    localStorage.removeItem("faceId");
    localStorage.removeItem("payload");
    localStorage.removeItem("permission");
    
    navigate("/login");
  };
  return (
    <div className={cx("Main-nav")}>
      <div className={cx("nav-container")}>
        <div className={cx("logo-container")}>
          <img src={images.logo} alt="Logo" />
          <p>Travel</p>
        </div>
        <div className={cx("sub-nav-container")}>
          <ul>
            <li>
            <Link to="/">Trang chủ</Link>
            </li>
            <li>
            <Link to="/">Giới thiệu</Link>
            </li>
            <Tippy
              interactive
              render={(attrs) => (
                <div
                  className={cx("wrapper-container")}
                  tabIndex="-1"
                  {...attrs}
                >
                  <Wrapper></Wrapper>
                </div>
              )}
              placement="bottom"
              trigger="mouseenter focus"
            >
              <li className={cx("tour-down")}>
                <Link to="/tour">
                  Tour du lịch
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ marginLeft: 2 }}
                  />
                </Link>
                {/* <Wrapper/> */}
              </li>
            </Tippy>
            <li>
              <Link to="/news">Tin tức</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li>
              <Link to="/contact">Chính sách</Link>
            </li>
          </ul>
        </div>
        <div className={cx("search-respon-container")}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cx("icon", "icon-search-respon")}
          />
          <input placeholder="Type to search" />
        </div>
        <div className={cx("login-container")}>
          <div className={cx("icon-container")}>
            <FontAwesomeIcon icon={faMoon} className={cx("icon")} />
          </div>
          <Tippy
            interactive
            trigger="click"
            render={(attrs) => (
              <div {...attrs}>
                <input
                  placeholder="Nhập địa điểm cần tìm kiếm"
                  className={cx("input-search")}
                />
              </div>
            )}
          >
            <div className={cx("icon-container", "search-icon")}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={cx("icon")}
              />
            </div>
          </Tippy>
          <div className={cx("login-sub-container")}>
            { (token || ggtoken || faceId) ? (
              <Tippy
                interactive
                trigger="click"
                render={(attrs) => (
                  <div {...attrs}>
                    <div className={cx("user-list-container")}>
                      <div className={cx("user-list-option")}>
                        <Link to="/profile" style={{textDecoration:'none',color:'#000000'}}>
                        <div className={cx("user-list-box")}>
                          <AccountCircleIcon className={cx("user-list-icon")} />
                          <span >Account</span>
                        </div>
                        </Link>
                        <div className={cx("user-list-box")}>
                          <MessageIcon className={cx("user-list-icon")} />
                          <span>Message</span>
                        </div>
                        <div className={cx("user-list-box")}>
                          <FavoriteBorderIcon
                            className={cx("user-list-icon")}
                          />
                          <span>Wishlists</span>
                        </div>
                        <div className={cx("user-list-box")}>
                          <HomeIcon className={cx("user-list-icon")} />
                          <span>Booking</span>
                        </div>
                      </div>
                      <div
                        className={cx("user-list-logout")}
                        onClick={handleLogout}
                      >
                        <LogoutIcon className={cx("user-list-icon")} />
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              >
                <Avatar sx={{ bgcolor: "#4f46e5" }} src={avt} > </Avatar>
              </Tippy>
            ) : (
              <Link to="/login" className={cx("login-btn-link")}>
                <button className={cx("login-btn")}>Đăng nhập</button>
              </Link>
            )}
          </div>
          {/* Login responsive moblie */}
          <div className={cx("login-respon-container")}>
            {(ggtoken || token) ? (
              <Tippy
                interactive
                trigger="click"
                render={(attrs) => (
                  <div {...attrs}>
                    <div className={cx("user-list-container")}>
                      <div className={cx("user-list-option")}>
                        <div className={cx("user-list-box")}>
                          <AccountCircleIcon className={cx("user-list-icon")} />
                          <span>Account</span>
                        </div>
                        <div className={cx("user-list-box")}>
                          <MessageIcon className={cx("user-list-icon")} />
                          <span>Message</span>
                        </div>
                        <div className={cx("user-list-box")}>
                          <FavoriteBorderIcon
                            className={cx("user-list-icon")}
                          />
                          <span>Wishlists</span>
                        </div>
                        <div className={cx("user-list-box")}>
                          <HomeIcon className={cx("user-list-icon")} />
                          <span>Booking</span>
                        </div>
                      </div>
                      <div
                        className={cx("user-list-logout")}
                        onClick={handleLogout}
                      >
                        <LogoutIcon className={cx("user-list-icon")} />
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              >
                <Avatar sx={{ bgcolor: "#4f46e5" }} >H</Avatar>
              </Tippy>
            ) : (
              <Link to="/login" className={cx("login-btn-link")}>
                <FontAwesomeIcon icon={faUser} style={{fontSize:'22px'}} />
              </Link>
            )}
          </div>
          <IconButton
            className={cx("icon-menu-container")}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ m: 1 }}
            onClick={() => setIsOpenDrawer(true)}
          >
            <MenuIcon sx={{ width: "32px", height: "32px" }} />
          </IconButton>
          <Drawer
            anchor="right"
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
          >
            <Box p={2} width="415px" textAlign="center" role="presentation">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <Box width="415px" height="205px" sx={{ padding: "24px 20px" ,borderBottom:'1px solid #ddd',marginBottom:'10px'}}>
                  <div className={cx("logo-container-res")}>
                    <img src={images.logo} alt="Logo" />
                    <p>Travel</p>
                  </div>
                  <div className={cx("text-container-res")}>
                    <span>Khám phá thế giới, khám phá chính mình - Hành trình du lịch đáng nhớ cùng chúng tôi!</span>
                  </div>
                  <div className={cx("social-container-res")}> 
                    <Social img={faFacebook}/>
                    <Social img={faTwitter}/>
                    <Social img={faYoutube}/>
                    <Social img={faInstagram}/>
                  </div>
                </Box>
                <ListItemButton sx={{ fontSize: "25px" }}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faHome}
                      style={{ color: "#4f46e5" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Trang chủ"
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
                <ListItemButton sx={{ fontSize: "25px" }}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faGlobe}
                      style={{ color: "#4f46e5" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Giới thiệu"
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ fontSize: "25px" }}
                  onClick={() => setIsOpenTravelRespon(!isOpenTravelRespon)}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faEarth}
                      style={{ color: "#4f46e5" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Tour du lịch"
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  />
                  {isOpenTravelRespon ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpenTravelRespon} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton sx={{ fontSize: "25px" }}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      style={{ color: "#4f46e5" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Tin tức"
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
                <ListItemButton sx={{ fontSize: "25px" }}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faHeadphones}
                      style={{ color: "#4f46e5" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Liên hệ"
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </List>
            </Box>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Header;
