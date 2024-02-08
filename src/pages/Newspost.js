import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsItemByTitle } from "../utils/contentful";
import CircularProgress from "@mui/material/CircularProgress";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Newspost = () => {
    const { itemId } = useParams();
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
        <div className="min-h-screen w-full flex flex-col mt-[10vh] mb-[10vh]">
            <div className="flex-grow flex  mx-auto justify-center items-center">
                {newsItem ? (
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
                ) : (
                    <div className="flex justify-center items-center flex-grow">
                        <CircularProgress />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Newspost;
