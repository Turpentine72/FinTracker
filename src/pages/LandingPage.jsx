import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaChartPie,
  FaBullseye,
  FaBars,
  FaTimes,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa";

import whyImage from "../assets/Systematic expense tracking enables informed….jpg";
import whyHero from "../assets/Track income, expenses, and goals with a simple….jpg";

const FEATURES = [
  { icon: <FaWallet />, title: "Track Expenses", text: "Monitor spending with smart categorization." },
  { icon: <FaChartPie />, title: "View Reports", text: "Visual insights with charts and analytics." },
  { icon: <FaBullseye />, title: "Set Budgets", text: "Create budgets and stay within limits." },
];

const STEPS = [
  "Create your account",
  "Add income & expenses",
  "Track spending easily",
  "Reach financial goals",
];

const BENEFITS = [
  "Understand where your money goes",
  "Save money faster",
  "Plan smarter budgets",
  "Reduce financial stress",
];

const TESTIMONIALS = [
  { name: "Alex", text: "FinTracker helped me control my expenses easily." },
  { name: "Sarah", text: "The dashboard makes budgeting simple." },
  { name: "David", text: "Best finance tracker I've used." },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToSignup = () => navigate("/signup");

  const scrollToFeatures = () => {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-gradient-to-b from-slate-900 to-blue-950 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <span className="text-xl font-bold text-blue-800">F</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Fin Tracker</h1>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <button onClick={scrollToFeatures} className="text-blue-100 hover:text-white">Features</button>
            <button onClick={goToSignup} className="rounded-full bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600">
              Get Started
            </button>
          </div>

          <button className="text-2xl text-blue-100 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-blue-800 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-center">
              <button onClick={() => { scrollToFeatures(); setMenuOpen(false); }} className="text-blue-100">Features</button>
              <button onClick={goToSignup} className="rounded-full bg-blue-100 px-5 py-2 font-bold text-blue-900">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-900 to-blue-950 px-4 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Take Control of Your <span className="text-blue-400">Finances</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-200">
            Track expenses, monitor income, and manage your budget in one powerful platform.
          </p>
          
          <div className="flex justify-center gap-4">
            <button onClick={goToSignup} className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
              Start Tracking
            </button>
            <button onClick={scrollToFeatures} className="rounded-full bg-blue-800 px-6 py-3 font-bold text-blue-100 hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gradient-to-b from-blue-950 to-blue-900 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-blue-100">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="rounded-xl bg-blue-800/40 p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-2xl text-blue-100">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-100">{f.title}</h3>
                <p className="text-blue-300">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900 px-4 py-20 text-center">
        <h2 className="mb-12 text-4xl font-bold text-white">How It Works</h2>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          {STEPS.map((text, i) => (
            <div key={i}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-2xl font-bold text-blue-400">
                {i + 1}
              </div>
              <p className="text-blue-200">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US - NO BUTTON HERE */}
      <section className="bg-gradient-to-b from-blue-900 to-slate-900 px-4 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-white">
              Why Choose <span className="text-blue-400">Fin Tracker?</span>
            </h2>
            <p className="text-lg text-blue-200">
              Take control of your finances easily. Track expenses, monitor income, set budgets, and grow your savings confidently.
            </p>
          </div>
          <img src={whyImage} alt="Why choose us" className="h-[400px] w-full rounded-2xl object-cover" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-blue-900 px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-12 text-4xl font-bold text-white">What You Gain</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {BENEFITS.map((text, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-blue-800/40 p-5 text-blue-100">
                <FaCheck className="text-blue-400" /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-900 px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-12 text-4xl font-bold text-white">What Users Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-xl bg-blue-800/40 p-6 text-left">
                <FaQuoteLeft className="mb-4 text-blue-600" />
                <p className="mb-4 text-blue-200">"{t.text}"</p>
                <h4 className="font-bold text-blue-100">— {t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 py-20 text-center">
        <h2 className="mb-6 text-4xl font-bold text-white">Ready to Master Your Finance?</h2>
        <button onClick={goToSignup} className="rounded-full bg-blue-500 px-10 py-4 font-bold text-white hover:bg-blue-600">
          Get Started Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 py-10 text-center">
        <p className="text-blue-300">© {new Date().getFullYear()} Fin Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;