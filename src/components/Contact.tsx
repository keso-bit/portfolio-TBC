import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MailIcon, MapPinIcon, GithubIcon, SendIcon, SparklesIcon, CheckIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="section-wrapper contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <MailIcon size={14} />
            კონტაქტი
          </span>
          <h2 className="section-title">
            დავიწყოთ <span className="gradient-text">თანამშრომლობა</span>
          </h2>
          <p className="section-subtitle">
            გაქვთ საინტერესო პროექტი, იდეა ან ვაკანსია? მომწერეთ ნებისმიერ დროს და სწრაფად გიპასუხებთ!
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="contact-info-column">
            <div className="contact-card glass-panel" onClick={handleCopyEmail} style={{ cursor: 'pointer' }}>
              <div className="contact-icon-box">
                <MailIcon size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">ელ-ფოსტა (დააჭირეთ დასაკოპირებლად)</span>
                <span className="contact-card-value">{PERSONAL_INFO.email}</span>
                {copiedEmail && <span className="copied-tag">დაკოპირებულია!</span>}
              </div>
            </div>

            <div className="contact-card glass-panel">
              <div className="contact-icon-box">
                <MapPinIcon size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">ლოკაცია</span>
                <span className="contact-card-value">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card glass-panel contact-link-card"
            >
              <div className="contact-icon-box">
                <GithubIcon size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">GitHub პროფილი</span>
                <span className="contact-card-value">github.com / ნახვა &rarr;</span>
              </div>
            </a>

            {/* Availability Box */}
            <div className="status-notice glass-panel">
              <div className="pulsing-green-dot"></div>
              <div>
                <strong>ამჟამად თავისუფალი ვარ</strong>
                <p>ღია ვარ Freelance და Full-Time შემოთავაზებებისთვის React/TypeScript პოზიციებზე.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-column glass-panel">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="form-title">
                <SparklesIcon size={18} />
                მომწერეთ შეტყობინება
              </h3>

              {isSent && (
                <div className="alert-success">
                  <CheckIcon size={18} />
                  <span>მადლობა! თქვენი შეტყობინება წარმატებით გაიგზავნა.</span>
                </div>
              )}

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="contact-name">სახელი</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="გიორგი..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">ელ-ფოსტა</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your-email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">თემა</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="პროექტის განხილვა / შეკითხვა..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">შეტყობინება</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="გამარჯობა, მსურს პროექტის დეტალების განხილვა..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-full submit-btn"
              >
                {isSubmitting ? (
                  <span>იგზავნება...</span>
                ) : (
                  <>
                    <SendIcon size={18} />
                    <span>შეტყობინების გაგზავნა</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
