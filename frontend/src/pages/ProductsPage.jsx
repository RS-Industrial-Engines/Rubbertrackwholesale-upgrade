import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { normalizeBrandName } from '../utils/brandMapping';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

const CATEGORIES = [
  { id: 'rubber-tracks', name: 'Rubber Tracks' },
  { id: 'sprockets', name: 'Sprockets' },
  { id: 'rollers', name: 'Rollers' },
  { id: 'idlers', name: 'Idlers' },
];

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'all');
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  
  // DB-driven state
  const [dbBrands, setDbBrands] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [partNumbers, setPartNumbers] = useState([]);
  const [trackCompatibility, setTrackCompatibility] = useState([]);
  const [compatibleMachines, setCompatibleMachines] = useState([]);
  const [loadingParts, setLoadingParts] = useState(false);

  // Fetch brands from DB on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get(`${API}/api/brands`);
        setDbBrands(res.data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      }
    };
    fetchBrands();
  }, []);

  // Fetch products from DB when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedBrand !== 'all') params.brand = selectedBrand;
        if (selectedCategory !== 'all') params.category = selectedCategory;
        params.sort = sortBy;
        params.limit = 50;
        const res = await axios.get(`${API}/api/products`, { params });
        setDbProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setDbProducts([]);
      }
    };
    fetchProducts();
  }, [searchTerm, selectedBrand, selectedCategory, sortBy]);

  // Fetch part numbers and compatibility when search/category changes
  useEffect(() => {
    // Universal search
    if (searchTerm && selectedCategory === 'all' && selectedBrand === 'all' && !selectedModel) {
      const trackSizePattern = /^\d{2,3}x\d{2,3}(?:\.\d+)?x\d{2,3}$/i;
      if (trackSizePattern.test(searchTerm.trim())) {
        fetchTrackCompatibilityForSearch(null, searchTerm.trim());
        setPartNumbers([]);
      } else {
        fetchPartNumbers(searchTerm, null, null, null);
        const searchWords = searchTerm.trim().split(/\s+/);
        const firstWord = searchWords[0].toLowerCase();
        const knownBrands = ['kubota', 'bobcat', 'cat', 'caterpillar', 'komatsu', 'takeuchi', 'hitachi', 'asv', 'case', 'john deere', 'jcb', 'volvo', 'hyundai', 'doosan', 'kobelco', 'yanmar', 'gehl', 'mustang', 'terex', 'vermeer', 'ihi', 'new holland', 'ditch witch', 'wacker neuson', 'toro'];
        const isFirstWordBrand = knownBrands.some(brand => firstWord === brand || firstWord.startsWith(brand));
        if (isFirstWordBrand && searchWords.length > 1) {
          const potentialBrand = normalizeBrandName(searchWords[0]);
          const potentialModel = searchWords.slice(1).join(' ');
          fetchTrackCompatibilityForSearch(potentialBrand, potentialModel);
        } else {
          fetchTrackCompatibilityForSearch(null, searchTerm.trim());
        }
      }
    }
    // Category only: Rubber Tracks
    else if (selectedCategory === 'Rubber Tracks' && selectedBrand === 'all' && !selectedModel && !searchTerm) {
      fetchAllTrackSizes();
      setPartNumbers([]);
    }
    // Category: Sprockets, Rollers, Idlers
    else if (['Sprockets', 'Rollers', 'Idlers'].includes(selectedCategory) && selectedBrand === 'all' && !selectedModel && !searchTerm) {
      const partType = selectedCategory.toLowerCase().slice(0, -1);
      fetchPartNumbers(null, partType, null, null);
      setTrackCompatibility([]);
      setCompatibleMachines([]);
    }
    // Specific filters
    else if (searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedModel) {
      let partType = null;
      if (['Rollers', 'Sprockets', 'Idlers'].includes(selectedCategory)) {
        partType = selectedCategory.toLowerCase().slice(0, -1);
      }
      let brand = selectedBrand !== 'all' ? selectedBrand : null;
      fetchPartNumbers(searchTerm || null, partType, brand, selectedModel || null);
      
      if (selectedCategory === 'Rubber Tracks' && brand && selectedModel) {
        const normalizedBrand = normalizeBrandName(brand);
        fetchTrackCompatibility(normalizedBrand, selectedModel);
      } else if (selectedCategory === 'Rubber Tracks' && (brand || selectedModel)) {
        fetchTrackSizesFiltered(brand, selectedModel);
      } else {
        setTrackCompatibility([]);
      }
    } else {
      setPartNumbers([]);
      setTrackCompatibility([]);
      setCompatibleMachines([]);
    }
  }, [searchTerm, selectedCategory, selectedBrand, selectedModel]);

  // Update searchTerm when URL changes
  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [urlSearch]);

  const fetchAllTrackSizes = async () => {
    try {
      setLoadingParts(true);
      const [trackRes, compatRes] = await Promise.all([
        axios.get(`${API}/api/track-sizes`),
        axios.get(`${API}/api/compatibility`)
      ]);
      setTrackCompatibility(trackRes.data);
      setCompatibleMachines(compatRes.data);
    } catch (error) {
      console.error('Failed to fetch track sizes:', error);
      setTrackCompatibility([]);
      setCompatibleMachines([]);
    } finally {
      setLoadingParts(false);
    }
  };

  const fetchTrackSizesFiltered = async (brand, model) => {
    try {
      setLoadingParts(true);
      const params = {};
      if (brand) params.make = brand;
      if (model) params.model = model;
      const response = await axios.get(`${API}/api/compatibility/search`, { params });
      if (response.data && response.data.length > 0) {
        setCompatibleMachines(response.data);
        const allTrackSizes = [];
        for (const compat of response.data) {
          allTrackSizes.push(...(compat.track_sizes || []));
        }
        const uniqueSizes = [...new Set(allTrackSizes)];
        const trackSizesResponse = await axios.get(`${API}/api/track-sizes`);
        const compatibleTracks = trackSizesResponse.data.filter(ts => uniqueSizes.includes(ts.size));
        setTrackCompatibility(compatibleTracks);
      } else {
        setCompatibleMachines([]);
        setTrackCompatibility([]);
      }
    } catch (error) {
      console.error('Failed to fetch filtered track sizes:', error);
      setTrackCompatibility([]);
      setCompatibleMachines([]);
    } finally {
      setLoadingParts(false);
    }
  };

  const fetchPartNumbers = async (query, partType, brand, model) => {
    try {
      setLoadingParts(true);
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (partType) params.append('part_type', partType);
      if (brand) params.append('brand', brand);
      if (model) params.append('model', model);
      const response = await axios.get(`${API}/api/part-numbers/search?${params.toString()}`);
      setPartNumbers(response.data);
    } catch (error) {
      console.error('Failed to fetch part numbers:', error);
      setPartNumbers([]);
    } finally {
      setLoadingParts(false);
    }
  };

  const fetchTrackCompatibility = async (brand, model) => {
    try {
      const response = await axios.get(`${API}/api/compatibility/search`, {
        params: { make: brand, model: model }
      });
      if (response.data && response.data.length > 0) {
        const compatibility = response.data[0];
        const trackSizes = compatibility.track_sizes || [];
        if (trackSizes.length > 0) {
          const trackSizesResponse = await axios.get(`${API}/api/track-sizes`);
          const compatibleTracks = trackSizesResponse.data.filter(ts => trackSizes.includes(ts.size));
          setTrackCompatibility(compatibleTracks);
        } else {
          setTrackCompatibility([]);
        }
      } else {
        setTrackCompatibility([]);
      }
    } catch (error) {
      console.error('Error fetching track compatibility:', error);
      setTrackCompatibility([]);
    }
  };

  const fetchTrackCompatibilityForSearch = async (brand, model) => {
    try {
      const trackSizePattern = /^\d{2,3}x\d{2,3}(?:\.\d+)?x\d{2,3}$/i;
      if (trackSizePattern.test(model.trim())) {
        const trackSize = model.trim();
        const response = await axios.get(`${API}/api/compatibility/search`, { params: { track_size: trackSize } });
        if (response.data && response.data.length > 0) {
          setCompatibleMachines(response.data);
          const trackSizesResponse = await axios.get(`${API}/api/track-sizes`);
          const thisTrack = trackSizesResponse.data.find(ts => ts.size === trackSize);
          setTrackCompatibility(thisTrack ? [thisTrack] : []);
        } else {
          setCompatibleMachines([]);
          setTrackCompatibility([]);
        }
        return;
      }
      const searchParams = { model: model };
      if (brand) searchParams.make = brand;
      const response = await axios.get(`${API}/api/compatibility/search`, { params: searchParams });
      if (response.data && response.data.length > 0) {
        setCompatibleMachines(response.data);
        const allTrackSizes = [];
        for (const compat of response.data) {
          allTrackSizes.push(...(compat.track_sizes || []));
        }
        if (allTrackSizes.length > 0) {
          const trackSizesResponse = await axios.get(`${API}/api/track-sizes`);
          const uniqueTrackSizes = [...new Set(allTrackSizes)];
          const compatibleTracks = trackSizesResponse.data.filter(ts => uniqueTrackSizes.includes(ts.size));
          setTrackCompatibility(compatibleTracks);
        } else {
          setTrackCompatibility([]);
        }
      } else {
        setCompatibleMachines([]);
        setTrackCompatibility([]);
      }
    } catch (error) {
      console.error('Error fetching track compatibility for search:', error);
      setTrackCompatibility([]);
      setCompatibleMachines([]);
    }
  };

  const totalResults = dbProducts.length + partNumbers.length + trackCompatibility.length + compatibleMachines.length;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedModel('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="bg-slate-900 py-12 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">All Products</h1>
          <p className="text-slate-400 text-lg">Browse our complete selection of rubber tracks and undercarriage parts</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-slate-900 rounded-lg p-6 mb-8 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Input
                  data-testid="products-search-input"
                  type="text"
                  placeholder="Search by size, part number, or machine model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-400 pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            {/* Brand Filter - from DB */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger data-testid="brand-filter" className="bg-slate-800 border-slate-700 text-slate-200">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {dbBrands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.name}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger data-testid="category-filter" className="bg-slate-800 border-slate-700 text-slate-200">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-2">
              {(searchTerm || selectedBrand !== 'all' || selectedCategory !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-orange-500 hover:text-orange-400"
                  data-testid="clear-filters-btn"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
              <span className="text-slate-400 text-sm">
                {totalResults} {totalResults === 1 ? 'product' : 'products'} found
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {totalResults === 0 && !loadingParts ? (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-400 mb-2">
              {searchTerm ? 'No products found' : 'No products match your filters'}
            </h3>
            <p className="text-slate-500 mb-4">
              {searchTerm ? (
                <>
                  Products for <span className="text-orange-500 font-semibold">"{searchTerm}"</span> are not listed yet.
                  <br />Try a different machine model or contact us for availability.
                </>
              ) : (
                'Try adjusting your search or filters'
              )}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={clearFilters} className="bg-orange-500 hover:bg-orange-600">
                Clear All Filters
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Track Compatibility Section */}
            {trackCompatibility.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Compatible Rubber Track Sizes ({trackCompatibility.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trackCompatibility.map((track) => {
                    const w = track.width || parseFloat(track.size?.split('x')[0]) || 0;
                    const p = track.pitch || parseFloat(track.size?.split('x')[1]) || 0;
                    const l = track.links || track.size?.split('x')[2] || 0;
                    return (
                      <Card key={track.id} className="bg-slate-800 border-slate-700 hover:border-orange-500 transition-all">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                Rubber Track
                              </span>
                              {track.is_in_stock && (
                                <span className="ml-2 px-2 py-1 rounded text-xs bg-green-600 text-white">In Stock</span>
                              )}
                            </div>
                            {track.is_in_stock && track.price && (
                              <span className="text-orange-500 font-bold text-lg">${parseFloat(track.price).toFixed(2)}</span>
                            )}
                          </div>
                          <h3 className="text-white font-semibold text-xl mb-2">{track.size}</h3>
                          <p className="text-slate-400 text-sm mb-2">
                            Width: {w}mm | Pitch: {p}mm | Links: {l}
                          </p>
                          <p className="text-slate-400 text-sm mb-3">
                            {(w / 25.4).toFixed(1)}" x {(p / 25.4).toFixed(2)}" x {l}
                          </p>
                          <Link to="/contact">
                            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                              {track.is_in_stock && track.price ? 'Request Quote' : 'Contact for Price'}
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Compatible Machines */}
            {compatibleMachines.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Compatible Machines ({compatibleMachines.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {compatibleMachines.map((machine, idx) => (
                    <Card key={idx} className="bg-slate-800 border-slate-700 hover:border-orange-500 transition-all">
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">Machine Model</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">{machine.make} {machine.model}</h3>
                        <p className="text-slate-400 text-sm mb-3">Compatible Track Sizes:</p>
                        <div className="flex flex-wrap gap-1">
                          {machine.track_sizes.slice(0, 3).map((size, sizeIdx) => (
                            <span key={sizeIdx} className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">{size}</span>
                          ))}
                          {machine.track_sizes.length > 3 && (
                            <span className="text-xs text-slate-500">+{machine.track_sizes.length - 3} more</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Part Numbers */}
            {partNumbers.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Undercarriage Parts ({partNumbers.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {partNumbers.map((part) => (
                    <Card key={part.id} className="bg-slate-800 border-slate-700 hover:border-orange-500 transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              part.part_type === 'roller' ? 'bg-blue-100 text-blue-800' :
                              part.part_type === 'sprocket' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {part.part_type}
                            </span>
                            {part.part_subtype && (
                              <span className="ml-2 px-2 py-1 rounded text-xs bg-gray-200 text-gray-700">{part.part_subtype}</span>
                            )}
                          </div>
                          {part.price && (
                            <span className="text-orange-500 font-bold text-lg">${parseFloat(part.price).toFixed(2)}</span>
                          )}
                        </div>
                        <h3 className="text-white font-semibold mb-2">Part # {part.part_number}</h3>
                        <p className="text-slate-400 text-sm mb-3">{part.brand} - {part.product_name}</p>
                        {part.compatible_models && part.compatible_models.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {part.compatible_models.slice(0, 4).map((model, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">{model}</span>
                            ))}
                            {part.compatible_models.length > 4 && (
                              <span className="text-xs text-slate-500">+{part.compatible_models.length - 4} more</span>
                            )}
                          </div>
                        )}
                        <Link to="/contact">
                          <Button className="w-full bg-orange-500 hover:bg-orange-600">
                            {part.price ? 'Request Quote' : 'Contact for Price'}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* DB Products */}
            {dbProducts.length > 0 && !selectedModel && (
              <>
                {(partNumbers.length > 0 || trackCompatibility.length > 0) && (
                  <h2 className="text-2xl font-bold text-white mb-4 mt-8">
                    Products ({dbProducts.length})
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {dbProducts.map((product) => (
                    <Card key={product.id} className="bg-slate-900 border-slate-800 hover:border-orange-500 transition-all duration-300 group">
                      <CardContent className="p-0">
                        {product.images && product.images.length > 0 && (
                          <div className="relative overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.title || product.name}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {product.in_stock && (
                              <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                In Stock
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-4">
                          <p className="text-orange-500 text-xs font-semibold mb-1">{product.brand}</p>
                          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{product.title || product.name}</h3>
                          <p className="text-slate-400 text-xs mb-1">SKU: {product.sku || 'N/A'}</p>
                          <p className="text-slate-400 text-xs mb-3">{product.size}</p>
                          <div className="flex justify-between items-center">
                            {product.price ? (
                              <span className="text-xl font-bold text-white">${parseFloat(product.price).toFixed(2)}</span>
                            ) : (
                              <span className="text-sm text-slate-400">Contact for Price</span>
                            )}
                            <Link to={`/product/${product.id}`}>
                              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Details</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
