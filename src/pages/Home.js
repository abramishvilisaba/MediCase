import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import { Card, CardContent, Typography, Button } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import colors from "../colors";
import { Helmet } from "react-helmet";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
import MySlider from "../components/Slider";
import { fetchNewsData } from "../utils/contentful";
import AboutUs from "../components/AboutUs";
import backgroundImage from "../media/cover.jpg";

const Home = () => {
    const [newsData, setNewsData] = useState([]);

    const location = useLocation();
    let { language } = useParams();

    const locales = ["en", "ka", "ru"];

    useEffect(() => {
        const fetchData = async () => {
            setNewsData(await fetchNewsData());
        };
        fetchData();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div className="flex flex-col box-border bg-[#E3E4E7]  font-roboto-slab pb-[30vh] tall:pb-0 lg:pb-[30vh]">
                {/* <div className="flex flex-col box-border bg-[#E3E4E7]  font-roboto-slab "> */}
                <div className="flex flex-col h-fit">
                    <div
                        className="bg-cover bg-center min-h-[100vh] h-full relative"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"></div>
                        <div className="absolute w-2/3 mt-64 md:mt-56 lg:mt-48 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  text-center">
                            <Helmet>
                                {/* General */}
                                <meta charSet="utf-8" />
                                <title>Medicase - Your Destination for Beauty Products</title>
                                <meta
                                    name="description"
                                    content="Welcome to Medicase.ge! We offer a wide range of beauty products from industry-leading brands to meet your skincare and beauty needs. Explore our selection of top-quality skincare and beauty treatments at Medicase.ge."
                                />
                                <meta
                                    name="google-site-verification"
                                    content="jy3Fe0U4ktvk1bNy8XjiXj77vkkumQTypNFElJ5JXvc"
                                />
                                <meta
                                    name="keywords"
                                    content="medical,beauty, products, solutions"
                                />
                                {/* <meta name="author" content="Your Name" /> */}

                                {/* Open Graph */}
                                <meta property="og:title" content="Medicase" />
                                <meta
                                    property="og:description"
                                    content="Welcome to Medicase.ge! We offer a wide range of beauty products from industry-leading brands to meet your skincare and beauty needs. Explore our selection of top-quality skincare and beauty treatments at Medicase.ge."
                                />
                                <meta
                                    property="og:image"
                                    content="https://images.ctfassets.net/0fishfo4jgud/748nnaX9TfnB07ifVX3klu/eae72889e680cbce8780c1909ed385c9/logo.png"
                                />
                                <meta property="og:url" content="https://medicase.ge/" />
                                <meta property="og:type" content="website" />

                                {/* Twitter Card */}
                                <meta name="twitter:card" content="summary_large_image" />
                                <meta name="twitter:title" content="Medicase" />
                                <meta
                                    name="twitter:description"
                                    content="Welcome to Medicase.ge! We offer a wide range of beauty products from industry-leading brands to meet your skincare and beauty needs. Explore our selection of top-quality skincare and beauty treatments at Medicase.ge."
                                />
                                <meta
                                    name="twitter:image"
                                    content="https://images.ctfassets.net/0fishfo4jgud/748nnaX9TfnB07ifVX3klu/eae72889e680cbce8780c1909ed385c9/logo.png"
                                />

                                {locales.map((locale) => {
                                    <link
                                        rel="alternate"
                                        href={`http://medicase.ge/${locale}`}
                                        hrefLang={locale}
                                        key={locale}
                                    />;
                                })}
                            </Helmet>
                            <div className="flex flex-col items-center">
                                <h1 className="text-8xl w-fit  font-semibold text-[rgb(255,255,255,0.5)]  mb-4 ">
                                    {/* <h1 className="text-9xl w-fit  font-semibold text-[rgb(241,224,206,0.5)] mb-4 "> */}
                                    {/* <FormattedMessage id="welcome" /> */}
                                    MEDI CASE
                                </h1>
                                <h2 className="text-xl mb-8">
                                    <FormattedMessage id="explore" />
                                </h2>
                            </div>
                            {/* <button className="bg-white text-black text-lg rounded-2xl px-6 py-3 border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-400">
                                <FormattedMessage id="getStarted" />
                            </button> */}
                        </div>
                    </div>
                    <AboutUs language={language} />
                </div>
                <div className="h-[100vh] mt-20 ">
                    {newsData.length > 0 && (
                        <div className="sm:p-4 lg:p-8 2xl:p-20 mx-8 2xl:mx-16 ">
                            <MySlider language={language} newsData={newsData} />
                        </div>
                    )}
                </div>
            </div>
        </IntlProvider>
    );
};

export default Home;
