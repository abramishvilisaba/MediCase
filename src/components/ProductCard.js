import * as React from "react";
import { Link } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import "./ProductCard.css";

const ProductCard = ({ language, type, id, product }) => {
    return (
        <Link
            to={`/${language}/${id}/product/${product.name}`}
            // style={{ textDecoration: "none", color: "inherit" }}
        >
            <div className="rounded-0 bg-[#EEEEEE] product-card">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={product.images[0].fields.file.url}
                        alt={product.name}
                        height="auto"
                        className="w-1/2 h-52 mt-12 mb-8 object-contain aspect-square mx-auto"
                        sx={{ objectFit: "contain", width: "65%" }}
                    />

                    <div className="mt-4 px-4">
                        <p className="h-[32px] text-lg font-medium text-center overflow-hidden">
                            {product["name" + language] || product.name}
                        </p>
                        {/* <Typography
                            className="h-6 text-center overflow-hidden"
                            variant="body1"
                            color="text.secondary"
                        >
                            {product.category}
                        </Typography> */}
                        <div
                            className="h-[252px] xs:h-[232px] md:h-[232px] lg:h-[232px]  mb-4 overflow-hidden overflow-y-hidden"
                            style={{ wordWrap: "break-word" }}
                        >
                            <ReactMarkdown
                                remarkPlugins={[gfm]}
                                className={"markdown leading-5 h-full"}
                            >
                                {product["description" + language]}
                            </ReactMarkdown>
                        </div>
                    </div>
                </CardActionArea>
            </div>
        </Link>
    );
};

export default ProductCard;
