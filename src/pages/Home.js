import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useLocation, useParams, Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import colors from "../colors";
import { Helmet } from "react-helmet";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
import MySlider from "../components/Slider";
import { fetchNewsData, fetchProducts, fetchBrands } from "../utils/contentful";
import AboutUs from "../components/AboutUs";
import backgroundImage from "../media/cover.png";
import { default as MultiCarousel } from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import BrandCard from "../components/BrandCard";
import NewsCard from "../components/NewsCard";
import CustomCarousel from "../components/CustomCarousel";

const Home = () => {
    const [newsData, setNewsData] = useState([]);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    let { language } = useParams();

    const locales = ["en", "ka", "ru"];

    useEffect(() => {
        const fetchData = async () => {
            setNewsData(await fetchNewsData());
            setProducts(await fetchProducts());
            setBrands(await fetchBrands());
        };
        fetchData();
    }, []);

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div
                id="top-element"
                className="flex flex-col box-border bg-bgLight pb-[12vh]  lg:pb-[10vh]"
            >
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
                    <meta name="keywords" content="medical,beauty, products, solutions" />
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
                <div className="h-fit flex flex-col    ">
                    <div className=" md:min-h-[80vh] bg-bgMain w-full flex flex-col md:flex-row pb-8 pt-32  ">
                        {/*  */}
                        <div className="md:w-1/2 md:min-h-[70vh] flex flex-col items-center justify-center mb-8">
                            <h1 className="text-6xl sm:text-7xl md:text-7xl xl:text-8xl w-fit text-center font-semibold text-mainText mb-4">
                                MEDI CASE
                            </h1>
                            <div className="">
                                <div className="flex flex-row mb-2">
                                    <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl xl:text-[40px]  w-fit text-mainText text-left">
                                        Explore our
                                    </h2>
                                    <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl  xl:text-[40px]  w-fit text-mainText font-semibold text-left font-montserrat">
                                        &nbsp;services
                                    </h2>
                                    <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl  xl:text-[40px]  w-fit text-mainText  text-left font-montserrat">
                                        &nbsp;and
                                    </h2>
                                </div>
                                <div className="flex flex-row">
                                    <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl  xl:text-[40px]  w-fit text-mainText text-left">
                                        Discover
                                    </h2>
                                    <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl  xl:text-[40px]  w-fit text-mainText  text-left font-montserrat">
                                        &nbsp;amazing
                                    </h2>
                                    <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl  xl:text-[40px]  w-fit text-mainText font-semibold text-left font-montserrat">
                                        &nbsp;features
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/*  */}

                        <div className="h-full my-auto md:w-1/2">
                            <img
                                className="w-1/2 sm:w-2/3 md:4/5 lg:w-3/4 xl:w-3/5 mx-auto h-fit aspect-[140/169]"
                                src={backgroundImage}
                                alt="cover"
                            />
                        </div>
                    </div>
                    {/* <div className="bg-bgLight">
                        <AboutUs language={language} />
                    </div> */}
                </div>
                <div className="bg-bgLight flex flex-col justify-start ">
                    <div className="bg-bgLight pt-6 pb-2 ">
                        {brands.brandImages && (
                            <div className="w-4/5 xl:w-4/5 h-fit mx-auto   ">
                                <h2 className="text-3xl text-mainText font-bold my-8 text-center">
                                    Brands
                                </h2>
                                <CustomCarousel maxItems={5}>
                                    {brands.brandImages.map((image) => (
                                        <div className="py-1 px-2">
                                            <BrandCard
                                                // key={news.field.newsText}
                                                // item={news.field}
                                                language={language}
                                                brand={image.fields}
                                                style={{
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </CustomCarousel>
                            </div>
                        )}
                        <div className="w-4/5 mx-auto flex justify-end my-4   ">
                            {/* <Link to={`/${language}/brands/all`}>
                                <Button size="large" color="primary">
                                    Show All
                                </Button>
                            </Link> */}
                        </div>
                    </div>
                    <div className="bg-bgMain pt-6 pb-2">
                        <div className="w-4/5 xl:w-4/5 h-fit mx-auto  ">
                            <h2 className="text-3xl text-mainText font-bold my-8 text-center">
                                Products
                            </h2>
                            <CustomCarousel>
                                {products.map((product) => (
                                    <div className="py-1 px-2">
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            language={language}
                                            style={{ paddingLeft: "10px", paddingRight: "10px" }}
                                        />
                                    </div>
                                ))}
                            </CustomCarousel>
                        </div>
                        <div className="w-4/5 mx-auto flex justify-end my-4   ">
                            <Link to={`/${language}/products/all`}>
                                <Button size="large" color="primary">
                                    Show All
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-bgLight  pt-6 pb-2">
                        {newsData.length > 0 && (
                            <div className="w-4/5 xl:w-4/5 h-fit mx-auto   ">
                                <h2 className="text-3xl text-mainText font-bold my-8 text-center">
                                    News
                                </h2>
                                <CustomCarousel>
                                    {newsData.map((news) => (
                                        <div className="py-1 px-[1px]">
                                            <NewsCard
                                                key={news.field.newsText}
                                                item={news.field}
                                                language={language}
                                                style={{
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </CustomCarousel>
                            </div>
                        )}
                        <div className="w-4/5 mx-auto flex justify-end my-4   ">
                            <Link to={`/${language}/news`}>
                                <Button size="large" color="primary">
                                    Show All
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </IntlProvider>
    );
};

export default Home;
