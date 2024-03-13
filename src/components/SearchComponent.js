import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";

const SearchComponent = ({ language, expandSearch, setExpandSearch, isMobile = false }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleBlur = () => {
        if (!searchQuery) {
            setExpandSearch(false);
        }
    };

    const handleSearchIconClick = () => {
        if (expandSearch) {
            handleSearch();
        }
        setExpandSearch(!expandSearch);
    };
    const handleSearch = () => {
        if (searchQuery && searchQuery.length > 0) {
            navigate(`${language}/search/?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        setSearchQuery("");
    }, [expandSearch]);
    return (
        <TextField
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
                style: {
                    color: "white",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    borderRadius: "4px",
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                    height: "44px",
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon
                            style={{
                                cursor: "pointer",
                                color: "white",
                            }}
                            onClick={handleSearchIconClick}
                        />
                    </InputAdornment>
                ),
                disableUnderline: true, // Disable default MUI underline
            }}
            fullWidth
            onFocus={() => setExpandSearch(true)} // onFocus event handler
            onBlur={handleBlur} // onBlur event handler
            onKeyDown={handleSearchEnter}
            style={{
                width: expandSearch ? (isMobile ? "140px" : "300px") : "50px",
                transition: "width 0.3s ease",
            }}
        />
    );
};

export default SearchComponent;
