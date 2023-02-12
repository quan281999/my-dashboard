import React from "react";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import { api } from "../utils/api";
import DataGridCustomColumnMenu from "../components/shared/DataGridCustomColumnMenu";
import Header from "../components/shared/Header";

const DEFAULT_PAGE_SIZE = 10;

const DEFAULT_ROWS_PER_PAGE = [10, 20, 50];

const COLUMNS = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userIds",
    headerName: "# of Users Involved",
    flex: 0.5,
    sortable: false,
    renderCell: (params: GridRenderCellParams<Array<string>>) =>
      params.value?.length,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
  },
  {
    field: "productIds",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params: GridRenderCellParams<Array<string>>) =>
      params.value?.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params: GridRenderCellParams<number>) =>
      `$${Number(params.value).toFixed(2)}`,
  },
];

const PerformancePage = () => {
  const theme = useTheme();
  const { data, isLoading } = api.transaction.getUserPerformance.useQuery({
    id: "63701cc1f03239b7f700000e",
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      <Box
        mt="1rem"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          autoHeight
          rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE}
          initialState={{ pagination: { pageSize: DEFAULT_PAGE_SIZE } }}
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data?.data || []}
          columns={COLUMNS}
          components={{
            ColumnMenu: DataGridCustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default PerformancePage;
