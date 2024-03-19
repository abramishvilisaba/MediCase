import React from "react";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-700">
                Sorry, the page you are looking for could not be found.
            </p>
        </div>
    );
};

export default NotFoundPage;
