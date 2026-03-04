import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  Search, Filter, Download, Edit2, Trash2,
  Utensils, Car, Lightbulb, Film, ShoppingBag,
  X, ChevronDown
} from 'lucide-react';

function Expense({ darkMode, setDarkMode }) {

  /* ---------------- SAFE MOBILE STATE ---------------- */
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

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
    const expenseMonthKey =
      `${expenseDate.getFullYear()}-${expenseDate.getMonth()}`;

    const matchesSearch =
      expense.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      expense.category === selectedCategory;

    let matchesTime = true;

    if (selectedTimeRange === 'This Month') {
      matchesTime = expenseMonthKey === currentMonthKey;
    } else if (selectedTimeRange === 'Last Month') {
      const lastMonth =
        new Date(now.getFullYear(), now.getMonth() - 1, 1);

      matchesTime =
        expenseMonthKey ===
        `${lastMonth.getFullYear()}-${lastMonth.getMonth()}`;
    }

    return matchesSearch && matchesCategory && matchesTime;
  });

  const totalAmount =
    filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categories =
    ['All', ...new Set(allExpenses.map(e => e.category))];

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id) => {
    if (!window.confirm('Delete this expense?')) return;

    const updated = allExpenses.filter(e => e.id !== id);
    setAllExpenses(updated);

    /* also update localStorage */
    const grouped = {};

    updated.forEach(exp => {
      const d = new Date(exp.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(exp);
    });

    localStorage.setItem(
      'expensesByMonth',
      JSON.stringify(grouped)
    );
  };

  /* ---------------- EXPORT CSV ---------------- */
  const exportToCSV = () => {
    const headers = ['Title', 'Category', 'Date', 'Amount'];

    const csvContent = [
      headers.join(','),
      ...filteredExpenses.map(
        e => `"${e.title}","${e.category}","${e.date}","${e.amount}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download =
      `expenses-${new Date().toISOString().split('T')[0]}.csv`;

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

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'All' ||
    selectedTimeRange !== 'All Time';

  /* ================= UI ================= */

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">

        {/* MOBILE FILTER BUTTON */}
        {isMobile && (
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`w-full flex justify-between p-3 rounded-xl border mb-4 ${
              darkMode
                ? 'bg-gray-900 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex gap-2 items-center">
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="px-2 text-xs rounded-full bg-blue-500 text-white">
                  Active
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-4 h-4 ${showMobileFilters ? 'rotate-180' : ''}`}
            />
          </button>
        )}

        {/* SUMMARY */}
        <div className={`mb-4 p-3 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <span className="font-bold">
            ${totalAmount.toFixed(2)}
          </span>{' '}
          • {filteredExpenses.length} items
        </div>

        {/* LIST */}
        <div className="space-y-2">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              📭 No expenses found
            </div>
          ) : (
            filteredExpenses.map(expense => {

              const config =
                categoryConfig[expense.category] ||
                categoryConfig['Shopping'];

              const Icon = config.icon;

              return (
                <div
                  key={expense.id}
                  className={`flex justify-between items-center p-3 rounded-xl border ${
                    darkMode
                      ? 'bg-gray-900 border-gray-800'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${config.color}`} />

                    <div>
                      <h3 className="font-semibold text-sm">
                        {expense.title}
                      </h3>

                      <span className="text-xs text-gray-400">
                        {formatDate(expense.date)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold">
                      ${expense.amount.toFixed(2)}
                    </span>

                    <button onClick={() => handleDelete(expense.id)}>
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* EXPORT FAB */}
        {isMobile && filteredExpenses.length > 0 && (
          <button
            onClick={exportToCSV}
            className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center ${
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