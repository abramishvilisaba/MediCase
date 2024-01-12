import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Popover, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

const NavBar = () => {
    const navigate = useNavigate();

    // const history = useHistory();

    const contentful = require("contentful");
    const contentfulSpace = process.env.REACT_APP_CONTENTFUL_SPACE;
    const contentfulAccessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

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

    // categories.map((category) => console.log(category.name));

    return (
        <AppBar
            position="fixed"
            style={{ backgroundColor: scrolling ? "#2A323D" : "rgba(78, 90, 108, 0.3)" }}
        >
            <Toolbar>
                <Button color="inherit" sx={{ width: "180px" }}>
                    Logo
                </Button>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    {/* <Button color="inherit" onClick={(e) => handleClick(e, "products")}>
                        Products
                    </Button>
                    <Popover
                        id="products-popover"
                        open={isProductsOpen}
                        anchorEl={productsAnchorEl}
                        onClose={() => handleClose("products")}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                    >
                        <List>
                            {categories.map((category) => (
                                <ListItem
                                    button
                                    key={category.id}
                                    onClick={() => {
                                        handleClose("products");
                                        navigate(`/products/${category.name}`);
                                    }}
                                >
                                    <ListItemText primary={category.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Popover>
                    <Button color="inherit" onClick={(e) => handleClick(e, "brands")}>
                        Brands
                    </Button>
                    <Popover
                        id="brands-popover"
                        open={isBrandsOpen}
                        anchorEl={brandsAnchorEl}
                        onClose={() => handleClose("brands")}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                    >
                        <List>
                            <ListItem button onClick={() => handleClose("brands")}>
                                <ListItemText primary="Brand 1" />
                            </ListItem>
                            <ListItem button onClick={() => handleClose("brands")}>
                                <ListItemText primary="Brand 2" />
                            </ListItem>
                        </List>
                    </Popover> */}
                    <CategoryDropdown title="products" categories={categories} />
                    <CategoryDropdown title="brands" categories={categories} />
                </div>
                <Button color="inherit" sx={{ width: "180px" }}>
                    Language Selector
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
