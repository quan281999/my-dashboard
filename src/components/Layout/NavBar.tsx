import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import Search from "@mui/icons-material/Search";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Menu from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import FlexBetween from "../shared/FlexBetween";
import { ThemeModeContext } from "../shared/CustomeThemeProvider";

type TNavBarProps = {
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = ({ setIsSideBarOpen }: TNavBarProps) => {
  const theme = useTheme();
  const { setThemeMode } = useContext(ThemeModeContext);

  return (
    <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton onClick={() => setIsSideBarOpen((value) => !value)}>
            <Menu />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <IconButton
            onClick={() => {
              setThemeMode(theme.palette.mode === "dark" ? "light" : "dark");
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
