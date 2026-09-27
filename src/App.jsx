import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <AppRoutes />
    </BrowserRouter>
  );
}
