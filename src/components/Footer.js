import React, { useState, useEffect } from "react";

const Footer = () => {
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const footerThreshold = documentHeight - windowHeight - 400;
            const maxFooterHeight = 400;

            const newFooterHeight = Math.min(
                Math.max(
                    ((scrollPosition - footerThreshold) / (documentHeight - footerThreshold)) *
                        maxFooterHeight,
                    0
                ),
                maxFooterHeight
            );

            setFooterHeight(newFooterHeight);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <footer
            className="fixed bottom-0 w-full  bg-slate-300"
            style={{ height: `${footerHeight}px` }}
        >
            Footer
        </footer>
    );
};

export default Footer;
