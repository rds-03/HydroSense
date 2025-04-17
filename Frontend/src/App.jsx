import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Unauthorized from "./Pages/Unauthorized.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Cafe from "./Pages/Cafe.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import HydrationTrack from "./Pages/HydrationTrack.jsx";
import Navbar from "./Components/NavBar.jsx";
import Sidebar from "./Components/SideBar.jsx";

const AppLayout = () => {
  const Location = useLocation();
  const publicRoutes = ["/login", "/register", "/"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  return (
    <>
      {!isPublicPage && (
        <>
          {/* <Navbar /> */}
          <Sidebar />
        </>
      )}
      <div className={!isPublicPage ? "ml-60 mt-16 p-4" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Cafe" element={<Cafe />} />
          <Route path="/Tracking" element={<HydrationTrack />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
