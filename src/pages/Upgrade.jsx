import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, X, Sparkles, Shield, Zap, Crown, CreditCard, 
  ArrowLeft, Sun, Moon 
} from 'lucide-react';

function Upgrade({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans = {
    free: {
      name: 'Free',
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: ['Up to 50 expenses/month', 'Basic categories', 'Monthly summary'],
      notIncluded: ['Unlimited expenses', 'Advanced analytics', 'Export'],
      icon: Zap,
      color: 'blue',
      popular: false,
    },
    pro: {
      name: 'Pro',
      description: 'Best for personal finance',
      monthlyPrice: 5,
      yearlyPrice: 48,
      features: ['Unlimited expenses', 'Advanced analytics', 'Export to CSV/PDF', 'Custom categories', 'Priority support'],
      notIncluded: ['Team features'],
      icon: Crown,
      color: 'purple',
      popular: true,
    },
    business: {
      name: 'Business',
      description: 'For teams',
      monthlyPrice: 15,
      yearlyPrice: 144,
      features: ['Everything in Pro', 'Up to 10 team members', 'API access', 'Advanced reporting'],
      notIncluded: [],
      icon: Sparkles,
      color: 'amber',
      popular: false,
    },
  };

  const handleSelectPlan = (planKey) => {
    setSelectedPlan(planKey);
    if (planKey !== 'free') setShowPaymentModal(true);
  };

  const currentPlan = plans[selectedPlan];
  const price = billingCycle === 'yearly' ? currentPlan.yearlyPrice : currentPlan.monthlyPrice;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      
      {/* Header */}
      <header className={`p-4 sm:p-6 border-b ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upgrade</h1>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Choose your plan</p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        
        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex p-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? (darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm')
                  : (darkMode ? 'text-gray-400' : 'text-gray-600')
              }`}
            >
              Monthly
            </button>   
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? (darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm')
                  : (darkMode ? 'text-gray-400' : 'text-gray-600')
              }`}
            >
              Yearly
              <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {Object.entries(plans).map(([key, plan]) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === key;
            const displayPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <div
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`relative p-4 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? (darkMode ? 'border-blue-500 bg-gray-900/50' : 'border-blue-500 bg-blue-50/50')
                    : (darkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white')
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`}>
                      Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                    plan.color === 'blue' ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600') :
                    plan.color === 'purple' ? (darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600') :
                    (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600')
                  }`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{plan.description}</p>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${displayPrice}
                    </span>
                    {displayPrice !== 0 && (
                      <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{billingCycle === 'yearly' ? 'yr' : 'mo'}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(key);
                  }}
                  className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-colors mb-4 ${
                    isSelected
                      ? (darkMode ? 'bg-white text-black' : 'bg-black text-white')
                      : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900')
                  }`}
                >
                  {key === 'free' ? 'Current' : 'Choose'}
                </button>

                <div className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${plan.color === 'blue' ? 'text-blue-500' : plan.color === 'purple' ? 'text-purple-500' : 'text-amber-500'}`} />
                      <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className={`flex flex-wrap justify-center gap-4 sm:gap-6 py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cancel Anytime</span>
          </div>
        </div>

      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-4 sm:p-6 rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Plan</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentPlan.name}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>${price}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Processing payment...');
                setShowPaymentModal(false);
                navigate('/dashboard');
              }}
              className={`w-full py-3 rounded-xl font-semibold ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              Pay ${price}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Upgrade;