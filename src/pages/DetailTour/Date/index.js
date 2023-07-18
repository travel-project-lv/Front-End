import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import TablePrice from "./Table";
import { detailTourApi } from "~/GlobalFunction/Api";

function Date({ id }) {
  const [months, setMonths] = useState({});
  const [value, setValue] = useState("");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(id);
      const uniqueMonths = [...new Set(data.date_go.map((item) => item.month))];
      setMonths(uniqueMonths);
      if (uniqueMonths.length > 0) {
        setValue(uniqueMonths[0].toString());
      }
    }
    detailData();
  }, [id]);
  console.log(months);

  if (months === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {months.length > 0 ? (
                months.map((data, index) => (
                  <Tab label={"Tháng " + data} value={data.toString()} />
                ))
              ) : (
                <div>Loading...</div>
              )}
            </TabList>
          </Box>
          {months.length > 0 ? (
            months.map((data) => (
              <TabPanel value={data.toString()}>
                <TablePrice id={id} month={data} />
              </TabPanel>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </TabContext>
      </Box>
    </div>
  );
}

export default Date;
