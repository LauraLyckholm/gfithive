import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
// import { Faq } from "../pages/Faq";
// import { ErrorPage } from "../pages/ErrorPage";

// Defining the routes, these are the pages that will be mounted when the user navigates to a specific path
export const routes = (
    <>
        <Route path="/" element={<Home />} />
        {/* <Route path="/faq" element={<Faq />} /> */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
    </>
)