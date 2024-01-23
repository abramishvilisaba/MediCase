const contentful = require("contentful");

const contentfulSpace = process.env.REACT_APP_CONTENTFUL_SPACE;
const contentfulAccessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
    space: contentfulSpace,
    accessToken: contentfulAccessToken,
});

export const fetchNewsData = async () => {
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
        return fields;
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
};

export const fetchProducts = async () => {
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
        return fields;
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
};

export const fetchCategories = async () => {
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
        return fields;
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
};
