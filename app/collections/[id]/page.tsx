'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Star, ShoppingCart } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

export default function CollectionDetailPage() {
  const params = useParams();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const response = await fetch('/api/collections');
      const data = await response.json();
      const found = data.find((c: Collection) => c.id === parseInt(params.id as string));
      setCollection(found || null);
    } catch (err) {
      console.error('Failed to fetch collection:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Collection Not Found</h2>
          <Link href="/collections" className="text-blue-600 hover:underline">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = collection.tools.reduce((sum, tool) => sum + tool.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/collections" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Collections</span>
        </Link>

        <div className="bg-white rounded-3xl border-2 border-slate-100 p-8 md:p-12 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                {collection.name}
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl mb-6">
                {collection.description}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-900">{collection.tools.length} items</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900">{collection.rating}</span>
                  <span className="text-slate-500">({collection.reviews} reviews)</span>
                </div>
              </div>
            </div>
            {collection.popular && (
              <span className="px-4 py-2 bg-amber-100 rounded-full text-sm font-bold text-amber-700 flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                Popular
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <div>
              <div className="text-sm text-slate-500 mb-1">Complete Kit Price</div>
              <div className="text-5xl font-black text-slate-900">€{collection.price}</div>
              <div className="text-sm text-slate-500 mt-1">
                Individual items: €{totalPrice.toFixed(2)}
              </div>
            </div>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-3">
              <ShoppingCart className="w-5 h-5" />
              <span>Buy Complete Kit</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900 mb-4">What&apos;s Included</h2>
        </div>

        {collection.tools.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-slate-100 p-12 text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No tools yet</h3>
            <p className="text-slate-600">Tools will be added to this collection soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-blue-600 hover:shadow-lg transition-all"
              >
                {tool.image && (
                  <div className="h-48 bg-slate-50 flex items-center justify-center">
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className="max-h-full max-w-full object-contain p-4"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">{tool.brand}</p>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="text-2xl font-black text-blue-600">
                    €{tool.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
