import { useTranslation } from "react-i18next";
import ForecastList from "../features/weather/components/ForecastList";
import { Box, styled, Typography } from "@mui/material";

const ForecastPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Typography variant="h4">{t("forecastPage.header")}</Typography>
      <ForecastList />;
    </PageContainer>
  );
};

export default ForecastPage;

const PageContainer = styled(Box)`
  padding: 16px;
`;
