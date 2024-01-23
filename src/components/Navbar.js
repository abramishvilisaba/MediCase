import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Popover, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import LanguageSelector from "./LanguageSelector";
import logoImage from "../images/logo.png";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let { language } = useParams();

    const contentful = require("contentful");
    const contentfulSpace = process.env.REACT_APP_CONTENTFUL_SPACE;
    const contentfulAccessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

    const supportedLocales = ["en", "ka", "ru"];

    const client = contentful.createClient({
        space: contentfulSpace,
        accessToken: contentfulAccessToken,
    });
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await client.getEntries({
                content_type: "category",
                order: "-sys.createdAt",
            });

            const fields = response.items.map((item) => {
                const field = item.fields;
                return {
                    ...item.fields,
                    field,
                };
            });
            // console.log("Categories :", fields);
            setCategories(fields);
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const [scrolling, setScrolling] = useState(false);
    const [productsAnchorEl, setProductsAnchorEl] = useState(null);
    const [brandsAnchorEl, setBrandsAnchorEl] = useState(null);

    const handleClick = (event, type) => {
        if (type === "products") {
            setProductsAnchorEl(event.currentTarget);
        } else if (type === "brands") {
            setBrandsAnchorEl(event.currentTarget);
        }
    };

    const handleClose = (type) => {
        if (type === "products") {
            setProductsAnchorEl(null);
        } else if (type === "brands") {
            setBrandsAnchorEl(null);
        }
    };

    const isProductsOpen = Boolean(productsAnchorEl);
    const isBrandsOpen = Boolean(brandsAnchorEl);

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
        handleClose();
    };

    return (
        <AppBar
            position="fixed"
            // style={{ backgroundColor: scrolling ? "#2A323D" : "rgba(78, 90, 108, 0.3)" }}
            style={{ backgroundColor: scrolling ? "#4C5461" : "rgba(78, 90, 108, 0.3)" }}
        >
            <Toolbar className="mx-8">
                <div className="m-2 w-[180px]">
                    <img
                        src={logoImage}
                        alt="Logo"
                        className="w-[100px] h-fit mb-0 hover:cursor-pointer"
                        onClick={() => navigate(`/${language}`)}
                    />
                </div>
                <div className="flex items-center space-x-4 ml-auto mr-auto">
                    <CategoryDropdown title="products" categories={categories} />
                    <CategoryDropdown title="brands" categories={categories} />
                </div>
                <Button color="inherit" sx={{ width: "180px" }}>
                    {/* Language Selector */}
                    <LanguageSelector
                        supportedLocales={supportedLocales}
                        changeLanguage={handleLanguageSelect}
                    />
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
