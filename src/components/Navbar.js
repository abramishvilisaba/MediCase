import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Popover, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import LanguageSelector from "./LanguageSelector";
import logoImage from "../images/logo.png";
import { fetchCategories, fetchBrands } from "../utils/contentful";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let { language } = useParams();
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
        // handleClose();
    };

    return (
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
            {/* <Toolbar className="w-full mx-2 sm:mx-8  p-0"> */}
            <Toolbar className="w-full  p-0">
                <div className="w-1/4 sm:pl-10 min-w-fit flex justify-start">
                    <img
                        src={logoImage}
                        alt="Logo"
                        className="h-[50px] mb-0 hover:cursor-pointer"
                        onClick={() => navigate(`/${language}`)}
                    />
                </div>
                <div className="flex items-center justify-center gap-2 w-1/2 ">
                    <CategoryDropdown title="products" categories={categories} />
                    <CategoryDropdown title="brands" categories={brands} />
                </div>
                <div color="inherit" className="w-1/4 sm:pr-10 flex justify-end">
                    {/* Language Selector */}
                    <LanguageSelector
                        supportedLocales={supportedLocales}
                        changeLanguage={handleLanguageSelect}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
