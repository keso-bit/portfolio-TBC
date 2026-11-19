import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { TodoList } from './components/TodoList';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import Users from './pages/Users';
import type { TodoItem } from './types';
import { INITIAL_TODOS } from './data/portfolioData';
import './App.css';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'users'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#users' || hash === '#/users') {
        return 'users';
      }
    }
    return 'home';
  });

  // Sync hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#users' || hash === '#/users') {
        setCurrentPage('users');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'users', targetSection?: string) => {
    setCurrentPage(page);
    if (page === 'users') {
      window.location.hash = '#users';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (targetSection && targetSection !== 'hero') {
        window.location.hash = `#${targetSection}`;
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.location.hash = '#hero';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Todo state with LocalStorage persistence
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const saved = localStorage.getItem('voto_portfolio_todos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load todos from localStorage', e);
    }
    return INITIAL_TODOS;
  });

  // Save todos to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('voto_portfolio_todos', JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos to localStorage', e);
    }
  }, [todos]);

  // Global Ctrl + K / Cmd + K search shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Search Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        todos={todos}
      />

      {/* Navigation Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {currentPage === 'users' ? (
          <Users onBackToHome={() => navigateTo('home')} />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <TodoList todos={todos} setTodos={setTodos} />
            <Contact />
          </>
        )}
      </main>

      {/* Functional Footer */}
      <Footer />
    </div>
  );
}

export default App;