import { BrowserRouter, Routes } from "react-router-dom";
// import { Home } from "./pages/home/Home";
// import { Login } from "./pages/login/Login"
// import { Register } from "./pages/register/Register";
// import { Dashboard } from "./pages/dashboard/Dashboard";
// import { UniqueHive } from "./pages/hives/UniqueHive";
// import { CreateHive } from "./pages/hives/CreateHive";
// import { AllHives } from "./pages/hives/AllHives";
// import { Faq } from "./pages/faq/Faq";
// import { ErrorPage } from "./pages/errorPage/ErrorPage";
import routes from "./routes/routes";
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
          <Routes>{routes}</Routes>
          {/* <Route path="/" element={<Home />} />
            <Route path="/getstarted" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hives" element={<AllHives />} />
            <Route path="/create-hive" element={<CreateHive />} />
            <Route path="/hive/:id" element={<UniqueHive />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<ErrorPage />} /> */}
        </main>
      </section>
    </BrowserRouter>
  );
};