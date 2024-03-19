import React from "react";
import { Link } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

const BrandCard = ({ language, brand }) => {
    console.log(brand);
    return (
        <Link to={`/${language}/brands/${brand.title}`}>
            <div className=" w-fit h-fit aspect-square  bg-[#EEEEEE] brand-card flex  justify-center rounded-full  ">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={brand.file.url}
                        alt={brand.name}
                        className="w-1/2  mt-12 mb-8 object-contain aspect-square mx-auto  "
                        sx={{ objectFit: "contain", width: "65%" }}
                    />
                </CardActionArea>
            </div>
        </Link>
    );
};

export default BrandCard;
