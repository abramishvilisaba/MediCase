import React, { useEffect } from "react";
import {
    Router,
    Routes,
    Route,
    useLocation,
    useParams,
    useNavigate,
    // BrowserRouter as Router,
    // Navigate,
} from "react-router-dom";
// import messages from "./locales/messages";
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
    // const defaultLocale = "ka";
    const defaultLocale = supportedLocales.includes(localeParam) ? localeParam : userLocale || "ka";

    // useEffect(() => {
    //     if (location.pathname === "/") {
    //         navigate(`/${defaultLocale}`);
    //     }
    // }, [location.pathname, navigate, defaultLocale]);

    useEffect(() => {
        if (location.pathname === "/") {
            navigate(`/${defaultLocale}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            // style={{
            //     fontFamily: location.pathname.substring(1, 3) === "ka" ? "FiraGO" : "Montserrat",
            // }}
            style={{
                fontFamily: "Montserrat",
            }}
        >
            <ThemeProvider theme={theme}>
                {/* <Navbar /> */}
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route path=":language/" element={<Home />} />
                        <Route
                            path=":language/:type/product/:productId"
                            element={<ProductPage locale={location.pathname} />}
                        />
                        <Route
                            path=":language/:type/:id/:page?"
                            element={<Product locale={location.pathname} />}
                        />
                        <Route
                            path=":language/aboutUs"
                            element={<AboutUs locale={location.pathname} />}
                        />

                        <Route
                            path=":language/news"
                            element={<NewsPage locale={location.pathname} />}
                        />
                        <Route
                            path=":language/newspost/:itemId"
                            element={<Newspost locale={location.pathname} />}
                        />
                        <Route
                            path=":language/search/:q?"
                            element={<SearchPage locale={location.pathname} />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
                <div className="mt-[350px] sm:mt-[350px]">
                    <Footer />
                </div>
            </ThemeProvider>
        </div>
    );
};

export default App;
