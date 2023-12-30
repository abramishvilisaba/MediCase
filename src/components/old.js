import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Popover, List, ListItem, ListItemText } from "@mui/material";

const Navbar = styled.div`
    background-color: ${(props) => (props.scrolling ? "#2A323D" : "rgba(78, 90, 108, 0.3)")};
    padding: 30px;
    transition: background-color 0.3s ease;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
`;

const MenuSelection = styled.div`
    display: flex;
    flex-direction: row;
    /* Styles for menu items */
    margin: 0 20px;
`;

const LanguageSelector = styled.div`
    /* Styles for language selector */
    margin-right: 20px;
`;

const Logo = styled.div`
    /* Styles for logo */
    margin-left: 20px;
    font-weight: bold;
    font-size: 24px;
`;

const ProductsDropdown = styled.div`
    /* Styles for dropdown */
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 150px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: 10px;
`;

const ProductButton = styled.button`
    /* Styles for button */
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:hover ${ProductsDropdown} {
        display: block; /* Show dropdown on hover */
    }
`;

const ProductItem = styled.div`
    /* Styles for product items */
    padding: 8px 10px;
    cursor: pointer;
    &:hover {
        background-color: #f9f9f9;
    }
`;

const NavBar = () => {
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Navbar scrolling={scrolling}>
            <Logo>Logo</Logo>
            <MenuSelection>
                <div>About Us</div>
                <ProductButton>
                    Products
                    <ProductsDropdown>
                        <ProductItem>Type 1</ProductItem>
                        <ProductItem>Type 2</ProductItem>
                        {/* Add more product types */}
                    </ProductsDropdown>
                </ProductButton>
                {/* Add more menu items as needed */}
            </MenuSelection>
            <LanguageSelector>
                {/* Language selector component */}
                Language Selector
            </LanguageSelector>
        </Navbar>
    );
};

export default NavBar;
