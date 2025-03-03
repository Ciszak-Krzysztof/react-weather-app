import { Box, CircularProgress, styled, SxProps, Theme } from "@mui/material";
import useWeather from "../hooks/useWeather";
import { DataGrid } from "@mui/x-data-grid";
import { useWeatherDataGridColumns } from "../hooks/useWeatherDataGridColumns";

const ForecastList = () => {
  const { forecastData, error, isLoading } = useWeather();
  const { forecastColumns, DefaultDataGridProps } = useWeatherDataGridColumns();

  if (!forecastData && isLoading.forecast) {
    return (
      <LoadingSpinnerContainer>
        <CircularProgress />
      </LoadingSpinnerContainer>
    );
  }

  if (error.forecast) {
    return <div>{error?.forecast}</div>;
  }

  return (
    <ListContainer>
      {forecastData && (
        <StyledDataGrid
          defaultSx={{ ...DefaultDataGridProps.sx }}
          {...DefaultDataGridProps}
          getRowId={(row) => row.dt}
          rows={forecastData.list}
          columns={forecastColumns}
          hideFooterSelectedRowCount={true}
        />
      )}
    </ListContainer>
  );
};

export default ForecastList;

const StyledDataGrid = styled(DataGrid)<{
  defaultSx: SxProps<Theme>;
}>`
    ${({ defaultSx }) => ({ ...defaultSx })}
    max-height: "calc(100% - 64px)"};
  `;

const LoadingSpinnerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ListContainer = styled(Box)`
  height: calc(100vh - 24px);
  padding: 16px;
`;
