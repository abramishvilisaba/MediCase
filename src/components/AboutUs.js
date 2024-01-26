import React from "react";
import aboutUsImage from "../images/cover2.jpg";
import { useNavigate } from "react-router-dom";

const AboutUs = ({ language }) => {
    const navigate = useNavigate();
    const handleViewProducts = () => {
        navigate(`/${language}/products/all`);
    };
    return (
        <div className="flex flex-row items-center mx-40 p-10">
            {/* Left section with the image */}
            <div className="flex-shrink-0 mr-10">
                <img src={aboutUsImage} alt="About Us" className="w-80  rounded-lg" />
            </div>

            {/* Right section with the content */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                <p className="text-lg mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ex vel urna
                    pretium imperdiet. Duis dignissim libero sed dolor condimentum, vitae
                    consectetur elit commodo. Vestibulum ...
                </p>
                <p className="text-lg mb-4">
                    Curabitur fermentum, quam vel egestas vestibulum, purus sapien tincidunt augue,
                    id rutrum purus mi nec libero. Integer vitae est sed justo congue eleifend.
                </p>
                <p className="text-lg mb-4">
                    Fusce suscipit diam sed metus luctus, ac posuere ex cursus. Phasellus id
                    fermentum eros, nec luctus sem.
                </p>
                <button
                    onClick={handleViewProducts}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    View Products
                </button>
            </div>
        </div>
    );
};

export default AboutUs;
