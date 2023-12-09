import { Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { GetStarted } from "../pages/login/Login"
import { Register } from "../pages/register/Register";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ErrorPage } from "../pages/errorPage/ErrorPage";

export const routes = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/getstarted" element={<GetStarted />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<ErrorPage />} />
        </>
    );
};
