'use client';
import React, { useState, useEffect } from 'react';
import { Hammer, Zap, Droplet, Home, HardHat, ArrowRight, Check, Package, Users, Mountain } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="relative z-50 bg-white/60 backdrop-blur-lg border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
	  <a href="/">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Mountain className="w-6 h-6 text-white" />
          </div>
	  </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="collections" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Collections</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
          </div>

          {/* CTA */}
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
