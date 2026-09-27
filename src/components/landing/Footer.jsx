import { Link } from "react-router-dom";
import { EVENT } from "../../config/eventConfig";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p style={{ margin: 0 }}>
          {EVENT.fullName} · {EVENT.venue}
        </p>
        <ul className="footer-links">
          <li>
            <Link to="/registration/status">Check registration status</Link>
          </li>
          <li>
            <a href="#about">Passes</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
