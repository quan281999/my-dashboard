import React from "react";
import { type NextPage } from "next";
import { Box } from "@mui/material";
import Header from "../components/shared/Header";
import BreakdownChart from "../components/shared/BreakdownChart";

const BreakdownPage: NextPage = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Page of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart isDashboard={false} />
      </Box>
    </Box>
  );
};

export default BreakdownPage;
