import React from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomCarousel = ({ children, maxItems = 4 }) => {
    return (
        <MultiCarousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
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
                    items: 3,
                },
                tablet: {
                    breakpoint: {
                        max: 900,
                        min: 600,
                    },
                    items: 2,
                },
                mobile: {
                    breakpoint: {
                        max: 600,
                        min: 0,
                    },
                    items: 1,
                },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {children}
        </MultiCarousel>
    );
};

export default CustomCarousel;
