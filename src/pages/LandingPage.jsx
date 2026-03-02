import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaChartPie,
  FaBullseye,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import whyImage from "../assets/Systematic expense tracking enables informed….jpg";
import whyHero from "../assets/Track income, expenses, and goals with a simple….jpg";

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ router navigation

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="bg-gradient-to-b from-slate-900 to-blue-950 w-full py-4 px-4 md:px-8 z-50 top-0 sticky">
        <div className="w-full mx-auto flex justify-between items-center">

          {/* Logo */}
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
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger */}
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

            <button
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
              className="bg-blue-100 text-blue-900 px-5 py-2 rounded-3xl font-bold mx-auto"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section className="w-full bg-gradient-to-b from-slate-900 to-blue-950 py-12 md:py-20 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Take Control of Your <span className="text-blue-400">Finances</span>
            </h2>

            <p className="text-blue-200 text-lg mb-8">
              Track expenses, monitor income, and manage your budget
              all in one powerful and simple platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold"
              >
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

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="w-full bg-gradient-to-b from-blue-950 to-blue-900 py-16 px-4 md:px-8"
      >
        <h2 className="text-blue-100 text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <FeatureCard
            icon={<FaWallet />}
            title="Track Expenses"
            text="Monitor your spending in real-time with smart categorization."
          />

          <FeatureCard
            icon={<FaChartPie />}
            title="View Reports"
            text="Get detailed insights with beautiful charts and graphs."
          />

          <FeatureCard
            icon={<FaBullseye />}
            title="Set Budgets"
            text="Create custom budgets and get alerts when you near limits."
          />
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="w-full bg-gradient-to-b from-blue-900 to-slate-900 py-20 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-5xl font-bold mb-6 text-white">
              Why Choose <span className="text-blue-400">Fin Tracker?</span>
            </h2>

            <p className="text-blue-200 text-lg">
              Take complete control of your finances with ease. Track every
              expense and monitor all your income streams effortlessly.
              Set smart budgets, gain insights, save more, and plan confidently.
            </p>
          </div>

          <img
            src={whyImage}
            alt="why choose"
            className="rounded-2xl w-full md:w-[500px] h-[400px] object-cover"
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="w-full bg-gradient-to-b from-blue-950 to-blue-900 py-20 text-center px-4">
        <h2 className="text-white text-5xl font-bold mb-6">
          Ready to Master Your Finance?
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg"
        >
          Get Started Now
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-950 py-10 text-center">
        <p className="text-blue-300 text-xl">
          © 2026 Fin Tracker. All rights reserved.
        </p>
      </footer>
    </>
  );
}

/* Feature Card Component */
function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-blue-800/40 rounded-xl p-6 text-center">
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-100 text-2xl">
        {icon}
      </div>
      <h3 className="text-blue-100 text-xl font-bold mb-2">{title}</h3>
      <p className="text-blue-300 text-sm">{text}</p>
    </div>
  );
}

export default LandingPage;