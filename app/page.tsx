'use client';

import React, { useState, useEffect } from 'react';
import { Wrench, Hammer, Zap, Droplet, Home, HardHat, ArrowRight, Sparkles, Shield, Package } from 'lucide-react';

export default function ToolTrekLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const categories = [
    { id: 'bricklaying', name: 'Block Laying', icon: HardHat, gradient: 'from-blue-600 to-cyan-500' },
    { id: 'electrical', name: 'Electrical', icon: Zap, gradient: 'from-cyan-500 to-blue-400' },
    { id: 'plastering', name: 'Plastering', icon: Home, gradient: 'from-blue-500 to-indigo-500' },
    { id: 'plumbing', name: 'Plumbing', icon: Droplet, gradient: 'from-indigo-500 to-blue-600' },
    { id: 'carpentry', name: 'Carpentry', icon: Hammer, gradient: 'from-blue-400 to-cyan-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900"></div>
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '10%',
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '50%',
            right: '10%',
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: '10%',
            left: '40%',
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Cursor Glow Effect */}
        <div 
          className="absolute w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Ultra Modern Navbar */}
      <nav className="relative z-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between backdrop-blur-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-blue-950/40 rounded-3xl border border-blue-400/20 p-5 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                ToolTrek
              </span>
            </div>
            
            {/* Sleek Tree Navigation */}
            <div className="hidden lg:flex items-center">
              {categories.map((cat, idx) => (
                <div key={cat.id} className="flex items-center group">
                  {idx > 0 && (
                    <div className="w-12 h-px bg-gradient-to-r from-blue-600/50 via-cyan-400/50 to-blue-600/50 group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-cyan-400 transition-all"></div>
                  )}
                  <button className="relative px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-all group">
                    <span className="relative z-10 flex items-center space-x-2">
                      <cat.icon className="w-4 h-4" />
                      <span>{cat.name}</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:via-cyan-500/20 group-hover:to-blue-600/20 rounded-lg transition-all"></div>
                  </button>
                </div>
              ))}
            </div>

            <button className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold overflow-hidden group">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Ultra Modern */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 backdrop-blur-xl bg-blue-500/10 border border-blue-400/30 rounded-full">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-blue-200">Premium Tool Starter Packs</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
              Tool
            </span>
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              Trek
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-6 text-blue-200/80 font-light max-w-3xl mx-auto">
            Launch Your Trade Career with Professional-Grade Tool Kits
          </p>
          
          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto mb-12">
            Curated by industry experts. Trusted by professionals. Everything you need to start building your future.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-bold text-lg overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-cyan-500/40 transition-all">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Explore Collections</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button className="px-8 py-4 backdrop-blur-xl bg-blue-900/20 hover:bg-blue-800/30 border border-blue-400/30 hover:border-cyan-400/50 rounded-2xl font-bold text-lg transition-all hover:scale-105">
              View Pricing
            </button>
          </div>

          {/* Category Cards Grid - Ultra Modern */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="group relative cursor-pointer"
                >
                  <div className="relative backdrop-blur-2xl bg-gradient-to-br from-blue-950/50 to-slate-900/50 border border-blue-400/20 rounded-3xl p-6 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden">
                    {/* Hover Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10 flex flex-col items-center space-y-4">
                      <div className={`p-4 bg-gradient-to-br ${cat.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-blue-100 group-hover:text-white transition-colors">
                        {cat.name}
                      </span>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid Style */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Expert Curated', 
              desc: 'Every tool hand-selected by industry professionals with decades of experience', 
              icon: Shield,
              gradient: 'from-blue-600 to-cyan-500'
            },
            { 
              title: 'Complete Kits', 
              desc: 'Everything you need to start your trade immediately. No guesswork required', 
              icon: Package,
              gradient: 'from-cyan-500 to-blue-500'
            },
            { 
              title: 'Premium Quality', 
              desc: 'Only the highest quality brands and materials. Built to last a lifetime', 
              icon: Sparkles,
              gradient: 'from-blue-500 to-indigo-500'
            }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="group relative backdrop-blur-2xl bg-gradient-to-br from-blue-950/50 to-slate-900/50 border border-blue-400/20 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-blue-300/70 leading-relaxed">{feature.desc}</p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
