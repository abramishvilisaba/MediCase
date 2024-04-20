import React from "react";
import MultiCarousel from "react-multi-carousel";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import "react-multi-carousel/lib/styles.css";
import "./CustomCarousel.css";

const CustomCarousel = ({ children, maxItems = 4 }) => {
    const CustomLeftArrow = ({ onClick }) => {
        return (
            <button
                className="absolute top-[52%] transform -translate-y-1/2 left-4 bg-transparent border-none cursor-pointer z-10"
                onClick={onClick}
            >
                <RiArrowLeftSLine className="w-10 h-10" />
            </button>
        );
    };

    const CustomRightArrow = ({ onClick }) => {
        return (
            <button
                className="absolute top-[52%]  transform -translate-y-1/2 right-4 bg-transparent border-none cursor-pointer z-10"
                onClick={onClick}
            >
                <RiArrowRightSLine className="w-10 h-10" />
            </button>
        );
    };

    return (
        <MultiCarousel
            additionalTransfrom={0}
            arrows
            centerMode={false}
            draggable
            focusOnSelect={false}
            infinite
            itemClass="MultiCarousel"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1400,
                    },
                    items: maxItems,
                },
                laptop: {
                    breakpoint: {
                        max: 1400,
                        min: 900,
                    },
                    items: 4,
                },
                tablet: {
                    breakpoint: {
                        max: 900,
                        min: 600,
                    },
                    items: 3,
                },
                mobile: {
                    breakpoint: {
                        max: 600,
                        min: 0,
                    },
                    items: 2,
                },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
        >
            {children}
        </MultiCarousel>
    );
};

export default CustomCarousel;
