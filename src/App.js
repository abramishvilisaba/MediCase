import React, { useEffect } from "react";
import {
    Routes,
    Route,
    useLocation,
    useParams,
    useNavigate,
    BrowserRouter as Router,
    Navigate,
} from "react-router-dom";
import messages from "./locales/messages";
import Home from "./pages/Home";
import Product from "./pages/Product";

const supportedLocales = ["en", "ka", "ru"];
const defaultLocale = "ka";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocale = navigator.language.split(/[-_]/)[0];
    const localeParam = useParams().language;
    const defaultLocale = supportedLocales.includes(localeParam)
        ? localeParam
        : userLocale || defaultLocale;

    useEffect(() => {
        if (location.pathname === "/") {
            navigate(`/${defaultLocale}`);
        }
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/:language?" element={<Home />} />
            <Route
                path=":language/products/:id/:page?"
                element={<Product locale={location.pathname} />}
            />
        </Routes>
    );
};

export default App;
