import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import LanguageSelector from "./LanguageSelector";
import logoImage from "../media/logo.svg";
import { fetchCategories, fetchBrands } from "../utils/contentful";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width:600px)");

    const [language, setLanguage] = useState("en");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [scrolling, setScrolling] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            setBrands(await fetchBrands());
        };

        fetchData();
    }, []);

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
            <div position="fixed">
                <AppBar
                    position="fixed"
                    style={{
                        backgroundColor: scrolling ? "#4C5461" : "rgba(78, 90, 108, 0.3)",
                        width: "100%",
                        padding: "0px",
                        height: "64px",
                    }}
                >
                    <Toolbar className="w-full flex flex-row  justify-between p-0 gap-0">
                        <div className="w-fit md:w-1/4 sm:pl-10 min-w-fit flex ">
                            <Link to={`/${language}`}>
                                <IconButton>
                                    <img
                                        src={logoImage}
                                        alt="Logo"
                                        className="h-[50px] mb-0 hover:cursor-pointer"
                                        // onClick={() => navigate(`/${language}`)}
                                    />
                                </IconButton>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-3 w-1/2">
                            {!isMobile && (
                                <>
                                    <Button
                                        variant="text"
                                        style={{ width: "fit", color: "white", fontSize: "16px" }}
                                    >
                                        <FormattedMessage id="aboutUs" />
                                    </Button>
                                    <CategoryDropdown
                                        title="products"
                                        categories={categories}
                                        language={language}
                                    />
                                    <CategoryDropdown
                                        title="brands"
                                        categories={brands}
                                        language={language}
                                    />
                                    <Button
                                        variant="text"
                                        style={{ width: "fit", color: "white", fontSize: "16px" }}
                                    >
                                        <FormattedMessage id="news" />
                                    </Button>
                                </>
                            )}
                        </div>
                        <div color="inherit" className="w-1/4 sm:pr-10 flex justify-end">
                            {!isMobile && (
                                <LanguageSelector
                                    supportedLocales={["en", "ka", "ru"]}
                                    changeLanguage={handleLanguageSelect}
                                    language={language}
                                />
                            )}
                        </div>
                        {isMobile && (
                            <div className="w-fit md:w-1/4 sm:pl-10 min-w-fit  flex  ">
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={() => setIsDrawerOpen(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <Toolbar className="w-[40vw] h-full py-8   flex flex-col  bg-[#4C5461]">
                        {/* <div className="w-full sm:pl-10 min-w-fit flex justify-start">
                            <img
                                src={logoImage}
                                alt="Logo"
                                className="h-[50px] mb-0 hover:cursor-pointer"
                                onClick={() => navigate(`/${language}`)}
                            />
                        </div> */}

                        <div className="w-full flex flex-col items-start justify-center gap-0  ">
                            <Button
                                variant="text"
                                style={{
                                    width: "100%",
                                    height: "fit",
                                    fontSize: "16px",
                                    color: "white",
                                    padding: "2px 8px",
                                }}
                            >
                                <div className="w-full flex flex-row justify-between">
                                    <FormattedMessage id="aboutUs" />
                                    {/* <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        onClick={() => setIsDrawerOpen(true)}
                                        sx={{ padding: 0 }}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton> */}
                                </div>
                            </Button>

                            <CategoryDropdown
                                title="products"
                                categories={categories}
                                language={language}
                            />
                            <CategoryDropdown
                                title="brands"
                                categories={brands}
                                language={language}
                            />
                            <Button
                                variant="text"
                                style={{
                                    width: "fit",
                                    fontSize: "16px",
                                    color: "white",
                                    padding: "2px 8px",
                                }}
                                className="text-xs text-white"
                            >
                                <FormattedMessage id="news" />
                            </Button>
                        </div>
                        {/* <div color="inherit" className="w-1/4 sm:pr-10 flex justify-end">
                            {
                                <LanguageSelector
                                    supportedLocales={["en", "ka", "ru"]}
                                    changeLanguage={handleLanguageSelect}
                                    language={language}
                                />
                            }
                        </div> */}
                    </Toolbar>
                </Drawer>
            </div>
        </IntlProvider>
    );
};

export default NavBar;
