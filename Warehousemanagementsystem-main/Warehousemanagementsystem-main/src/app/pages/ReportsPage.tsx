import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, Calendar, TrendingUp, Package } from "lucide-react";

const monthlyData = [
  { month: "T1", revenue: 450, cost: 320, profit: 130 },
  { month: "T2", revenue: 380, cost: 280, profit: 100 },
  { month: "T3", revenue: 520, cost: 370, profit: 150 },
  { month: "T4", revenue: 480, cost: 340, profit: 140 },
  { month: "T5", revenue: 620, cost: 420, profit: 200 },
  { month: "T6", revenue: 580, cost: 390, profit: 190 },
];

const categoryData = [
  { name: "Laptop", value: 45, color: "#3b82f6" },
  { name: "Điện thoại", value: 35, color: "#10b981" },
  { name: "Phụ kiện", value: 15, color: "#f59e0b" },
  { name: "Tablet", value: 5, color: "#8b5cf6" },
];

const topProducts = [
  { product: "Laptop Dell XPS 13", sold: 45, revenue: 1125 },
  { product: "iPhone 14 Pro", sold: 38, revenue: 1064 },
  { product: "MacBook Air M2", sold: 32, revenue: 1024 },
  { product: "Samsung Galaxy S23", sold: 28, revenue: 616 },
  { product: "Mouse Logitech", sold: 156, revenue: 390 },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo</h1>
          <p className="text-gray-600 mt-1">
            Thống kê và phân tích dữ liệu kinh doanh
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Xuất báo cáo
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Doanh thu tháng</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                580 tr VNĐ
              </p>
              <p className="text-sm text-green-600 mt-1">+12% so với T5</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chi phí tháng</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                390 tr VNĐ
              </p>
              <p className="text-sm text-red-600 mt-1">+8% so với T5</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lợi nhuận tháng</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                190 tr VNĐ
              </p>
              <p className="text-sm text-green-600 mt-1">+18% so với T5</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sản phẩm bán</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">389</p>
              <p className="text-sm text-green-600 mt-1">+5% so với T5</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Doanh thu & Chi phí 6 tháng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu (tr)" />
              <Bar dataKey="cost" fill="#ef4444" name="Chi phí (tr)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Biến động lợi nhuận
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                name="Lợi nhuận (tr)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Phân bổ theo danh mục
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                // Lam tron ty le de nhan label gon va de doc hon
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {/* Danh sach tinh, dung index lam key de tranh can id rieng */}
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Top sản phẩm bán chạy
          </h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.product}
                    </p>
                    <p className="text-sm text-gray-600">
                      Đã bán: {product.sold} sản phẩm
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {product.revenue} tr
                  </p>
                  <p className="text-sm text-gray-600">Doanh thu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
