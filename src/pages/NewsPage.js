import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MySlider from "../components/Slider";
import { fetchNewsData } from "../utils/contentful";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

const NewsPage = () => {
    const navigate = useNavigate();
    let { language } = useParams();

    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setNewsData(await fetchNewsData());
        };

        fetchData();
    }, []);

    return (
        <div className="h-fit min-h-[100vh]">
            {/* Nav */}
            <div className=" w-full h-32 md:h-40 pt-[88px] md:pt-[102px] bg-[#4d5b7c] ">
                <div className="w-full h-full ">
                    <div className=" w-full flex flex-col h-full text-gray-200 ">
                        <div className=" text-left text-lg  md:text-xl ml-6 md:ml-[68px]">
                            <Link to={`/${language}`} className="font-semibold hover:underline">
                                <span>Home</span>
                            </Link>
                            <span> &gt; </span>
                            <span>News</span>
                            <title>News</title>
                        </div>
                    </div>
                </div>
            </div>
            {/* Nav */}
            {/* content */}
            <div className="h-fit w-11/12 md:w-5/6 xl:w-2/3 mx-auto mt-20 pb-[60vh] ">
                {newsData.length > 0 && (
                    <div className="flex flex-row  flex-wrap ">
                        {newsData.map((item, index) => (
                            <div className=" sm:w-1/2 lg:w-1/3 p-2" key={index}>
                                <Card className="h-[500px]  p-4 mx-1 bg-secondary">
                                    {item.field.newsImages && item.field.newsImages.length > 0 && (
                                        <CardMedia
                                            component="img"
                                            image={item.field.newsImages[0].fields.file.url}
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
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;
