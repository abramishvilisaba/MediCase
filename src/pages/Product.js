import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import backgroundImage from "../images/cover2.jpg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchProducts } from "../utils/contentful";

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
        // window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-f2f2f2 p-0 flex flex-col items-center mb-20 box-border">
            <div
                className="bg-cover bg-center w-full h-96 relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <Navbar />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                    <h3 className="text-3xl font-bold mb-4">{category}</h3>
                </div>
            </div>
            {!currentItems ? (
                <CircularProgress />
            ) : (
                <div className="mt-20 mb-44 text-center w-full">
                    <div className="flex flex-row w-full">
                        <div className="w-1/5"></div>
                        <div className="w-3/5 flex flex-col">
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {currentItems.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        language={language}
                                        product={product}
                                        onClick={() => navigate("/")}
                                    />
                                ))}
                            </div>

                            <div className="mt-8">
                                <Stack spacing={2} mt={4}>
                                    <Pagination
                                        shape="rounded"
                                        count={
                                            products && Math.ceil(products.length / itemsPerPage)
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
    );
};

export default ProductPage;
