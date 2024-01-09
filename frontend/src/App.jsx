import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Header } from "./components/header/Header";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* BrowserRouter is a wrapper component that makes the routing work */}
      <BrowserRouter>
        <Header />
        <section className="main-wrapper">
          <main className="main">
            <Routes>{routes}</Routes>
          </main>
        </section>
      </BrowserRouter>
    </LocalizationProvider>
  );
};