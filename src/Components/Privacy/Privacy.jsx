import React from "react";
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page">
      {/* MAIN CONTENT */}
      <div className="privacy-container">
        <div className="privacy-box">
          <h1>Privacy Policy</h1>

          <h3>Introduction</h3>
          <p>
            The same as most online companies, capitalgrowinvest-ment.com recognises the importance of our client's privacy. As a financial services firm, we must obtain certain personal and financial information from the client, in order to set up and service the client accounts.
          </p>

          <p>
            capitalgrowinvest-ment.com makes use of the client's personal and financial information exclusively for the following purposes:
          </p>

          <ul>
            <li>Verification of the client's identity</li>
            <li>Account set up, maintenance and management of client accounts</li>
            <li>Processing deposits into client's trading accounts and facilitating of withdrawals to the client's wallet or bank account</li>
            <li>Informing the client about news, updates, promotions and additional products and services that may be of interest</li>
            <li>Providing the client with the best quality of customer support</li>
          </ul>

          <p>
            capitalgrowinvest-ment.com will never use, disclose, sell, rent or lease the client's personal and financial information to any third parties except those stated in "Disclosure of Client's Personal Information". Profits, transaction history, net worth or income information will not be shared by the Company under any circumstances.
          </p>

          <h3>Disclosure of client's personal information</h3>
          <p>
            capitalgrowinvest-ment.com may disclose the client's personal information to third-party entities in the following cases:
          </p>

          <ul>
            <li>to the Company's affiliates according to the required extent</li>
            <li>to the Company's partner network offering third party withdrawal related services</li>
            <li>to persons holding a legal or beneficial interest relating to the client's trading account</li>
            <li>to government, regulatory or law enforcement agencies</li>
            <li>to comply with civil, criminal or regulatory investigations</li>
          </ul>

          <h3>Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued dealings with us subsequent to any changes to this Privacy Policy will signify your consent to the collection, use, and disclosure of your Personal Information in accordance with the changed Privacy Policy.
          </p>

          <div className="support-box">
            <p>For general inquiries please contact</p>
            <a href="mailto:support@capitalgrowinvest-ment.com" className="support-btn">
              support@capitalgrowinvest-ment.com
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="privacy-footer">
        <div className="footer-grid">
          <div>
            <h4>Company</h4>
            <p><strong>ADDRESS</strong><br />1041 Elm St. Dallas,<br />TX</p>
          </div>
          <div>
            <h4>Legal</h4>
            <p>Terms & Conditions<br />Privacy & Policy</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>support@capitalgrowinvest-ment.com<br />+1 (272) 432-1134</p>
          </div>
        </div>

        <div className="risk-warning">
          <strong>RISK WARNING</strong>
          <p>
            Trading derivatives and leveraged products carries a high level of risk, including the risk of losing substantially more than your initial investment...
          </p>
        </div>

        <div className="copyright">
          © capitalgrowinvest-ment.com 2014-2025. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

