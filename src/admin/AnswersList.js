import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion({ answers }) {
  return (
    <div>
      {answers.map((answer, index) => {
        console.log("answer", answer);
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{`Q${index + 1}. ${answer.question}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{`Answer. ${answer.answer}`}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
