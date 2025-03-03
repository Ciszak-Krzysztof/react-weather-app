import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/ui/DashboardLayout";
import ForecastPage from "./pages/ForecastPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="forecast" element={<ForecastPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
