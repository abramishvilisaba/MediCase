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

export const fetchNewsItemByTitle = async (title) => {
    try {
        const response = await client.getEntries({
            content_type: "news",
            "fields.newsTitle": title,
            limit: 1,
        });

        if (response.items.length > 0) {
            const item = response.items[0];
            const field = item.fields;
            return field;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching news item by title:", error);
    }
};

export const fetchProducts = async (type, category) => {
    try {
        const queryOptions = {
            content_type: "products",
            limit: 1000,
            order: "-sys.createdAt",
        };
        if (category !== "all") {
            const fieldKey = type === "products" ? "category" : "brand";
            queryOptions[`fields.${fieldKey}`] = category;
        }
        const response = await client.getEntries(queryOptions);
        if (response && response.items && response.items.length > 0) {
            const fields = response.items.map((item) => {
                const field = item.fields;
                return {
                    ...item.fields,
                    field,
                };
            });
            return fields;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
};

export const fetchProductById = async (productId) => {
    try {
        const response = await client.getEntries({
            content_type: "products",
            "fields.name": productId,
            include: 1,
        });
        if (response && response.items && response.items.length > 0) {
            const product = response.items[0];
            return product.fields;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await client.getEntries({
            content_type: "categories",
            order: "-sys.createdAt",
            // "fields.brand": brand,
        });
        const fields = response.items.map((item) => {
            const field = item.fields;
            return field;
            // return {
            //     ...item.fields,
            //     field,
            // };
        });
        return fields[0].locales;
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
};

export const fetchBrands = async () => {
    try {
        const response = await client.getEntries({
            content_type: "brands",
            order: "-sys.createdAt",
        });
        const fields = response.items.map((item) => {
            const field = item.fields;
            return field;
        });
        return fields[0].locales;
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
};
