import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700">
      <h1 className="text-4xl font-bold mb-4">🚫 Unauthorized</h1>
      <p className="mb-6">You must be logged in to view this page.</p>
      <Link
        to="/login"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
