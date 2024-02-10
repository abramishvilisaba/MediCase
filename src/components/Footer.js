import React, { useState, useEffect } from "react";
import logoImage from "../media/logo.png";

const Footer = () => {
    const [footerHeight, setFooterHeight] = useState(0);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const footerThreshold = documentHeight - windowHeight - 400;
            const maxFooterHeight = 1400;

            const newFooterHeight = Math.min(
                Math.max(
                    ((scrollPosition - footerThreshold) / (documentHeight - footerThreshold)) *
                        maxFooterHeight,
                    0
                ),
                maxFooterHeight
            );

            setFooterHeight(newFooterHeight);
            setShowContent(newFooterHeight > 150);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <footer
            className="fixed bottom-0 w-full max-sm:max-h-72 bg-[#626B7F] flex flex-col justify-start items-center text-white font-roboto-slab"
            style={{ height: `${footerHeight}px` }}
        >
            <div
                className={`h-3/4 min-h-[0px]  flex flex-row items-start overflow-hidden text-md font-normal `}
            >
                <div
                    className={`pt-8 w-28 flex flex-col ${showContent ? "opacity-100" : "hidden"}`}
                >
                    <span className="">Products</span>
                    <span className="">Our Services</span>
                </div>
                <div className="mt-2 w-[2px] bg-white h-full mx-6"></div>
                <div
                    className={`pt-8 w-28 pl-2 flex flex-col ${
                        showContent ? "opacity-100" : "hidden"
                    }`}
                >
                    <span className="">Contact Us</span>
                    <span className="">About Us</span>
                </div>
            </div>
            <div className="mb-6 mt-2   border-2 rounded-3xl">
                <img src={logoImage} alt="Logo" className="h-12 m-2 " />
            </div>
        </footer>
    );
};

export default Footer;
