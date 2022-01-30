import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { styled } from "@mui/system";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";

export const TabContainer = TabsUnstyled;

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
  width: 100%;
  padding: 20px;
  border: none;
  display: flex;
  justify-content: center;
  outline: none;

  &:hover {
    background-color: #555555;
  }

  &:focus {
    color: #fff;
    outline: none;
    outline-offset: 2px;
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
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

export const TabList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: #333232;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  border-radius: 5px;
  overflow: hidden;
`;
