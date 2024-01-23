import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import colors from "../colors";
import backgroundImage from "../images/cover.jpg";
import Navbar from "../components/Navbar";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
import MySlider from "../components/Slider";
import { fetchNewsData, fetchProducts, fetchCategories } from "../utils/contentful";

const Home = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const location = useLocation();
    let { language } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setCategories(await fetchCategories());
            setProducts(await fetchProducts());
            setData(await fetchNewsData());
        };

        fetchData();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div className="flex flex-col box-border bg-[#E3E4E7] ">
                <div className="flex flex-col h-screen">
                    <div
                        className="bg-cover bg-center h-full relative"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <Navbar />
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  text-center">
                            <h1 className="text-4xl font-semibold mb-4">
                                <FormattedMessage id="welcome" />
                            </h1>
                            <p className="text-lg mb-8">
                                <FormattedMessage id="explore" />
                            </p>
                            <button className="bg-white text-black text-lg rounded-2xl px-6 py-3 border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-400">
                                <FormattedMessage id="getStarted" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-[100vh] mt-20 ">
                    {data.length > 0 && (
                        <div className="p-20 ">
                            <MySlider data={data} />
                        </div>
                    )}
                </div>
            </div>
        </IntlProvider>
    );
};

export default Home;
