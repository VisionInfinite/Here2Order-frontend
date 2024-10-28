"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChartPie, 
  Store, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Star,
  MoreVertical
} from "lucide-react";
import Notification from "./Notifications";
import Products from "./Products";

// Mock data for notifications
const initialNotifications = [
  { id: 1, message: 'New order received!', timestamp: '2 mins ago' },
  { id: 2, message: 'Product review pending approval.', timestamp: '1 hour ago' },
  { id: 3, message: 'Low stock alert: Update inventory.', timestamp: '3 hours ago' },
];

// Mock data for orders
interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Pending';
  amount: string;
}

const recentOrders: Order[] = [
  { id: '#12345', customer: 'John Doe', product: 'Premium Headphones', date: '2024-10-28', status: 'Delivered', amount: '$299.99' },
  { id: '#12346', customer: 'Alice Smith', product: 'Wireless Mouse', date: '2024-10-28', status: 'Processing', amount: '$49.99' },
  { id: '#12347', customer: 'Bob Johnson', product: 'Mechanical Keyboard', date: '2024-10-27', status: 'Shipped', amount: '$159.99' },
  { id: '#12348', customer: 'Emma Davis', product: 'USB-C Hub', date: '2024-10-27', status: 'Pending', amount: '$79.99' },
];

// Mock data for top products
const topProducts = [
  { name: 'Premium Headphones', sales: 124, revenue: '$37,192', trend: '+12%' },
  { name: 'Wireless Mouse', sales: 98, revenue: '$4,899', trend: '+8%' },
  { name: 'Mechanical Keyboard', sales: 87, revenue: '$13,919', trend: '+15%' },
  { name: 'USB-C Hub', sales: 76, revenue: '$6,079', trend: '+5%' },
];

const OrderStatus = ({ status }: { status: 'Delivered' | 'Processing' | 'Shipped' | 'Pending' }) => {
  const statusStyles = {
    Delivered: 'bg-green-100 text-green-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

interface Product {
  name: string;
  sales: number;
  revenue: string;
  trend: string;
}

const TopProductCard = ({ product }: { product: Product }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{product.name}</h4>
      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
        <span>{product.sales} sales</span>
        <span>{product.revenue}</span>
      </div>
    </div>
    <div className="flex items-center text-sm text-green-500">
      <TrendingUp className="w-4 h-4 mr-1" />
      {product.trend}
    </div>
  </div>
);

export default function Dashboard() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const clearNotifications = () => setNotifications([]);
  const removeNotification = (id: number) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-indigo-200 to-purple-800 text-gray-700">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-200 blur-3xl opacity-20"></div>
        <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-blue-200 blur-3xl opacity-20"></div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full w-64 backdrop-blur-lg bg-white/50 border-r border-white/20 shadow-lg shadow-black/5 p-4">
          <div className="flex items-center gap-2 px-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Seller Hub
            </span>
          </div>

          <nav className="space-y-1">
            {[
              { icon: ChartPie, label: 'Dashboard', href: '/' },
              { icon: Store, label: 'Products', href: '#products' },
              { icon: Package, label: 'Orders', href: '/orders' },
              { icon: Users, label: 'Customers', href: '/customers' },
              { icon: Settings, label: 'Settings', href: '/settings' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-indigo-600 transition-colors group"
              >
                <item.icon className="w-5 h-5 group-hover:text-indigo-600" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        {/* Header */}
      
        <header className="sticky top-0 z-30 backdrop-blur-lg bg-white/50 border-b border-white/20">
  <div className="flex items-center justify-between p-4">
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="p-2 rounded-lg hover:bg-white/50"
    >
      {isSidebarOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>

    <div className="flex items-center justify-between">
      <div className="relative flex-grow max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 rounded-lg backdrop-blur-lg bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full"
        />
      </div>
      
      <div className="p-4">
        <Notification
          notifications={notifications}
          clearNotifications={clearNotifications}
          removeNotification={removeNotification}
          showNotifications={showNotifications}
          toggleNotifications={toggleNotifications}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 md:w-8 md:h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          JD
        </div>
      </div>
    </div>
  </div>
</header>

        {/* Main content area */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { icon: DollarSign, label: 'Revenue', value: '$12,875', trend: '+12%', color: 'indigo' },
              { icon: ShoppingBag, label: 'Orders', value: '384', trend: '+8%', color: 'purple' },
              { icon: Users, label: 'Customers', value: '1,482', trend: '+24%', color: 'blue' },
              { icon: Star, label: 'Rating', value: '4.9', trend: '+0.2', color: 'pink' },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative backdrop-blur-lg bg-white/50 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:shadow-black/5 transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 rounded-lg bg-opacity-10" style={{ backgroundColor: `var(--${stat.color}-50)` }}>
                    <stat.icon className="w-5 h-5" style={{ color: `var(--${stat.color}-500)` }} />
                  </div>
                  <div className="flex items-center text-sm text-green-500">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.trend}
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 backdrop-blur-lg bg-white/50 border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Product</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="text-sm">
                        <td className="py-4 font-medium">{order.id}</td>
                        <td className="py-4">{order.customer}</td>
                        <td className="py-4">{order.product}</td>
                        <td className="py-4">{order.date}</td>
                        <td className="py-4">
                          <OrderStatus status={order.status} />
                        </td>
                        <td className="py-4 font-medium">{order.amount}</td>
                        <td className="py-4">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/50 border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Top Products</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
              </div>
              
              <div className="divide-y divide-gray-100">
                {topProducts.map((product, index) => (
                  <TopProductCard key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        <div id="products"> <Products /></div> 
        </main>
      </div>
    </div>
  );
}