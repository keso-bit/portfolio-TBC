import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { CodeIcon, GithubIcon, ExternalLinkIcon, SearchIcon, StarIcon } from './Icons';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'React', 'Full-Stack', 'Frontend', 'Mobile / UI'];

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section-wrapper projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <CodeIcon size={14} />
            ნამუშევრები
          </span>
          <h2 className="section-title">
            გამორჩეული <span className="gradient-text">პროექტები</span>
          </h2>
          <p className="section-subtitle">
            ჩემი ბოლოდროინდელი ნამუშევრები, რეალური აპლიკაციები და ღია კოდის რეპოზიტორიები.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="projects-controls glass-panel">
          <div className="project-category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`project-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? 'ყველა' : cat}
              </button>
            ))}
          </div>

          <div className="projects-search-box">
            <SearchIcon size={16} className="search-box-icon" />
            <input
              type="text"
              placeholder="მოძებნეთ პროექტი ან ტექნოლოგია..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="projects-search-input"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <article key={project.id} className="project-card glass-panel">
              {/* Card Banner Preview */}
              <div
                className="project-banner"
                style={{ background: project.imageColor || 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
              >
                <div className="project-banner-overlay"></div>
                <div className="project-banner-header">
                  <span className="project-category-tag">{project.category}</span>
                  {project.stars && (
                    <span className="project-stars-tag">
                      <StarIcon size={13} />
                      {project.stars}
                    </span>
                  )}
                </div>
                <div className="project-banner-title">{project.title}</div>
              </div>

              {/* Card Body */}
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Tech Stack Tags */}
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag-pill">{tag}</span>
                  ))}
                </div>

                {/* Project Links (GitHub & Live Demo) */}
                <div className="project-footer-links">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm project-link-btn"
                    title="ნახეთ კოდი GitHub-ზე"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub კოდი</span>
                  </a>

                  <a
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm project-link-btn"
                    title="გახსენით Live დემო"
                  >
                    <ExternalLinkIcon size={16} />
                    <span>Live ნახვა</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="projects-empty glass-panel">
            <p>პროექტი ვერ მოიძებნა &ldquo;{searchQuery}&rdquo;</p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            >
              ყველა პროექტის ჩვენება
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
