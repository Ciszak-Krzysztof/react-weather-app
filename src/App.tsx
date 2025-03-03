import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/ui/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="forecast" element={<h1>forecast</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
