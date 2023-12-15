import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import "./app.css";

export const App = () => {

  return (
    // BrowserRouter is a wrapper component that makes the routing work
    <BrowserRouter>
      <section className="main-wrapper">
        {/* <ScrollToTop /> */}
        <main className="main">
          <Routes>{routes}</Routes>
        </main>
      </section>
    </BrowserRouter>
  );
};