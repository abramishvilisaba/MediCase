import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsItemByTitle } from "../utils/contentful";
import CircularProgress from "@mui/material/CircularProgress";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MAX_VISIBLE_THUMBNAILS = 5; // Adjust the number of visible thumbnails as needed

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
                // Handle the error (e.g., display an error message)
            }
        };
        fetchDetails();
    }, [decodedTitle]);

    return (
        <div className="flex flex-col items-center">
            {newsItem ? (
                <div className="text-center max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">{newsItem.newsTitle}</h2>
                    <div>
                        {newsItem.newsPhotos && newsItem.newsPhotos.length > 0 ? (
                            <Carousel
                                selectedItem={selectedPhotoIndex}
                                onChange={(index) => setSelectedPhotoIndex(index)}
                                showArrows={true}
                                thumbWidth={100}
                                swipeScrollTolerance={10}
                                autoPlay={true}
                                interval={3000}
                                swipeable={true}
                            >
                                {newsItem.newsPhotos.map((photo, index) => (
                                    <div key={index}>
                                        <img src={photo.fields.file.url} alt={` ${index + 1}`} />
                                    </div>
                                ))}
                            </Carousel>
                        ) : null}
                    </div>
                    <p className="text-lg">{newsItem.newsText}</p>
                    {/* Display other details as needed */}
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};

export default Newspost;
