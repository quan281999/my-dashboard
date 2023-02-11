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
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params: GridRenderCellParams<string>) => {
      return params.value?.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.4,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = api.user.getAdmins.useQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
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

export default Admin;
