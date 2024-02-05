import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProductCard = ({ language, product }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link
                to={`/${language}/product/${product.name}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={product.image.fields.file.url}
                        alt={product.name}
                        height="auto"
                        className="h-60"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.category}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};

export default ProductCard;
