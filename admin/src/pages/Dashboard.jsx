import React from 'react';
import { DollarSign, ShoppingBag, Users, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Mock data for chart
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 6890 },
    { name: 'Sat', sales: 8390 },
    { name: 'Sun', sales: 7490 },
  ];

  const statCards = [
    { title: 'Total Revenue', value: '₹1,24,500', change: '+12.5%', isUp: true, icon: <DollarSign size={24} className="text-white" />, color: 'bg-green-500' },
    { title: 'Total Orders', value: '854', change: '+5.2%', isUp: true, icon: <ShoppingBag size={24} className="text-white" />, color: 'bg-blue-500' },
    { title: 'Active Customers', value: '2,405', change: '-1.4%', isUp: false, icon: <Users size={24} className="text-white" />, color: 'bg-purple-500' },
    { title: 'Low Stock Items', value: '12', change: 'Needs attention', isUp: null, icon: <AlertCircle size={24} className="text-white" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${stat.color} shadow-sm flex-shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              {stat.isUp !== null && (
                <p className={`text-xs mt-1 font-medium ${stat.isUp ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.change} from last week
                </p>
              )}
              {stat.isUp === null && (
                <p className="text-xs mt-1 font-medium text-orange-500">{stat.change}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue This Week</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm flex-shrink-0">
                    {`C${i}`}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">#FD{10940 + i}</p>
                    <p className="text-xs text-gray-500">2 items • COD</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{850 + (i*120)}</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 mt-1">
                    PENDING
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
