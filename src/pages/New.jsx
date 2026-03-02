import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { 
  Utensils, Car, Lightbulb, Film, ShoppingBag, Plus, Calendar, 
  FileText, CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function New({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { name: 'Food & Dining', icon: Utensils, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    { name: 'Transportation', icon: Car, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { name: 'Bills & Utilities', icon: Lightbulb, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
    { name: 'Entertainment', icon: Film, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { name: 'Shopping', icon: ShoppingBag, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryName) => {
    setFormData(prev => ({ ...prev, category: categoryName }));
  };

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
      categoryInfo: categories.find(c => c.name === formData.category)
    };

    const dateObj = new Date(formData.date);
    const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;
    
    const allExpenses = JSON.parse(localStorage.getItem('expensesByMonth') || '{}');
    if (!allExpenses[monthKey]) allExpenses[monthKey] = [];
    allExpenses[monthKey].push(newExpense);
    
    localStorage.setItem('expensesByMonth', JSON.stringify(allExpenses));

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

  const selectedCategory = categories.find(cat => cat.name === formData.category);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="p-3 sm:p-4 lg:p-6 max-w-2xl mx-auto">
        
        {showSuccess && (
          <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
            darkMode ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                     : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
          }`}>
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Expense added!</span>
          </div>
        )}

        <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl border ${
          darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          
          <div className="mb-6">
            <h2 className={`text-xl sm:text-2xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Add New Expense
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Track your spending
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            
            {/* Amount */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount
              </label>
              <div className="relative">
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>$</span>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-4 py-3 text-xl font-bold rounded-xl border outline-none ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                  autoFocus
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <div className="relative">
                <FileText className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  name="description"
                  placeholder="What did you spend on?"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-700 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </label>
              
              {/* Mobile scroll */}
              <div className="sm:hidden overflow-x-auto pb-2 -mx-1">
                <div className="flex gap-2 w-max px-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.name;
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => handleCategorySelect(cat.name)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full border whitespace-nowrap ${
                          isSelected
                            ? `${cat.bg} ${cat.border} ${cat.color}`
                            : darkMode ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop grid */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left ${
                        isSelected
                          ? `${cat.bg} ${cat.border} ${cat.color} ring-2 ring-offset-2 ${darkMode ? 'ring-offset-black' : 'ring-offset-white'}`
                          : darkMode ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date
              </label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-700 text-white [color-scheme:dark]' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors ${
                darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
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