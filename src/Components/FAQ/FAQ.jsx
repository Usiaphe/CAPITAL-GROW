import { useState } from "react";
import "./FAQ.css"; // Make sure the file exists

const faqs = [
  {
    question: "Company Faq",
    answer: `The Financial Conduct Authority is a financial regulatory body in the United Kingdom, but operates independently of the UK Government, and is financed by charging fees to members of the financial services industry. We are NOT required to be regulated by The Financial Conduct Authority as a result we are NOT regulated by the Financial Conduct Authority. We are an educational company who provides insights into the Forex Markets.

Trade ideas (Signals) that we send are not intended for the purpose of live investment. They are intended for you to use as part of your analysis so you can understand forex better. Choosing to place a trade that we have commentated over is your own choice and we suggest speaking to a financial advisor before placing any trades on a live account. We are NOT financial Advisors, we ARE Educators and are regulated as a business by Companies House-HMRC.`,
  },
  {
    question: "What is Forex?",
    answer: `The foreign exchange market (forex, FX, or currency market) is a worldwide decentralized over-the-counter financial market for the trading of currencies. The foreign exchange market is the largest and most liquid financial market in the world. Traders include large banks, central banks, currency speculators, corporations, governments, and other financial institutions. The average daily volume in the global foreign exchange and related markets is continuously growing. Daily turnover was reported to be over US $3.98 trillion in April 2010 by the Bank for International Settlements.`,
  },
  {
    question: "Are there fees for depositing?",
    answer: "No fees for Credit/Debit card or Wire Transfer. Bitcoin deposits have only the standard network fee.",
  },
  {
    question: "How do I know that the funds have reached us?",
    answer: "You will receive an automatic email notification and the funds appear instantly in your vault.",
  },
  {
    question: "How long does it take for funds to appear?",
    answer: "Bitcoin: up to 6 confirmations (max 6 hours). Card/Wire: instant or 1–3 business days.",
  },
  {
    question: "What are my depositing options?",
    answer: "Credit/Debit Card, Bank Wire Transfer, Bitcoin.",
  },
  {
    question: "How can I change my e-mail address or password?",
    answer: "Log into your account → Account Settings → Change Email/Password.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1 className="faq-title">Company FAQ</h1>

        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(i)}>
              <span>{faq.question}</span>
              <span className={`faq-arrow ${openIndex === i ? "open" : ""}`}>▼</span>
            </div>

            {openIndex === i && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}

        <div className="faq-support">
          <p>For general inquiries please contact</p>
          <a href="mailto:support@capitalgrowinvest-ment.com" className="support-btn">
            support@capitalgrowinvest-ment.com
          </a>
        </div>
      </div>

      {/* Footer Risk Warning */}
      <div className="risk-warning">
        <strong>Risk warning</strong>
        <p>
          The financial products offered via this website include digitals, contracts for difference (CFDs), and other complex derivatives and financial products. Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. As a result, the products offered on this website may not be suitable for all investors because of the risk of losing all of your invested capital. You should never invest money that you cannot afford to lose, and never trade with borrowed money. Before trading in the complex financial products offered, please be sure to understand the risks involved.
        </p>
      </div>
    </div>
  );
}


