import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
      {/* Navbar with Login & Register */}
      <nav className="flex justify-between items-center px-8 py-4 bg-transparent">
        <h1 className="text-3xl font-bold">HydroSense 💧</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-5xl font-bold">Stay Hydrated & Stay Informed</h2>
        <p className="mt-4 text-lg max-w-xl">
          Track your daily water intake, get real-time weather updates, and find
          nearby water stations easily with HydroSense.
        </p>
      </div>

      {/* Features Section (Moved to Bottom) */}
      <div className="bg-white text-gray-900 py-12 mt-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <FeatureCard
            title="💦 Hydration Tracking"
            description="Monitor your daily water intake and receive hydration reminders."
          />
          <FeatureCard
            title="🌤 Weather Updates"
            description="Get real-time temperature and weather alerts based on your location."
          />
          <FeatureCard
            title="🚏 Find Water Stations"
            description="Locate nearby water refill stations and shaded areas using GPS."
          />
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
