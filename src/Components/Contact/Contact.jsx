import { useState } from 'react';
import "./Contact.css"

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "15b7afcf-0f9e-4524-80f8-52904f0a1283");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  return (

    <> 
<div className="contact-page-wrapper">
  {/* Intro Section */}
  <div className="contact-intro">
    <h1>Contact Us</h1>
    <p>
      Do not hesitate to reach out, just fill in the contact form <br />
      here and we'll be sure to reply as fast as possible
    </p>
  </div>

  {/* Contact Form Section */}
  <div className="contact-form-container">
    <h1 className="form-title">Message Us</h1>
    
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="name-email-row">
        <div>
          <input type="text" placeholder="Full name" name="name" required />
        </div>
        <div>
          <input type="email" placeholder="Email address" name="email" required />
        </div>
      </div>

      <div>
        <input type="text" placeholder="Subject" name="subject" />
      </div>

      <div>
        <textarea name="message" placeholder="Message" required></textarea>
      </div>

      <button type="submit" className="submit-button">
        Send Message
      </button>

      {result && <p className="result-message">{result}</p>}
    </form>
  </div>

  {/* Risk Warning Footer */}
  <div className="risk-warning">
    <strong>Risk warning</strong>
    <p>
      The financial products offered via this website include digitals, contracts for difference (CFDs), and other complex derivatives and financial products. Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. As a result, the products offered on this website may not be suitable for all investors because of the risk of losing all of your invested capital. You should never invest money that you cannot afford to lose, and never trade with borrowed money. Before trading in the complex financial products offered, please be sure to understand the risks involved.
    </p>
  </div>
</div>
    </>
  );
}