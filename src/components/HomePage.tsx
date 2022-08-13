import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, message, Upload, Steps, Alert } from "antd";
import Marquee from "react-fast-marquee";
import ExcelToJson from "./shared/ExcelToJson";
import JsonToExcel from "./JsonToExcel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function HomePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Alert
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            Yeni versiyon'da Excell to Xml ||| Excell to XLS... Çok yakında
          </Marquee>
        }
      />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label=" Json To Excel" {...a11yProps(0)} />
          <Tab label="Excel To Json" {...a11yProps(1)} />
          <Tab disabled label="PDF to Excel" {...a11yProps(2)} />
          <Tab disabled label="PDF to Word" {...a11yProps(2)} />
          <Tab disabled label="CSV to Excel" {...a11yProps(2)} />
          <Tab
            disabled
            label="
          XML to JSON"
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel className="container p-3" value={value} index={0}>
          <JsonToExcel />
        </TabPanel>
        <TabPanel className="container p-3" value={value} index={1}>
          <ExcelToJson />
        </TabPanel>
      </Box>
    </>
  );
}
