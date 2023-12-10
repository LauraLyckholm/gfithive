import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login"
import { Register } from "./pages/register/Register";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import { Header } from "./components/header/MainHeader";
import "./app.css";


export const App = () => {

  return (
    // BrowserRouter is a wrapper component that makes the routing work
    <BrowserRouter>
      <section className="main-wrapper">
        <Header />
        {/* <ScrollToTop /> */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getstarted" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </section>
    </BrowserRouter>
  );
};