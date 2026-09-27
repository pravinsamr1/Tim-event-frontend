import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import OneDayRegistration from "../pages/OneDayRegistration";
import TwoDayRegistration from "../pages/TwoDayRegistration";
import RegistrationSuccess from "../pages/RegistrationSuccess";
import RegistrationStatus from "../pages/RegistrationStatus";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register/1-day" element={<OneDayRegistration />} />
      <Route path="/register/2-day" element={<TwoDayRegistration />} />
      <Route path="/registration/success" element={<RegistrationSuccess />} />
      <Route path="/registration/status" element={<RegistrationStatus />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
