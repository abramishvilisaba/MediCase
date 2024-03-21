import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchNewsItemByTitle } from "../utils/contentful";
import CircularProgress from "@mui/material/CircularProgress";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Footer from "../components/Footer";

const Newspost = () => {
    const { language, itemId } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    const decodedTitle = decodeURIComponent(itemId);
    const location = useLocation();

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

    // useEffect(() => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // }, [location.pathname]);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 0);
    }, [location.pathname]);
    return (
        <div className="min-h-screen w-full bg-slate-100 flex flex-col pb-[20vh] pt-16  ">
            {newsItem ? (
                <div>
                    <div className="flex-grow flex mt-8 mx-auto justify-center items-center   ">
                        <div className=" max-w-3xl w-full p-4">
                            <h2 className="text-center text-3xl font-bold my-8">
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
                                        showThumbs={newsItem.newsImages.length > 1 ? true : false}
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
                            <ReactMarkdown
                                remarkPlugins={[gfm]}
                                className={"markdown text-lg shadow-2xl rounded-xl p-2 mt-2"}
                            >
                                {newsItem.newsText}
                            </ReactMarkdown>
                        </div>
                    </div>
                    <div className="mt-[300px] sm:mt-[300px] bg-bgLight">
                        <Footer />
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
