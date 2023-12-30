import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import colors from "../colors";
import backgroundImage from "../images/cover.jpg";
import Navbar from "./Navbar";
import CategoryDropdown from "./CategoryDropdown";

const contentful = require("contentful");
const contentfulSpace = process.env.REACT_APP_CONTENTFUL_SPACE;
const contentfulAccessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
    space: contentfulSpace,
    accessToken: contentfulAccessToken,
});

const newsData = [
    { id: 1, title: "News 1", description: "Description for News 1" },
    { id: 2, title: "News 2", description: "Description for News 2" },
    { id: 3, title: "News 3", description: "Description for News 3" },
    { id: 4, title: "News 4", description: "Description for News 4" },
    { id: 5, title: "News 5", description: "Description for News 5" },
    { id: 6, title: "News 6", description: "Description for News 6" },
    // Add more news items as needed
];

const NewsCard = styled(Card)`
    && {
        /* width: 280px; */
        height: 400px;
        padding: 10px;
        margin: 0 10px;
        background-color: ${colors.secondary};
    }
`;

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Button className={className} style={{ ...style, right: "-30px" }} onClick={onClick}>
            &#8594;
        </Button>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Button className={className} style={{ ...style, left: "-30px" }} onClick={onClick}>
            &#8592;
        </Button>
    );
};
const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerPadding: "50px",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerPadding: "30px", // Adjust gap for smaller screens if needed
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: "20px", // Adjust gap for even smaller screens if needed
            },
        },
    ],
};

const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    height: 100vh; /* Adjust the height as needed */
    width: 100%;
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(78, 90, 108, 0.5);
    opacity: "10%";
    /* Semi-transparent gray layer */
`;

const ContentContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff; /* Text color on top of the overlay */
    text-align: center;
`;

const Title = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 18px;
    margin-bottom: 30px;
`;

const StyledButton = styled.button`
    background-color: #ffffff;
    color: #000000;
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #cccccc; /* Change background color on hover */
    }
`;

const Home = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchNewsData = async () => {
        try {
            const response = await client.getEntries({
                content_type: "news",
                order: "-sys.createdAt",
            });

            const fields = response.items.map((item) => {
                const field = item.fields;
                return {
                    ...item.fields,
                    field,
                };
            });
            setData(fields);
            return fields;
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await client.getEntries({
                content_type: "product",
                order: "-sys.createdAt",
            });
            const fields = response.items.map((item) => {
                const field = item.fields;
                return {
                    ...item.fields,
                    field,
                };
            });
            // console.log("Products :", fields);
            setProducts(fields);
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await client.getEntries({
                content_type: "category",
                order: "-sys.createdAt",
            });

            const fields = response.items.map((item) => {
                const field = item.fields;
                return {
                    ...item.fields,
                    field,
                };
            });
            console.log("Categories :", fields);
            setCategories(fields);
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
        fetchNewsData();
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <BackgroundContainer>
                    <Navbar />
                    <Overlay />
                    <ContentContainer>
                        <Title>Welcome to Your Website</Title>
                        <Description>
                            Explore our services and discover amazing features.
                        </Description>
                        <StyledButton>Get Started</StyledButton>
                    </ContentContainer>
                </BackgroundContainer>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <CategoryDropdown title="Categories" />
                <CategoryDropdown title="Categories" />
            </div>

            <div style={{ height: "50vh", marginTop: "20px" }}>
                {data.length > 0 ? (
                    <Container>
                        <Slider {...sliderSettings}>
                            {data.map((item, index) => (
                                <div key={index}>
                                    <NewsCard>
                                        <CardContent>
                                            <Title variant="h6">{item.newsTitle}</Title>
                                            <Description variant="body2">
                                                {item.newsText}
                                            </Description>
                                        </CardContent>
                                    </NewsCard>
                                </div>
                            ))}
                        </Slider>
                    </Container>
                ) : null}
            </div>
        </div>
    );
};

const Container = styled.div`
    padding: 20px;
    background-color: ${colors.background};
`;

export default Home;
