import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')} className="bg-orange-500 hover:bg-orange-600">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const title = product.title || product.name || 'Untitled Product';
  const sku = product.sku || 'N/A';
  const partNumber = product.part_number || product.partNumber || 'N/A';
  const price = product.price;
  const inStock = product.in_stock || product.inStock || false;
  const images = product.images || [];
  const specs = product.specifications || {};
  const size = product.size || '';
  const category = product.category || '';
  const brand = product.brand || '';
  const description = product.description || '';
  const warranty = specs.warranty || '1 Year';

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${title} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/products')}
          className="text-slate-400 hover:text-orange-500 mb-6"
          data-testid="back-to-products"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            {images.length > 0 ? (
              <>
                <Card className="bg-slate-900 border-slate-800 mb-4">
                  <CardContent className="p-0">
                    <img
                      src={images[selectedImage]}
                      alt={title}
                      className="w-full h-96 object-cover rounded-t-lg"
                    />
                  </CardContent>
                </Card>
                {images.length > 1 && (
                  <div className="flex gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-orange-500' : 'border-slate-800'
                        }`}
                      >
                        <img src={image} alt={`${title} ${index + 1}`} className="w-full h-24 object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-0 h-96 flex items-center justify-center">
                  <p className="text-slate-500">No image available</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {brand}
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
              <div className="flex items-center gap-4 text-slate-400">
                <span>SKU: {sku}</span>
                <span>-</span>
                <span>Part #: {partNumber}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                {price ? (
                  <span className="text-4xl font-bold text-white">${parseFloat(price).toFixed(2)}</span>
                ) : (
                  <span className="text-2xl font-bold text-slate-400">Contact for Price</span>
                )}
                {inStock ? (
                  <span className="flex items-center text-green-500 text-sm font-semibold">
                    <Check className="h-4 w-4 mr-1" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-500 text-sm font-semibold">Contact for Availability</span>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="text-white font-semibold">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-slate-700 text-white hover:bg-slate-800"
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center bg-slate-800 border border-slate-700 rounded text-white"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-slate-700 text-white hover:bg-slate-800"
                  >
                    +
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                data-testid="add-to-cart-btn"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {price ? 'Add to Cart' : 'Request Quote'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4 text-center">
                  <Truck className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-white text-sm font-semibold">Free Shipping</p>
                  <p className="text-slate-400 text-xs">On orders over $500</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4 text-center">
                  <Shield className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-white text-sm font-semibold">Warranty</p>
                  <p className="text-slate-400 text-xs">{warranty}</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            {description && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-3">Description</h2>
                <p className="text-slate-300 leading-relaxed">{description}</p>
              </div>
            )}

            {/* Specifications */}
            {(Object.keys(specs).length > 0 || size || category) && (
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Specifications</h2>
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-0">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(specs).map(([key, value], index) => (
                          <tr key={key} className={index !== 0 ? 'border-t border-slate-800' : ''}>
                            <td className="p-4 text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}</td>
                            <td className="p-4 text-white font-semibold text-right">{String(value)}</td>
                          </tr>
                        ))}
                        {size && (
                          <tr className="border-t border-slate-800">
                            <td className="p-4 text-slate-400">Track Size</td>
                            <td className="p-4 text-white font-semibold text-right">{size}</td>
                          </tr>
                        )}
                        {category && (
                          <tr className="border-t border-slate-800">
                            <td className="p-4 text-slate-400">Category</td>
                            <td className="p-4 text-white font-semibold text-right">{category}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
