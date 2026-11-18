import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon, CodeIcon, LayoutIcon, CheckCircleIcon, SparklesIcon } from './Icons';
import { PROJECTS, SKILLS } from '../data/portfolioData';
import type { TodoItem, SearchResult } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  todos: TodoItem[];
  onSelectTodo?: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, todos }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter sections, projects, skills, and todos
  const normalizedQuery = query.toLowerCase().trim();

  const sections = [
    { id: 'hero', title: 'მთავარი (Home)', subtitle: 'შესავალი და მთავარი გვერდი', type: 'section', targetId: 'hero', icon: 'sparkles' },
    { id: 'about', title: 'ჩემ შესახებ (About)', subtitle: 'ბიოგრაფია, მიდგომა და ფილოსოფია', type: 'section', targetId: 'about', icon: 'code' },
    { id: 'skills', title: 'უნარები და სტეკი (Skills)', subtitle: 'React, TypeScript, Node.js, ხელსაწყოები', type: 'section', targetId: 'skills', icon: 'layout' },
    { id: 'projects', title: 'პროექტები (Projects)', subtitle: 'შესრულებული ნამუშევრები და GitHub რეპოზიტორიები', type: 'section', targetId: 'projects', icon: 'code' },
    { id: 'todos', title: 'სამუშაო დაფა (Todo App)', subtitle: 'ინტერაქტიული დავალებების მენეჯერი', type: 'section', targetId: 'todos', icon: 'check' },
    { id: 'contact', title: 'კონტაქტი (Contact)', subtitle: 'დამიკავშირდით თანამშრომლობისთვის', type: 'section', targetId: 'contact', icon: 'sparkles' },
  ] as SearchResult[];

  const matchingSections = normalizedQuery
    ? sections.filter(s => s.title.toLowerCase().includes(normalizedQuery) || s.subtitle.toLowerCase().includes(normalizedQuery))
    : sections.slice(0, 3);

  const matchingProjects = normalizedQuery
    ? PROJECTS.filter(p => 
        p.title.toLowerCase().includes(normalizedQuery) || 
        p.description.toLowerCase().includes(normalizedQuery) ||
        p.tags.some(t => t.toLowerCase().includes(normalizedQuery))
      ).map(p => ({
        id: p.id,
        title: p.title,
        subtitle: `${p.category} • ${p.tags.slice(0, 3).join(', ')}`,
        type: 'project' as const,
        targetId: 'projects',
        icon: 'code'
      }))
    : PROJECTS.slice(0, 3).map(p => ({
        id: p.id,
        title: p.title,
        subtitle: `${p.category} • ${p.tags.slice(0, 3).join(', ')}`,
        type: 'project' as const,
        targetId: 'projects',
        icon: 'code'
      }));

  const matchingSkills = normalizedQuery
    ? SKILLS.filter(s => 
        s.name.toLowerCase().includes(normalizedQuery) || 
        s.category.toLowerCase().includes(normalizedQuery)
      ).map(s => ({
        id: s.name,
        title: s.name,
        subtitle: `${s.category} • დონე: ${s.level}%`,
        type: 'skill' as const,
        targetId: 'skills',
        icon: 'layout'
      }))
    : [];

  const matchingTodos = normalizedQuery
    ? todos.filter(t => 
        t.text.toLowerCase().includes(normalizedQuery) || 
        t.category.toLowerCase().includes(normalizedQuery)
      ).map(t => ({
        id: t.id,
        title: t.text,
        subtitle: `Todo [${t.category}] • პრიორიტეტი: ${t.priority} • ${t.completed ? 'დასრულებული' : 'აქტიური'}`,
        type: 'todo' as const,
        targetId: 'todos',
        icon: 'check'
      }))
    : [];

  const handleSelectResult = (targetId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const totalResults = matchingSections.length + matchingProjects.length + matchingSkills.length + matchingTodos.length;

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-header">
          <SearchIcon size={22} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="მოძებნეთ პროექტი, უნარი, Todo ან განყოფილება... (Ctrl + K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-modal-input"
          />
          {query && (
            <button className="search-clear-btn" onClick={() => setQuery('')} aria-label="გასუფთავება">
              <XIcon size={16} />
            </button>
          )}
          <button className="search-close-btn" onClick={onClose} aria-label="დახურვა">
            <kbd>ESC</kbd>
          </button>
        </div>

        <div className="search-results-list">
          {totalResults === 0 ? (
            <div className="search-empty">
              <p>შედეგი არ მოიძებნა &ldquo;{query}&rdquo;-სთვის</p>
              <span>სცადეთ: React, TypeScript, Todo, GitHub, Projects...</span>
            </div>
          ) : (
            <>
              {matchingSections.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">განყოფილებები</div>
                  {matchingSections.map(item => (
                    <div key={item.id} className="search-item" onClick={() => handleSelectResult(item.targetId)}>
                      <div className="search-item-icon">
                        <SparklesIcon size={16} />
                      </div>
                      <div className="search-item-info">
                        <span className="search-item-title">{item.title}</span>
                        <span className="search-item-subtitle">{item.subtitle}</span>
                      </div>
                      <span className="search-item-badge">გადასვლა</span>
                    </div>
                  ))}
                </div>
              )}

              {matchingProjects.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">პროექტები</div>
                  {matchingProjects.map(item => (
                    <div key={item.id} className="search-item" onClick={() => handleSelectResult(item.targetId)}>
                      <div className="search-item-icon project-icon">
                        <CodeIcon size={16} />
                      </div>
                      <div className="search-item-info">
                        <span className="search-item-title">{item.title}</span>
                        <span className="search-item-subtitle">{item.subtitle}</span>
                      </div>
                      <span className="search-item-badge">პროექტი</span>
                    </div>
                  ))}
                </div>
              )}

              {matchingSkills.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">ტექნოლოგიები და უნარები</div>
                  {matchingSkills.map(item => (
                    <div key={item.id} className="search-item" onClick={() => handleSelectResult(item.targetId)}>
                      <div className="search-item-icon skill-icon">
                        <LayoutIcon size={16} />
                      </div>
                      <div className="search-item-info">
                        <span className="search-item-title">{item.title}</span>
                        <span className="search-item-subtitle">{item.subtitle}</span>
                      </div>
                      <span className="search-item-badge">სტეკი</span>
                    </div>
                  ))}
                </div>
              )}

              {matchingTodos.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">Todo დავალებები</div>
                  {matchingTodos.map(item => (
                    <div key={item.id} className="search-item" onClick={() => handleSelectResult(item.targetId)}>
                      <div className="search-item-icon todo-icon">
                        <CheckCircleIcon size={16} />
                      </div>
                      <div className="search-item-info">
                        <span className="search-item-title">{item.title}</span>
                        <span className="search-item-subtitle">{item.subtitle}</span>
                      </div>
                      <span className="search-item-badge">დავალება</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="search-footer">
          <div className="search-shortcuts">
            <span>ნავიგაცია: <b>↑</b> <b>↓</b></span>
            <span>არჩევა: <b>↵ Enter</b></span>
            <span>დახურვა: <b>ESC</b></span>
          </div>
          <span className="search-hint">მყისიერი ძიება მთელ პორთფოლიოში</span>
        </div>
      </div>
    </div>
  );
};
