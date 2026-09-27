import { Link } from "react-router-dom";
import { EVENT } from "../../config/eventConfig";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true">I</span>
          {EVENT.name}
        </a>
        <div className="nav-actions">
          <Link to="/registration/status" className="nav-status-link">
            Find Pass
          </Link>
          <a href="#about" className="btn btn-gold nav-cta">
            Passes
          </a>
        </div>
      </div>
    </header>
  );
}
