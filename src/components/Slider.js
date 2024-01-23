import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, Button } from "@mui/material";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Button
            className={`${className} right-[-30px] custom-arrow`}
            style={style}
            onClick={onClick}
        >
            &#8594;
        </Button>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Button
            className={`${className} left-[-30px] custom-arrow`}
            style={style}
            onClick={onClick}
        >
            &#8592;
        </Button>
    );
};

const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    centerPadding: "50px",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerPadding: "30px",
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: "20px",
            },
        },
    ],
};

const MySlider = ({ data }) => {
    return (
        <div className="p-20 ">
            <Slider {...sliderSettings}>
                {data.map((item, index) => (
                    <div key={index}>
                        <Card className="h-[400px] p-4 mx-1   bg-secondary">
                            <CardContent>
                                <Typography variant="h6">{item.newsTitle}</Typography>
                                <Typography variant="body2">{item.newsText}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MySlider;
