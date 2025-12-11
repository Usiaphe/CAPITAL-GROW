import React from "react";
import "./About.css";


function About() {
  return (
    <div className="iflt-website">
      {/* Hero Section */}
      <header className="hero">
        <h1>Putting our clients first<br />since 2016</h1>
        <p>
          For more than 15 years, we've been empowering clients by helping them take control of their financial lives.
        </p>
      </header>

      {/* Number Speaks */}
      <section className="number-speaks">
        <div className="container">
          <h2>Number speaks</h2>
          <h3>We always ready for a challenge.</h3>
          <button className="cta-btn">Learn more →</button>
        </div>
      </section>

      {/* Trading Instruments */}
      <section className="trading-info">
        <div className="container">
          <div className="trading-card">
            <div className="icon"> {/* icon-trading */} </div>
            <h4>Trading Instruments</h4>
            <p>
              The foreign exchange market is the largest financial market in the world and has a variety of financial instruments to trade daily...
            </p>
          </div>
        </div>
      </section>

      {/* Relationship on your terms */}
      <section className="relationship">
        <div className="container">
          <h2>A relationship on your terms.</h2>
          <p>
            Work with us the way you want. Some believe you must choose between an online broker and a wealth management firm. At IFLT, you don’t need to compromise.
          </p>

          <div className="services-grid">
            <div className="service-card green">
              <div className="icon"> {/* icon-investing */} </div>
              <h4>Investing</h4>
              <p>A wide selection of investment product to help build diversified portfolio</p>
            </div>
            <div className="service-card blue">
              <div className="icon"> {/* icon-chart */} </div>
              <h4>Trading</h4>
              <p>Powerful trading tools, resources, insight and support</p>
            </div>
            <div className="service-card purple">
              <div className="icon"> {/* icon-wealth */} </div>
              <h4>Wealth management</h4>
              <p>Dedicated financial consultant to help reach your own specific goals</p>
            </div>
            <div className="service-card gray">
              <div className="icon"> {/* icon-advice */} </div>
              <h4>Investment advisory</h4>
              <p>A wide selection of investing strategies from seasoned portfolio managers</p>
            </div>
            <div className="service-card gray-light">
              <div className="icon"> {/* icon-portfolio */} </div>
              <h4>Smart portfolio</h4>
              <p>A revolutionary fully-automated investment advisory services</p>
            </div>
            <div className="service-card red">
              <div className="icon"> {/* icon-mutual-fund */} </div>
              <h4>Mutual fund advisor</h4>
              <p>Specialized guidance from independent local advisor for high-net-worth investors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trade With IFLT */}
      <section className="why-iflt">
        <div className="container">
          <div className="why-content">
            <div className="icon red-circle"> {/* icon-shield */} </div>
            <h3>Why trade with IFLT?</h3>
            <p>The best rated ASIC broker in the industry...</p>
            <ul>
              <li>Direct Market Access (DMA)</li>
              <li>Leverage up to 1:500</li>
              <li>T+0 settlement</li>
              <li>Dividends paid in cash</li>
              <li>Free from UK Stamp Duty</li>
              <li>Short selling available</li>
              <li>Commissions from 0.08%</li>
              <li>Access to 1500 global shares</li>
            </ul>
          </div>

          <div className="shares-offer">
            <h3>Check out our Shares offer</h3>
            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>INITIAL DEPOSIT</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Apple Inc CFD</td><td>10%</td></tr>
                <tr><td>Alibaba CFD</td><td>10%</td></tr>
                <tr><td>Facebook CFD</td><td>10%</td></tr>
              </tbody>
            </table>
            <a href="#">See Full Shares Table</a>
          </div>
        </div>

        <div className="promo-banner">
          <p>Get up to €600 plus 60 days of commission-free stocks & forex trades</p>
          <button className="open-account">Open an Account</button>
        </div>
      </section>

      {/* Legal Docs */}
      <section className="legal-docs">
        <div className="container">
          <h2>IFLT Legal Docs</h2>
          <div className="docs-grid">
            <div>
              <div className="icon red-circle"> {/* icon-doc */} </div>
              <h4>Terms of Service</h4>
              <p>Read the Terms of Service and License Agreement...</p>
            </div>
            <div>
              <div className="icon red-circle"> {/* icon-privacy */} </div>
              <h4>Policies</h4>
              <p>Find out more about what information we collect...</p>
            </div>
            <div>
              <div className="icon red-circle"> {/* icon-security */} </div>
              <h4>Security</h4>
              <p>Learn more about how we keep your work and personal data safe...</p>
            </div>
          </div>
        </div>
      </section>
      {/* Academy */}
      <section className="academy">
        <div className="container">
          <h2>Knowledge is a wise investment</h2>
          <div className="academy-content">
            <div className="academy-card">
              <h3>Trade Academy</h3>
              <p>Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...</p>
              <button className="start-learning">Start Learning</button>
            </div>
            <div className="courses">
              <div className="course-item">
                <div className="icon"> {/* icon-beginner */} </div>
                <div>
                  <h4>Beginner Course</h4>
                  <p>Learn the basic concepts of forex trading...</p>
                </div>
              </div>
              <div className="course-item">
                <div className="icon"> {/* icon-tools */} </div>
                <div>
                  <h4>Trading Tools</h4>
                  <p>Familiarize yourself with advanced strategies...</p>
                </div>
              </div>
              <div className="course-item">
                <div className="icon"> {/* icon-cfds */} </div>
                <div>
                  <h4>Stocks and CFDs</h4>
                  <p>Discover the world of CFD trading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="roadmap">
        <div className="container">
          <h3>We’re constantly updating our roadmap...</h3>
          <div className="roadmap-items">
            <div className="roadmap-card completed">
              <span>Q4 2019</span>
              <ul>
                <li>Wireframe</li>
                <li>Design</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div className="roadmap-card in-progress">
              <span>Q2 2022</span>
              <ul>
                <li>Chart with base functional</li>
                <li>Launching plans and billings</li>
                <li>Improvements of the rest of the functions of the Chart</li>
              </ul>
            </div>
            <div className="roadmap-card planned">
              <span>Q3 2022</span>
              <ul>
                <li>Extensions for other popular browsers</li>
                <li>List View for your tasks</li>
                <li>Apps for iOS & Android</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div>
            <h4>Company</h4>
            <p>1041 Elm St, Dallas, TX</p>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy & Policy</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>support@capitalgrowinvest-ment.com</p>
            <p>+1 (272) 423-1134</p>
          </div>
        </div>
        <div className="risk-warning">
          <p>
            <strong>RISK WARNING:</strong> Trading derivatives and leveraged products carries a high level of risk...
          </p>
        </div>
      </footer>
    </div>
  );
}


export default About;
