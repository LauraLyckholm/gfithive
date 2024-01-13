import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import questionsAndAnswers from "../../assets/faq.json"

// Component for the FAQ page
export const Faq = () => {

    return (
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
    )
}
