import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const NewsCard = ({ language, item }) => {
    return (
        <div className="h-fit p-0 mx-2 bg-bgLight">
            {item.newsImages && item.newsImages.length > 0 && (
                <CardMedia
                    component="img"
                    image={item.newsImages[0].fields.file.url}
                    style={{
                        height: "250px",
                        width: "100%",
                        objectFit: "cover",
                        margin: "auto",
                    }}
                    alt="News Photo"
                />
            )}
            <div className="h-[160px] px-4 pt-4 pb-2 overflow-hidden flex flex-col justify-between">
                <h3 className="text-center  text-2xl font-medium h-80 overflow-hidden">
                    {item.newsTitle}
                </h3>
                <Link to={`/${language}/newspost/${item.newsTitle}`}>
                    <Button size="large" color="primary">
                        See More
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;
