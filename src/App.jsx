import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <AppRoutes />
    </BrowserRouter>
  );
}
