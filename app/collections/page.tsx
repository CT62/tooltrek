'use client';
import React, { useState, useEffect } from 'react';
import { Hammer, Zap, Droplet, Home, HardHat, Mountain, ArrowRight, Package, Star } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  brand: string;
  price: number;
  image?: string;
  description: string;
}

interface Collection {
  id: number;
  name: string;
  category: string;
  price: number;
  items: number;
  rating: number;
  reviews: number;
  description: string;
  popular: boolean;
  tools: Tool[];
}

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections');
      const data = await response.json();
      setCollections(data);
    } catch (err) {
      console.error('Failed to fetch collections:', err);
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons: Record<string, any> = {
    bricklaying: HardHat,
    electrical: Zap,
    plastering: Home,
    plumbing: Droplet,
    carpentry: Hammer,
  };

  const categories = [
    { id: 'all', name: 'All Collections', count: collections.length },
    { id: 'bricklaying', name: 'Block Laying', count: collections.filter(c => c.category === 'bricklaying').length },
    { id: 'electrical', name: 'Electrical', count: collections.filter(c => c.category === 'electrical').length },
    { id: 'plastering', name: 'Plastering', count: collections.filter(c => c.category === 'plastering').length },
    { id: 'plumbing', name: 'Plumbing', count: collections.filter(c => c.category === 'plumbing').length },
    { id: 'carpentry', name: 'Carpentry', count: collections.filter(c => c.category === 'carpentry').length },
  ];

  const filteredCollections = selectedCategory === 'all' 
    ? collections 
    : collections.filter(c => c.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
            Tool Collections
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hand-curated starter kits for every trade. Each collection includes everything you need to launch your career with confidence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name} <span className="text-xs opacity-75">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => {
            const Icon = categoryIcons[collection.category] || Package;
            const toolCount = collection.tools?.length || 0;
            
            return (
              <a
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer border-2 border-slate-100 hover:border-blue-600 block"
              >
                {/* Content */}
                <div className="p-8">
                  {/* Top Row - Icon and Popular Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {collection.popular && (
                      <span className="px-3 py-1.5 bg-amber-100 rounded-full text-xs font-bold text-amber-700 flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                    {collection.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed min-h-[60px]">
                    {collection.description}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-slate-900">
                        {toolCount} {toolCount === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-slate-900">{collection.rating}</span>
                      <span className="text-sm text-slate-500">({collection.reviews})</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">From</div>
                      <div className="text-4xl font-black text-slate-900">
                        €{collection.price}
                      </div>
                    </div>
                    <div className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all group-hover:scale-105 flex items-center gap-2">
                      <span>View</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCollections.length === 0 && (
          <div className="text-center py-20">
            <div className="text-slate-400 mb-4">
              <Package className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No collections found</h3>
            <p className="text-slate-600">Try selecting a different category</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Need a Custom Kit?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Our experts can help you build a personalized tool collection tailored to your specific needs and budget.
          </p>
          <button className="px-10 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
