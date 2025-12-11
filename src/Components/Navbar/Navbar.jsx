import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const forexData = [
  { pair: 'USDJPY', price: '109.59', up: true },
  { pair: 'USDCAD', price: '1.3172', up: true },
  { pair: 'USDCHF', price: '0.9776', up: true },
  { pair: 'AUDUSD', price: '0.67064', up: false },
  { pair: 'GBPJPY', price: '141.91', up: true },
  { pair: 'XAUUSD', price: '1478.81', up: true },
];

const navLinks = ['Home', 'About', 'Contact', 'FAQ', 'Privacy'];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Forex Ticker */}
      <div className="ticker-container">
        <div className="ticker">
          {[...forexData, ...forexData].map((item, i) => (
            <div key={i} className="ticker-item">
              <span className="pair">{item.pair}</span>
              <span className="price">{item.price}</span>
              <span className={`change ${item.up ? 'up' : 'down'}`}>
                {item.up ? 'Up' : 'Down'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-content">

          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">G</div>
            <div className="logo-text">
              <h1>
                <span className="capital">CAPITAL</span>
                <span className="grow"> GROW</span>
              </h1>
              <p className="investment">INVESTMENT</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navLinks.map(link => {
              const path = link.toLowerCase();
              return (
                <Link key={link} to={path === 'home' ? '/' : `/${path}`}>
                  {link}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Buttons */}
          <button className="desktop-btn">Login Account</button>
          <button className="desktop-btn">Open Account</button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map(link => {
              const path = link.toLowerCase();
              return (
                <Link
                  key={link}
                  to={path === 'home' ? '/' : `/${path}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </Link>
              );
            })}
            <button className="mobile-login-btn"> Register</button>
            <button className="mobile-login-btn">Login</button>
          </div>
        )}
      </header>
    </>
  );
}
