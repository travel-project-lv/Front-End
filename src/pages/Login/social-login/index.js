import { Box } from "@mui/material";
import styles from "../Login.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function SocialLogin({text,icon}) {
    return ( 
        <div>
            <Box
                sx={{
                    width:448,
                    height:44,
                    backgroundColor:'#eef2ff',
                    borderRadius:2,
                    padding:"12px 24px",
                    lineHeight:"24px",
                    fontSize:14,
                    fontWeight:600,
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                    cursor:'pointer'
                }}
            >
                <img  src={icon} className={cx('icon-social')} alt="icon" />
                <p>{text}</p>
                <div sx={{width:100}}></div>
            </Box>
        </div>
     );
}

export default SocialLogin;