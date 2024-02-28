import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchProductById, fetchProducts, fetchCategories } from "../utils/contentful";
import backgroundImage from "../media/cover.jpg";
import { default as MultiCarousel } from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import "react-multi-carousel/lib/styles.css";
import { Carousel } from "react-responsive-carousel";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

const ProductPage = () => {
    const location = useLocation();
    const { language, id, type, productId } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState();
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setCategories(await fetchCategories());
                const productData = await fetchProductById(productId);
                setProduct(productData);
                if (productData && productData.category) {
                    const fetchedProducts = await fetchProducts("products", productData.category);
                    if (fetchedProducts) {
                        const filteredProducts = fetchedProducts.filter((p) => p.id !== productId);
                        setSimilarProducts(filteredProducts.slice(0, 10));
                    }
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProductData();
    }, [productId]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSelectedPhotoIndex(0);
    }, [location.pathname]);

    if (!product) {
        return (
            <div className="w-full  mt-[40vh] flex justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div className="font-roboto-slab bg-slate-100 min-h-full  pb-[30vh] tall:pb-0 lg:pb-[30vh]">
                <title> {product.name}</title>

                <Helmet>
                    {/* General */}
                    <meta charSet="utf-8" />
                    <title>{product.name}</title>
                    <meta
                        name="description"
                        content="Medicase.ge! We offer a wide range of beauty products from industry-leading brands to meet your skincare and beauty needs. Explore our selection of top-quality skincare and beauty treatments at Medicase.ge."
                    />
                    <meta
                        name="google-site-verification"
                        content="jy3Fe0U4ktvk1bNy8XjiXj77vkkumQTypNFElJ5JXvc"
                    />
                    <meta
                        name="keywords"
                        content={`medical,beauty, products, solutions,${product.name}`}
                    />
                    {/* <meta name="author" content="Your Name" /> */}

                    {/* Open Graph */}
                    <meta property="og:title" content={product.name} />
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
                    <meta name="robots" content="INDEX,FOLLOW" />
                </Helmet>

                {/* <div
                {/* <div className=" w-full h-32 md:h-40 pt-[88px] md:pt-[102px] bg-[#425274] "> */}
                <div className=" w-full h-32 md:h-40 pt-[88px] md:pt-[102px] bg-[#4d5b7c] ">
                    <div className="w-full h-full ">
                        <div className=" w-full flex flex-col h-full text-gray-200 ">
                            <div className=" text-left text-lg  md:text-xl ml-6 md:ml-[68px]">
                                <Link to={`/${language}`} className="font-semibold hover:underline">
                                    <span>Home</span>
                                </Link>
                                <span> &gt; </span>
                                <Link
                                    to={`/${language}/products/${type}`}
                                    className="font-semibold hover:underline"
                                >
                                    <span>{type}</span>
                                </Link>
                                <span> &gt; {product.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/5  md:w-4/5 h-fit mx-auto mt-8 md:mt-16  flex flex-col md:flex-row   ">
                    <div className="md:w-1/2 h-[40vh] md:h-[60vh] lg:p-12  overflow-hidden bg-[#EEEEEE]">
                        {product.images && product.images.length > 0 ? (
                            <Carousel
                                selectedItem={selectedPhotoIndex}
                                onChange={(index) => setSelectedPhotoIndex(index)}
                                showArrows={true}
                                thumbWidth={`${100 / (product.images.length + 2)}%`}
                                swipeScrollTolerance={10}
                                dynamicHeight={true}
                                showStatus={false}
                                showThumbs={false}
                                // autoPlay={true}
                                // interval={3000}
                                swipeable={true}
                                // width={"100%"}
                            >
                                {product.images.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="w-full h-[40vh]  px-[0px] py-[0px] lg:px-8 md:py-8  "
                                    >
                                        <img
                                            src={photo.fields.file.url}
                                            alt={`img ${index + 1}`}
                                            // style={{
                                            //     width: "100%",
                                            //     height: "100%",
                                            //     objectFit: "cover",
                                            // }}
                                            className="w-full h-[40vh] object-contain aspect-square "
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        ) : null}
                    </div>

                    <div className=" h-fit min-h-[20vh] md:min-h-[60vh] md:w-1/2 md:px-8  mt-4 md:mt-0  flex flex-col md:justify-between">
                        <div>
                            <span className="text-2xl  font-medium font-roboto-slab">
                                {product.brand}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 font">
                                {product.name}
                            </h2>
                        </div>
                        <div className="">
                            <ReactMarkdown remarkPlugins={[gfm]} className={"markdown text-xl "}>
                                {product["description" + language] || product["descriptionen"]}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
                <div className="w-4/5 h-fit  mx-auto mt-12 pb-40">
                    <h2 className="text-xl font-bold mb-4">
                        <FormattedMessage id="similar" />
                    </h2>
                    <MultiCarousel
                        additionalTransfrom={0}
                        arrows
                        autoPlay
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024,
                                },
                                items: 4,
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0,
                                },
                                items: 1,
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464,
                                },
                                items: 2,
                            },
                        }}
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {similarProducts.map((similarProduct) => (
                            <div className="py-1 px-2">
                                <ProductCard
                                    key={similarProduct.id}
                                    product={similarProduct}
                                    language={language}
                                    id={type}
                                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                                />
                            </div>
                        ))}
                    </MultiCarousel>
                </div>
            </div>
        </IntlProvider>
    );
};
export default ProductPage;
