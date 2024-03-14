import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    TextField,
    IconButton,
    InputAdornment,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import LanguageSelector from "./LanguageSelector";
import logoImage from "../media/logo.svg";
import { fetchCategories, fetchBrands } from "../utils/contentful";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MobileNavBar from "./MobileNavBar";
import SearchIcon from "@mui/icons-material/Search";
import SearchComponent from "./SearchComponent";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width:600px)");

    const [language, setLanguage] = useState("en");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [scrolling, setScrolling] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandSearch, setExpandSearch] = useState(false);

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

    const navigateToHome = () => {
        setExpandSearch(false);
        navigate(`/${language}`);
    };

    return (
        <div className="h-full">
            {/* MobileNavBar component */}
            {isMobile && (
                <MobileNavBar
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                    language={language}
                    handleLanguageSelect={handleLanguageSelect}
                />
            )}

            {/* Rest of the NavBar component */}
            <IntlProvider locale={language} messages={messages[language]}>
                <div position="fixed ">
                    <AppBar
                        position="fixed"
                        style={{
                            backgroundColor: scrolling ? "#626B7F" : "rgba(78, 90, 108, 0.3)",
                            width: "100%",
                            padding: "0px 0px",
                            transition: "height 0.5s ease-in-out",
                        }}
                        className={`transition-all ${scrolling ? "h-[60px]" : "h-[76px]"}`}
                    >
                        <Toolbar className="w-full h-full flex flex-row  justify-between p-0 gap-0 ">
                            {/* Logo */}
                            {/* <div className="w-fit md:w-1/4 md:pl-10 min-w-fit flex ">
                                <Link to={`/${language}`}>
                                    <IconButton sx={{ borderRadius: "20%" }}>
                                        <img
                                            src={logoImage}
                                            alt="Logo"
                                            className="h-[50px] mb-0 hover:cursor-pointer"
                                        />
                                    </IconButton>
                                </Link>
                            </div> */}
                            <div className="w-fit md:w-1/3 lg:pl-10 min-w-fit flex ">
                                <IconButton sx={{ borderRadius: "20%" }} onClick={navigateToHome}>
                                    <img
                                        src={logoImage}
                                        alt="Logo"
                                        className="h-[50px] mb-0 hover:cursor-pointer"
                                    />
                                </IconButton>
                            </div>

                            {/* Main Navigation Links */}
                            <div className="flex items-center justify-center md:gap-3 w-1/3">
                                {!isMobile && (
                                    <>
                                        {/* Navigation Links */}
                                        <Link to={`${language}/aboutUs`}>
                                            <Button
                                                variant="text"
                                                style={{
                                                    width: "fit",
                                                    color: "white",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <FormattedMessage id="aboutUs" />
                                            </Button>
                                        </Link>
                                        {/* Dropdowns */}
                                        <CategoryDropdown
                                            title="products"
                                            categories={categories}
                                            language={language}
                                            scrolling={scrolling}
                                        />
                                        <CategoryDropdown
                                            title="brands"
                                            categories={brands}
                                            language={language}
                                            scrolling={scrolling}
                                        />
                                        {/* News Link */}
                                        <Link to={`${language}/news`}>
                                            <Button
                                                variant="text"
                                                style={{
                                                    width: "fit",
                                                    color: "white",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <FormattedMessage id="news" />
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="flex flex-row w-1/3 justify-end lg:pr-10">
                                {/* Language Selector */}
                                <div color="inherit" className="w-1/4 md:pr-4 flex justify-end">
                                    {!isMobile && !expandSearch && (
                                        <LanguageSelector
                                            supportedLocales={["en", "ka", "ru"]}
                                            changeLanguage={handleLanguageSelect}
                                            language={language}
                                        />
                                    )}
                                    {/* {isMobile && !expandSearch && (
                                        <LanguageSelector
                                            supportedLocales={["en", "ka", "ru"]}
                                            changeLanguage={handleLanguageSelect}
                                            language={language}
                                            isMobile={isMobile}
                                        />
                                    )} */}
                                </div>
                                {!isMobile && (
                                    <div>
                                        <SearchComponent
                                            language={language}
                                            expandSearch={expandSearch}
                                            setExpandSearch={setExpandSearch}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Mobile Navigation Menu */}
                            {isMobile && (
                                <div className="flex flex-row gap-6">
                                    {isMobile && (
                                        <div style={{ flexGrow: 1 }}>
                                            <SearchComponent
                                                language={language}
                                                expandSearch={expandSearch}
                                                setExpandSearch={setExpandSearch}
                                                isMobile={isMobile}
                                            />
                                        </div>
                                    )}
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
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
            </IntlProvider>
            {/* Outlet */}
            <Outlet />
        </div>
    );
};

export default NavBar;
