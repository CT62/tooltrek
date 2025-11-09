'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"
import { Hammer, Zap, Droplet, Home, HardHat, ArrowRight, Check, Package, Users, Mountain } from 'lucide-react';

export default function ToolTrekLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    { id: 'bricklaying', name: 'Block Laying', icon: HardHat },
    { id: 'electrical', name: 'Electrical', icon: Zap },
    { id: 'plastering', name: 'Plastering', icon: Home },
    { id: 'plumbing', name: 'Plumbing', icon: Droplet },
    { id: 'carpentry', name: 'Carpentry', icon: Hammer },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden relative">
      {/* Animated Blue Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white"></div>
        <div 
          className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '10%',
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '50%',
            right: '10%',
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: '10%',
            left: '40%',
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Cursor Glow Effect */}
        <div 
          className="absolute w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12">
            <div className="flex flex-col items-center justify-center mb-6">
              <Mountain className="w-16 h-16 md:w-20 md:h-20 text-blue-600 mb-4" />
              <h1 className="text-6xl md:text-8xl font-black text-slate-900">ToolTrek</h1>
            </div>
            
            <p className="text-xl md:text-2xl text-slate-700 mb-4 font-medium">
              Professional Tool Starter Packs for Every Trade
            </p>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              Hand-curated tool kits designed by professionals. Everything you need to launch your career with confidence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
	  <a href="/collections">
            <button className="group w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <span>Browse Collections</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
	    </a>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {cat.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Expert Curated',
              desc: 'Every tool selected by professionals with decades of experience',
              icon: Check
            },
            { 
              title: 'Complete Kits',
              desc: 'Everything you need to start immediately, no guesswork',
              icon: Package
            },
            { 
              title: 'Quality Guaranteed',
              desc: 'Premium brands and materials, built to last a lifetime',
              icon: Users
            }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-blue-600 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="bg-blue-600 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-white mb-2">500+</div>
              <div className="text-blue-100">Professional Tools</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">5</div>
              <div className="text-blue-100">Trade Categories</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">1000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="bg-slate-900 rounded-3xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Get your professional tool kit today and build the future you deserve.
          </p>
          <button className="px-10 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
