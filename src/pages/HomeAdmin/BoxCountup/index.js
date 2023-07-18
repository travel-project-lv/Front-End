import { Box } from "@mui/material";
import styles from "./BoxCountup.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  CountUp  from 'react-countup';
import { useEffect, useState } from "react";
import { getQuantityData } from "~/GlobalFunction/Api";

const cx = classNames.bind(styles);

function BoxCountup({icon , text , type}) {
    const [quantityData , setQuantityData] = useState({});
    useEffect(() => {
        async function quantityDataBox() {
          const data = await getQuantityData();
          setQuantityData(data[type]);
        }
        quantityDataBox();
      }, [quantityData,type]);
    return (  
        <div>
            <Box className={cx("count-up-box")}>
                <FontAwesomeIcon icon={icon} className={cx("count-up-icon")}/>
                <h4 className={cx("count-up-text")}>{text}</h4>
                <CountUp end={quantityData} duration={1.5} className={cx("count-up-number")}/>
            </Box>
        </div>
    );
}

export default BoxCountup;