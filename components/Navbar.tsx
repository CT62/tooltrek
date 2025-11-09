'use client';
import React, { useState, useEffect } from 'react';
import { Hammer, Zap, Droplet, Home, HardHat, ArrowRight, Check, Package, Users, Mountain } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="relative z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Mountain className="w-6 h-6 text-white" />
            </div>
          </a>
          
          {/* Nav Links */}
          <div className="flex items-center gap-4 md:gap-8">
            <a href="/collections" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Collections
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
