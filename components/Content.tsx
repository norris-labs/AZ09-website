import { useState, SyntheticEvent, Fragment } from "react";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Tab } from "@mui/material";
import { NFTList } from "../components/NFTList";

export function Content() {
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };
  const [tabIndex, setTabIndex] = useState("1");

  return (
    <TabContext value={tabIndex}>
      <TabList
        variant="fullWidth"
        onChange={handleTabChange}
        aria-label="lab API tabs example"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Light Variation" value="1" />
        <Tab label="Dark Variation" value="2" />
      </TabList>

      <TabPanel value="1">
        {/* <NFTList isNFTMinted={isNFTMinted} sendMintTX={sendMintTX}/> */}
        First One
      </TabPanel>

      <TabPanel value="2">Other One</TabPanel>
    </TabContext>
  );
}
