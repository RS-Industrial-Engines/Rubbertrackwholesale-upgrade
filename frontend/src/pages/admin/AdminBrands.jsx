import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit, Trash2, Upload, Download } from 'lucide-react';
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
      let skipped = 0;
      let errors = 0;

      for (const line of dataLines) {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        if (values.length < 2) continue;
        
        const [id, name, logo, description, seo_title, seo_description] = values;
        
        if (!name) {
          errors++;
          continue;
        }

        const payload = {
          name,
          logo: logo || '',
          description: description || '',
          seo_title: seo_title || '',
          seo_description: seo_description || ''
        };
        
        try {
          if (id && id.trim()) {
            // Update by ID
            await axios.put(`${API}/api/admin/brands/${id}`, payload, {
              headers: { Authorization: `Bearer ${token}` }
            });
            updated++;
          } else {
            // Check if exists by name (unique key)
            const existingResponse = await axios.get(`${API}/api/admin/brands`);
            const existing = existingResponse.data.find(b => b.name.toLowerCase() === name.toLowerCase());
            
            if (existing) {
              await axios.put(`${API}/api/admin/brands/${existing.id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
              });
              updated++;
            } else {
              await axios.post(`${API}/api/admin/brands`, payload, {
                headers: { Authorization: `Bearer ${token}` }
              });
              created++;
            }
          }
        } catch (error) {
          if (error.response?.status === 400) {
            skipped++;
          } else {
            errors++;
          }
        }
      }

      toast({
        title: "CSV Import Complete!",
        description: `Created: ${created} | Updated: ${updated} | Skipped: ${skipped} | Errors: ${errors}`
      });

      fetchBrands();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process CSV file",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process CSV file",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Logo', 'Description', 'SEO Title', 'SEO Description'];
    const rows = brands.map(b => [
      b.id || '',
      b.name,
      b.logo || '',
      b.description || '',
      b.seo_title || '',
      b.seo_description || ''
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brands_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export Successful",
      description: `Exported ${brands.length} brands with IDs`
    });
  };

  const downloadTemplate = () => {
    const headers = ['ID', 'Name', 'Logo', 'Description', 'SEO Title', 'SEO Description'];
    const exampleRow = ['', 'Bobcat', 'https://example.com/logo.png', 'Premium equipment manufacturer', 'Bobcat Parts & Equipment', 'Shop genuine Bobcat parts'];
    const csv = [headers, exampleRow].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brands_template.csv';
    a.click();
    
    toast({
      title: "Template Downloaded",
      description: "Use this template to add or update brands"
    });
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Brands Management</h1>
          <p className="text-slate-400 mt-2">Manage equipment brands and manufacturers</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={exportToCSV} 
            disabled={brands.length === 0}
            className="text-white border-slate-600 hover:bg-slate-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()} 
            disabled={loading}
            className="text-white border-slate-600 hover:bg-slate-800"
          >
            <Upload className="h-4 w-4 mr-2" />
            {loading ? 'Importing...' : 'Import CSV'}
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

      {/* Note about Machine Models */}
      <div className="mb-4 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
        <p className="text-sm text-blue-300">
          <strong>Note:</strong> Machine models for each brand are managed in the <strong>Machine Models</strong> admin section. 
          Use the Machine Models page to add, edit, or bulk import models via CSV.
        </p>
      </div>

      {/* CSV Format Info */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-800 mb-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold text-white mb-2">CSV Import Format:</h3>
          <p className="text-sm text-slate-400 font-mono">
            Name, Logo, Description, SEO Title, SEO Description
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Example: Bobcat,https://example.com/logo.png,Premium equipment,Bobcat Parts,Shop Bobcat parts
          </p>
        </CardContent>
      </Card>

      {loading && brands.length === 0 ? (
        <div className="text-center py-12 text-slate-400">Loading brands...</div>
      ) : brands.length === 0 ? (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="py-12 text-center text-slate-400">
            <p>No brands found. Click "Add Brand" or "Import CSV" to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <Card key={brand.id} className="bg-slate-900 border-slate-800 hover:border-orange-500 transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{brand.name}</h3>
                    {brand.description && (
                      <p className="text-slate-400 text-sm">{brand.description}</p>
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
    </div>
  );
};

export default AdminBrands;