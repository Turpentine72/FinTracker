import React, { useState } from 'react';
import { Eye, EyeOff, Wallet, Lock, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        
        <div className="text-center mb-6">
         <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
  <span className="text-blue-600 text-xl font-bold">F</span>
</div>
          <h1 className="text-2xl font-bold text-black">Fin Tracker</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
            <input type="text" placeholder="Username" className="w-full pl-10 pr-4 py-3 rounded-lg border border-black outline-none" required />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full pl-10 pr-12 py-3 rounded-lg border border-black outline-none" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black">
          Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;