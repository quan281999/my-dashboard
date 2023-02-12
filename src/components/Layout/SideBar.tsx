import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Groups2Outlined from "@mui/icons-material/Groups2Outlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import PointOfSaleOutlined from "@mui/icons-material/PointOfSaleOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import TodayOutlined from "@mui/icons-material/TodayOutlined";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import PieChartOutlined from "@mui/icons-material/PieChartOutlined";
import Link from "next/link";
import { useRouter } from "next/router";

import FlexBetween from "../shared/FlexBetween";
import { api } from "../../utils/api";
import profileImage from "../../../public/profileImage.png";
import { AuthContext } from "../../pages/_app";

const SIDEBAR_WIDTH = 250;

const SIDEBAR_ITEMS = [
  {
    id: "",
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    id: "client_facing",
    text: "Products",
    icon: null,
  },
  {
    id: "products",
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    id: "customers",
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    id: "transactions",
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    id: "geography",
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    id: "sales",
    text: "Sales",
    icon: null,
  },
  {
    id: "overview",
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    id: "daily",
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    id: "monthly",
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    id: "breakdown",
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    id: "management",
    text: "Management",
    icon: null,
  },
  {
    id: "admin",
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    id: "performance",
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

type TSideBarProps = {
  isNonMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({
  isNonMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}: TSideBarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [activePage, setActivePage] = useState("");
  const { userId } = useContext(AuthContext);
  const { data } = api.user.getUserInfo.useQuery({
    id: userId,
  });

  useEffect(() => {
    setActivePage(router.pathname.slice(1));
  }, [router.pathname]);

  return (
    <Drawer
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      variant="persistent"
      anchor="left"
      sx={{
        width: SIDEBAR_WIDTH,
        "& .MuiDrawer-paper": {
          color: theme.palette.secondary[200],
          backgroundColor: theme.palette.background.alt,
          boxSixing: "border-box",
          borderWidth: isNonMobile ? 0 : "2px",
          width: SIDEBAR_WIDTH,
        },
      }}
    >
      <Box width="100%">
        <Box m="1.5rem 2rem 2rem 3rem">
          <FlexBetween color={theme.palette.secondary.main}>
            <Typography variant="h4" fontWeight="bold">
              MyDashboard
            </Typography>
            {!isNonMobile && (
              <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                sx={{ marginLeft: "1rem" }}
              >
                <ChevronLeft />
              </IconButton>
            )}
          </FlexBetween>
        </Box>
      </Box>
      <List>
        {SIDEBAR_ITEMS.map((item) => {
          if (item.icon == null) {
            return (
              <Typography key={item.id} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                {item.text}
              </Typography>
            );
          } else {
            return (
              <Link href={`/${item.id}`} key={item.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        activePage === item.id
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        activePage === item.id
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          activePage === item.id
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    {activePage === item.id && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          }
        })}
      </List>

      <Box position="absolute" bottom="2rem">
        <Divider />
        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
          <Box
            component="img"
            alt="profile"
            src={profileImage.src}
            height="40px"
            width="40px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          {/* <ProfileImage /> */}
          <Box textAlign="left">
            <Typography
              fontWeight="bold"
              fontSize="0.9rem"
              sx={{ color: theme.palette.secondary[100] }}
            >
              {data?.data?.name}
            </Typography>
            <Typography
              fontSize="0.8rem"
              sx={{ color: theme.palette.secondary[200] }}
            >
              {data?.data?.occupation}
            </Typography>
          </Box>
          <SettingsOutlined
            sx={{
              color: theme.palette.secondary[300],
              fontSize: "25px ",
            }}
          />
        </FlexBetween>
      </Box>
    </Drawer>
  );
};

export default SideBar;
