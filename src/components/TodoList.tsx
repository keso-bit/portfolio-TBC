import React, { useState } from 'react';
import type { TodoItem } from '../types';
import { 
  CheckCircleIcon, 
  CircleIcon, 
  PlusIcon, 
  TrashIcon, 
  EditIcon, 
  CheckIcon, 
  XIcon, 
  SearchIcon, 
  CalendarIcon,
  SparklesIcon
} from './Icons';

interface TodoListProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [newText, setNewText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState<'Development' | 'Design' | 'Study' | 'Personal'>('Development');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  // Add task
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newTodo: TodoItem = {
      id: `todo-${Date.now()}`,
      text: newText.trim(),
      completed: false,
      priority,
      category,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTodos(prev => [newTodo, ...prev]);
    setNewText('');
  };

  // Toggle completed
  const handleToggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Delete todo
  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Start edit
  const handleStartEdit = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // Save edit
  const handleSaveEdit = (id: string) => {
    if (!editingText.trim()) return;
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: editingText.trim() } : t));
    setEditingId(null);
    setEditingText('');
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Clear completed
  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  // Filtered todos
  const filteredTodos = todos.filter(todo => {
    // Status filter
    if (statusFilter === 'active' && todo.completed) return false;
    if (statusFilter === 'completed' && !todo.completed) return false;

    // Category filter
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;

    // Search query
    if (searchQuery.trim() && !todo.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Stats
  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section id="todos" className="section-wrapper todo-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <CheckCircleIcon size={14} />
            სამუშაო დაფა & Todo
          </span>
          <h2 className="section-title">
            ინტერაქტიული <span className="gradient-text">სამუშაო Todo დაფა</span>
          </h2>
          <p className="section-subtitle">
            მართეთ თქვენი ყოველდღიური ამოცანები და მიზნები. მონაცემები ინახება თქვენს ბრაუზერში (LocalStorage) და არ იკარგება გვერდის განახლებისას.
          </p>
        </div>

        {/* Dashboard Card */}
        <div className="todo-dashboard glass-panel">
          {/* Top Progress & Metrics Header */}
          <div className="todo-stats-bar">
            <div className="todo-stat-item">
              <span className="todo-stat-num">{totalCount}</span>
              <span className="todo-stat-text">სულ დავალება</span>
            </div>
            <div className="todo-stat-divider"></div>
            <div className="todo-stat-item">
              <span className="todo-stat-num text-warning">{activeCount}</span>
              <span className="todo-stat-text">შესასრულებელი</span>
            </div>
            <div className="todo-stat-divider"></div>
            <div className="todo-stat-item">
              <span className="todo-stat-num text-success">{completedCount}</span>
              <span className="todo-stat-text">დასრულებული</span>
            </div>
            <div className="todo-progress-box">
              <div className="todo-progress-labels">
                <span>პროგრესი</span>
                <span className="todo-percent">{progressPercent}%</span>
              </div>
              <div className="todo-progress-track">
                <div
                  className="todo-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Add Todo Form */}
          <form className="todo-input-form" onSubmit={handleAddTodo}>
            <div className="todo-input-row">
              <div className="todo-input-field-wrapper">
                <input
                  type="text"
                  placeholder="რა გაქვთ დღეს დასაგეგმი? ჩაწერეთ ახალი დავალება..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="todo-text-input"
                />
              </div>

              <div className="todo-selectors-row">
                {/* Category select */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'Development' | 'Design' | 'Study' | 'Personal')}
                  className="todo-custom-select"
                  aria-label="კატეგორიის არჩევა"
                >
                  <option value="Development">💻 Development</option>
                  <option value="Design">🎨 Design</option>
                  <option value="Study">📚 Study</option>
                  <option value="Personal">🌟 Personal</option>
                </select>

                {/* Priority select */}
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="todo-custom-select"
                  aria-label="პრიორიტეტის არჩევა"
                >
                  <option value="low">🟢 დაბალი პრიორიტეტი</option>
                  <option value="medium">🟡 საშუალო პრიორიტეტი</option>
                  <option value="high">🔴 მაღალი პრიორიტეტი</option>
                </select>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary todo-add-btn">
                  <PlusIcon size={18} />
                  <span>დამატება</span>
                </button>
              </div>
            </div>
          </form>

          {/* Controls: Search & Filters */}
          <div className="todo-filters-bar">
            {/* Status Tabs */}
            <div className="todo-status-tabs">
              <button
                className={`todo-tab ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                ყველა ({totalCount})
              </button>
              <button
                className={`todo-tab ${statusFilter === 'active' ? 'active' : ''}`}
                onClick={() => setStatusFilter('active')}
              >
                აქტიური ({activeCount})
              </button>
              <button
                className={`todo-tab ${statusFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setStatusFilter('completed')}
              >
                დასრულებული ({completedCount})
              </button>
            </div>

            {/* In-todo Search & Category Filter */}
            <div className="todo-search-and-cat">
              <div className="todo-search-field">
                <SearchIcon size={16} className="todo-search-icon" />
                <input
                  type="text"
                  placeholder="ძიება დავალებებში..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="todo-sub-search"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="todo-sub-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    <XIcon size={14} />
                  </button>
                )}
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="todo-filter-select"
                aria-label="ფილტრი კატეგორიით"
              >
                <option value="all">ყველა კატეგორია</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Study">Study</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>

          {/* Task Items List */}
          <div className="todo-items-list">
            {filteredTodos.length === 0 ? (
              <div className="todo-empty-state">
                <div className="empty-icon-circle">
                  <SparklesIcon size={28} />
                </div>
                <h4>დავალებები ვერ მოიძებნა</h4>
                <p>
                  {searchQuery
                    ? `საძიებო სიტყვით "${searchQuery}" შედეგი არ არის.`
                    : statusFilter === 'completed'
                    ? 'დასრულებული დავალებები ჯერ არ არის.'
                    : 'დაამატეთ ახალი დავალება ზედა ფორმიდან!'}
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => {
                const isEditing = editingId === todo.id;

                return (
                  <div
                    key={todo.id}
                    className={`todo-item-card ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
                  >
                    {/* Checkbox */}
                    <button
                      type="button"
                      className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                      onClick={() => handleToggleTodo(todo.id)}
                      aria-label={todo.completed ? 'მონიშვნის მოხსნა' : 'შესრულებულად მონიშვნა'}
                    >
                      {todo.completed ? <CheckIcon size={14} /> : <CircleIcon size={14} />}
                    </button>

                    {/* Content or Edit Input */}
                    <div className="todo-item-content">
                      {isEditing ? (
                        <div className="todo-edit-wrapper">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(todo.id);
                              if (e.key === 'Escape') handleCancelEdit();
                            }}
                            className="todo-edit-input"
                            autoFocus
                          />
                          <button
                            type="button"
                            className="btn-icon btn-sm action-save"
                            onClick={() => handleSaveEdit(todo.id)}
                            title="შენახვა"
                          >
                            <CheckIcon size={16} />
                          </button>
                          <button
                            type="button"
                            className="btn-icon btn-sm action-cancel"
                            onClick={handleCancelEdit}
                            title="გაუქმება"
                          >
                            <XIcon size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="todo-text-block">
                          <span className={`todo-item-title ${todo.completed ? 'line-through' : ''}`}>
                            {todo.text}
                          </span>
                          <div className="todo-item-meta">
                            <span className={`todo-cat-badge cat-${todo.category.toLowerCase()}`}>
                              {todo.category}
                            </span>
                            <span className={`todo-priority-badge priority-${todo.priority}`}>
                              {todo.priority === 'high' ? '🔴 მაღალი' : todo.priority === 'medium' ? '🟡 საშუალო' : '🟢 დაბალი'}
                            </span>
                            <span className="todo-date">
                              <CalendarIcon size={12} />
                              {todo.createdAt}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions: Edit & Delete */}
                    {!isEditing && (
                      <div className="todo-item-actions">
                        <button
                          type="button"
                          className="btn-icon btn-sm todo-action-btn"
                          onClick={() => handleStartEdit(todo)}
                          title="რედაქტირება"
                          aria-label="დავალების რედაქტირება"
                        >
                          <EditIcon size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon btn-sm todo-action-btn delete-btn"
                          onClick={() => handleDeleteTodo(todo.id)}
                          title="წაშლა"
                          aria-label="დავალების წაშლა"
                        >
                          <TrashIcon size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Controls */}
          {completedCount > 0 && (
            <div className="todo-footer-bar">
              <span className="todo-footer-info">
                დასრულებულია: {completedCount} / {totalCount}
              </span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleClearCompleted}
              >
                <TrashIcon size={14} />
                დასრულებულების გასუფთავება
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
