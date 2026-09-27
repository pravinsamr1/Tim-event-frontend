import { useState } from "react";
import { Link } from "react-router-dom";
import { EVENT, NAV_LINKS } from "../../config/eventConfig";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true">I</span>
          {EVENT.name}
        </a>  
      </div>

    </header>
  );
}
