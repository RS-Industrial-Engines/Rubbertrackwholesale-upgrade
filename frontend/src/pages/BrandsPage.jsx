import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Search } from 'lucide-react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${API}/api/brands`);
        setBrands(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  // Filter brands based on search term
  const filteredBrands = brands.filter(brand =>
    (brand.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white text-xl">Loading brands...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section 
        className="bg-slate-900 py-20 border-b border-slate-800 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1625936123395-c44e3370d8fd?w=1600&h=600&fit=crop')`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Shop by Brand</h1>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto">
            We carry premium aftermarket rubber tracks and undercarriage parts for all major equipment brands
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Type the brand you're looking for (e.g., Bobcat, CAT, Kubota)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-lg"
              data-testid="brand-search-input"
            />
          </div>
          <p className="text-slate-400 text-center mt-3">
            {searchTerm ? (
              <>Showing <span className="text-orange-500 font-semibold">{filteredBrands.length}</span> of {brands.length} brands</>
            ) : (
              <>Search through <span className="text-orange-500 font-semibold">{brands.length}</span> equipment brands</>
            )}
          </p>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand) => (
              <Link key={brand.id} to={`/products?brand=${brand.name}`}>
                <Card className="bg-slate-900 border-slate-800 hover:border-orange-500 transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-8 text-center">
                    <div className="h-32 flex items-center justify-center mb-6">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="max-h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="text-4xl font-bold text-slate-600 group-hover:text-slate-500 transition-colors">
                          {brand.name?.charAt(0) || '?'}
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{brand.name}</h3>
                    <p className="text-slate-400 mb-4">View all {brand.name} parts</p>
                    <div className="text-orange-500 font-semibold group-hover:text-orange-400">
                      Browse Products →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-xl mb-4">No brands found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-orange-500 hover:text-orange-400 font-semibold"
            >
              Clear search and show all brands
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-slate-900 border border-slate-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Premium Aftermarket Parts for All Brands</h2>
          <div className="text-slate-300 space-y-4">
            <p>
              At Rubber Track Wholesale, we specialize in providing high-quality aftermarket rubber tracks and undercarriage parts for all major equipment manufacturers. Our parts meet or exceed OEM specifications while offering significant cost savings.
            </p>
            <p>
              Each rubber track is manufactured with heavy-duty reinforced steel cords, premium rubber compounds, and undergoes rigorous quality control testing. We stand behind every product with our comprehensive warranty program.
            </p>
            <p>
              Whether you operate Bobcat, Kubota, Caterpillar, Case, or any other major brand, we have the right parts in stock and ready to ship from our nationwide warehouse network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
