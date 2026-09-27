import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures pages scroll to top upon navigating to a new route,
 * without triggering on input keystrokes or component re-renders.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
