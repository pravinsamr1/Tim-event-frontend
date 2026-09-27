import { EVENT } from "../../config/eventConfig";

export default function Navbar() {

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
