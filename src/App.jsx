import { Routes, Route, Navigate } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/HowToUse";
import PaymentPage from "./components/PaymentPage";
import AdminDashboard from "./components/AdminDashboard";
import LoginAdmin from "./components/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import tutorial from "./components/tutorial";


const Home = () => (
  <>
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <Hero />
      {/* Changed order here - Collaboration first, then Benefits */}
      <Collaboration />
      <Benefits />
      <Services />
      <Pricing />
      <Roadmap />
      <Footer />
    </div>
    <ButtonGradient />
  </>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/tutorial" element={tutorial />} />

      {/* Login admin */}
      <Route path="/admin/login" element={<LoginAdmin />} />

      {/* Protected admin dashboard */}
      <Route
        path="/admin/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Jika akses /admin langsung, redirect ke login */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <div className="text-center text-white p-10 text-2xl">
            404 Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default App;
