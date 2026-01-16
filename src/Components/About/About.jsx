import React, { useState, useEffect, useRef } from "react";
import "./About.css";
import chart2 from "../../assets/chart2.png"


const About = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = 7;
          const duration = 2000;
          const step = end / (duration / 16);

          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);



  
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
  

  return (
    <>
      {/* CLIENT SECTION */}
      <section ref={sectionRef} className="client-section">
        <div className="container">
          <div className="grid scroll-reveal">
            <div className="left-column scroll-reveal">
              <h1 className="scroll-reveal">
                Putting our clients first since <span className="year">2016</span>
              </h1>

              <p className="scroll-reveal">
                For more than 5 years, we've been empowering clients by helping
                them take control of their financial lives.
              </p>

              <h2 className="scroll-reveal">Number speaks</h2>

              <p className="big-text scroll-reveal">
                We are always ready{" "}
                <span className="highlight">for a challenge.</span>
              </p>

              <button className="learn-btn scroll-reveal">Learn more</button>
            </div>

            <div className="right-column">
              <div className="counter">
                <span className="number">{count}</span>
                <p>Trading instruments</p>
              </div>

              <p className="description scroll-reveal">
                The foreign exchange market is the largest financial market in
                the world and has a variety of financial instruments to trade
                daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATIONSHIP SECTION */}
      <section className="relationship-section scroll-reveal">
        <h1>A relationship on your terms.</h1>
        <p>Work with us the way you want.</p>

        <p>
          Some believe you must choose between an online broker and a wealth
          management firm. With us, you don’t need to compromise.
        </p>

        <p>
          Whether you invest on your own, with an advisor, or a little of both,
          we can support you.
        </p>
      </section>




<section className="service-section">
  <div className="service-grid">

    <div className="service-card green scroll-reveal">
      <div className="service-icon">🌱</div>
      <h3>Investing <span>›</span></h3>
      <div className="service-line"></div>
      <p>
        A wide selection of investment product to help build diversified portfolio
      </p>
    </div>

    <div className="service-card blue scroll-reveal">
      <div className="service-icon">📊</div>
      <h3>Trading <span>›</span></h3>
      <div className="service-line"></div>
      <p>
        Powerful trading tools, resources, insight and support
      </p>
    </div>

    <div className="service-card purple scroll-reveal">
      <div className="service-icon">📈</div>
      <h3>Wealth management <span>›</span></h3>
      <div className="service-line"></div>
      <p>
        Dedicated financial consultant to help reach your own specific goals
      </p>
    </div>

    <div className="service-card dark scroll-reveal">
      <div className="service-icon">👥</div>
      <h3>Investment advisory <span>›</span></h3>
      <div className="service-line"></div>
      <p>
        A wide selection of investing strategies from seasoned portfolio managers
      </p>
    </div>

    <div className="service-card gray scroll-reveal">
      <div className="service-icon">🤖</div>
      <h3>Smart portfolio <span>›</span></h3>
      <div className="service-line"></div>
      <p>
        A revolutionary, fully-automated investment advisory services
      </p>
    </div>

    <div className="service-card red scroll-reveal">
      <div className="service-icon">🤝</div>
      <h3>Mutual fund advisor <span>›</span></h3>
      <div className="service-line"></div>
      <p>
        Specialized guidance from independent local advisor for high-net-worth investors
      </p>
    </div>

  </div>
</section>
      


      {/* WHY TRADE SECTION */}
      <section className="whytrade">
        <div className="whytrade-container scroll-reveal">
          <div className="whytrade-left scroll-reveal">
            <div className="icon-box">
              <span className="icon">$</span>
            </div>

            <h2>Why trade with VLS?</h2>

            <p className="description">
              The best-rated ASIC broker in the industy Dedicated account manager and personallsed service Regulated by Australian Security and invesment commission We are suggesting this broker so you can try their services on demo account Speak to your finacial advisor before opening a live account
            </p>

            <div className="features">
              <ul>
                <li>✔ Direct Market Access (DMA)</li>
                <li>✔ Leverage up to 1:500</li>
                <li>✔ T+0 settlement</li>
                <li>✔ Dividends paid in cash</li>
              </ul>

              <ul>
                <li>✔ Free from UK Stamp Duty</li>
                <li>✔ Short selling available</li>
                <li>✔ Commissions from 0.08%</li>
                <li>✔ Access to 1500 global shares</li>
              </ul>
            </div>
          </div>

          <div className="whytrade-right">
            <h3>Check out our Shares offer</h3>

            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>INITIAL DEPOSIT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Apple Inc CFD</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>Alibaba CFD</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>Facebook CFD</td>
                  <td>10%</td>
                </tr>
              </tbody>
            </table>

            <span className="see-more">See Full Shares Table</span>
          </div>
        </div>

        <div className="cta scroll-reveal">
          <p>
            Get up to <strong>£600</strong> plus 60 days of commission-free stocks
            and forex trades
          </p>
          <button>Open an Account</button>
        </div>
      </section>
       

 <section className="courses">
      <div className="courses-list scroll-reveal">
        {/* Item 1 */}
        <div className="course-item">
          <div className="course-left">
            <div className="course-icon">👥</div>
            <h3>Beginner Course</h3>
          </div>

          <p className="course-desc scroll-reveal">
            Learn the basic concepts of forex trading, what this market is all
            about, and why you should be a part of it.
          </p>

          <button className="course-link scroll-reveal">
            Enter Course →
          </button>
        </div>

        {/* Item 2 */}
        <div className="course-item scroll-reveal">
          <div className="course-left scroll-reveal">
            <div className="course-icon scroll-reveal">🛠️</div>
            <h3>Trading Tools</h3>
          </div>

          <p className="course-desc scroll-reveal">
            Familiarize yourself with advanced strategies and Btrade’s trading
            toolset. Take your trading to the next level.
          </p>

          <button className="course-link scroll-reveal">
            Enter Course →
          </button>
        </div>

        {/* Item 3 */}
        <div className="course-item scroll-reveal">
          <div className="course-left">
            <div className="course-icon scroll-reveal">📈</div>
            <h3>Stocks and CFDs</h3>
          </div>

          <p className="course-desc scroll-reveal">
            Discover the world of CFD trading. The ins & outs of the CFD market,
            relevant information, and market dynamics.
          </p>
              
          <button className="course-link scroll-reveal">
            Enter Course →
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="courses-buttons scroll-reveal">
        <button>Fast Academy</button>
        <button>Video Tutorials</button>
        <button>Course</button>
        <button>E-Books</button>
        <button>Glossary</button>
        <button>Trading Info</button>
      </div>

      {/* Bottom Text */}
      <p className="courses-note scroll-reveal">
        We're constantly updating our roadmap to bring transparency for our
        users and to get your feedback – please tell us what is important for
        you!
      </p>
    </section>

     <section className="roadmap scroll-reveal">
        <div className="roadmap-line"></div>

        <div className="roadmap-items">
          {/* Item 1 */}
          <div className="roadmap-item scroll-reveal">
            <div className="icon-circle scroll-reveal">
              <span>📋</span>
            </div>
            <h4>Q4 2019 <span className="badge completed scroll-reveal">completed</span></h4>
            <div className="card scroll-reveal">
              <ul>
                <li>Wireframe</li>
                <li>Design</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>

          {/* Item 2 */}
          <div className="roadmap-item">
            <div className="icon-circle scroll-reveal">
              <span>⚙️</span>
            </div>
            <h4>Q2 2014 – 2022 <span className="badge progress">on progress</span></h4>
            <div className="card scroll-reveal">
              <ul>
                <li>Chart with base functionality</li>
                <li>Launching plans and billings</li>
                <li>Improvement of chart functions</li>
                <li>Availability panel</li>
              </ul>
            </div>
          </div>

          {/* Item 3 */}
          <div className="roadmap-item">
            <div className="icon-circle">
              <span>🧪</span>
            </div>
            <h4>Q3 2014 – 2022 <span className="badge planned scroll-reveal">planned</span></h4>
            <div className="card  scroll-reveal">
              <ul>
                <li>Extensions for popular browsers</li>
                <li>List view for tasks</li>
                <li>iOS & Android apps</li>
                <li>New default skin</li>
                <li>Community-driven updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer scroll-reveal">
        <div className="footer-top scroll-reveal">
          <div>
            <h5>Company</h5>
            <p>1041 Elm St, Dallas, TX</p>
          </div>

          <div>
            <h5>Legal</h5>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>

          <div>
            <h5>Contact</h5>
            <p>support@capitalgrowinvestment.com</p>
            <p>+1 (272) 432-1134</p>
          </div>
        </div>

        <div className="risk-box">
          <span>RISK WARNING</span>
          <p>
            Trading derivatives and leveraged products carries a high level of
            risk and may not be suitable for everyone. Please read all
            disclosures carefully.
          </p>
        </div>

        <p className="copyright">
          © capitalgrowinvestment.com 2014–2023. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default About;
