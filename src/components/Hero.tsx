import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SparklesIcon, GithubIcon, MailIcon, CodeIcon, CheckCircleIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow-blob-1"></div>
      <div className="hero-glow-blob-2"></div>

      <div className="container hero-container">
        {/* Availability Badge */}
        <div className="hero-badge-wrapper">
          <div className="hero-pill">
            <span className="hero-pill-dot"></span>
            <span>{PERSONAL_INFO.status}</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          გამარჯობა, მე ვარ <span className="gradient-text">{PERSONAL_INFO.name}</span>
          <br />
          <span className="hero-subtext">React & Full-Stack დეველოპერი</span>
        </h1>

        {/* Description */}
        <p className="hero-description">
          {PERSONAL_INFO.bio} სპეციალიზებული ვარ მაღალი ხარისხის, სწრაფი და დახვეწილი მუქი დიზაინის
          ვებ-აპლიკაციების შექმნაზე.
        </p>

        {/* Action CTAs */}
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            <CodeIcon size={18} />
            პროექტების ნახვა
          </a>
          <a href="#todos" className="btn btn-secondary">
            <CheckCircleIcon size={18} />
            Todo დაფის ტესტირება
          </a>
          <a href="#contact" className="btn btn-outline">
            <MailIcon size={18} />
            დამიკავშირდით
          </a>
        </div>

        {/* Social Quick Links */}
        <div className="hero-socials">
          <span className="hero-socials-label">სოციალური ქსელები:</span>
          <div className="hero-social-icons">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="btn-icon" title="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-icon" title="Email">
              <MailIcon size={18} />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" title="LinkedIn">
              <SparklesIcon size={18} />
            </a>
          </div>
        </div>

        {/* Interactive Stats Grid */}
        <div className="hero-stats-grid">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="stat-card glass-panel">
              <div className="stat-value gradient-text">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
