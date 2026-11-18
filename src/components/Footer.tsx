import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, MailIcon, SparklesIcon, ArrowUpIcon, CodeIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'მთავარი', href: '#hero' },
    { label: 'ჩემ შესახებ', href: '#about' },
    { label: 'უნარები', href: '#skills' },
    { label: 'პროექტები', href: '#projects' },
    { label: 'Todo დაფა', href: '#todos' },
    { label: 'კონტაქტი', href: '#contact' },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Top Footer Section */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <SparklesIcon size={20} className="footer-logo-icon" />
              <span className="footer-logo-text">
                {PERSONAL_INFO.name.split(' ')[0]}<span className="gradient-text">.dev</span>
              </span>
            </div>
            <p className="footer-bio">
              {PERSONAL_INFO.role} — თანამედროვე, სუფთა და სწრაფი ვებ-აპლიკაციები React-ისა და TypeScript-ის გამოყენებით.
            </p>
            <div className="footer-social-links">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="btn-icon" title="GitHub პროფილი">
                <GithubIcon size={18} />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-icon" title="ელ-ფოსტა">
                <MailIcon size={18} />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" title="LinkedIn">
                <SparklesIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">სწრაფი ნავიგაცია</h4>
            <ul className="footer-nav-list">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub & Deployment Info */}
          <div className="footer-deploy-col">
            <h4 className="footer-col-title">GitHub & Deployment</h4>
            <div className="deploy-badge glass-panel">
              <div className="deploy-icon-box">
                <CodeIcon size={18} />
              </div>
              <div className="deploy-badge-text">
                <span className="deploy-badge-title">GitHub Pages Ready</span>
                <span className="deploy-badge-subtitle">Vite base: './' & CI/CD workflow</span>
              </div>
            </div>
            <p className="footer-deploy-hint">
              რეპოზიტორიაში უკვე ჩაშენებულია <code>.github/workflows/deploy.yml</code> ფაილი ავტომატური ჰოსტინგისთვის.
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom Footer Section */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. შექმნილია React-ით და დახვეწილი მუქი დიზაინით.
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            title="ზემოთ დაბრუნება"
          >
            <span>ზემოთ დაბრუნება</span>
            <ArrowUpIcon size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
