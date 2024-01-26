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

const MySlider = ({ language, data }) => {
    return (
        <div className="p-20">
            <Slider {...sliderSettings}>
                {data.map((item, index) => (
                    <div key={index}>
                        <Card className="h-[500px] p-4 mx-1 bg-secondary">
                            {item.field.newsPhotos && item.field.newsPhotos.length > 0 && (
                                <CardMedia
                                    component="img"
                                    image={item.field.newsPhotos[0].fields.file.url}
                                    style={{
                                        maxHeight: 250,
                                        width: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        margin: "auto",
                                    }}
                                    alt="News Photo"
                                />
                            )}
                            <CardContent className="max-h-[300px] overflow-hidden">
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.field.newsTitle}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="h-36 overflow-hidden"
                                >
                                    {item.field.newsText}
                                </Typography>
                                <Link to={`/${language}/newspost/${item.newsTitle}`}>
                                    <Button size="small" color="primary">
                                        See More
                                    </Button>{" "}
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MySlider;
