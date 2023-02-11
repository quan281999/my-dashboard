import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from "@mui/x-data-grid";

type TDataGridCustomColumnMenuProps = React.ComponentProps<
  typeof GridColumnMenuContainer
>;

const DataGridCustomColumnMenu = ({
  hideMenu,
  currentColumn,
  open,
}: TDataGridCustomColumnMenuProps) => (
  <GridColumnMenuContainer
    hideMenu={hideMenu}
    currentColumn={currentColumn}
    open={open}
  >
    <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
    <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
  </GridColumnMenuContainer>
);

export default DataGridCustomColumnMenu;
