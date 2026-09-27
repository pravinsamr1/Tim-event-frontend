import { useEffect, useState } from "react";
import { EVENT } from "../../config/eventConfig";

const heroImages = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const words = (EVENT.tagline || "Where builders meet the future.").split(" ");

  return (
    <section className="hero" id="top">
      {/* Background slider fills the entire banner */}
      <div className="hero-slider" aria-hidden="true">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            className={index === activeIndex ? "hero-slide is-active" : "hero-slide"}
          />
        ))}
        <div className="hero-scrim" />
      </div>

      <div className="hero-content container hero-content-center">
        <h1 className="hero-animated-heading">
          {words.map((word, i) => {
            const isAccent = word.toLowerCase().replace(/[^a-z]/g, "") === "future";
            return (
              <span
                key={i}
                className={`hero-word ${isAccent ? "hero-word-accent" : ""}`}
                style={{ animationDelay: `${0.2 + i * 0.14}s` }}
              >
                {word}
                {i < words.length - 1 ? "\u00A0" : ""}
              </span>
            );
          })}
        </h1>
      </div>
    </section>
  );
}

