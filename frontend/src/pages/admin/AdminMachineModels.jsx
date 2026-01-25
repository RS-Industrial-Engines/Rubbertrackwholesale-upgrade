import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit, Trash2, Upload, Download, Globe, Building2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { toast } from '../../hooks/use-toast';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL || '';

const AdminMachineModels = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('us'); // 'us' or 'non-us'
  const [formData, setFormData] = useState({
    brand: '',
    model_name: '',
    full_name: '',
    description: '',
    product_image: ''
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API}/api/admin/brands`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBrands(response.data);
    } catch (error) {
      console.error('Failed to fetch brands');
    }
  };

  const fetchModels = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API}/api/admin/machine-models`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setModels(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch machine models",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter models by U.S. support status, brand, and search term
  const usModels = models.filter(m => m.is_us_supported === true);
  const nonUsModels = models.filter(m => m.is_us_supported !== true);
  
  const getFilteredModels = () => {
    let filtered = activeTab === 'us' ? usModels : nonUsModels;
    
    if (selectedBrand) {
      filtered = filtered.filter(m => m.brand === selectedBrand);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        (m.brand || '').toLowerCase().includes(term) ||
        (m.model_name || '').toLowerCase().includes(term) ||
        (m.full_name || '').toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  const filteredModels = getFilteredModels();

  // Get unique brands for the current tab
  const tabBrands = [...new Set((activeTab === 'us' ? usModels : nonUsModels).map(m => m.brand))].sort();

  // Brand counts for current tab
  const brandCounts = {};
  (activeTab === 'us' ? usModels : nonUsModels).forEach(model => {
    brandCounts[model.brand] = (brandCounts[model.brand] || 0) + 1;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      const url = editingModel 
        ? `${API}/api/admin/machine-models/${editingModel.id}`
        : `${API}/api/admin/machine-models`;
      
      const method = editingModel ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: `Machine model ${editingModel ? 'updated' : 'created'} successfully`
      });

      setDialogOpen(false);
      resetForm();
      fetchModels();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to save machine model",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (modelId) => {
    if (!window.confirm('Are you sure you want to delete this machine model?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${API}/api/admin/machine-models/${modelId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({ title: "Success", description: "Machine model deleted successfully" });
      fetchModels();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete machine model",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (model) => {
    setEditingModel(model);
    setFormData({
      brand: model.brand || '',
      model_name: model.model_name || '',
      full_name: model.full_name || '',
      description: model.description || '',
      product_image: model.product_image || ''
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingModel(null);
    setFormData({
      brand: '',
      model_name: '',
      full_name: '',
      description: '',
      product_image: ''
    });
  };

  const handleCSVImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    toast({
      title: "Import Started",
      description: "Processing CSV file..."
    });

    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
      const dataLines = lines.slice(1).filter(line => line.trim());

      const token = localStorage.getItem('admin_token');
      let created = 0;
      let updated = 0;
      let errors = 0;
      
      for (const line of dataLines) {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = values[index] || '';
        });

        const id = rowData['id'] || '';
        const brand = rowData['brand'] || '';
        const modelName = rowData['model name'] || rowData['model_name'] || '';
        
        if (!brand || !modelName) continue;

        const modelData = {
          brand,
          model_name: modelName,
          full_name: rowData['full name'] || rowData['full_name'] || `${brand} ${modelName}`,
          equipment_type: rowData['equipment type'] || rowData['equipment_type'] || '',
          description: rowData['description'] || '',
          product_image: rowData['image url'] || rowData['product_image'] || ''
        };

        try {
          const existingModel = models.find(m => 
            (id && m.id === id) || 
            (m.brand.toLowerCase() === brand.toLowerCase() && m.model_name.toLowerCase() === modelName.toLowerCase())
          );
          
          if (existingModel) {
            await axios.put(`${API}/api/admin/machine-models/${existingModel.id}`, modelData, {
              headers: { Authorization: `Bearer ${token}` }
            });
            updated++;
          } else {
            await axios.post(`${API}/api/admin/machine-models`, modelData, {
              headers: { Authorization: `Bearer ${token}` }
            });
            created++;
          }
        } catch (err) {
          errors++;
        }
      }

      toast({
        title: "Import Complete",
        description: `Created: ${created}, Updated: ${updated}, Errors: ${errors}`
      });
      fetchModels();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process CSV file",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Brand', 'Model Name', 'Full Name', 'Equipment Type', 'Description', 'Image URL', 'Is US Supported'];
    const rows = filteredModels.map(m => [
      m.id,
      m.brand,
      m.model_name,
      m.full_name || '',
      m.equipment_type || '',
      m.description || '',
      m.product_image || '',
      m.is_us_supported ? 'TRUE' : 'FALSE'
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `machine_models_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export Successful",
      description: `Exported ${filteredModels.length} machine models`
    });
  };

  const downloadTemplate = () => {
    const headers = ['ID', 'Brand', 'Model Name', 'Full Name', 'Equipment Type', 'Description', 'Image URL'];
    const exampleRow = ['', 'Bobcat', 'T190', 'Bobcat T190', 'Track Loader', 'Compact track loader', ''];
    const csv = [headers, exampleRow].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'machine_models_template.csv';
    a.click();
    
    toast({
      title: "Template Downloaded",
      description: "Use this template to add or update machine models"
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Machine Models Management</h1>
          <p className="text-slate-400 mt-2">Manage machine models for all brands</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={downloadTemplate} 
            className="text-white border-slate-600 hover:bg-slate-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Template
          </Button>
          <Button 
            variant="outline" 
            onClick={exportToCSV} 
            disabled={filteredModels.length === 0}
            className="text-white border-slate-600 hover:bg-slate-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()} 
            disabled={loading}
            className="text-white border-slate-600 hover:bg-slate-800"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVImport}
            style={{ display: 'none' }}
          />
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Model
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingModel ? 'Edit Machine Model' : 'Add New Machine Model'}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {editingModel ? 'Update machine model details' : 'Add a new machine model'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Brand *</Label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white"
                      required
                    >
                      <option value="">Select Brand</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.name}>{brand.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Model Name *</Label>
                    <Input
                      value={formData.model_name}
                      onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                      required
                      className="bg-slate-800 border-slate-700"
                      placeholder="e.g., T190, 317G, SVL95"
                    />
                  </div>
                </div>

                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    placeholder="e.g., Bobcat T190 Compact Track Loader"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div>
                  <Label>Product Image URL</Label>
                  <Input
                    value={formData.product_image}
                    onChange={(e) => setFormData({ ...formData, product_image: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={loading}>
                    {loading ? 'Saving...' : (editingModel ? 'Update Model' : 'Create Model')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* U.S. vs Non-U.S. Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 p-1 bg-slate-800 rounded-lg w-fit">
          <button
            onClick={() => { setActiveTab('us'); setSelectedBrand(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'us'
                ? 'bg-green-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Globe className="h-4 w-4" />
            U.S. Supported ({usModels.length})
          </button>
          <button
            onClick={() => { setActiveTab('non-us'); setSelectedBrand(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'non-us'
                ? 'bg-slate-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Building2 className="h-4 w-4" />
            Non-U.S. / Internal ({nonUsModels.length})
          </button>
        </div>
        
        {/* Info banner based on tab */}
        <div className={`mt-4 p-3 rounded-lg ${activeTab === 'us' ? 'bg-green-900/30 border border-green-800' : 'bg-slate-800/50 border border-slate-700'}`}>
          {activeTab === 'us' ? (
            <p className="text-sm text-green-300">
              <strong>U.S. Supported Models:</strong> These models are visible to customers on the public website and in compatibility search results.
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              <strong>Non-U.S. / Internal Models:</strong> These models are hidden from the public website. They remain in the database for reference and compatibility records.
            </p>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-slate-900 border-slate-800 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Label className="text-white whitespace-nowrap">Filter by Brand:</Label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white min-w-[200px]"
              >
                <option value="">All Brands ({tabBrands.length})</option>
                {tabBrands.map(brand => (
                  <option key={brand} value={brand}>{brand} ({brandCounts[brand] || 0})</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Input
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-slate-700 max-w-xs"
              />
            </div>
            <span className="text-slate-400">
              Showing {filteredModels.length} models
            </span>
          </div>
          
          {/* Brand Counts - Only show when viewing all brands */}
          {!selectedBrand && Object.keys(brandCounts).length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Models per Brand ({activeTab === 'us' ? 'U.S. Supported' : 'Non-U.S.'}):</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 text-sm max-h-48 overflow-y-auto">
                {Object.entries(brandCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([brand, count]) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className="flex justify-between items-center bg-slate-800/50 px-3 py-1.5 rounded hover:bg-slate-700 transition-colors text-left"
                    >
                      <span className="text-slate-300 truncate">{brand}</span>
                      <span className="text-orange-400 font-semibold ml-2">{count}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Models List */}
      {loading && models.length === 0 ? (
        <div className="text-center py-12 text-slate-400">Loading machine models...</div>
      ) : filteredModels.length === 0 ? (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="py-12 text-center text-slate-400">
            <p>
              {searchTerm || selectedBrand
                ? `No models found matching your filters`
                : `No ${activeTab === 'us' ? 'U.S. supported' : 'non-U.S.'} models found.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map((model) => (
            <Card key={model.id} className={`bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors ${model.is_us_supported ? '' : 'opacity-75'}`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-orange-400 font-semibold">{model.brand}</span>
                      {model.is_us_supported ? (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-900/50 text-green-400 rounded">U.S.</span>
                      ) : (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-700 text-slate-400 rounded">Non-U.S.</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white">{model.model_name}</h3>
                    {model.full_name && model.full_name !== `${model.brand} ${model.model_name}` && (
                      <p className="text-sm text-slate-400">{model.full_name}</p>
                    )}
                    {model.description && (
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{model.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(model)}>
                      <Edit className="h-4 w-4 text-slate-400 hover:text-orange-400" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDelete(model.id)}
                    >
                      <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Footer */}
      <div className="mt-6 text-sm text-slate-500 text-center">
        Showing {filteredModels.length} of {activeTab === 'us' ? usModels.length : nonUsModels.length} {activeTab === 'us' ? 'U.S. supported' : 'non-U.S.'} models 
        • Total in database: {models.length}
      </div>
    </div>
  );
};

export default AdminMachineModels;
