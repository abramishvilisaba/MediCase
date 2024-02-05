import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../utils/contentful";
import Navbar from "../components/Navbar";
import backgroundImage from "../images/cover2.jpg";
import { default as MultiCarousel } from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import "react-multi-carousel/lib/styles.css";
import { Carousel } from "react-responsive-carousel";

const ProductPage = () => {
    const { language, productId } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
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

    console.log(product);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div
                className="bg-cover bg-center w-full h-80 relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <Navbar />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                    <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
                </div>
            </div>
            <div className="w-3/5 mx-auto mt-8 flex flex-col md:flex-row shadow-lg rounded-xl">
                {/* Photo on the left side */}
                <div className="md:w-2/5  rounded-xl overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                        <Carousel
                            selectedItem={selectedPhotoIndex}
                            onChange={(index) => setSelectedPhotoIndex(index)}
                            showArrows={true}
                            thumbWidth={`${100 / (product.images.length + 1)}%`}
                            swipeScrollTolerance={10}
                            dynamicHeight={false}
                            // autoPlay={true}
                            // interval={3000}
                            swipeable={true}
                        >
                            {product.images.map((photo, index) => (
                                <div
                                    key={index}
                                    className="w-full h-full object-cover p-8 bg-slate-200"
                                >
                                    <img
                                        src={photo.fields.file.url}
                                        alt={`img ${index + 1}`}
                                        // style={{
                                        //     width: "100%",
                                        //     height: "100%",
                                        //     objectFit: "cover",
                                        // }}
                                        className="w-full h-full object-cover aspect-square"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    ) : null}
                </div>
                {/* <div className="md:w-2/5 bg-[#E3E4E7] rounded-l-xl overflow-hidden">
                    <img
                        src={product.image.fields.file.url}
                        alt={product.name}
                        className="w-full"
                    />
                </div> */}
                {/* Product details on the right side */}
                <div className="md:w-3/5 p-6 bg-white rounded-r-xl">
                    <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                    <p className="text-lg text-gray-700 mb-2">
                        Category: <span className="font-light">{product.category}</span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        Brand: <span className="font-light">{product.brand}</span>
                    </p>
                    <p className="text-lg mb-4">{product.description}</p>
                    {/* Add more product details as needed */}
                </div>
            </div>
            {/* Similar Products Carousel */}
            <div className="w-3/5 h-fit  mx-auto mt-8 pb-40">
                <h2 className="text-xl font-bold mb-4">Similar Products</h2>
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
                                style={{ paddingLeft: "10px", paddingRight: "10px" }}
                            />
                        </div>
                    ))}
                </MultiCarousel>
            </div>
        </div>
    );
};
export default ProductPage;
