import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  Search, Filter, Download, Edit2, Trash2,
  Utensils, Car, Lightbulb, Film, ShoppingBag,
  X, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Expense({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  /* ---------------- SAFE MOBILE STATE ---------------- */
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ---------------- DATE ---------------- */
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${now.getMonth()}`;

  /* ---------------- CATEGORY CONFIG ---------------- */
  const categoryConfig = {
    'Food & Dining': { icon: Utensils, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Food' },
    'Transportation': { icon: Car, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Transport' },
    'Bills & Utilities': { icon: Lightbulb, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Bills' },
    'Entertainment': { icon: Film, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Fun' },
    'Shopping': { icon: ShoppingBag, color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Shop' },
  };

  /* ---------------- LOAD EXPENSES SAFELY ---------------- */
  const [allExpenses, setAllExpenses] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('expensesByMonth');
    if (saved) {
      const parsed = JSON.parse(saved);
      const expenses = Object.values(parsed)
        .flat()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllExpenses(expenses);
    }
  }, []);

  /* ---------------- FILTER STATES ---------------- */
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('All Time');

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredExpenses = allExpenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonthKey = `${expenseDate.getFullYear()}-${expenseDate.getMonth()}`;

    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;

    let matchesTime = true;
    if (selectedTimeRange === 'This Month') {
      matchesTime = expenseMonthKey === currentMonthKey;
    } else if (selectedTimeRange === 'Last Month') {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      matchesTime = expenseMonthKey === `${lastMonth.getFullYear()}-${lastMonth.getMonth()}`;
    }

    return matchesSearch && matchesCategory && matchesTime;
  });

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categories = ['All', ...new Set(allExpenses.map(e => e.category))];

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id) => {
    if (typeof window === 'undefined') return;
    if (!window.confirm('Delete this expense?')) return;

    const updated = allExpenses.filter(e => e.id !== id);
    setAllExpenses(updated);

    // Update localStorage
    const grouped = {};
    updated.forEach(exp => {
      const d = new Date(exp.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(exp);
    });
    localStorage.setItem('expensesByMonth', JSON.stringify(grouped));
  };

  /* ---------------- EXPORT CSV ---------------- */
  const exportToCSV = () => {
    if (typeof window === 'undefined') return;
    
    const headers = ['Title', 'Category', 'Date', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredExpenses.map(e => `"${e.title}","${e.category}","${e.date}","${e.amount}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  /* ---------------- HELPERS ---------------- */
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTimeRange('All Time');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedTimeRange !== 'All Time';

  /* ================= UI ================= */

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">

        {/* MOBILE FILTER TOGGLE */}
        {isMobile && (
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border mb-4 ${
              darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
              {hasActiveFilters && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-blue-500' : 'bg-blue-100 text-blue-600'}`}>
                  Active
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* FILTER SECTION */}
        <div className={`${isMobile && !showMobileFilters ? 'hidden' : 'block'} mb-4`}>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h2>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters} 
                  className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none ${
                    darkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>

              {/* Category Select */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2.5 rounded-xl border text-sm outline-none ${
                  darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              {/* Time Range Select */}
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className={`px-4 py-2.5 rounded-xl border text-sm outline-none ${
                  darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="All Time">All Time</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
              </select>

              {/* Desktop Export Button */}
              {!isMobile && (
                <button
                  onClick={exportToCSV}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 ${
                    darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-900' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SUMMARY BAR */}
        <div className={`flex items-center justify-between p-3 rounded-xl mb-4 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredExpenses.length} items
          </span>
          <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        {/* EXPENSES LIST */}
        <div className={`p-3 sm:p-4 rounded-xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          {!isMobile && (
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Expenses</h2>
            </div>
          )}

          {filteredExpenses.length === 0 ? (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <div className="text-4xl mb-3">📭</div>
              <p>No expenses found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredExpenses.map((expense) => {
                const config = categoryConfig[expense.category] || categoryConfig['Shopping'];
                const IconComponent = config.icon;
                
                return (
                  <div
                    key={expense.id}
                    className={`group flex items-center justify-between p-3 rounded-xl border ${
                      darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      } ${config.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-semibold text-sm truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {expense.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${config.color} ${config.bg}`}>
                            {isMobile ? config.label : expense.category}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {formatDate(expense.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${expense.amount.toFixed(2)}
                      </span>
                      
                      {/* Edit/Delete buttons - visible on hover for desktop */}
                      <div className="hidden sm:flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => navigate(`/edit/${expense.id}`)}
                          className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(expense.id)}
                          className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Mobile delete button - always visible */}
                      <button 
                        onClick={() => handleDelete(expense.id)}
                        className={`sm:hidden p-1.5 rounded-lg ${darkMode ? 'text-red-400' : 'text-red-500'}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MOBILE EXPORT FAB */}
        {isMobile && filteredExpenses.length > 0 && (
          <button
            onClick={exportToCSV}
            className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            <Download className="w-5 h-5" />
          </button>
        )}

      </main>
    </div>
  );
}

export default Expense;