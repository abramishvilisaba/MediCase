import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="w-full mx-auto">
            {/* Picture */}
            {product.image && (
                <div className="bg-gray-200 w-full">
                    <img
                        className="aspect-square w-full object-cover"
                        src={product.image.fields.file.url}
                        alt={product.name}
                    />
                </div>
            )}

            {/* Product Category */}
            <div className="p-4">
                <p className="text-sm text-left text-gray-500">{product.category}</p>
                {/* Product Name */}
                <h2 className="text-lg text-left font-bold">{product.name}</h2>
            </div>

            {/* Additional Information (if needed) */}
            {/* <div className="p-4">
                <p className="text-gray-700">{product.brand}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
            </div> */}
        </div>
    );
};

export default ProductCard;
