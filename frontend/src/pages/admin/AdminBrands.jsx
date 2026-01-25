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
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { toast } from '../../hooks/use-toast';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL || '';

const AdminBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [activeTab, setActiveTab] = useState('us'); // 'us' or 'non-us'
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: []
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API}/api/admin/brands`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBrands(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch brands",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter brands by U.S. support status and search term
  const usBrands = brands.filter(b => b.is_us_supported === true);
  const nonUsBrands = brands.filter(b => b.is_us_supported !== true);
  
  const filteredBrands = (activeTab === 'us' ? usBrands : nonUsBrands).filter(brand =>
    (brand.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const dataLines = lines.slice(1).filter(line => line.trim());
      
      const token = localStorage.getItem('admin_token');
      let created = 0;
      let updated = 0;
      let errors = 0;
      
      for (const line of dataLines) {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const [id, name, logo, description, seoTitle, seoDescription] = values;
        
        if (!name) continue;
        
        const brandData = {
          name,
          logo: logo || null,
          description: description || null,
          seo_title: seoTitle || null,
          seo_description: seoDescription || null
        };
        
        try {
          // Try to find existing brand by ID or name (unique key)
          const existingBrand = brands.find(b => 
            (id && b.id === id) || b.name.toLowerCase() === name.toLowerCase()
          );
          
          if (existingBrand) {
            await axios.put(`${API}/api/admin/brands/${existingBrand.id}`, brandData, {
              headers: { Authorization: `Bearer ${token}` }
            });
            updated++;
          } else {
            await axios.post(`${API}/api/admin/brands`, brandData, {
              headers: { Authorization: `Bearer ${token}` }
            });
            created++;
          }
        } catch (err) {
          console.error(`Error importing brand ${name}:`, err);
          errors++;
        }
      }
      
      toast({
        title: "Import Complete",
        description: `Created: ${created}, Updated: ${updated}, Errors: ${errors}`
      });
      fetchBrands();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse CSV file",
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
    const displayBrands = activeTab === 'us' ? usBrands : nonUsBrands;
    const headers = ['ID', 'Name', 'Logo', 'Description', 'SEO Title', 'SEO Description', 'Is US Supported'];
    const rows = displayBrands.map(brand => [
      brand.id || '',
      brand.name || '',
      brand.logo || '',
      brand.description || '',
      brand.seo_title || '',
      brand.seo_description || '',
      brand.is_us_supported ? 'TRUE' : 'FALSE'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brands_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    const headers = ['ID', 'Name', 'Logo', 'Description', 'SEO Title', 'SEO Description'];
    const example = ['', 'Example Brand', 'https://example.com/logo.png', 'Brand description', 'SEO Title', 'SEO Description'];
    const csvContent = [headers.join(','), example.join(',')].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brands_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      
      if (editingBrand) {
        await axios.put(`${API}/api/admin/brands/${editingBrand.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: "Success", description: "Brand updated successfully" });
      } else {
        await axios.post(`${API}/api/admin/brands`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: "Success", description: "Brand created successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchBrands();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to save brand",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${API}/api/admin/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "Success", description: "Brand deleted successfully" });
      fetchBrands();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete brand",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
      description: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: []
    });
    setEditingBrand(null);
  };

  const startEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      logo: brand.logo || '',
      description: brand.description || '',
      seo_title: brand.seo_title || '',
      seo_description: brand.seo_description || '',
      seo_keywords: brand.seo_keywords || []
    });
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Brands Management</h1>
          <p className="text-slate-400 mt-2">Manage equipment brands and manufacturers</p>
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
            disabled={filteredBrands.length === 0}
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
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {editingBrand ? 'Update brand details' : 'Add a new equipment brand'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Brand Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    required
                  />
                </div>

                <div>
                  <Label>Logo URL</Label>
                  <Input
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>SEO Title</Label>
                  <Input
                    value={formData.seo_title}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div>
                  <Label>SEO Description</Label>
                  <Textarea
                    value={formData.seo_description}
                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={loading}>
                    {loading ? 'Saving...' : (editingBrand ? 'Update Brand' : 'Create Brand')}
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
            onClick={() => setActiveTab('us')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'us'
                ? 'bg-green-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Globe className="h-4 w-4" />
            U.S. Supported ({usBrands.length})
          </button>
          <button
            onClick={() => setActiveTab('non-us')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'non-us'
                ? 'bg-slate-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Building2 className="h-4 w-4" />
            Non-U.S. / Internal ({nonUsBrands.length})
          </button>
        </div>
        
        {/* Info banner based on tab */}
        <div className={`mt-4 p-3 rounded-lg ${activeTab === 'us' ? 'bg-green-900/30 border border-green-800' : 'bg-slate-800/50 border border-slate-700'}`}>
          {activeTab === 'us' ? (
            <p className="text-sm text-green-300">
              <strong>U.S. Supported Brands:</strong> These brands are visible to customers on the public website and in search results.
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              <strong>Non-U.S. / Internal Brands:</strong> These brands are hidden from the public website. They remain in the database for reference and compatibility records.
            </p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder={`Search ${activeTab === 'us' ? 'U.S. supported' : 'non-U.S.'} brands...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-800 border-slate-700 max-w-md"
        />
      </div>

      {/* Brand Grid */}
      {loading && brands.length === 0 ? (
        <div className="text-center py-12 text-slate-400">Loading brands...</div>
      ) : filteredBrands.length === 0 ? (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="py-12 text-center text-slate-400">
            <p>
              {searchTerm 
                ? `No brands found matching "${searchTerm}"` 
                : `No ${activeTab === 'us' ? 'U.S. supported' : 'non-U.S.'} brands found.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBrands.map((brand) => (
            <Card key={brand.id} className={`bg-slate-900 border-slate-800 hover:border-orange-500 transition-all ${brand.is_us_supported ? '' : 'opacity-75'}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{brand.name}</h3>
                      {brand.is_us_supported ? (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-900/50 text-green-400 rounded-full">U.S.</span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-medium bg-slate-700 text-slate-400 rounded-full">Non-U.S.</span>
                      )}
                    </div>
                    {brand.description && (
                      <p className="text-slate-400 text-sm line-clamp-2">{brand.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(brand)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(brand.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {brand.logo && (
                  <div className="mt-4">
                    <img src={brand.logo} alt={brand.name} className="h-12 object-contain" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Footer */}
      <div className="mt-6 text-sm text-slate-500 text-center">
        Showing {filteredBrands.length} of {activeTab === 'us' ? usBrands.length : nonUsBrands.length} {activeTab === 'us' ? 'U.S. supported' : 'non-U.S.'} brands 
        • Total in database: {brands.length}
      </div>
    </div>
  );
};

export default AdminBrands;
