import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';
import { LayoutIcon, StarIcon, FilterIcon } from './Icons';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Frontend', 'Backend', 'Tools & DevOps', 'Design & Others'];

  const filteredSkills = SKILLS.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section-wrapper skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <LayoutIcon size={14} />
            ტექნოლოგიური სტეკი
          </span>
          <h2 className="section-title">
            ინსტრუმენტები & <span className="gradient-text">უნარ-ჩვევები</span>
          </h2>
          <p className="section-subtitle">
            ტექნოლოგიები, რომლებსაც ყოველდღიურად ვიყენებ თანამედროვე, სტაბილური და სწრაფი ვებ-აპლიკაციების ასაშენებლად.
          </p>
        </div>

        {/* Categories & Filter Bar */}
        <div className="skills-filter-bar glass-panel">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All' ? 'ყველა ტექნოლოგია' : category}
              </button>
            ))}
          </div>

          <div className="skills-search-wrapper">
            <FilterIcon size={16} className="filter-icon" />
            <input
              type="text"
              placeholder="ფილტრი უნარის მიხედვით..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="skills-search-input"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="skill-card glass-panel">
              <div className="skill-card-top">
                <div className="skill-header-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-category-badge">{skill.category}</span>
                </div>
                {skill.popular && (
                  <span className="skill-popular-badge" title="ძირითადი ფოკუსი">
                    <StarIcon size={12} />
                    Core
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="skill-progress-wrapper">
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="skill-percentage">{skill.level}%</div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="no-skills-found">
            <p>მოცემული ფილტრით უნარი ვერ მოიძებნა &ldquo;{searchQuery}&rdquo;</p>
            <button className="btn btn-secondary btn-sm" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
              ფილტრის გასუფთავება
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
