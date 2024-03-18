import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import { Link } from "react-router-dom";

// const NextArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//         <Button
//             className={`${className} right-[-30px] custom-arrow`}
//             style={style}
//             onClick={onClick}
//         >
//             &#8594;
//         </Button>
//     );
// };

// const PrevArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//         <Button
//             className={`${className} left-[-30px] custom-arrow`}
//             style={style}
//             onClick={onClick}
//         >
//             &#8592;
//         </Button>
//     );
// };

const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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

const MySlider = ({ language, newsData }) => {
    return (
        <div className="p-0">
            <Slider {...sliderSettings}>
                {newsData.map((item, index) => (
                    <div key={index}>
                        <Card
                            className="h-fit p-0 mx-2  "
                            // sx={{ backgroundColor: "rgb(248 250 252)" }}
                            sx={{ backgroundColor: " rgb(238 238 238 )" }}
                        >
                            {item.field.newsImages && item.field.newsImages.length > 0 && (
                                <CardMedia
                                    component="img"
                                    image={item.field.newsImages[0].fields.file.url}
                                    style={{
                                        height: "250px",
                                        width: "100%",
                                        objectFit: "cover",
                                        margin: "auto",
                                    }}
                                    alt="News Photo"
                                />
                            )}
                            <div className="h-[150px]  px-4 pt-4 pb-2  overflow-hidden flex flex-col justify-between ">
                                <h3 className="text-center font-FiraGO text-2xl font-medium">
                                    {item.field.newsTitle}
                                </h3>
                                {/* <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="h-36 overflow-hidden"
                                >
                                    {item.field.newsText}
                                </Typography> */}
                                <Link to={`/${language}/newspost/${item.newsTitle}`}>
                                    <Button size="large" color="primary">
                                        See More
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MySlider;
