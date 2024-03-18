import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import MySlider from "../components/Slider";
import { fetchNewsData } from "../utils/contentful";
import { Card, CardContent, Typography, CardMedia, CardActionArea, Button } from "@mui/material";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import NewsCard from "../components/NewsCard";

const NewsPage = () => {
    const navigate = useNavigate();
    let { language } = useParams();

    const [newsData, setNewsData] = useState([]);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    useEffect(() => {
        const fetchData = async () => {
            setNewsData(await fetchNewsData());
        };

        fetchData();
    }, []);

    return (
        <div className="h-fit min-h-[100vh] pt-16 bg-bgMain">
            {/* content */}
            <div className="h-fit w-11/12 md:w-5/6 xl:w-2/3 mx-auto  mt-20 pb-[20vh] ">
                {newsData.length > 0 && (
                    <div className="flex flex-row  flex-wrap ">
                        {newsData.map((news, index) => (
                            <div className=" sm:w-1/2 lg:w-1/3 p-2" key={index}>
                                <div className="py-1 px-2">
                                    <NewsCard
                                        key={news.field.newsText}
                                        item={news.field}
                                        language={language}
                                        style={{ paddingLeft: "10px", paddingRight: "10px" }}
                                    />
                                </div>
                                {/* <Card className="h-[380px]  p-4 mx-1 bg-secondary pb-8">
                                    {item.field.newsImages && item.field.newsImages.length > 0 && (
                                        <CardActionArea>
                                            <Link to={`/${language}/newspost/${item.newsTitle}`}>
                                                <CardMedia
                                                    component="img"
                                                    image={item.field.newsImages[0].fields.file.url}
                                                    style={{
                                                        // maxHeight: 250,
                                                        height: "200px",
                                                        width: "100%",
                                                        objectFit: "cover",
                                                        display: "block",
                                                        margin: "auto",
                                                    }}
                                                    alt="News Photo"
                                                />
                                            </Link>
                                        </CardActionArea>
                                    )}
                                    <CardContent className="h-[140px] overflow-hidden ">
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            className="text-center h-[90px] mb-8"
                                        >
                                            {item.field.newsTitle}
                                        </Typography>

                                        <Link to={`/${language}/newspost/${item.newsTitle}`}>
                                            <Button size="large" color="primary">
                                                See More
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card> */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;
