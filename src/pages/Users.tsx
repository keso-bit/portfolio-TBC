import { useEffect, useState } from 'react';
import {
  SearchIcon,
  XIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  BuildingIcon,
  MapPinIcon,
  ExternalLinkIcon,
  SparklesIcon,
  ArrowLeftIcon,
  UsersIcon,
  AlertCircleIcon,
} from '../components/Icons';
import type { User } from '../types';
import './Users.css';

interface UsersProps {
  onBackToHome?: () => void;
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
  'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
  'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
];

function getInitials(name: string): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function Users({ onBackToHome }: UsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('მომხმარებლების ჩატვირთვა ვერ მოხერხდა. სცადეთ მოგვიანებით.');
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.hash = '#hero';
    }
  };

  const popularSuggestions = ['Leanne', 'Ervin', 'Clementine', 'Patricia', 'Chelsey'];

  return (
    <div className="users-page">
      <div className="container">
        {/* Page Top Navigation & Status */}
        <div className="users-top-bar">
          <button
            type="button"
            className="users-back-btn"
            onClick={handleBack}
            title="მთავარ გვერდზე დაბრუნება"
          >
            <ArrowLeftIcon size={18} />
            <span>მთავარ გვერდზე დაბრუნება</span>
          </button>

          <div className="users-status-pill">
            <span className="pulsing-green-dot"></span>
            <span>JSONPlaceholder API Connected</span>
          </div>
        </div>

        {/* Section Header */}
        <header className="users-page-header">
          <div className="section-tag">
            <UsersIcon size={14} />
            <span>API კატალოგი</span>
          </div>
          <h1 className="users-title">
            მომხმარებელთა <span className="gradient-text">კატალოგი</span>
          </h1>
          <p className="users-subtitle">
            JSONPlaceholder API-დან დინამიკურად ჩატვირთული მომხმარებლების სია რეალურ დროში ძიებითა და თანამედროვე ინტერფეისით.
          </p>

          {/* Stats Badges */}
          <div className="users-stats-row">
            <div className="users-stat-chip">
              <SparklesIcon size={14} />
              <span>სულ მომხმარებელი: <strong>{users.length}</strong></span>
            </div>
            <div className="users-stat-chip">
              <SearchIcon size={14} />
              <span>ნაპოვნია: <strong>{filteredUsers.length}</strong></span>
            </div>
          </div>
        </header>

        {/* Search Bar Section */}
        <div className="users-search-section">
          <div className="users-search-wrapper">
            <div className="users-search-icon">
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              className="users-search-input"
              placeholder="მოძებნეთ მომხმარებელი სახელით... (მაგ: Leanne, Ervin...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <div className="users-search-actions">
              {search && (
                <button
                  type="button"
                  className="users-clear-btn"
                  onClick={() => setSearch('')}
                  title="ძიების გასუფთავება"
                  aria-label="ძიების გასუფთავება"
                >
                  <XIcon size={16} />
                </button>
              )}
              <span className="users-search-count-pill">
                {filteredUsers.length} შედეგი
              </span>
            </div>
          </div>

          {/* Quick Filter Suggestions */}
          {!loading && users.length > 0 && (
            <div className="users-quick-tags">
              <span className="users-quick-label">სწრაფი ძიება:</span>
              {popularSuggestions.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="users-tag-btn"
                  onClick={() => setSearch(name)}
                >
                  {name}
                </button>
              ))}
              {search && (
                <button
                  type="button"
                  className="users-tag-btn"
                  onClick={() => setSearch('')}
                  style={{ color: '#f87171' }}
                >
                  გასუფთავება ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="users-empty-state" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <div className="users-empty-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <AlertCircleIcon size={28} />
            </div>
            <h3 className="users-empty-title">{error}</h3>
            <p className="users-empty-desc">გთხოვთ შეამოწმოთ ინტერნეტის კავშირი და სცადოთ ხელახლა.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setLoading(true);
                setError(null);
                fetch('https://jsonplaceholder.typicode.com/users')
                  .then((res) => res.json())
                  .then((data) => {
                    setUsers(data);
                    setLoading(false);
                  })
                  .catch(() => {
                    setError('მომხმარებლების ჩატვირთვა ვერ მოხერხდა.');
                    setLoading(false);
                  });
              }}
            >
              ხელახლა ცდა
            </button>
          </div>
        )}

        {/* Loading Skeleton Grid */}
        {loading && (
          <div className="users-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="user-skeleton-card">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="skeleton-avatar skeleton-shimmer"></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton-line w-75 skeleton-shimmer"></div>
                    <div className="skeleton-line w-40 skeleton-shimmer"></div>
                  </div>
                </div>
                <div className="skeleton-line w-100 skeleton-shimmer"></div>
                <div className="skeleton-line w-75 skeleton-shimmer"></div>
                <div className="skeleton-line w-50 skeleton-shimmer"></div>
                <div style={{ marginTop: '2rem' }}>
                  <div className="skeleton-line w-100 skeleton-shimmer" style={{ height: '36px' }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users Cards Grid */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="users-grid">
            {filteredUsers.map((user: User) => {
              const gradient = AVATAR_GRADIENTS[(user.id - 1) % AVATAR_GRADIENTS.length];
              const initials = getInitials(user.name);
              const websiteUrl = user.website?.startsWith('http')
                ? user.website
                : `https://${user.website}`;

              return (
                <article key={user.id} className="user-card">
                  {/* Card Header with Avatar and Names */}
                  <div className="user-card-header">
                    <div className="user-avatar-wrap">
                      <div className="user-avatar" style={{ background: gradient }}>
                        {initials}
                      </div>
                      <span className="user-online-dot" title="აქტიური მომხმარებელი"></span>
                    </div>

                    <div className="user-header-info">
                      <div className="user-id-row">
                        <span className="user-username-badge">@{user.username || 'user'}</span>
                        <span className="user-id-badge">#{user.id}</span>
                      </div>
                      <h3 className="user-name-title" title={user.name}>
                        {user.name}
                      </h3>
                    </div>
                  </div>

                  {/* Contact Details Body */}
                  <div className="user-card-body">
                    {/* Email */}
                    <a
                      href={`mailto:${user.email}`}
                      className="user-info-row"
                      title={`წერილის გაგზავნა: ${user.email}`}
                    >
                      <span className="user-info-icon">
                        <MailIcon size={16} />
                      </span>
                      <span className="user-info-text">{user.email}</span>
                    </a>

                    {/* Phone */}
                    {user.phone && (
                      <a
                        href={`tel:${user.phone}`}
                        className="user-info-row"
                        title={`დარეკვა: ${user.phone}`}
                      >
                        <span className="user-info-icon">
                          <PhoneIcon size={16} />
                        </span>
                        <span className="user-info-text">{user.phone}</span>
                      </a>
                    )}

                    {/* Location */}
                    {user.address && (
                      <div className="user-info-row" title={`${user.address.city}, ${user.address.street}`}>
                        <span className="user-info-icon" style={{ color: '#f43f5e' }}>
                          <MapPinIcon size={16} />
                        </span>
                        <span className="user-info-text">
                          {user.address.city}, {user.address.street}
                        </span>
                      </div>
                    )}

                    {/* Company Information */}
                    {user.company && (
                      <div className="user-company-box">
                        <div className="user-company-header">
                          <span className="user-info-icon">
                            <BuildingIcon size={15} />
                          </span>
                          <span>{user.company.name}</span>
                        </div>
                        {user.company.catchPhrase && (
                          <p className="user-company-catchphrase">
                            "{user.company.catchPhrase}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="user-card-footer">
                    <a
                      href={`mailto:${user.email}`}
                      className="user-action-btn primary"
                      title="კონტაქტი ელ-ფოსტით"
                    >
                      <MailIcon size={15} />
                      <span>დაკავშირება</span>
                    </a>

                    {user.website && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="user-action-btn secondary"
                        title={`ვებსაიტის მონახულება: ${user.website}`}
                      >
                        <GlobeIcon size={15} />
                        <span>საიტი</span>
                        <ExternalLinkIcon size={12} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State when no users match search */}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="users-empty-state">
            <div className="users-empty-icon">
              <SearchIcon size={28} />
            </div>
            <h3 className="users-empty-title">მომხმარებელი ვერ მოიძებნა</h3>
            <p className="users-empty-desc">
              საძიებო სიტყვით <strong>"{search}"</strong> მომხმარებელი ვერ მოიძებნა. სცადეთ სხვა სახელი ან გაასუფთავეთ საძიებო ველი.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setSearch('')}
            >
              ძიების გასუფთავება
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
