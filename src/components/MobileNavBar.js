import React, { useState, useEffect } from "react";
import { Drawer, Toolbar, Button, MenuItem, Typography } from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MobileCategoryDropdown from "./MobileCategoryDropdown";
import logoImage from "../media/logo.svg";
import { fetchCategories, fetchBrands } from "../utils/contentful";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
import LanguageSelector from "./LanguageSelector";

const MobileNavBar = ({ isDrawerOpen, setIsDrawerOpen, scrolling }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [language, setLanguage] = useState("en");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const pathname = location.pathname;
        const parts = pathname.split("/");
        if (parts.length > 1 && parts[1] !== "") {
            setLanguage(parts[1]);
        } else {
            setLanguage("en");
        }
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            setCategories(await fetchCategories());
            const brands = await fetchBrands();
            setBrands(brands.locales);
        };

        fetchData();
    }, []);

    const handleLanguageSelect = (selectedLanguage) => {
        const newPathname = location.pathname.replace(/^\/[^/]+/, `/${selectedLanguage}`);
        navigate(`${newPathname}${location.search}`);
    };

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                {/* <Toolbar className="w-[40vw] h-fit py-8 flex flex-col  bg-[#4C5461]"> */}
                <Toolbar
                    className="w-[50vw] h-fit  flex flex-col  bg-nav"
                    sx={{ minHeight: "fit-content", height: "fit-content", padding: "0px 18px" }}
                >
                    <div className="w-full min-h-[100vh] h-fit flex flex-col items-start justify-start gap-0">
                        <div className="my-4">
                            <LanguageSelector
                                supportedLocales={["en", "ka", "ru"]}
                                changeLanguage={handleLanguageSelect}
                                language={language}
                                isMobile={true}
                            />
                        </div>
                        <Button
                            variant="text"
                            style={{
                                width: "100%",
                                height: "fit",
                                fontSize: "16px",
                                color: "white",
                                padding: "0px",
                                margin: "12px 0px",
                                // padding: "2px 8px",
                            }}
                        >
                            <div className="w-full flex flex-row justify-between">
                                <Link to={`${language}/aboutUs`}>
                                    <FormattedMessage id="aboutUs" />
                                </Link>
                            </div>
                        </Button>

                        {categories && (
                            <MobileCategoryDropdown
                                title="products"
                                categories={categories}
                                language={language}
                                isMobile={true}
                                closeDrawer={() => setIsDrawerOpen(false)}
                                scrolling={scrolling}
                            />
                        )}
                        {brands && (
                            <MobileCategoryDropdown
                                title="brands"
                                categories={brands}
                                language={language}
                                isMobile={true}
                                closeDrawer={() => setIsDrawerOpen(false)}
                                scrolling={scrolling}
                            />
                        )}
                        <Button
                            variant="text"
                            style={{
                                width: "100%",
                                height: "fit",
                                fontSize: "16px",
                                color: "white",
                                padding: "0px",
                                margin: "12px 0px",
                                // padding: "2px 8px",
                            }}
                        >
                            <div className="w-full flex flex-row justify-between">
                                <Link to={`${language}/news`}>
                                    <FormattedMessage id="news" />
                                </Link>
                            </div>
                        </Button>
                        <Button
                            variant="text"
                            style={{
                                width: "100%",
                                height: "fit",
                                fontSize: "16px",
                                color: "white",
                                padding: "0px",
                                margin: "12px 0px",
                                // padding: "2px 8px",
                            }}
                        >
                            <div className="w-full flex flex-row justify-between">
                                <Link to={`${language}/contactus`}>
                                    <FormattedMessage id="contactUs" />
                                </Link>
                            </div>
                        </Button>
                    </div>
                </Toolbar>
            </Drawer>
        </IntlProvider>
    );
};

export default MobileNavBar;
