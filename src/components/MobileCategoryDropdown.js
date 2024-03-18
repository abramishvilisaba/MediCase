import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    MenuItem,
    Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";

const MobileCategoryDropdown = ({
    title,
    categories,
    language,
    isMobile,
    closeDrawer,
    scrolling,
}) => {
    const navigate = useNavigate();

    const handleCategoryClick = (key) => {
        if (isMobile) {
            closeDrawer();
        }
        navigate(`/${language}/${title}/${key}`);
    };

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div style={{ display: "inline-block", width: "100%" }}>
                <Accordion
                    style={{
                        padding: "0px",
                        boxShadow: "none",
                        margin: "0px",
                    }}
                >
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon style={{ color: "gray" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            backgroundColor: "#99ACD1",
                            color: "white",
                            padding: "0px",
                            boxShadow: "none",
                            margin: "0px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="text"
                            style={{
                                color: "white",
                                fontSize: "16px",
                                padding: "0px",
                                textAlign: "left",
                                width: "100%",
                            }}
                            onClick={() => {
                                if (!isMobile) {
                                    navigate(`/${language}/${title}/all`);
                                }
                            }}
                        >
                            <div className="flex w-full flex-row justify-between">
                                <FormattedMessage style={{ width: "fit" }} id={title} />
                                <ExpandMoreIcon style={{ color: "gray" }} />
                            </div>
                        </Button>
                    </AccordionSummary>

                    <AccordionDetails
                        style={{ backgroundColor: "#99ACD1", padding: "0px", width: "fit" }}
                    >
                        <div style={{ width: "100%" }}>
                            {Object.keys(categories).map((key, id) => (
                                <MenuItem key={id} onClick={() => handleCategoryClick(key)}>
                                    <Typography
                                        className="text-2xl w-full"
                                        style={{ color: "white", whiteSpace: "normal" }}
                                    >
                                        {categories[key][language]}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </IntlProvider>
    );
};

export default MobileCategoryDropdown;
