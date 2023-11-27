import { Routes, BrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes";
import "./App.css"

function App() {

  return (
    // BrowserRouter is a wrapper component that makes the routing work
    <BrowserRouter>
      {/* <Header /> */}
      {/* <ScrollToTop /> */}
      <main>
        {/* Gets the defined routes from the routes-file and mounts them using Routes from React Router Dom */}
        <Routes>{routes}</Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
