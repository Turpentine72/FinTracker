import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Settings, Crown, Menu, X } from 'lucide-react';

function Header({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/expense') return 'Expenses';
    if (path === '/new') return 'Add New';
    return '';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Expenses', path: '/expense' },
    { name: 'Add New', path: '/new' },
  ];

  const handleTabClick = (tab) => {
    navigate(tab.path);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`border-b transition-colors duration-300 ${
      darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              <span className="font-semibold text-lg sm:text-xl">F</span>
            </div>

            <div className="hidden sm:block">
              <h1 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Fin Tracker
              </h1>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Manage your finances
              </p>
            </div>
            
            <span className={`sm:hidden font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Fin Tracker
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex gap-1 sm:gap-2 p-1 rounded-xl ${
            darkMode ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={`px-3 lg:px-6 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 ${
                  activeTab === tab.name
                    ? darkMode
                      ? 'bg-gray-700 text-white shadow-lg'
                      : 'bg-white text-gray-900 shadow-md'
                    : darkMode
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            
            {/* Upgrade Button */}
            <button
              onClick={() => navigate('/upgrade')}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                darkMode 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400' 
                  : 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black hover:from-amber-500 hover:to-yellow-500'
              }`}
            >
              <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Upgrade</span>
              <span className="sm:hidden">Pro</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate('/settings')}
              className={`hidden sm:flex p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden border-t transition-all duration-300 overflow-hidden ${
        darkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'
      } ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-4 py-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.name
                  ? darkMode
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-900'
                  : darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.name}
            </button>
          ))}
          
          <button
            onClick={() => {
              navigate('/settings');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors sm:hidden ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;