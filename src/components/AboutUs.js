import React from "react";
import aboutUsImage from "../media/cover.jpg";
import { useNavigate } from "react-router-dom";

const AboutUs = ({ language }) => {
    const navigate = useNavigate();
    const handleViewProducts = () => {
        navigate(`/${language}/products/all`);
    };
    return (
        <div className="flex flex-col lg:flex-row items-center mx-5 lg:mx-40 xl:mx-64 p-5 lg:p-10 xl:p-20">
            <div className="flex-shrink-0 mb-5 lg:mb-0 lg:mr-10">
                <img
                    src={aboutUsImage}
                    alt="About Us"
                    className="w-full lg:w-80 rounded-lg max-h-80"
                />
            </div>

            <div className="text-center lg:text-left">
                <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                <p className="text-lg mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ex vel urna
                    pretium imperdiet. Duis dignissim libero sed dolor condimentum.
                </p>
                <p className="text-lg mb-4">
                    Curabitur fermentum, quam vel egestas vestibulum, purus sapien tincidunt augue,
                    id rutrum purus mi nec libero. Integer vitae est sed justo congue eleifend.
                </p>

                <button
                    onClick={handleViewProducts}
                    className="bg-[#3A587E] hover:bg-[#577FB2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    View Products
                </button>
            </div>
        </div>
    );
};

export default AboutUs;
