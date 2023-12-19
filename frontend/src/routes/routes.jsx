import { Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { UniqueHive } from "../pages/hives/UniqueHive";
import { Faq } from "../pages/faq/Faq";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Hives } from "../pages/hives/Hives";

const routes = (
    <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hives" element={<Hives />} />
        <Route path="/hives/:id" element={<UniqueHive />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<ErrorPage />} />
    </>
);

export default routes
