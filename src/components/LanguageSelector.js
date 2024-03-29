import React, { useEffect } from "react";
import {
    MenuItem,
    Select,
    FormControl,
    Box,
    Button,
    ButtonGroup,
    useMediaQuery,
} from "@mui/material";

const LanguageSelector = ({ supportedLocales, changeLanguage, language, isMobile = false }) => {
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
    const languageNamesShort = {
        en: {
            name: "En",
            native: "En",
        },
        ka: {
            name: "Geo",
            native: "ქარ",
        },
        ru: {
            name: "Ru",
            native: "Ру",
        },
    };

    const [selectedLanguage, setSelectedLanguage] = React.useState(supportedLocales[0]);

    const switchToShort = useMediaQuery("(max-width:900px)");

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        changeLanguage(lang);
    };

    useEffect(() => {
        if (language) {
            setSelectedLanguage(language);
        }
    }, [language]);

    return (
        <div className="w-fit">
            {!isMobile ? (
                <FormControl
                    style={{
                        color: "white",
                        border: "2px solid white",
                        borderRadius: "4px",
                        outline: "white",
                        boxShadow: "none",
                    }}
                >
                    <Select
                        variant="standard"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedLanguage}
                        onChange={(event) => handleLanguageSelect(event.target.value)}
                        style={{
                            color: "white",
                            fontSize: "1rem",
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                            padding: switchToShort ? "4px 4px" : "4px 8px",
                            underLine: "none",
                            width: switchToShort ? "55px" : "116px",
                        }}
                    >
                        {supportedLocales.map((lang) => (
                            <MenuItem key={lang} value={lang} style={{ color: "black" }}>
                                {switchToShort
                                    ? languageNamesShort[lang].native
                                    : languageNames[lang].native}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        "& > *": {
                            m: 1,
                        },
                    }}
                >
                    {supportedLocales.map((lang) => (
                        <ButtonGroup
                            variant="text"
                            aria-label="Basic button group"
                            style={{ margin: "8px 4px" }}
                        >
                            <Button
                                key={lang}
                                onClick={() => handleLanguageSelect(lang)}
                                style={{
                                    color: selectedLanguage === lang ? "white" : "gray",
                                    fontSize: "16px",

                                    // backgroundColor:
                                    //     selectedLanguage === lang ? "blue" : "transparent",
                                }}
                            >
                                {languageNamesShort[lang].native}
                            </Button>
                        </ButtonGroup>
                    ))}
                </Box>
            )}
        </div>
    );
};

export default LanguageSelector;
