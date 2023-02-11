import React, { useState } from "react";
import { type NextPage } from "next";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

import Header from "../components/shared/Header";
import OverviewChart from "../components/shared/OverviewChart";

const OverviewPage: NextPage = () => {
  const [view, setView] = useState<"units" | "sales">("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      <Box height="75vh" mt="1rem">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value as "units" | "sales")}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart isDashboard={false} view={view} />
      </Box>
    </Box>
  );
};

export default OverviewPage;
