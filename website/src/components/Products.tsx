"use client";
import React, { useState } from 'react';
import { ShoppingCart, Heart, CheckCircle, Search } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Alert, AlertDescription } from '@/src/components/ui/alert';


const initialProducts = [
  {
    id: 1,
    name: 'Burger',
    price: 29.99,
    discount: 10,
    imageUrl: '/burger.jpeg',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Pizza',
    price: 49.99,
    discount: 15,
    imageUrl: '/pizza.jpeg',
    isFavorite: false,
  },
{
  id:3,
  name : 'fries',
  price: 19.99,
  discount: 5,
  imageUrl: '/fries.jpeg',
  isFavorite: false,

},
  {
    id: 4,
    name: 'sandwich',
    price: 99.99,
    discount: 20,
    imageUrl: '/sandwich.jpeg',
    isFavorite: false,
  },
  // Add more products as needed
];

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  isFavorite: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = product.discount 
    ? (product.price * (100 - product.discount) / 100).toFixed(2)
    : product.price.toFixed(2);

  return (
    <Card 
      className="group relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-lg bg-white/50 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {product.discount > 0 && (
          <Badge className="absolute right-2 top-2 bg-red-500 text-white">
            {product.discount}% OFF
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 bottom-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart 
            className={`h-5 w-5 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <div className="text-right">
            {product.discount > 0 && (
              <span className="mr-2 text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const showNotification = (message: string, type: 'success' | 'error' = 'success'): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = (product: Product): void => {
    setCart(prev => [...prev, product]);
    showNotification(`${product.name} added to cart`);
  };

  const toggleFavorite = (productId: number): void => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'discount':
          return b.discount - a.discount;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Featured Products</h1>
            <p className="text-gray-500">Discover our curated selection</p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="rounded-md border border-gray-300 bg-white px-4 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={toggleFavorite}
            />
          ))}
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-4 right-4 z-50">
            <Alert className={`animate-slide-up ${notification.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <AlertDescription className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {notification.message}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
