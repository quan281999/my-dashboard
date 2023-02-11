import { useState } from "react";
import { type NextPage } from "next";
import { useTheme } from "@mui/material/styles";
import type { GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../components/shared/Header";
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

import { api } from "../utils/api";
import FlexBetween from "../components/shared/FlexBetween";

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

const DataGridCustomToolbar = () => (
  <GridToolbarContainer>
    <FlexBetween width="100%">
      <FlexBetween>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </FlexBetween>
    </FlexBetween>
  </GridToolbarContainer>
);

const CustomersPage: NextPage = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState<GridSortModel>([]);
  const { data, isLoading } = api.transaction.getTransactions.useQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
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
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={(data && data.data) || []}
          columns={COLUMNS}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => {
            console.log(newSortModel);
            console.log("TESSTTTTTT");
            setSort((value) => [...value, newSortModel[0]!]);
          }}
          components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default CustomersPage;
