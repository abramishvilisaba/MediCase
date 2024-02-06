import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchProductById, fetchProducts, fetchCategories } from "../utils/contentful";
import backgroundImage from "../images/cover2.jpg";
import { default as MultiCarousel } from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import "react-multi-carousel/lib/styles.css";
import { Carousel } from "react-responsive-carousel";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";

const ProductPage = () => {
    const location = useLocation();
    const { language, productId } = useParams();
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
        return <div>Loading...</div>;
    }

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div>
                <div
                    className="bg-cover bg-center w-full h-80 relative "
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                        <h3 className="text-3xl font-bold mb-4">
                            {product["name" + language] || product.name}
                        </h3>
                    </div>
                </div>
                <div className="w-3/5 mx-auto mt-8 flex flex-col md:flex-row shadow-lg rounded-xl bg-zinc-50 ">
                    <div className="md:w-2/5  rounded-xl overflow-hidden ">
                        {product.images && product.images.length > 0 ? (
                            <Carousel
                                selectedItem={selectedPhotoIndex}
                                onChange={(index) => setSelectedPhotoIndex(index)}
                                showArrows={true}
                                thumbWidth={`${100 / (product.images.length + 2)}%`}
                                swipeScrollTolerance={10}
                                dynamicHeight={false}
                                showStatus={false}
                                // autoPlay={true}
                                // interval={3000}
                                swipeable={true}
                            >
                                {product.images.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="w-full h-full object-cover px-[28px] py-[32px]  rounded-xl"
                                    >
                                        <img
                                            src={photo.fields.file.url}
                                            alt={`img ${index + 1}`}
                                            // style={{
                                            //     width: "100%",
                                            //     height: "100%",
                                            //     objectFit: "cover",
                                            // }}
                                            className="w-full h-full object-contain aspect-square "
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        ) : null}
                    </div>

                    <div className="md:w-3/5 p-6  rounded-r-xl">
                        <h2 className="text-3xl font-bold mt-2 mb-8">
                            {product["name" + language] || product.name}
                        </h2>
                        <div className="mb-6">
                            <p className="text-lg text-gray-500 mb-2">
                                <FormattedMessage id="category" />
                                <span className="text-lg text-gray-700 font-medium ">
                                    {categories[product.category][language]}
                                </span>
                            </p>
                            <p className="text-lg text-gray-500 mb-2">
                                <FormattedMessage id="brand" />
                                <span className="text-lg text-gray-700 font-medium">
                                    {product.brand}
                                </span>
                            </p>
                        </div>
                        <p className="text-lg mb-4 text-gray-500">
                            {product["description" + language] || product.descriptionen}
                        </p>
                        <p className="text-lg mb-4 text-gray-500">
                            {product["note" + language] || product.noteen}
                        </p>
                    </div>
                </div>
                <div className="w-3/5 h-fit  mx-auto mt-8 pb-40">
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
                                <Link to={`/${language}/product/${similarProduct.name}`}>
                                    <ProductCard
                                        key={similarProduct.id}
                                        product={similarProduct}
                                        language={language}
                                        style={{ paddingLeft: "10px", paddingRight: "10px" }}
                                    />
                                </Link>
                            </div>
                        ))}
                    </MultiCarousel>
                </div>
            </div>
        </IntlProvider>
    );
};
export default ProductPage;
