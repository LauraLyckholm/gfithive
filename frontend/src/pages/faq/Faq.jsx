import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import "./faq.css";
import questionsAndAnswers from "../../assets/faq.json"

// Component for the FAQ page
export const Faq = () => {

    // Theme for the accordion from Material UI
    const theme = createTheme({
        typography: {
            fontFamily: "Poppins",
        },
        components: {
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

    return (
        <ThemeProvider theme={theme}>
            <section>
                <h1>Frequently Asked Questions</h1>

                {questionsAndAnswers.map((faq) => (
                    <Accordion key={faq.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${faq.id}-content`}
                            id={`panel${faq.id}-header`}
                        >
                            <Typography sx={{ fontWeight: "600" }}>
                                {faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ fontSize: "0.8rem" }}>
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </section>
        </ThemeProvider >
    )
}
