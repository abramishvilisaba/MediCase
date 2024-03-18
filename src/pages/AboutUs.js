import React, { useEffect } from "react";
import aboutUsImage from "../media/cover.jpg";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../locales/messages";

const AboutUs = () => {
    const navigate = useNavigate();
    let { language } = useParams();
    const handleViewProducts = () => {
        navigate(`/${language}/products/all`);
    };

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);
    return (
        // <div className="flex flex-col items-center mx-auto pb-[30vh] tall:pb-0 lg:pb-[30vh] w-full h-fit min-h-[200vh]  sm:min-h-[220vh] md:min-h-[220vh] lg:min-h-[100vh] ">
        <IntlProvider locale={language} messages={messages[language]}>
            <div className="flex flex-col bg-bgMain items-center mx-auto pb-[30vh] tall:pb-[30vh] lg:pb-[30vh] w-full h-fit min-h-[100vh]  ">
                {/* content */}
                <div className="flex flex-col  w-4/5 xl:w-1/2     pt-28 gap-8">
                    <div className="flex-shrink-0 w-full ">
                        <img
                            src={aboutUsImage}
                            alt="About Us"
                            className="w-full h-auto  rounded-lg "
                        />
                    </div>
                    <div className=" flex flex-col justify-between lg:text-left">
                        <title>About Us</title>
                        <h2 className="text-2xl font-semibold mb-4 mx-auto sm:mx-0">
                            <FormattedMessage id="aboutUs" />
                        </h2>

                        <p className="text-lg mb-4">
                            <FormattedMessage id="aboutUsText1" />
                        </p>
                        <p className="text-lg mb-4">
                            <FormattedMessage id="aboutUsText2" />
                        </p>

                        <button
                            onClick={handleViewProducts}
                            className="bg-[#3A587E] mx-auto sm:mx-0 hover:bg-[#577FB2] w-fit break-keep text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            View Products
                        </button>
                    </div>
                </div>
                {/* content */}
                {/* <div className="flex flex-col lg:flex-row w-5/6 md:w-2/3 pt-8 lg:pt-12 gap-8 ">
          <div className="text-center flex flex-col justify-between lg:text-left">
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              ex vel urna pretium imperdiet. Duis dignissim libero sed dolor
              condimentum. Nullam in ex vel urna pretium imperdiet.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-lg mb-4">
              Curabitur fermentum, quam vel egestas vestibulum, purus sapien
              tincidunt augue, id rutrum purus mi nec libero. Integer vitae est
              sed justo congue eleifend.
            </p>
          </div>
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={aboutUsImage}
              alt="About Us"
              className="w-full h-auto  rounded-lg "
            />
          </div>
        </div> */}
            </div>
        </IntlProvider>
    );
};

export default AboutUs;
