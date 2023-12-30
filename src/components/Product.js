import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent, Typography, Container, Grid, styled } from "@mui/material";
import { tempProductsList } from "./tempProductsList";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
const contentful = require("contentful");

const ProductPage = () => {
    const location = useLocation();
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const categoryParam = useParams();

    const contentfulSpace = process.env.REACT_APP_CONTENTFUL_SPACE;
    const contentfulAccessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;
    const client = contentful.createClient({
        space: contentfulSpace,
        accessToken: contentfulAccessToken,
    });

    // console.log(category)

    const fetchProducts = async () => {
        try {
            console.log(category);

            const response = await client.getEntries({
                content_type: "product",
                order: "-sys.createdAt",
                "fields.category": category,
            });
            const fields = response.items.map((item) => {
                const field = item.fields;
                return {
                    ...item.fields,
                    field,
                };
            });
            console.log("Products :", fields);
            setProducts(fields);
        } catch (error) {
            console.log("Error fetching news data:", error);
        }
    };

    useEffect(() => {
        if (categoryParam) {
            if (categoryParam.id) {
                setCategory(categoryParam.id);
            }
        }
    }, [location]);

    useEffect(() => {
        fetchProducts();
    }, [category]);

    // useEffect(() => {
    //     setProducts(tempProductsList);
    // }, [category]);

    return (
        <StyledContainer maxWidth="lg">
            <Navbar />
            <Typography variant="h3" className="title" sx={{ mt: "100px", mb: "44px" }}>
                {category}
            </Typography>
            <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 8, sm: 8, md: 12 }}
                // justifyContent="center"
                sx={{ px: "40px" }}
            >
                {products.map((product) => (
                    <Grid
                        item
                        xs={8}
                        sm={4}
                        md={4}
                        key={product.id}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <ProductCard product={product} />
                        {/* <StyledCard>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography color="text.secondary">{product.brand}</Typography>
                                <Typography variant="body2" component="p">
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </StyledCard> */}
                    </Grid>
                ))}
            </Grid>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: "100vh",
    background: "#f2f2f2",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    boxSizing: "border-box",
}));

const StyledCard = styled(Card)(({ theme }) => ({
    width: 300,
    height: "200px",
    marginBottom: "20px",
    backgroundColor: "#fff", // Set your preferred background color
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Customize shadow as needed
}));

export default ProductPage;
