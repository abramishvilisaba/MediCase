import React from "react";
import { Card, CardContent, Box, Typography, CardMedia, styled } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "300px", // Adjust the max-width as needed
    [theme.breakpoints.up("sm")]: {
        maxWidth: "400px",
    },
    [theme.breakpoints.up("md")]: {
        maxWidth: "600px",
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth: "800px",
    },
}));

const ProductCard = ({ product }) => {
    // console.log(product.image.fields.file.url);

    return (
        <StyledCard>
            {/* Picture */}

            {product.image && (
                <Box bgcolor="#f5f5f5">
                    <CardMedia
                        height="300"
                        component="img"
                        image={product.image.fields.file.url}
                        alt={product.name}
                    />
                </Box>
            )}

            {/* Product Category */}
            <Box sx={{ height: "80px", p: "20px", alignSelf: "start" }}>
                <Typography variant="subtitle1" alignSelf={"start"}>
                    {product.category}
                </Typography>
                {/* Product Name */}
                <Typography variant="h5" alignSelf={"start"}>
                    {product.name}
                </Typography>
            </Box>
            {/* Brand */}
            {/* <Typography color="text.secondary">{product.brand}</Typography> */}
            {/* Description */}
            {/* <Typography variant="body2" component="p">
                {product.description}
            </Typography> */}
        </StyledCard>
    );
};

export default ProductCard;
