// app/collections/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Mountain, Star, Package, ArrowLeft } from 'lucide-react';
import { Collection } from '@/types';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections');
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      } else {
        setError('Failed to load collections');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCollections}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-slate-600">
            Professional tool kits curated by experts for every trade
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-blue-600 hover:shadow-xl transition-all"
            >
              <div className="p-8">
                {collection.popular && (
                  <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-4">
                    POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  {collection.name}
                </h3>
                
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-slate-900">
                      {collection.rating}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({collection.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-slate-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm font-medium">
                        {collection.tools?.length || 0} tools
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div>
                    <div className="text-3xl font-black text-slate-900">
                      €{collection.price}
                    </div>
                    <div className="text-xs text-slate-500">Complete kit</div>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {collections.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No collections yet</h3>
            <p className="text-slate-600">Check back soon for our tool collections!</p>
          </div>
        )}
      </div>
    </div>
  );
}
