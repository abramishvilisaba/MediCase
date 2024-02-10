import React, { useEffect } from "react";
import {
    Routes,
    Route,
    useLocation,
    useParams,
    useNavigate,
    // BrowserRouter as Router,
    // Navigate,
} from "react-router-dom";
// import messages from "./locales/messages";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductPage from "./pages/ProductPage";
import Newspost from "./pages/Newspost";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const supportedLocales = ["en", "ka", "ru"];

const App = () => {
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
        <>
            <Navbar />
            <Routes>
                <Route path="/:language?" element={<Home />} />
                <Route
                    path="/:language/:type/product/:productId"
                    element={<ProductPage locale={location.pathname} />}
                />
                <Route
                    path="/:language/:type/:id/:page?"
                    element={<Product locale={location.pathname} />}
                />
                <Route
                    path="/:language/newspost/:itemId"
                    element={<Newspost locale={location.pathname} />}
                />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
