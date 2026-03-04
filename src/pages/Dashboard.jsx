import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Calendar, Receipt, TrendingUp, Lightbulb, ShoppingBag, 
  Film, Utensils, Car, ChevronLeft, ChevronRight
} from 'lucide-react';
import Header from '../components/Header';

function Dashboard({ darkMode, setDarkMode }) {
  const [isMobile, setIsMobile] = useState(false);
  
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${now.getMonth()}`;
  
  const formatMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatMonthShort = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const [viewingMonth, setViewingMonth] = useState(new Date());
  const viewingMonthKey = `${viewingMonth.getFullYear()}-${viewingMonth.getMonth()}`;
  const isCurrentMonth = viewingMonthKey === currentMonthKey;

  const [allExpensesByMonth, setAllExpensesByMonth] = useState({});

  // Safe localStorage access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('expensesByMonth');
      if (saved) {
        setAllExpensesByMonth(JSON.parse(saved));
      }
    }
  }, []);

  const viewingMonthExpenses = allExpensesByMonth[viewingMonthKey] || [];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('expensesByMonth', JSON.stringify(allExpensesByMonth));
    }
  }, [allExpensesByMonth]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMonth = () => {
      const now = new Date();
      const newMonthKey = `${now.getFullYear()}-${now.getMonth()}`;
      
      if (!allExpensesByMonth[newMonthKey]) {
        setAllExpensesByMonth(prev => ({
          ...prev,
          [newMonthKey]: []
        }));
        setViewingMonth(now);
      }
    };
    
    checkMonth();
    const interval = setInterval(checkMonth, 60000);
    return () => clearInterval(interval);
  }, [allExpensesByMonth]);

  const thisMonthTotal = viewingMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const transactionCount = viewingMonthExpenses.length;
  const averageTransaction = transactionCount > 0 ? thisMonthTotal / transactionCount : 0;
  
  const allTimeTotal = Object.values(allExpensesByMonth).flat().reduce((sum, exp) => sum + exp.amount, 0);

  const stats = [
    { 
      title: isMobile ? 'Total' : 'Total Expenses', 
      value: `$${allTimeTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, 
      subtitle: 'All time', 
      icon: DollarSign 
    },
    { 
      title: isCurrentMonth ? 'This Month' : formatMonthShort(viewingMonth), 
      value: `$${thisMonthTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      subtitle: isCurrentMonth ? 'Current' : 'Historical', 
      icon: Calendar 
    },
    { 
      title: 'Transactions', 
      value: transactionCount.toString(), 
      subtitle: 'This month', 
      icon: Receipt 
    },
    { 
      title: 'Average', 
      value: `$${Math.round(averageTransaction)}`, 
      subtitle: 'Per transaction', 
      icon: TrendingUp 
    },
  ];

  const goToPreviousMonth = () => {
    setViewingMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(viewingMonth.getFullYear(), viewingMonth.getMonth() + 1, 1);
    if (nextMonth <= new Date()) {
      setViewingMonth(nextMonth);
    }
  };

  const goToCurrentMonth = () => {
    setViewingMonth(new Date());
  };

  const categoriesMap = viewingMonthExpenses.reduce((acc, exp) => {
    if (!acc[exp.category]) {
      acc[exp.category] = { amount: 0, ...exp.categoryInfo };
    }
    acc[exp.category].amount += exp.amount;
    return acc;
  }, {});

  const categories = Object.entries(categoriesMap).map(([name, data]) => ({
    name, ...data
  })).sort((a, b) => b.amount - a.amount);

  const defaultCategories = [
    { name: 'Bills & Utilities', amount: 0, color: '#ef4444', icon: Lightbulb },
    { name: 'Shopping', amount: 0, color: '#f59e0b', icon: ShoppingBag },
    { name: 'Entertainment', amount: 0, color: '#8b5cf6', icon: Film },
    { name: 'Food & Dining', amount: 0, color: '#10b981', icon: Utensils },
    { name: 'Transportation', amount: 0, color: '#3b82f6', icon: Car },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  const total = displayCategories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
        
        {/* Month Navigation */}
        <div className={`flex items-center justify-between mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl border ${
          darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <button 
            onClick={goToPreviousMonth}
            className={`p-2 sm:p-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <div className="text-center px-2">
            <h2 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {isMobile ? formatMonthShort(viewingMonth) : formatMonthName(viewingMonth)}
            </h2>
            {!isCurrentMonth && (
              <button 
                onClick={goToCurrentMonth}
                className="text-xs sm:text-sm text-blue-500 hover:underline mt-0.5"
              >
                Back to current
              </button>
            )}
          </div>
          
          <button 
            onClick={goToNextMonth}
            disabled={isCurrentMonth}
            className={`p-2 sm:p-3 rounded-lg transition-colors ${isCurrentMonth ? 'opacity-30 cursor-not-allowed' : ''} ${
              darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {stats.map((stat, index) => (
            <div key={index} className={`p-3 sm:p-4 lg:p-6 rounded-xl border transition-colors ${
              darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.title}
                </span>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <div className={`text-xl sm:text-2xl font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{stat.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {viewingMonthExpenses.length === 0 && (
          <div className={`p-6 sm:p-8 rounded-xl border text-center mb-4 ${
            darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="text-4xl mb-3">📅</div>
            <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {isCurrentMonth ? 'New Month Started!' : 'No Expenses'}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isCurrentMonth ? `Start tracking your expenses for ${formatMonthName(viewingMonth)}.` : 'No data for this month.'}
            </p>
          </div>
        )}

        {/* Charts */}
        {viewingMonthExpenses.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Spending by Category */}
            <div className={`p-4 sm:p-6 rounded-xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-base font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Spending by Category
              </h2>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32 sm:w-40">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                    {displayCategories.map((cat, i) => {
                      const dashArray = 251;
                      const dashOffset = i === 0 ? 0 : displayCategories.slice(0, i).reduce((sum, c) => sum + (c.amount / total) * dashArray, 0);
                      return (
                        <circle 
                          key={i}
                          cx="50" cy="50" r="40" fill="none" 
                          stroke={cat.color} strokeWidth="12" 
                          strokeDasharray={`${(cat.amount / total) * dashArray} ${dashArray}`}
                          strokeDashoffset={-dashOffset}
                        />
                      );
                    })}
                  </svg>
                  <div className={`absolute inset-0 flex items-center justify-center rounded-full m-8 ${
                    darkMode ? 'bg-black' : 'bg-white'
                  }`}>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${thisMonthTotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {displayCategories.filter(cat => cat.amount > 0).map((cat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {cat.name}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${cat.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly History */}
            <div className={`p-4 sm:p-6 rounded-xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-base font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Monthly History
              </h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Object.entries(allExpensesByMonth)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([monthKey, expenses]) => {
                    const [year, month] = monthKey.split('-');
                    const monthDate = new Date(year, month);
                    const monthTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
                    
                    return (
                      <button
                        key={monthKey}
                        onClick={() => setViewingMonth(monthDate)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left ${
                          monthKey === viewingMonthKey
                            ? (darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300')
                            : (darkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300')
                        }`}
                      >
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {isMobile ? formatMonthShort(monthDate) : formatMonthName(monthDate)}
                        </span>
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${monthTotal.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;