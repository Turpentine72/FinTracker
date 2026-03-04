import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  Utensils, Car, Lightbulb, Film, ShoppingBag,
  Plus, Calendar, FileText, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function New({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  /* ---------- SAFE MOBILE STATE ---------- */
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ---------- FORM STATE ---------- */
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0]
  });

  /* ---------- CATEGORY CONFIG ---------- */
  const categories = [
    { name: 'Food & Dining', icon: Utensils, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    { name: 'Transportation', icon: Car, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { name: 'Bills & Utilities', icon: Lightbulb, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
    { name: 'Entertainment', icon: Film, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { name: 'Shopping', icon: ShoppingBag, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  ];

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryName) => {
    setFormData(prev => ({ ...prev, category: categoryName }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    const dateObj = new Date(formData.date);
    const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;

    /* SAFE LOCALSTORAGE */
    if (typeof window !== 'undefined') {
      const allExpenses =
        JSON.parse(localStorage.getItem('expensesByMonth') || '{}');

      if (!allExpenses[monthKey]) {
        allExpenses[monthKey] = [];
      }

      allExpenses[monthKey].push(newExpense);

      localStorage.setItem(
        'expensesByMonth',
        JSON.stringify(allExpenses)
      );
    }

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate('/expense');
    }, 1500);

    setFormData({
      amount: '',
      description: '',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0]
    });
  };

  /* ================= UI ================= */

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="p-3 sm:p-4 lg:p-6 max-w-2xl mx-auto">

        {showSuccess && (
          <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
            darkMode
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
          }`}>
            <CheckCircle className="w-5 h-5" />
            Expense added!
          </div>
        )}

        <div className={`p-6 rounded-2xl border ${
          darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>

          <h2 className={`text-xl font-semibold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Add New Expense
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Amount */}
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                darkMode
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200'
              }`}
            />

            {/* Description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                darkMode
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200'
              }`}
            />

            {/* Category */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => {
                const Icon = cat.icon;
                const selected = formData.category === cat.name;

                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`flex items-center gap-2 p-3 rounded-xl border ${
                      selected
                        ? `${cat.bg} ${cat.border} ${cat.color}`
                        : darkMode
                          ? 'bg-gray-900 border-gray-700'
                          : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                darkMode
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200'
              }`}
            />

            {/* Submit */}
            <button
              type="submit"
              className={`w-full flex justify-center gap-2 py-3 rounded-xl font-semibold ${
                darkMode
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
              }`}
            >
              <Plus className="w-5 h-5" />
              Add Expense
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}

export default New;