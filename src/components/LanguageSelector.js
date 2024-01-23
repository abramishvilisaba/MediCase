import React from "react";
import { MenuItem, Select, FormControl } from "@mui/material";

const LanguageSelector = ({ supportedLocales, changeLanguage }) => {
    const languageNames = {
        en: {
            name: "English",
            native: "English",
        },
        ka: {
            name: "Georgian",
            native: "ქართული",
        },
        ru: {
            name: "Russian",
            native: "Русский",
        },
    };

    const [open, setOpen] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState(supportedLocales[0]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLanguageSelect = (event) => {
        const selectedLanguage = event.target.value;
        setSelectedLanguage(selectedLanguage);
        changeLanguage(selectedLanguage);
        handleClose();
    };

    return (
        <div className="w-fit">
            <FormControl
                style={{
                    color: "white",
                    border: "2px solid white",
                    borderRadius: "4px",
                    outline: "white",
                    boxShadow: "none",
                }}
                // variant="outlined"
            >
                {supportedLocales && (
                    <Select
                        variant="standard"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedLanguage}
                        // label="Language Selector"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleLanguageSelect}
                        style={{
                            color: "white",
                            fontSize: "1rem",
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                            padding: "4px 10px",
                            underLine: "none",
                        }}
                    >
                        {supportedLocales.map((lang) => (
                            <MenuItem key={lang} value={lang} style={{ color: "black" }}>
                                {languageNames[lang].native}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </FormControl>
        </div>
    );
};

export default LanguageSelector;
