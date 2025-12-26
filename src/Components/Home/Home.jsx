import { useEffect, useState, useRef } from "react";
import "./Home.css";

const slides = [
  {
    title: "Get more freedom in the markets.",
    text: "Trade Cryptocurrencies, Stock Indices, Commodities and Forex from a single account",
  },
  {
    title: "Let top traders do the job for you!",
    text: "Covesting allows you to automatically copy top performing traders and achieve the returns",
  },
];

const items = [
  { icon: "€", label: "Forex" },
  { icon: "₿", label: "Crypto" },
  { icon: "📈", label: "Indexes" },
  { icon: "📄", label: "Stocks" },
  { icon: "🔥", label: "Energy" },
  { icon: "📦", label: "Commodities" },
];

const cards = [
  {
    badge: ["Wide Range of", "Trading", "Instruments"],
    title: "Learn",
    subtitle: "KNOWLEDGE TO GET STARTED",
    items: [
      "FREE Demo Account",
      "Step-by step tutorials & articles",
      "Online webinars & local seminars",
      "Your own Account Manager",
    ],
    button: "Open Account",
  },
  {
    badge: ["Unparalleled", "Trading", "Conditions"],
    title: "Trade",
    subtitle: "TAKE YOUR FIRST PROFIT",
    items: [
      "Tight spreads",
      "Superfast trade execution",
      "Hi-tech forex trading tools",
      "Ultimate risk protection & security",
    ],
    button: "Open Account",
  },
  {
    badge: ["Globally", "Licensed &", "Regulated"],
    title: "Invest",
    subtitle: "CHOOSE THE BEST PORTFOLIO",
    items: [
      "No need to be an experienced",
      "Large number of strategies",
      "Profit whenever Managers earn",
      "Full control of your Investment",
    ],
    button: "Start following",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const cardsRef = useRef([]);
  const textRefs = useRef([]);

  /* SLIDER */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === 0 ? 1 : 0));
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  /* INTERSECTION OBSERVER FOR CARDS */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  /* INTERSECTION OBSERVER FOR TEXT */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.25 }
    );

    textRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide slide-${index} ${current === index ? "active" : ""}`}
          >
            <div className="overlay" />
            <div className="content">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <div className="buttons">
                <button className="btn primary">Login Account</button>
                <button className="btn secondary">Open Account</button>
              </div>
              <small className="risk">
                *Trading in Forex / CFDs is highly speculative and carries a high level of risk.
              </small>
            </div>
          </div>
        ))}
      </section>

      {/* MOBILE BAR */}
      <div className="mobile-bar">
        <div className="left-text">
          <h2>
            Less
            <br />
            Commission
          </h2>
        </div>
        <div className="divider" />
        <div className="items-wrapper">
          {items.map((item, index) => (
            <div className="item" key={index}>
              <div className="icon">{item.icon}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TECH SECTION */}
      <section className="tech-section">
        <div className="tech-container">
          <h1 ref={(el) => (textRefs.current.push(el))}>
            CapitalGrowInvest-ment Technology <br />
            Benefits and Trade Security
          </h1>
          <p ref={(el) => (textRefs.current.push(el))}>
            The sole purpose of CapitalGrowInvest-ment technology is to empower you
            as an investor to grow your capital while securing a consistent flow of
            profits through trading stocks and cryptocurrencies.
          </p>
          <p ref={(el) => (textRefs.current.push(el))}>
            We deliver the best possible trading experience, filled with
            opportunities to invest, grow, and expand your wealth by leveraging
            CapitalGrowInvest-ment’s Hills Technology trading strategy. This system
            enables you to take advantage of even the slightest market movements
            within a controlled, low-risk environment.
          </p>
          <p ref={(el) => (textRefs.current.push(el))}>
            With our credibility and transparency, you have full access to monitor
            every trading activity, while CapitalGrowInvest-ment’s technology
            allows your money to work for you. From anywhere in the world, you can
            benefit from every movement in the financial markets with confidence
            and security.
          </p>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section className="steps-section">
        <div className="cards">
          {cards.map((card, i) => (
            <div className="card-wrapper" key={i}>
              <div className="card-badge">
                {card.badge.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              <div className="step-card" ref={(el) => (cardsRef.current[i] = el)}>
                <h2>{card.title}</h2>
                <p className="subtitle">{card.subtitle}</p>
                <ul>
                  {card.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <button>{card.button}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECOND TECH SECTION */}
      <section className="tech-section">
        <div className="tech-container">
          <h1 ref={(el) => (textRefs.current.push(el))}>
            CapitalGrowInvest-ment Technology Is More Than Just Trading
          </h1>
          <p ref={(el) => (textRefs.current.push(el))}>
            Capital alone cannot grow into wealth without the proper application
            of knowledge and resources to achieve lasting success. When money
            remains idle, it gradually loses value. That is why investing wisely
            for the future through productive and lucrative opportunities is
            essential.
          </p>
          <p ref={(el) => (textRefs.current.push(el))}>
            CapitalGrowInvest-ment provides a structured approach that transforms
            your capital into a steady stream of income, allowing revenue from
            investments to flow directly into your portfolio. By applying
            intelligent strategies and advanced technology, we help your money
            work efficiently and consistently toward your financial goals.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
