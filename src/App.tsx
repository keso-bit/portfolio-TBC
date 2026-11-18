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
import type { TodoItem } from './types';
import { INITIAL_TODOS } from './data/portfolioData';
import './App.css';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TodoList todos={todos} setTodos={setTodos} />
        <Contact />
      </main>

      {/* Functional Footer */}
      <Footer />
    </div>
  );
}

export default App;
