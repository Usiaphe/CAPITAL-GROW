import { useEffect, useState, useRef } from "react";
import "./Home.css";
import ctrader from "../../assets/ctrader.jpg"

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

  
  // Scroll Reveal Animation with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed'); // Re-triggers on scroll up
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          } else {
            entry.target.classList.remove("revealed");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);



  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };
  
  
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

     
  {/* add it to this seaction below */}
<section className="lti-section">
      {/* TOP FEATURES */}
      <div className="lti-top scroll-reveal">
        <span>Wide Range of Trading Instruments</span>
        <span>Unparalleled Trading Conditions</span>
        <span>Globally Licensed & Regulated</span>
        <span>Committed to Forex Education</span>
        <span>Regular Contests & Promotions</span>
      </div>

      {/* CARDS */}
      <div className="lti-cards">
        {/* LEARN */}
        <div className="lti-card scroll-reveal">
          <h3>Learn</h3>
          <small>KNOWLEDGE TO GET STARTED</small>

          <ul>
            <li>FREE Demo Account</li>
            <li>Step-by-step tutorials & articles</li>
            <li>Online webinars & local seminars</li>
            <li>Your own Account Manager</li>
          </ul>

          <button>Open Account</button>
        </div>

        {/* TRADE */}
        <div className="lti-card scroll-reveal">
          <h3>Trade</h3>
          <small>TAKE YOUR FIRST PROFIT</small>

          <ul>
            <li>Tight spreads</li>
            <li>Superfast trade execution</li>
            <li>Hi-tech forex trading tools</li>
            <li>Ultimate risk protection & security</li>
          </ul>

          <button>Open Account</button>
        </div>

        {/* INVEST */}
        <div className="lti-card scroll-reveal">
          <h3>Invest</h3>
          <small>CHOOSE THE BEST PORTFOLIO</small>

          <ul>
            <li>No need to be experienced</li>
            <li>Large number of strategies</li>
            <li>Profit whenever managers earn</li>
            <li>Full control of your investment</li>
          </ul>

          <button>Start following</button>
        </div>
      </div>
    </section>


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

      
               
       <div className="app-container">
      {/* Top Cards Section */}
      <div className="cards-container">
        {/* Economic Analysis Card */}
        <div className="card economic-card scroll-reveal">
          <div className="blob blob-purple"></div>
          <div className="card-content">
            <h2 className="card-title">
              <span className="red-bar"></span> Economic Analysis
            </h2>
            <p className="card-description">
              Stay ahead of the markets with world-leading market analysis through daily webinars by industry experts.
            </p>
            <div className="card-buttons">
              <button className="btn-read">READ ANALYSIS</button>
              <button className="btn-update">Weekly Update</button>
            </div>
          </div>
        </div>

        {/* Technical Analysis Card */}
        <div className="card technical-card scroll-reveal">
          <div className="blob blob-peach"></div>
          <div className="card-content">
            <h2 className="card-title">
              <span className="red-bar"></span> Technical Analysis
            </h2>
            <p className="card-description">
              Access the financial markets with an account catered to your needs and benefit from good conditions.
            </p>
            <div className="card-buttons">
              <button className="btn-read">READ ANALYSIS</button>
              <button className="btn-update">Daily Update</button>
            </div>
          </div>
        </div>
      </div>

<section className="promo-section scroll-reveal">
      <div className="promo-container scroll-reveal">

        {/* LEFT CONTENT */}
        <div className="promo-left scroll-reveal">
          <div className="store-buttons">
            {/* Play Store Button */}
            <button className="store-btn">
              {/* PLACE PLAY STORE ICON HERE */}
              <span>Download From</span>
              <strong>Play Store</strong>
            </button>

            {/* App Store Button */}
            <button className="store-btn">
              {/* PLACE APP STORE ICON HERE */}
              <span>Download From</span>
              <strong>App Store</strong>
            </button>
          </div>

          <p className="promo-text">
            Trade on <span>world class platform</span> without a doubt.
          </p>

          <p className="promo-subtext">
            Mobile App Coming Soon For all Platform.
          </p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="promo-right scroll-reveal">
           
          {/* PLACE MAIN APP IMAGE HERE */}
          <div className="app-image-placeholder">
           <img src={ctrader} alt="" />
            {/* <img src="your-image.png" alt="Trading App" /> */}
          </div>
        </div>

      </div>
    </section>
    
    </div>

    <div className="profit-banner ">
      <div className="banner-content">
        {/* Left Side: Logo + Numbers */}
        <div className="stats-side">
          <div className="logo-circle">
            <span className="arrow-icon">↘</span>
          </div>
          <div className="stats-text">
            <h2 className="profit-number">324,978,126</h2>
            <p className="profit-label">TRADES OPENED AT PROFIT</p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="divider"></div>

        {/* Right Side: Description */}
        <div className="description-side">
          <h3 className="description-title">
            Trade & Invest in Stocks,<br />
            Currencies, Indices, and<br />
            Commodities (CFDs).
          </h3>
        </div>
      </div>
    </div>

<section className="commitment-section">
      <div className="commitment-content scroll-reveal">
        {/* TEXT */}
        <div className="commitment-text scroll-reveal">
          <h2>
            We are committed to <br />
            meeting your CFD and <br />
            FX trading needs
          </h2>

          <p>
            We help your money grow by putting it to work. Not Just by Words.
            Our experts ensure not only that your funds are at work, but are
            putting carefully planned and strategically diversified trading
            and investment portfolio for risk management.
            <br /><br />
            We ensure transparent returns, with favourable management fee.
          </p>
        </div>

        {/* STATS */}
        <div className="commitment-stats">
          <div className="stat-item scroll-reveal">
            <span className="stat-value">89+</span>
            <p>Countries our Clients currently come from and counting.</p>
          </div>

          <div className="stat-item scroll-reveal">
            <span className="stat-value">90%</span>
            <p>
              We provide 80–90% high probability forex trades but also Gold,
              Crypto, Index and Stock Signals.
            </p>
          </div>

          <div className="stat-item scroll-reveal">
            <span className="stat-value">13K+</span>
            <p>Active Followers and Counting.</p>
          </div>

          <div className="stat-item scroll-reveal">
            <span className="stat-value">8yrs+</span>
            <p>Years of Experience in the Industry.</p>
          </div>
        </div>
      </div>
    </section>



<section className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <h1>
            Connect to <br />
            global capital <br />
            markets
          </h1>

          <p className="ready">
            Ready to trade?
          </p>
          <p className="subtext">
            Get started with your trading account today.
          </p>
        </div>

        <div className="hero-right">
          <p className="description">
            Access 40,000+ trading instruments and professional asset
            management on award-winning platforms.
          </p>

          <div className="actions">
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Phone" />
            <button className="primary-btn">Open Account</button>
          </div>
        </div>
      </div>
    </section>

<div className="pricing-wrapper">
        <p  className="pricing-title scroll-reveal"> Trade with confidence</p>
      <h2 className="pricing-title scroll-reveal">
        Complete package for every trader
      </h2>

      <div className="pricing-grid">
        <div
          className="pricing-card tilt-card scroll-reveal"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <h3>MINI ACCOUNT</h3>
          <p className="price">$500</p>
          <ul>
            <li>✔ Min. deposit: $500</li>
            <li>✔ Trader education</li>
            <li>✔ Advanced risk management</li>
            <li>✔ Tax-free profits</li>
            <li>✔ Low minimum deposit</li>
          </ul>
          <button className="split-btn">
            <span>Open an account</span>
          </button>
        </div>

        <div
          className="pricing-card tilt-card scroll-reveal"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <h3>BRONZE ACCOUNT</h3>
          <p className="price">$1,000</p>
          <ul>
            <li>✔ Min. deposit: $1,000 - $4,999</li>
            <li>✔ Expert news & analysis</li>
            <li>✔ Competitive spreads</li>
            <li>✔ Advanced trading tools</li>
            <li>✔ Tax-free profits</li>
          </ul>
          <button className="split-btn">
            <span>Open an account</span>
          </button>
        </div>

        <div
          className="pricing-card tilt-card scroll-reveal"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <h3>SILVER ACCOUNT</h3>
          <p className="price">$5,000</p>
          <ul>
            <li>✔ Min. deposit: $5,000 - $9,999</li>
            <li>✔ Trader education</li>
            <li>✔ Advanced risk management</li>
            <li>✔ Tax-free profits</li>
            <li>✔ Low minimum deposit</li>
          </ul>
          <button className="split-btn">
            <span>Open an account</span>
          </button>
        </div>

        <div
          className="pricing-card tilt-card scroll-reveal"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <h3>GOLD ACCOUNT</h3>
          <p className="price">$10,000</p>
          <ul>
            <li>✔ Min. deposit: $10,000 - $29,999</li>
            <li>✔ Trader education</li>
            <li>✔ Advanced risk management</li>
            <li>✔ Tax-free profits</li>
            <li>✔ Low minimum deposit</li>
          </ul>
          <button className="split-btn">
            <span>Open an account</span>
          </button>
        </div>

        <div
          className="pricing-card tilt-card scroll-reveal"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <h3>PLATINUM</h3>
          <p className="price">$30,000</p>
          <ul>
            <li>✔ Min. deposit: $30,000</li>
            <li>✔ Trader education</li>
            <li>✔ Advanced risk management</li>
            <li>✔ Tax-free profits</li>
            <li>✔ Low minimum deposit</li>
          </ul>
          <button className="split-btn">
            <span>Open an account</span>
          </button>
        </div>

        <div
          className="pricing-card tilt-card scroll-reveal"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <h3>FOREX SIGNALS</h3>
          <ul>
            <li>✔ Professional Forex Signals</li>
            <li>✔ Up to 10 signals/day</li>
            <li>✔ 95% success rate</li>
            <li>✔ 24/7 Support</li>
            <li>✔ Bitcoin payments only</li>
          </ul>
          <button className="split-btn">
            <span>Open an account</span>
          </button>
        </div>
      </div>
    </div>
   

<div className="features-container">
      <div className="feature-item">
        {/* icon: enhanced-tools.png */}
        <img src="/icons/enhanced-tools.png" alt="Enhanced Tools" />
        <p>Enhanced Tools</p>
      </div>

      <div className="feature-item">
        {/* icon: trading-guides.png */}
        <img src="/icons/trading-guides.png" alt="Trading Guides" />
        <p>Trading Guides</p>
      </div>

      <div className="feature-item">
        {/* icon: fast-execution.png */}
        <img src="/icons/fast-execution.png" alt="Fast execution" />
        <p>Fast execution</p>
      </div>

      <div className="feature-item">
        {/* icon: less-commission.png */}
        <img src="/icons/less-commission.png" alt="Less Commission" />
        <p>Less Commission</p>
      </div>

      <div className="feature-item">
        {/* icon: globally-licensed.png */}
        <img src="/icons/globally-licensed.png" alt="Globally licensed" />
        <p>Globally licensed</p>
      </div>

      <div className="feature-item">
        {/* icon: fund-security.png */}
        <img src="/icons/fund-security.png" alt="Fund security" />
        <p>Fund security</p>
      </div>
    </div>

   <section className="steps-section scroll-reveal">
  <div className="steps-overlay" />

  <div className="steps-content">
    <small className="steps-subtitle scroll-reveal">
      Start trading with Profit Inc.
    </small>

    <h2 className="steps-title scroll-reveal">
      Fast account opening in 3 simple steps
    </h2>

    <div className="steps-row">
      {/* STEP 1 */}
      <div className="step-card scroll-reveal">
        <div className="step-circle">1</div>
        <h3>Register</h3>
        <p>
          Choose an account type and
          submit your application
        </p>
      </div>

      <div className="step-connector scroll-reveal" />

      {/* STEP 2 */}
      <div className="step-card scroll-reveal">
        <div className="step-circle">2</div>
        <h3>Fund</h3>
        <p>
          Fund your account using a
          wide range of funding methods.
        </p>
      </div>

      <div className="step-connector scroll-reveal" />

      {/* STEP 3 */}
      <div className="step-card scroll-reveal">
        <div className="step-circle">3</div>
        <h3>Trade</h3>
        <p>
          Access 180+ instruments
          across all asset classes on App
        </p>
      </div>
    </div>
  </div>
</section>




<section className="cta-section scroll-reveal">
  <div className="cta-badge">OPEN YOUR ACCOUNT</div>

  <div className="cta-box">
    <h2 className="cta-title">
      Connect with over <span>5 million investors</span> in the world’s leading
      investment network
    </h2>

    <form className="cta-form">
      <input type="text" placeholder="Full name" />
      <input type="email" placeholder="Email address" />
      <input type="tel" placeholder="Phone number" />

      <button type="submit" className="cta-btn">
        Create<br />Account
      </button>
    </form>
  </div>
</section>
    


    <section className="platform-section scroll-reveal">
  <div className="platform-container">
    {/* LEFT — IMAGE */}
    <div className="platform-image scroll-reveal">
      {/* PLACE APP PHONE IMAGE HERE */}
      {/* <img src={appImage} alt="Trading App" /> */}
      <div className="image-placeholder">APP IMAGE</div>
    </div>

    {/* RIGHT — CONTENT */}
    <div className="platform-content scroll-reveal">
      <h2>
        Platform by traders,<br />for traders
      </h2>

      <p className="platform-desc">
        Seize your opportunity, with technology built designed to ensure
        that your deal goes through.
      </p>

      <div className="store-buttons">
        <button className="store-btn">
          {/* PLAY STORE ICON */}
          <span>Download From</span>
          <strong>Play Store</strong>
        </button>

        <button className="store-btn">
          {/* APP STORE ICON */}
          <span>Download From</span>
          <strong>App Store</strong>
        </button>
      </div>
    </div>
  </div>

  {/* FEATURES */}
  <div className="platform-features">
    <div className="feature-item scroll-reveal">
      {/* ICON */}
      <div className="feature-icon">⚙️</div>
      <span>Enhanced Tools</span>
    </div>

    <div className="feature-item scroll-reveal">
      <div className="feature-icon">📘</div>
      <span>Trading Guides</span>
    </div>

    <div className="feature-item scroll-reveal">
      <div className="feature-icon">⚡</div>
      <span>Fast execution</span>
    </div>

    <div className="feature-item scroll-reveal">
      <div className="feature-icon">%</div>
      <span>Less Commission</span>
    </div>
  </div>

  {/* BOTTOM TEXT */}
  <div className="platform-bottom scroll-reveal">
    <h3>Choose capitalgrowinvest-ment Technology</h3>
    <p>
      We offer one-click trading experience with 3,000+ world-renowned markets.
    </p>
  </div>
</section>


<section className="features-section">
  <div className="features-grid">

    <div className="feature-box scroll-reveal">
      <div className="feature-icon">📊</div>
      <h3>Wide range of instruments</h3>
      <p>
        A partner invested in your success. Trade with confidence and benefit
        from the reliability of a trusted broker with a proven record of
        stability, security and strength.
      </p>
    </div>

    <div className="feature-box scroll-reveal">
      <div className="feature-icon">⚡</div>
      <h3>Unparalleled market conditions</h3>
      <p>
        Trade and invest confidently in top performing cryptocurrencies with
        our timely trading signals that ensure your profitability from day one.
      </p>
    </div>

    <div className="feature-box scroll-reveal">
      <div className="feature-icon">🛡️</div>
      <h3>Globally licensed & regulated</h3>
      <p>
        Governments issue regulations related to environmental practices,
        employee practices, advertising practices, and more — ensuring
        transparency and trust.
      </p>
    </div>

    <div className="feature-box scroll-reveal">
      <div className="feature-icon">🎓</div>
      <h3>Committed to forex education</h3>
      <p>
        Our signals are sent via Telegram, a free app that takes seconds to set
        up. Once you subscribe, you receive instant access and updates.
      </p>
    </div>

    <div className="feature-box scroll-reveal">
      <div className="feature-icon">🎁</div>
      <h3>Regular contests & promotions</h3>
      <p>
        We provide high-probability forex trades alongside Gold, Crypto, Index,
        and Stock signals — every single day.
      </p>
    </div>

  </div>
</section>




<section className="invest-cta-section scroll-reveal">
  <div className="invest-cta-bg"></div>

  <div className="invest-cta-wrapper">
    {/* LEFT */}
    <div className="invest-cta-left">
      <span className="invest-cta-badge">ANNOUNCING</span>

      <h1>
        <strong>$4.95</strong> online<br />
        stocks, currencies &<br />
        commodities trades
      </h1>

      <p>
        Stock Commissions from €3 on US stocks. Access 19,000+ stocks across
        core and emerging markets on 36 exchanges worldwide.
      </p>

      <button className="invest-cta-learn">Learn more</button>
    </div>

    {/* RIGHT */}
    <div className="invest-cta-card">
      <h3>New to investing?<br />Start here.</h3>

      <input type="text" placeholder="Full name" />
      <input type="email" placeholder="Email address" />
      <input type="tel" placeholder="Phone number" />

      <button className="invest-cta-submit">Create Account</button>
    </div>
  </div>
</section>

<section className="stats-section">
  <div className="stats-top scroll-reveal">
    <div className="stat-box">
      <h2>&lt; 7.12<span>ms</span></h2>
      <p>Average order<br />execution speed</p>
    </div>

    <div className="stat-divider" />

    <div className="stat-box">
      <h2>12<span>+</span></h2>
      <p>Integrated liquidity<br />providers</p>
    </div>

    <div className="stat-divider" />

    <div className="stat-box">
      <h2>&gt; 12,000</h2>
      <p>Executed orders<br />per second</p>
    </div>
  </div>

  <div className="stats-actions scroll-reveal">
    <button className="btn-primary">Setup your trading account</button>
    <button className="btn-outline">Discover our platform</button>
    <span>Registration takes only 40 seconds!</span>
  </div>

  <div className="stats-bottom scroll-reveal">
    <h3>Supporting Traders from over <span>48 Countries</span></h3>

    <div className="stats-highlight">
      <div className="highlight-box">$76+</div>
      <div className="highlight-divider" />
      <div className="highlight-box">1.6+</div>
    </div>

    <small>
      Data based on year-to-date Profit Inc activity
      <span>(last update end of Q2 2020)</span>
    </small>
  </div>
</section>

<section className="market-analysis-section">
      <div className="analysis-container">
        {/* Header */}
        <div className="section-header scroll-reveal">
          <h2 className="header-title">In-Depth daily market analysis</h2>
          <p className="header-subtitle">
            Get timely news & analysis from top financial experts
          </p>
          <div className="red-arrow">▼</div>
        </div>

        {/* Main Content + Stats */}
        <div className="content-stats-row scroll-reveal">
          {/* Left Text */}
          <div className="content-text">
            <h3 className="content-title">
              We help our customers engage<br />
              investors so their companies can grow
            </h3>
            <p className="content-description">
              Our customers look to us as guides, and we weave our<br />
              deep legal and technical experience into our software and<br />
              services.
            </p>
          </div>

          {/* Right Stats */}
          <div className="stats-column">
            <div className="stat-item scroll-reveal">
              <div className="stat-icon rocket">
                <span>🚀</span>
              </div>
              <div className="stat-info">
                <span className="stat-number">35817</span>
                <span className="stat-badge">Business launch</span>
              </div>
            </div>

            <div className="divider-line"></div>

            <div className="stat-item scroll-reveal">
              <div className="stat-icon user">
                <span>👤</span>
              </div>
              <div className="stat-info">
                <span className="stat-number">4400</span>
                <span className="stat-badge">Investor engaged</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

<section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        

        {/* Stats */}
        <div className="stats-row scroll-reveal">
          <div className="stat-item">
            <div className="stat-icon up">↑</div>
            <div className="stat-content">
              <span className="stat-number">35817</span>
              <span className="stat-label">Business launch</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon down">↓</div>
            <div className="stat-content">
              <span className="stat-number">4400</span>
              <span className="stat-label">Investor engaged</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {/* Testimonial 1 */}
          <div className="testimonial-card scroll-reveal">
            <div className="card-header">
              {/* === PUT YOUR IMAGE HERE === */}
              {/* <img src="/path-to-hunter-image.jpg" alt="Hunter Hamilton" className="profile-img" /> */}
              {/* Placeholder circle if no image yet */}
              <div className="profile-placeholder"></div>
            </div>
            <div className="card-body">
              <p className="testimonial-text">
                I'm Hunter Hamilton from North Carolina, Currently living in Arizona with my Family, i came across World of Forex, while browsing through facebook, I accessed the site and contact them via whatsapp and i started investing with $5000 and am making $54,560.00 Weekly.
              </p>
              <div className="testimonial-footer">
                <strong>Hunter Hamilton</strong>
                <span>UNITED STATES</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card scroll-reveal">
            <div className="card-header">
              {/* === PUT YOUR IMAGE HERE === */}
              {/* <img src="/path-to-charlotte-image.jpg" alt="Charlotte" className="profile-img" /> */}
              <div className="profile-placeholder"></div>
            </div>
            <div className="card-body">
              <p className="testimonial-text">
                Hello everyone I'm Charlotte from South Africa 🇿🇦 It is very easy to make investments on this platform. They have different payment methods that are secured and easy to use. I have also earned more from my account upgrade with amazing new features added to it thank you all so much ❤️.
              </p>
              <div className="testimonial-footer">
                <strong>Charlottebr</strong>
                <span>SOUTH AFRICA</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card scroll-reveal">
            <div className="card-header">
              {/* === PUT YOUR IMAGE HERE === */}
              {/* <img src="/path-to-violante-image.jpg" alt="Violante Valeria" className="profile-img" /> */}
              <div className="profile-placeholder"></div>
            </div>
            <div className="card-body">
              <p className="testimonial-text">
                Blessings be unto you ma'am Violante Valeria and your company World of Forex, you're such a big comfort and a big help to me regarding bitcoin investment ma'am , God bless you for using your skills of trading to bless us the Philippines🇵🇭 because we normally have a low economy ❤️ thanks ma'am Violante Valeria once again and i will do tell my friends to join the winning team.
              </p>
              <div className="testimonial-footer">
                <strong>Lauren Nicholson</strong>
                <span>PHILIPPINES</span>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="testimonial-card scroll-reveal">
            <div className="card-header">
              {/* === PUT YOUR IMAGE HERE === */}
              {/* <img src="/path-to-christopher-image.jpg" alt="Christopher Pagao" className="profile-img" /> */}
              <div className="profile-placeholder"></div>
            </div>
            <div className="card-body">
              <p className="testimonial-text">
                Hi World of Forex... I'm just writing to say thank you!! auto-capital is in my blood now. I finally found my life! I want to say a big thank you to auto-capital . Just got my profit of $7500 in my Bank account. This is indeed a trust worthy platform to invest.
              </p>
              <div className="testimonial-footer">
                <strong>Christopher Pagao</strong>
                <span>UNITED STATES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <footer className="footer">
      <div className="footer-inner">

        {/* TOP LINKS */}
        <div className="footer-top">
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy & Policy</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-col contact">
            <p className="email">support@auto-capital.org</p>
            <p>
              Wenlock Road 20-22<br />
              N1 7GU London<br />
              United Kingdom
            </p>
          </div>
        </div>

        {/* RISK WARNING */}
        <div className="risk-box">
          <span className="risk-badge">RISK WARNING</span>
          <p>
            Trading derivatives and leveraged products carries a high level of risk,
            including the risk of losing substantially more than your initial investment.
            It is not suitable for everyone. Before you make any decision in relation to
            a financial product you should obtain and consider our Product Disclosure
            Statement (PDS) and Financial Services Guide (FSG) available on our website
            and seek independent advice if necessary.
          </p>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <p>© world of Forex 2023. All rights reserved.</p>

          <div className="socials">
            <a href="#">✈️</a>
            <a href="#">💬</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>

      </div>
    </footer>
    </>
  );
};

export default Home;