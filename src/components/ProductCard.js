import * as React from "react";
import { Link } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProductCard = ({ language, product }) => {
    return (
        <Link
            to={`/${language}/product/${product.name}`}
            // style={{ textDecoration: "none", color: "inherit" }}
        >
            <div className="rounded-xl">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={product.images[0].fields.file.url}
                        alt={product.name}
                        height="auto"
                        className="w-full h-72 object-contain aspect-square"
                        sx={{ objectFit: "contain" }}
                    />

                    <div className="mt-4 px-4">
                        <Typography
                            className="h-6 text-left overflow-hidden"
                            variant="body1"
                            color="text.secondary"
                        >
                            {product.category}
                        </Typography>
                        <Typography
                            className="h-[68px] mb-1 text-left overflow-hidden"
                            variant="h6"
                            component="div"
                        >
                            {product["name" + language] || product.name}
                        </Typography>
                    </div>
                </CardActionArea>
            </div>
        </Link>
    );
};

export default ProductCard;
