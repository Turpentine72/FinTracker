import React, { useState } from "react";
import { FaWallet, FaChartPie, FaBullseye, FaBars, FaTimes } from "react-icons/fa";
import whyImage from "../assets/Systematic expense tracking enables informed….jpg";
import whyHero from "../assets/Track income, expenses, and goals with a simple….jpg"


function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-b from-slate-900 to-blue-950 w-full py-4 px-4 md:px-8 z-50 top-0 sticky">
        <div className="w-full mx-auto flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <p className="text-blue-800 text-xl font-bold">F</p>
            </div>
            <h1 className="text-white text-2xl font-bold">Fin Tracker</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-blue-100 text-lg">
              Features
            </a>
            <a href="#pricing" className="text-blue-100 text-lg">
              Pricing
            </a>
            <button
  onClick={() => window.location.href = '/signup'}
  className="bg-blue-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg"
>
  Get Started 
</button>
          </div>

          {/* Hamburger Button */}
          <button 
            className="md:hidden text-blue-100 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#features" className="text-blue-100 text-lg text-center">
              Features
            </a>
            <a href="#pricing" className="text-blue-100 text-lg text-center">
              Pricing
            </a>
            <button className="bg-blue-100 text-blue-900 px-5 py-2 rounded-3xl font-bold mx-auto">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Rest of your code stays the same... */}
      
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-slate-900 to-blue-950 py-12 md:py-20 px-4 md:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
              Take Control of Your <span className="text-blue-400">Finances</span>
            </h2>
            <p className="text-blue-200 text-base md:text-lg mb-6 md:mb-8">
              Track expenses, monitor income, and manage your budget 
              all in one powerful and simple platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">
                Start Tracking
              </button>
              <button className="bg-blue-800 text-blue-100 px-6 py-3 rounded-full font-semibold">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={whyHero}
              alt="Hero"
              className="rounded-2xl w-full md:w-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-gradient-to-b from-blue-950 to-blue-900 py-12 md:py-16 px-4 md:px-8">
        <h2 className="text-blue-100 text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Features</h2>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          <div className="bg-blue-800/40 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWallet className="text-blue-100 text-2xl" />
            </div>
            <h3 className="text-blue-100 text-xl font-bold mb-2">Track Expenses</h3>
            <p className="text-blue-300 text-sm">Monitor your spending in real-time with smart categorization.</p>
          </div>

          <div className="bg-blue-800/40 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartPie className="text-blue-100 text-2xl" />
            </div>
            <h3 className="text-blue-100 text-xl font-bold mb-2">View Reports</h3>
            <p className="text-blue-300 text-sm">Get detailed insights with beautiful charts and graphs.</p>
          </div>

          <div className="bg-blue-800/40 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBullseye className="text-blue-100 text-2xl" />
            </div>
            <h3 className="text-blue-100 text-xl font-bold mb-2">Set Budgets</h3>
            <p className="text-blue-300 text-sm">Create custom budgets and get alerts when you near limits.</p>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-gradient-to-b from-blue-900 to-slate-900 py-12 md:py-20 px-4 md:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          
          <div className="text-center md:text-left order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
              Why Choose <span className="text-blue-400">Fin Tracker?</span>
            </h2>
            <p className="text-blue-200 text-base md:text-lg">
              Take complete control of your finances with ease. Track every expense and monitor all your income streams effortlessly.  
              Set smart, personalized budgets that fit your lifestyle and financial goals. Gain powerful insights that help you save more and spend wisely.  
              Plan for the future with confidence using our intuitive platform.
            </p>
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <img
              src={whyImage}
              alt="why choose us"
              className="rounded-2xl w-full md:w-[500px] h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full bg-gradient-to-b from-slate-900 to-blue-950 py-12 md:py-16 px-4 md:px-8">
        <h2 className="text-blue-100 text-3xl md:text-4xl font-bold text-center mb-4">Pricing</h2>
        <p className="text-blue-300 text-center mb-8 md:mb-12 text-sm md:text-base">Choose the plan that fits your needs</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          
          {/* Individual Plan */}
          <div className="bg-blue-800/40 rounded-xl p-6 md:p-8 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWallet className="text-blue-100 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-blue-100 text-xl md:text-2xl font-bold mb-2">Individual Plan</h3>
            <p className="text-blue-300 text-xs md:text-sm mb-4 md:mb-6">Free for next 3 months</p>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">$0</div>
            <p className="text-blue-300 text-xs md:text-sm mb-6 md:mb-8">Then $5/month after</p>
            <button className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold text-sm md:text-base">
              Start Free Trial
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-blue-800/50 rounded-xl p-6 md:p-8 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartPie className="text-white text-2xl md:text-3xl" />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2">Pro Plan</h3>
            <p className="text-blue-200 text-xs md:text-sm mb-4 md:mb-6">Perfect for freelancers</p>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">$15</div>
            <p className="text-blue-200 text-xs md:text-sm mb-6 md:mb-8">per month</p>
            <button className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold text-sm md:text-base">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-blue-800/40 rounded-xl p-6 md:p-8 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBullseye className="text-blue-100 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-blue-100 text-xl md:text-2xl font-bold mb-2">Business Plan</h3>
            <p className="text-blue-300 text-xs md:text-sm mb-4 md:mb-6">Best for large teams</p>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">$50</div>
            <p className="text-blue-300 text-xs md:text-sm mb-6 md:mb-8">per month</p>
            <button className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold text-sm md:text-base">
              Contact Sales
            </button>
          </div>

        </div>
      </section>

      {/* Are you ready */}
      <section className="w-full bg-gradient-to-b from-blue-950 to-blue-900 py-12 md:py-20 px-4 md:px-8">
        <div className="w-full flex flex-col items-center text-center">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Are You Ready to <span className="text-blue-400">Master</span> Your Finance?
          </h2>
          <p className="text-blue-200 text-base md:text-lg mb-6 md:mb-8 max-w-2xl px-4 md:px-0">
            Join thousands of users who have transformed their financial lives with Fin Tracker.
          </p>
          <button className="bg-blue-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-blue-900 to-blue-950 py-8 md:py-12">
        <p className="text-blue-300 text-lg md:text-2xl text-center px-4">
          © 2026 Fin Tracker. All rights reserved.
        </p>
      </footer>

    </>
  );
}

export default LandingPage;