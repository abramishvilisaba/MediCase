import React from "react";
import aboutUsImage from "../media/cover.jpg";
import { useNavigate, useParams, Link } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();
    let { language } = useParams();
    const handleViewProducts = () => {
        navigate(`/${language}/products/all`);
    };
    return (
        // <div className="flex flex-col items-center mx-auto pb-[30vh] tall:pb-0 lg:pb-[30vh] w-full h-fit min-h-[200vh]  sm:min-h-[220vh] md:min-h-[220vh] lg:min-h-[100vh] ">
        <div className="flex flex-col items-center mx-auto pb-[30vh] tall:pb-[30vh] lg:pb-[30vh] w-full h-fit min-h-[100vh]  ">
            {/* Nav */}
            <div className=" w-full h-32 md:h-40 pt-[88px] md:pt-[102px] bg-[#4d5b7c] ">
                <div className="w-full h-full ">
                    <div className=" w-full flex flex-col h-full text-gray-200 ">
                        <div className=" text-left text-lg  md:text-xl ml-6 md:ml-[68px]">
                            <Link to={`/${language}`} className="font-semibold hover:underline">
                                <span>Home</span>
                            </Link>
                            <span> &gt; </span>
                            <span>About Us</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Nav */}
            {/* content */}
            <div className="flex flex-col lg:flex-row w-5/6 md:w-2/3 pt-16 gap-8">
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <img src={aboutUsImage} alt="About Us" className="w-full h-auto  rounded-lg " />
                </div>
                <div className="text-center flex flex-col justify-between lg:text-left">
                    <title>About Us</title>
                    <h1 className="text-2xl font-semibold mb-4">About Us</h1>
                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ex vel
                        urna pretium imperdiet. Duis dignissim libero sed dolor condimentum. Nullam
                        in ex vel urna pretium imperdiet.Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                    </p>
                    <p className="text-lg mb-4">
                        Curabitur fermentum, quam vel egestas vestibulum, purus sapien tincidunt
                        augue, id rutrum purus mi nec libero. Integer vitae est sed justo congue
                        eleifend.
                    </p>

                    <button
                        onClick={handleViewProducts}
                        className="bg-[#3A587E] mx-auto lg:mx-0 hover:bg-[#577FB2] w-fit break-keep text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        View Products
                    </button>
                </div>
            </div>
            {/* content */}
            <div className="flex flex-col lg:flex-row w-5/6 md:w-2/3 pt-8 lg:pt-12 gap-8 ">
                <div className="text-center flex flex-col justify-between lg:text-left">
                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ex vel
                        urna pretium imperdiet. Duis dignissim libero sed dolor condimentum. Nullam
                        in ex vel urna pretium imperdiet.Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                    </p>
                    <p className="text-lg mb-4">
                        Curabitur fermentum, quam vel egestas vestibulum, purus sapien tincidunt
                        augue, id rutrum purus mi nec libero. Integer vitae est sed justo congue
                        eleifend.
                    </p>

                    {/* <button
                        onClick={handleViewProducts}
                        className="bg-[#3A587E] mx-auto lg:mx-0 hover:bg-[#577FB2] w-fit break-keep text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        View Products
                    </button> */}
                </div>
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <img src={aboutUsImage} alt="About Us" className="w-full h-auto  rounded-lg " />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;