import React from 'react';
import { CodeIcon, LayoutIcon, ServerIcon, SparklesIcon, CheckIcon, GithubIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const features = [
    {
      icon: <CodeIcon size={24} />,
      title: 'React & TypeScript ეკოსისტემა',
      description: 'სუფთა, ტიპიზირებული და მოდულარული კოდი. Component-Driven მიდგომა და Hook-ების ეფექტური გამოყენება.'
    },
    {
      icon: <LayoutIcon size={24} />,
      title: 'Dark UI & თანამედროვე დიზაინი',
      description: 'ესთეტიკური, თვალისთვის კომფორტული მუქი თემები, Glassmorphism, გლუვი ანიმაციები და სრული მობილური ადაპტაცია.'
    },
    {
      icon: <ServerIcon size={24} />,
      title: 'სრული Full-Stack ინტეგრაცია',
      description: 'RESTful API-ების, მონაცემთა ბაზებისა და Backend ლოგიკის დაკავშირება უსაფრთხო და სწრაფი კომუნიკაციით.'
    },
    {
      icon: <SparklesIcon size={24} />,
      title: 'GitHub & CI/CD გამართვა',
      description: 'ავტომატური Deploy GitHub Pages-ზე, Git ვერსიონირება და სუფთა დეველოპერული სამუშაო პროცესი.'
    }
  ];

  const philosophyPoints = [
    'სუფთა და წაკითხვადი კოდის წერა საუკეთესო პრაქტიკების დაცვით',
    'მაღალი წარმადობა და სწრაფი ჩატვირთვის დრო (Lighthouse 95+)',
    'დეტალებზე ორიენტირებული UI/UX დიზაინი',
    'მუდმივი განვითარება და უახლესი ვებ ტექნოლოგიების დანერგვა'
  ];

  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <SparklesIcon size={14} />
            ჩემ შესახებ
          </span>
          <h2 className="section-title">
            ვაერთიანებ <span className="gradient-text">კოდის სისუფთავესა</span> და თანამედროვე დიზაინს
          </h2>
          <p className="section-subtitle">
            ჩემი მიზანია შევქმნა პროდუქტები, რომლებიც არა მხოლოდ უნაკლოდ ფუნქციონირებს, არამედ მომხმარებელს დახვეწილ ვიზუალურ გამოცდილებას ანიჭებს.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="about-features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card glass-panel">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Philosophy & Highlights Box */}
        <div className="about-details-card glass-panel">
          <div className="about-details-left">
            <h3 className="about-subheading">ჩემი სამუშაო მიდგომა & პრინციპები</h3>
            <p className="about-text">
              ყოველი პროექტი იწყება მომხმარებლის საჭიროებების გააზრებით და არქიტექტურის სწორი დაგეგმვით.
              დიდ ყურადღებას ვუთმობ კომპონენტების ხელახლა გამოყენებადობას, მდგომარეობის (State) ეფექტურ მართვასა და
              GitHub-ზე პროექტების სრულყოფილ გამართვას.
            </p>
            <div className="about-actions">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <GithubIcon size={18} />
                GitHub რეპოზიტორიები
              </a>
              <a href="#contact" className="btn btn-primary">
                დამიკავშირდით პროექტისთვის
              </a>
            </div>
          </div>

          <div className="about-details-right">
            <h4 className="checklist-heading">რა გამოარჩევს ჩემს ნამუშევარს:</h4>
            <div className="checklist-items">
              {philosophyPoints.map((point, index) => (
                <div key={index} className="checklist-item">
                  <div className="checklist-icon">
                    <CheckIcon size={14} />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
