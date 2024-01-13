import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Header } from "./components/header/Header";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

export const App = () => {

  const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
        primary: {
          main: "#7A4141",
        },
        secondary: {
          main: "#FFC400",
        },
      },
      typography: {
        fontFamily: "Poppins",
      },
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: "white",
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "white",
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "var(--primary)",
                boxShadow: "0 0 0 2px rgba(255, 196, 0, 0.5)",
              },
              background: "white",
              padding: "17px 20px",
              fontSize: "18px",
              fontFamily: "Poppins",
              color: "black",
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              boxShadow: "none", // Remove box shadow
              "&:before": {
                display: "none" // Remove the default border
              },
            },
          },
        },
      },
    });

  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
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
    </ThemeProvider>
  );
};