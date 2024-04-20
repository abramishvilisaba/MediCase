import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";

import Footer from "../components/Footer";

const MapContainer = () => {
    const mapStyles = {
        height: "500px",
        width: "100%",
    };

    const defaultCenter = {
        lat: 41.70894241333008,
        lng: 44.762630462646484,
    };

    const googleMapsApiKey = process.env.REACT_APP_MAP_API_KEY;

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={16} center={defaultCenter}>
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

const ContactUs = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 0);
    }, [location.pathname]);

    return (
        <div className="w-full bg-bgMain overflow-x-hidden">
            <div className="w-5/6 md:w-2/3 mx-auto pt-32   h-[140vh] font-Montserrat overflow-hidden">
                <h1 className="text-4xl text-center font-bold mb-4">Contact Us</h1>
                <div className="flex flex-col items-center text-lg mt-12">
                    <div className="mb-4 flex items-center">
                        <a
                            href="tel:+995595881010"
                            className="text-black hover:text-slate-800 font-medium hover:font-semibold flex items-center"
                        >
                            <FaPhoneAlt size={20} className="mr-2" />
                            <span>+995 595 88 10 10</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a
                            href="mailto:medicase@gmail.com"
                            className="text-black hover:text-slate-800 font-medium hover:font-semibold flex items-center"
                        >
                            <FaEnvelope size={20} className="mr-2" />
                            <span>medicase@gmail.com</span>
                        </a>
                    </div>

                    <div className="flex justify-center mt-2 ">
                        <a
                            href="https://www.instagram.com/medicasegeorgia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit h-fit flex text-[#DD2A7B] hover:text-rose-700 hover:bg-slate-200  p-2 rounded-full mt-2"
                        >
                            <FaInstagram size={40} />
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=100057621032112"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit h-fit flex text-blue-800 hover:text-blue-900 hover:bg-slate-200  p-2 rounded-full mt-2 ml-4"
                        >
                            <FaFacebook size={40} />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="mt-8 mb-4 md:mr-8 w-full h-full bg-slate-100">
                        <MapContainer />
                    </div>
                </div>
            </div>
            <div className="mt-[300px] sm:mt-[400px] bg-bgLight">
                <Footer />
            </div>
        </div>
    );
};

export default ContactUs;
