import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import backgroundImage from "../images/cover2.jpg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const contentful = require("contentful");

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, page } = useParams();
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);

    const currentPage = page ? parseInt(page, 10) : 1;

    const contentfulSpace = process.env.REACT_APP_CONTENTFUL_SPACE;
    const contentfulAccessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;
    const client = contentful.createClient({
        space: contentfulSpace,
        accessToken: contentfulAccessToken,
    });

    const fetchProducts = async () => {
        try {
            if (category) {
                const response = await client.getEntries({
                    content_type: "product",
                    order: "-sys.createdAt",
                    "fields.category": category,
                });
                console.log(response);
                const fields = response.items.map((item) => ({
                    ...item.fields,
                    field: item.fields,
                }));
                if (fields && fields.length > 0) {
                    setProducts(fields);
                }
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            setCategory(id);
        }
    }, [location]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    useEffect(() => {
        if (category) {
            fetchProducts();
        }
    }, [category]);

    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        navigate(`/products/${category}/${value}`);
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
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            <div className="mt-8">
                                <Stack spacing={2} mt={4}>
                                    <Pagination
                                        shape="rounded"
                                        count={Math.ceil(products.length / itemsPerPage)}
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
