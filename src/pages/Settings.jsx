import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
  import { 
  ArrowLeft, User, Moon, Sun, Bell, Lock, Camera, 
  LogOut, Trash2, Save, ChevronRight 
} from 'lucide-react';
import Header from '../components/Header';

function Settings({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const [profile, setProfile] = useState({
    name: 'Full name',
    email: 'your email here',
    currency: 'USD',
    profileImage: null
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    budgetAlerts: true,
    weeklyReport: false
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      if (parsed.profileImage) setImagePreview(parsed.profileImage);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProfile(prev => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Settings saved!');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/signin');
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      {!isMobile && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}
      
      {/* Mobile Header */}
      {isMobile && (
        <header className={`p-4 border-b ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          </div>
        </header>
      )}

      <main className="p-3 sm:p-4 lg:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">

        {/* Profile Section */}
        <section className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <User className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile</h2>
          </div>

          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden ${
                imagePreview ? '' : darkMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
              }`}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  getInitials(profile.name)
                )}
              </div>
              <label className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}>
                <Camera className="w-4 h-4 text-white" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              placeholder="Full Name"
              className={`w-full px-4 py-3 rounded-xl border text-sm ${
                darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-xl border text-sm ${
                darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            />
          </div>
        </section>

        {/* Appearance */}
        <section className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                {darkMode ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-purple-600" />}
              </div>
              <div>
                <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Toggle theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
              <Bell className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h2>
          </div>

          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <span className={`text-sm capitalize ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => setNotifications(prev => ({...prev, [key]: !value}))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    value ? 'bg-blue-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    value ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Account Actions */}
        <section className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-red-500/20' : 'bg-red-100'}`}>
              <Lock className={`w-5 h-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account</h2>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 p-3 rounded-xl ${
                darkMode ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </section>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold ${
            darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>

      </main>
    </div>
  );
}

export default Settings;