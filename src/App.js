import React from "react";
import { useEffect } from "react";

import {
    Routes,
    Route,
    Outlet,
    Link,
    Navigate,
    useNavigate,
    useLocation,
    BrowserRouter as Router,
} from "react-router-dom";
// import { IntlProvider, FormattedMessage } from "react-intl";
import messagesEn from "./locales/en";
import messagesKa from "./locales/ka";
import messagesRu from "./locales/ru";
import Home from "./components/Home";
import Product from "./components/Product";

// import About from "./components/About";
// import Dashboard from "./components/Dashboard";
// import NoMatch from "./components/NoMatch";

const supportedLocales = ["en", "ka", "ru"];
const defaultLocale = "ka";

export default function App() {
    const userLocale = navigator.language.split(/[-_]/)[0];
    const locale = supportedLocales.includes(userLocale) ? userLocale : defaultLocale;
    // console.log(locale);

    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     if (!location.pathname.includes(`/${locale}`)) {
    //         console.log(location.pathname.includes(`/${locale}`));
    //         console.log(location.pathname);

    //         if (location.pathname === "/" && !supportedLocales.includes(locale)) {
    //             navigate(`/${defaultLocale}`);
    //         } else if (location.pathname === "/") {
    //             navigate(`/${locale}`);
    //         }
    //     }
    // }, [locale, navigate]);

    return (
        <div>
            {/* <h1>Basic Example</h1>

            <p>
                This example demonstrates some of the core features of React Router including nested{" "}
                <code>&lt;Route&gt;</code>s, <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>
                s, and using a "*" route (aka "splat route") to render a "not found" page when
                someone visits an unrecognized URL.
            </p> */}

            {/* Routes nest inside one another. Nested route paths build upon
              parent route paths, and nested route elements render inside
              parent route elements. See the note about <Outlet> below. */}

            <Routes>
                {/* <Route path="/" element={<Layout />}> */}
                <Route index element={<Home />} />
                <Route path="products/:id" element={<Product />} />
                <Route path="about" element={<About />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="*" element={<NoMatch />} />
                {/* </Route> */}
            </Routes>

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
        </div>
    );
}

function Layout() {
    return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </li>
                </ul>
            </nav>

            <hr />

            {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
            <Outlet />
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
