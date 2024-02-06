import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import LanguageSelector from "./LanguageSelector";
import logoImage from "../images/logo.svg";
import { fetchCategories, fetchBrands } from "../utils/contentful";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";

const NavBar = () => {
    const navigate = useNavigate();

    const [language, setLanguage] = useState("en");
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const parts = pathname.split("/");
        if (parts.length > 1 && parts[1] !== "") {
            setLanguage(parts[1]);
        } else {
            setLanguage("en");
        }
    }, [location]);
    const supportedLocales = ["en", "ka", "ru"];
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setCategories(await fetchCategories());
            setBrands(await fetchBrands());
        };

        fetchData();
    }, []);

    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY === 0;
            setScrolling(!isTop);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLanguageSelect = (selectedLanguage) => {
        const newPathname = location.pathname.replace(/^\/[^/]+/, `/${selectedLanguage}`);

        navigate(`${newPathname}${location.search}`);
    };

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <AppBar
                position="fixed"
                // style={{ backgroundColor: scrolling ? "#2A323D" : "rgba(78, 90, 108, 0.3)" }}
                style={{
                    backgroundColor: scrolling ? "#4C5461" : "rgba(78, 90, 108, 0.3)",
                    width: "100%",
                    padding: "0px",
                    height: "64px",
                }}
            >
                <Toolbar className="w-full  p-0">
                    <div className="w-1/4 sm:pl-10 min-w-fit flex justify-start">
                        <img
                            src={logoImage}
                            alt="Logo"
                            className="h-[50px] mb-0 hover:cursor-pointer"
                            onClick={() => navigate(`/${language}`)}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-3 w-1/2 ">
                        <Button
                            variant="text"
                            style={{
                                width: "fit",
                                color: "white",
                                fontSize: "18px",
                            }}
                        >
                            <FormattedMessage id="aboutUs" />
                        </Button>

                        <CategoryDropdown
                            title="products"
                            categories={categories}
                            language={language}
                        />
                        <CategoryDropdown title="brands" categories={brands} language={language} />
                        <Button
                            variant="text"
                            style={{
                                width: "fit",
                                color: "white",
                                fontSize: "18px",
                            }}
                        >
                            <FormattedMessage id="news" />
                        </Button>
                    </div>
                    <div color="inherit" className="w-1/4 sm:pr-10 flex justify-end">
                        <LanguageSelector
                            supportedLocales={supportedLocales}
                            changeLanguage={handleLanguageSelect}
                            language={language}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </IntlProvider>
    );
};

export default NavBar;
