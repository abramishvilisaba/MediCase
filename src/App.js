import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductPage from "./pages/ProductPage";
import Newspost from "./pages/Newspost";
import AboutUs from "./pages/AboutUs";
import NewsPage from "./pages/NewsPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactUs from "./pages/ContactUs";

const supportedLocales = ["en", "ka", "ru"];

const App = () => {
    const theme = createTheme({
        typography: {
            fontFamily: "Montserrat, sans-serif",
        },
    });

    const location = useLocation();
    const navigate = useNavigate();
    const userLocale = navigator.language.split(/[-_]/)[0];
    const localeParam = useParams().language;
    const defaultLocale = supportedLocales.includes(localeParam) ? localeParam : userLocale || "ka";

    useEffect(() => {
        if (location.pathname === "/") {
            navigate(`/${defaultLocale}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (
        location.pathname.length > 1 &&
        !supportedLocales.includes(location.pathname.substring(1, 3))
    ) {
        return <NotFoundPage />;
    }

    return (
        <div className="box-border font-Montserrat">
            <ThemeProvider theme={theme}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path=":language" element={<Home />} />
                    <Route
                        path=":language/:type/product/:productId"
                        element={<ProductPage locale={location.pathname} />}
                    />
                    <Route
                        path=":language/:type/:id/:page?"
                        element={<Product locale={location.pathname} />}
                    />
                    <Route path=":language/aboutUs" element={<AboutUs />} />
                    <Route path=":language/news" element={<NewsPage />} />
                    <Route path=":language/newspost/:itemId" element={<Newspost />} />
                    <Route path=":language/search/:q?" element={<SearchPage />} />
                    <Route path=":language/contactus" element={<ContactUs />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                {/* <div className="mt-[350px] sm:mt-[350px] bg-bgLight">
                    <Footer />
                </div> */}
            </ThemeProvider>
        </div>
    );
};

export default App;
