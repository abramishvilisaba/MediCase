import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchNewsItemByTitle } from "../utils/contentful";
import CircularProgress from "@mui/material/CircularProgress";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Newspost = () => {
    const { language, itemId } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    const decodedTitle = decodeURIComponent(itemId);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const itemDetails = await fetchNewsItemByTitle(decodedTitle);
                setNewsItem(itemDetails);
            } catch (error) {
                console.error("Error fetching news item details:", error);
            }
        };
        fetchDetails();
    }, [decodedTitle]);

    return (
        <div className="min-h-screen w-full bg-slate-100 flex flex-col pb-[60vh]  font-roboto-slab ">
            {newsItem ? (
                <div>
                    <div className=" w-full h-32 md:h-40 pt-[88px] md:pt-[102px] bg-[#626B7F] ">
                        <div className="w-full h-full ">
                            <div className=" w-full flex flex-col h-full text-gray-200 ">
                                <div className=" text-left text-lg  md:text-xl ml-6 md:ml-[68px]">
                                    <Link
                                        to={`/${language}`}
                                        className="font-semibold hover:underline"
                                    >
                                        <span>Home</span>
                                    </Link>
                                    <span> &gt; {newsItem.newsTitle}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow flex mt-8 mx-auto justify-center items-center   ">
                        <div className=" max-w-3xl w-full p-4">
                            <h2 className="text-center text-3xl font-bold mb-4">
                                {newsItem.newsTitle}
                            </h2>
                            <div>
                                {newsItem.newsImages && newsItem.newsImages.length > 0 ? (
                                    <Carousel
                                        selectedItem={selectedPhotoIndex}
                                        onChange={(index) => setSelectedPhotoIndex(index)}
                                        showArrows={true}
                                        thumbWidth={150}
                                        swipeScrollTolerance={10}
                                        autoPlay={true}
                                        interval={3000}
                                        swipeable={true}
                                        showStatus={false}
                                    >
                                        {newsItem.newsImages.map((photo, index) => (
                                            <div key={index}>
                                                <img
                                                    src={photo.fields.file.url}
                                                    alt={`img ${index + 1}`}
                                                    className="max-w-full h-auto"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : null}
                            </div>
                            <ReactMarkdown remarkPlugins={[gfm]} className={"markdown text-lg"}>
                                {newsItem.newsText}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center flex-grow">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};

export default Newspost;
