import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div className="about-page">
      {/* Contact Us Section */}
      <section className="contact-us">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="subtitle">
            Do not hesitate to reach out. Just fill in the contact form here and we'll be sure to reply as fast as possible.
          </p>

          <div className="message-us">
            <h3>Message us</h3>
            <p className="email">support@capitalgrowinvest-ment.com</p>
            <p className="phone">
              <span>{/* icon-phone */}</span> +1 (272) 432-1134
            </p>
            <div className="social-icons">
              <span>{/* icon-facebook */}</span>
              <span>{/* icon-twitter */}</span>
              <span>{/* icon-linkedin */}</span>
              <span>{/* icon-instagram */}</span>
              <span>{/* icon-pinterest */}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Cards */}
      <section className="legal-cards">
        <div className="container">
          <div className="cards-grid">
            <div className="legal-card">
              <div className="icon-circle">{/* icon-document */}</div>
              <h4>Terms of Service</h4>
              <>
                Read the Terms of Service and License Agreement for Blockit as well as our Blockit App & Developer Agreements.
              </>
              <ul>
                <li><span>{/* icon-pdf */}</span> License Agreement</li>
                <li><span>{/* icon-pdf */}</span> Term of Services for Blockit Trade</li>
              </ul>
            </div>

            <div className="legal-card">
              <div className="icon-circle">{/* icon-globe */}</div>
              <h4>Policies</h4>
              <p>
                Find out more about what information we collect at Blockit, how we use it, and what control you have over your data.
              </p>
              <ul>
                <li><span>{/* icon-pdf */}</span> Privacy Statement</li>


                </ul>
            </div>

            <div className="legal-card">
              <div className="icon-circle">{/* icon-shield */}</div>
              <h4>Security</h4>
              <p>
                Learn more about how we keep your work and personal data safe when you're using our services.
              </p>
              <ul>
                <li><span>{/* icon-pdf */}</span> Blockit Trade Security</li>
                <li><span>{/* icon-pdf */}</span> Responsible Disclosure Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      <section className="knowledge">
        <div className="container">
          <h2>
            Knowledge <span className="highlight">is a wise</span><br />
            investment
          </h2>
          <p>
            By combining easy-to-understand information with actionable insights, Our company helps make the market seem less daunting—and more approachable.
          </p>
          <div className="action-buttons">
            <button className="btn-learn">LEARN →</button>
            <button className="btn-understand">UNDERSTAND</button>
            <button className="btn-trade">TRADE</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <h5>Company</h5>
            <p className="address">
              ADDRESS<br />
              1041 Elm St, Dallas,<br />
              TX
            </p>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy & Policy</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <p className="email">support@capitalgrowinvest-ment.com</p>
            <p className="phone">+1 (272) 432-1134</p>
          </div>
        </div>

        <div className="risk-warning">
          <strong>RISK WARNING:</strong> Trading derivatives and leveraged products carries a high level of risk, including the risk of losing substantially more than your initial investment. It is not suitable for everyone...
        </div>

        <div className="copyright">
          © capitalgrowinvest-ment.com 2014–2023. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Contact;