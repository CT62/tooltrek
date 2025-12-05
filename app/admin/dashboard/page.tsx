// app/admin/dashboard/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Mountain, Plus, Edit, Trash2, LogOut, Save, X, ArrowLeft } from 'lucide-react';
import { Collection, Tool } from '@/types';

export default function AdminDashboard() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  const handleAddTool = async (tool: Omit<Tool, 'id' | 'collectionId'>) => {
    if (!selectedCollection) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/collections/${selectedCollection.id}/tools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tool),
      });
      if (response.ok) {
        const newTool = await response.json();
        const updatedCollection = {
          ...selectedCollection,
          tools: [...selectedCollection.tools, newTool],
        };
        setSelectedCollection(updatedCollection);
        setCollections(collections.map(c => 
          c.id === selectedCollection.id ? updatedCollection : c
        ));
        setShowAddForm(false);
        setEditingTool(null);
      }
    } catch (err) {
      console.error('Failed to add tool:', err);
    }
  };

  const handleUpdateTool = async (tool: Tool) => {
    if (!selectedCollection) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/collections/${selectedCollection.id}/tools/${tool.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tool),
      });
      if (response.ok) {
        const updatedCollection = {
          ...selectedCollection,
          tools: selectedCollection.tools.map(t => t.id === tool.id ? tool : t),
        };
        setSelectedCollection(updatedCollection);
        setCollections(collections.map(c => 
          c.id === selectedCollection.id ? updatedCollection : c
        ));
        setEditingTool(null);
      }
    } catch (err) {
      console.error('Failed to update tool:', err);
    }
  };

  const handleDeleteTool = async (toolId: number) => {
    if (!selectedCollection || !confirm('Are you sure you want to delete this tool?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/collections/${selectedCollection.id}/tools/${toolId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedCollection = {
          ...selectedCollection,
          tools: selectedCollection.tools.filter(t => t.id !== toolId),
        };
        setSelectedCollection(updatedCollection);
        setCollections(collections.map(c => 
          c.id === selectedCollection.id ? updatedCollection : c
        ));
      }
    } catch (err) {
      console.error('Failed to delete tool:', err);
    }
  };

  const startAddNew = () => {
    setEditingTool({
      id: 0,
      name: '',
      brand: '',
      price: 0,
      description: '',
      image: '',
      collectionId: selectedCollection?.id || 0,
    });
    setShowAddForm(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {!selectedCollection ? (
          // Collections List View
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-black text-slate-900 mb-2">Select a Collection</h1>
              <p className="text-slate-600">Choose a collection to manage its tools</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection)}
                  className="bg-white rounded-2xl border-2 border-slate-100 p-8 hover:border-blue-600 hover:shadow-lg transition-all text-left"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {collection.category}
                  </p>
                  <div className="text-sm font-semibold text-blue-600">
                    {collection.tools.length} tools
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          // Tools Management View
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
                <div>
                  <h1 className="text-4xl font-black text-slate-900 mb-1">
                    {selectedCollection.name}
                  </h1>
                  <p className="text-slate-600">{selectedCollection.tools.length} tools in this collection</p>
                </div>
              </div>
              <button
                onClick={startAddNew}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Tool
              </button>
            </div>

            {/* Add/Edit Form Modal */}
            {(showAddForm || editingTool) && editingTool && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
                <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-900">
                      {showAddForm ? 'Add New Tool' : 'Edit Tool'}
                    </h2>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTool(null);
                      }}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ToolForm
                    tool={editingTool}
                    onSave={showAddForm ? handleAddTool : handleUpdateTool}
                    onCancel={() => {
                      setShowAddForm(false);
                      setEditingTool(null);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCollection.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-blue-600 transition-all"
                >
                  {tool.image && (
                    <div className="h-48 bg-slate-100 flex items-center justify-center">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="max-h-full max-w-full object-contain p-4"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">{tool.brand}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="text-2xl font-black text-slate-900">
                        €{tool.price}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTool(tool)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteTool(tool.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCollection.tools.length === 0 && (
              <div className="text-center py-20">
                <div className="text-slate-300 mb-4">
                  <Plus className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No tools yet</h3>
                <p className="text-slate-600 mb-6">Add your first tool to this collection</p>
                <button
                  onClick={startAddNew}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add First Tool
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ToolForm({
  tool,
  onSave,
  onCancel,
}: {
  tool: Tool;
  onSave: (tool: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(tool);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Tool Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-slate-900"
          placeholder="e.g., 16oz Claw Hammer"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Brand</label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-slate-900"
          placeholder="e.g., Stanley, DeWalt"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-slate-900"
          rows={3}
          placeholder="Describe the tool and its features..."
        />
      </div>
      <div className="flex items-center gap-3 pt-4">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Tool
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
