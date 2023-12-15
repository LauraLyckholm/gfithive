import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Header } from "./components/header/Header";
import "./app.css";

export const App = () => {

  return (
    // BrowserRouter is a wrapper component that makes the routing work
    <BrowserRouter>
      <Header />
      <section className="main-wrapper">
        {/* <ScrollToTop /> */}
        <main className="main">
          <Routes>{routes}</Routes>
        </main>
      </section>
    </BrowserRouter>
  );
};