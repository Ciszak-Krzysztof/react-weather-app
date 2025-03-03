import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { DataGridProps } from "@mui/x-data-grid/models/props/DataGridProps";

export const useWeatherDataGridColumns = () => {
  const { t } = useTranslation();

  const DefaultDataGridProps: Partial<DataGridProps> = {
    sx: {
      maxHeight: "calc(100% - 128px)",
      minHeight: 0,
      height: "100%",
      backgroundColor: "white",
      "& .MuiDataGrid-cell": {
        display: "flex",
        alignItems: "center",
      },
    },
    rowHeight: 32,
    columnHeaderHeight: 36,
    initialState: {
      pagination: { paginationModel: { pageSize: 50 } },
    },
  };

  const DateColumn: GridColDef = {
    field: "dt",
    headerName: t("forecastPage.tableHeaders.date"),
    width: 200,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    valueGetter: (_, row) => dayjs.unix(row.dt).format("MMMM DD HH:mm:ss"),
  };

  const TemperatureColumn: GridColDef = {
    field: "main.temp",
    headerName: t("forecastPage.tableHeaders.temperature"),
    width: 150,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    valueGetter: (_, row) => row.main.temp,
  };

  const TemperatureMinColumn: GridColDef = {
    field: "main.temp_min",
    headerName: t("forecastPage.tableHeaders.tempMin"),
    width: 150,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    valueGetter: (_, row) => row.main.temp_min,
  };

  const TemperatureMaxColumn: GridColDef = {
    field: "main.temp_max",
    headerName: t("forecastPage.tableHeaders.tempMax"),
    width: 150,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    valueGetter: (_, row) => row.main.temp_max,
  };

  const PressureColumn: GridColDef = {
    field: "main.pressure",
    headerName: t("forecastPage.tableHeaders.pressure"),
    width: 150,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    valueGetter: (_, row) => row.main.pressure,
  };

  const HumidityColumn: GridColDef = {
    field: "main.humidity",
    headerName: t("forecastPage.tableHeaders.humidity"),
    width: 150,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    valueGetter: (_, row) => row.main.humidity,
  };

  const forecastColumns: GridColDef[] = [
    DateColumn,
    TemperatureColumn,
    TemperatureMinColumn,
    TemperatureMaxColumn,
    PressureColumn,
    HumidityColumn,
  ];

  return {
    DefaultDataGridProps,
    forecastColumns,
  };
};
