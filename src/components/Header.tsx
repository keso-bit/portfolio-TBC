import React, { useState, useEffect } from 'react';
import { SearchIcon, GithubIcon, MenuIcon, XIcon, SparklesIcon, UsersIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenSearch: () => void;
  currentPage?: 'home' | 'users';
  onNavigate?: (page: 'home' | 'users', targetSection?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, currentPage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'მთავარი', href: '#hero', id: 'hero' },
    { label: 'ჩემ შესახებ', href: '#about', id: 'about' },
    { label: 'უნარები', href: '#skills', id: 'skills' },
    { label: 'პროექტები', href: '#projects', id: 'projects' },
    { label: 'Todo დაფა', href: '#todos', id: 'todos', badge: 'New' },
    { label: 'მომხმარებლები', href: '#users', id: 'users', badge: 'API' },
    { label: 'კონტაქტი', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    if (currentPage === 'users') {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'todos', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id === 'users') {
      if (onNavigate) {
        onNavigate('users');
      } else {
        window.location.hash = '#users';
      }
      return;
    }

    if (currentPage === 'users') {
      if (onNavigate) {
        onNavigate('home', id);
      } else {
        window.location.hash = href;
      }
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentActive = currentPage === 'users' ? 'users' : activeSection;

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage === 'users') {
              if (onNavigate) onNavigate('home', 'hero');
              else window.location.hash = '#hero';
            } else {
              handleNavClick(e, '#hero', 'hero');
            }
          }}
        >
          <div className="logo-symbol">
            <SparklesIcon size={18} className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="brand-name">{PERSONAL_INFO.name.split(' ')[0]}<span className="accent-dot">.dev</span></span>
            <span className="status-badge">
              <span className="pulsing-green-dot"></span>
              Available
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${currentActive === link.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href, link.id)}
            >
              {link.label}
              {link.badge && <span className="nav-badge">{link.badge}</span>}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="header-actions">
          {/* Users Page Button */}
          <button
            type="button"
            className={`users-header-btn ${currentPage === 'users' ? 'active' : ''}`}
            onClick={() => {
              if (currentPage === 'users') {
                if (onNavigate) onNavigate('home');
                else window.location.hash = '#hero';
              } else {
                if (onNavigate) onNavigate('users');
                else window.location.hash = '#users';
              }
            }}
            title={currentPage === 'users' ? 'მთავარ გვერდზე დაბრუნება' : 'მომხმარებლების გვერდი (Users)'}
            aria-label="მომხმარებლების გვერდი"
          >
            <UsersIcon size={16} />
            <span className="users-btn-text">Users</span>
            <span className="users-btn-indicator"></span>
          </button>

          {/* Quick Search Trigger */}
          <button
            type="button"
            className="search-trigger-btn"
            onClick={onOpenSearch}
            title="მოძებნეთ (Ctrl + K)"
            aria-label="ძიების ფანჯრის გახსნა"
          >
            <SearchIcon size={16} />
            <span className="search-placeholder-text">ძიება...</span>
            <kbd className="search-shortcut">⌘K</kbd>
          </button>

          {/* GitHub Profile Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon github-btn"
            title="GitHub პროფილის ნახვა"
            aria-label="GitHub პროფილი"
          >
            <GithubIcon size={19} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="მენიუს გადართვა"
          >
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-search-wrapper">
            <button
              className="mobile-search-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
            >
              <SearchIcon size={18} />
              <span>ძიება პორთფოლიოში... (Ctrl+K)</span>
            </button>
          </div>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`mobile-nav-link ${currentActive === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
              >
                <span>{link.label}</span>
                {link.badge && <span className="nav-badge">{link.badge}</span>}
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-full"
            >
              <GithubIcon size={18} />
              GitHub პროფილის ნახვა
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
