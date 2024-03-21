import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../utils/contentful";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q");
    const { language } = useParams();

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 0);
    }, [location.pathname]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const results = await searchProducts(searchQuery);
                setSearchResults(results || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    return (
        <div className="min-h-[120vh] bg-f2f2f2 p-0 flex flex-col items-center justify-start">
            {loading ? (
                <CircularProgress />
            ) : (
                <div className="w-full flex flex-col">
                    <div className="mt-28 pt-16 mb-4 text-center w-full">
                        <h2 className="text-3xl font-semibold">
                            Search Results for: "{searchQuery}"
                        </h2>
                    </div>
                    <div className="mt-4 mb-44 text-xl text-center w-full">
                        {searchResults && searchResults.length === 0 ? (
                            <p>No search results found.</p>
                        ) : (
                            <div className="w-11/12 min-h-screen pb-[0vh] flex flex-col mx-auto">
                                <div className="w-full grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {searchResults.map((product, index) => (
                                        <ProductCard
                                            key={index}
                                            language={language}
                                            type={"search"}
                                            id={product.name}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-[300px] sm:mt-[300px] bg-bgLight">
                        <Footer />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
