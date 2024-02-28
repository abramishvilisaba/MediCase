import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchProducts } from "../utils/contentful";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";
// import backgroundImage from "../media/cover.jpg";
import backgroundImage from "../media/cover.jpg";

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, type, id, page } = useParams();
    const currentPage = page ? parseInt(page, 10) : 1;
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (id) {
            setCategory(id);
        }
    }, [location, id]);

    useEffect(() => {
        if (category) {
            const fetchData = async () => {
                const productsData = await fetchProducts(type, category);
                if (productsData !== null) {
                    setProducts(productsData);
                }
            };
            fetchData();
        }
    }, [type, category]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let currentItems;
    if (products) {
        if (products.length > 0) {
            currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
        }
    } else {
        currentItems = [];
    }

    const handlePageChange = (event, value) => {
        navigate(`/${language}/${type}/${category}/${value}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div className="min-h-screen bg-f2f2f2 p-0 flex flex-col items-center  pb-[30vh] tall:pb-0 lg:pb-[30vh] box-border font-roboto-slab">
                <div
                    className="bg-cover bg-center w-full h-96 relative"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    {/* <div className="bg-cover bg-center w-full bg-[#869cd4] h-60 relative"> */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                        <h3 className="text-4xl font-bold mt-12 mb-4">
                            {category ? (
                                category === "all" ? (
                                    <FormattedMessage id="products" />
                                ) : (
                                    <FormattedMessage id={category} />
                                )
                            ) : null}
                        </h3>
                    </div>
                </div>
                {!currentItems ? (
                    <div className="w-full  mt-[40vh] flex justify-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="mt-20 mb-44 text-center w-full">
                        <div className="flex flex-row w-full">
                            {/* <div className="w-1/5"></div> */}
                            <div className="w-11/12 xl:w-11/12 flex flex-col mx-auto">
                                <div className="w-full grid  xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8">
                                    {currentItems.map((product) => (
                                        <ProductCard
                                            key={product.name}
                                            language={language}
                                            type={type}
                                            id={id}
                                            product={product}
                                        />
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <Stack spacing={2} mt={4}>
                                        <Pagination
                                            shape="rounded"
                                            count={
                                                products &&
                                                Math.ceil(products.length / itemsPerPage)
                                            }
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </IntlProvider>
    );
};

export default ProductPage;
