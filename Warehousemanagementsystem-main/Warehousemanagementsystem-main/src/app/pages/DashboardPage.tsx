import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Package, TrendingUp, AlertCircle } from 'lucide-react';

interface DashboardActivity {
  productName: string;
  type: 'Import' | 'Export' | string;
  quantity: number;
  date: string;
}

interface DashboardData {
  totalProducts: number;
  totalValue: number;
  lowStockWarning: number;
  recentActivities: DashboardActivity[];
}

export function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Gọi API khi trang được load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<DashboardData>('/Dashboard/stats');
        setDashboardData(response.data);
      } catch (err) {
        console.error('Lỗi kết nối API:', err);
        setError('Không thể kết nối đến Backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">Đang tải dữ liệu kho...</div>;
  if (error || !dashboardData) return <div className="p-10 text-center text-red-500">{error ?? 'Không thể kết nối đến Backend!'}</div>;

  // 3. Map dữ liệu từ Backend vào cấu trúc stats của giao diện
  const liveStats = [
    {
      label: "Tổng sản phẩm",
      value: dashboardData.totalProducts.toLocaleString(),
      change: "+0%", // Có thể tính toán thêm nếu muốn
      trend: "up",
      icon: Package,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Tổng giá trị kho",
      value: dashboardData.totalValue.toLocaleString() + "đ",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
    },
    // ... các chỉ số khác ...
    {
      label: "Sắp hết hàng",
      value: dashboardData.lowStockWarning.toLocaleString(),
      change: "Cần nhập",
      trend: "up",
      icon: AlertCircle,
      gradient: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Thay stats.map bằng liveStats.map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveStats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div key={stat.label} className={`rounded-3xl p-6 bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase opacity-80">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-3">
                  <StatIcon size={24} />
                </div>
              </div>
              <p className="text-sm opacity-90">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Phần Hoạt động gần đây - Map từ dashboardData.recentActivities */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Hoạt động mới nhất</h2>
        <div className="space-y-3">
          {dashboardData.recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
               <p className="font-semibold">{activity.productName}</p>
               <p className="text-sm">
                 {activity.type === "Import" ? "Nhập" : "Xuất"}: {activity.quantity} cái 
                 • {new Date(activity.date).toLocaleDateString()}
               </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}