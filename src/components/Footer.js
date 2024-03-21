import React, { useState, useEffect } from "react";
import logoImage from "../media/logo.png";
import { useLocation, useParams, Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    const [footerHeight, setFooterHeight] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const location = useLocation();
    const { language } = useParams();

    useEffect(() => {
        let firstLoad = true;

        const handleScroll = () => {
            if (firstLoad) {
                firstLoad = false;
                return;
            }

            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const footerThreshold = documentHeight - windowHeight - 400;
            const maxFooterHeight = 1200;

            const newFooterHeight = Math.min(
                Math.max(
                    ((scrollPosition - footerThreshold) / (documentHeight - footerThreshold)) *
                        maxFooterHeight,
                    0
                ),
                maxFooterHeight
            );

            if (footerThreshold < 0) {
                setFooterHeight(0);
            } else if (footerThreshold > 0) {
                setFooterHeight(newFooterHeight);
                setShowContent(newFooterHeight > 150);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <footer
            className="fixed bottom-0 w-full max-h-[340px] max-sm:max-h-72 bg-nav flex flex-col justify-start items-center text-white text-lg"
            style={{ height: `${footerHeight}px` }}
        >
            <div
                className={`h-3/4 min-h-[0px]  flex flex-row items-start overflow-hidden text-md  `}
            >
                <div
                    className={`pt-8 w-28 flex flex-col items-end    ${
                        showContent ? "opacity-100" : "hidden"
                    }`}
                >
                    <div className="w-full flex justify-end mb-2">
                        <a
                            href="https://www.facebook.com/profile.php?id=100057621032112"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit h-fit flex text-white hover:text-white bg-nav hover:bg-gray-500 p-2 rounded-full mt-2"
                        >
                            <FaFacebook size={32} />
                        </a>
                    </div>
                    <Link to={`/${language}/products/all`}>
                        <span className="text-white  hover:text-slate-500 hover:font-semibold">
                            Products
                        </span>
                    </Link>
                    <Link to={`/${language}/contactus`}>
                        <span className="text-white  hover:text-slate-500 hover:font-semibold">
                            Contact Us
                        </span>
                    </Link>
                </div>

                <div className="mt-2 w-[2px] bg-white h-full mx-6"></div>
                <div
                    className={`pt-8 w-28 pl-2 flex flex-col items-start ${
                        showContent ? "opacity-100" : "hidden"
                    }`}
                >
                    <div className="w-full flex justify-start mb-2">
                        <a
                            href="https://www.instagram.com/medicasegeorgia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit h-fit flex text-white hover:text-white bg-nav hover:bg-gray-500 p-2 rounded-full mt-2"
                        >
                            <FaInstagram size={32} />
                        </a>
                    </div>
                    <Link to={`/${language}/news`}>
                        <span className="text-white  hover:text-slate-500 hover:font-semibold">
                            News
                        </span>
                    </Link>
                    <Link to={`/${language}/aboutUs`}>
                        <span className="text-white  hover:text-slate-500 hover:font-semibold">
                            About Us
                        </span>
                    </Link>
                </div>
            </div>
            <div className=" mt-2   border-2 rounded-3xl">
                <img src={logoImage} alt="Logo" className="h-12 my-1 mx-2 " />
            </div>
            <div className="mb-6 mt-2 flex flex-col  text-center text-lg ">
                <a
                    href="tel:+995595881010"
                    className="text-white  hover:text-slate-500 hover:font-semibold "
                >
                    +995 595 88 10 10
                </a>
                <a
                    href="mailto:medicase@gmail.com"
                    className="text-white hover:text-slate-500 hover:font-semibold"
                >
                    medicase@gmail.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
