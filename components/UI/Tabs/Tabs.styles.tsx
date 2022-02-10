import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const TabContainer = TabsUnstyled;

const radius = "10px";

export const Tab = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 1.45rem;
  font-weight: bold;
  background-color: transparent;
  white-space: nowrap;
  width: 100%;
  border-radius: ${radius};
  padding: 20px;
  border: none;
  display: flex;
  justify-content: center;
  outline: none;
  color: #fff;
  outline: none;
  outline-offset: 2px;
  @media (max-width: 599.95px) {
    font-size: 1.1rem;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: white;
    color: black;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 0.875rem;
`;

export const TabList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: #363636;
  border-radius: ${radius};
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  align-content: space-between;
  overflow: hidden;
`;

type TabChickletProps = {
  children: React.ReactChild;
  currentTab: number;
  tabNum: number;
};

export const TabChicklet: React.FC<TabChickletProps> = ({
  children,
  currentTab,
  tabNum,
}) => {
  return (
    <Box
      sx={{
        background: `${currentTab === tabNum ? "black" : "white"}`,
        color: `${currentTab === tabNum ? "white" : "black"}`,
        width: "1.5rem",
        height: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        fontSize: ".95rem",
        marginRight: "5px",
      }}
    >
      {children}
    </Box>
  );
};
