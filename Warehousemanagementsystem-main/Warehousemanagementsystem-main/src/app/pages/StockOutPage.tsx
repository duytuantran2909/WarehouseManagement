import { useState } from "react";
import { Plus, TrendingUp, Package } from "lucide-react";

export function StockOutPage() {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    customer: "",
    salePrice: "",
    // Mặc định ngày hôm nay để phù hợp luồng xuất kho thường nhật
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Stock out:", formData);
    setFormData({
      product: "",
      quantity: "",
      customer: "",
      salePrice: "",
      // Reset về mặc định để tránh sót dữ liệu lần trước
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
  };

  const recentStockOuts = [
    {
      id: "1",
      product: "Laptop Dell XPS 13",
      quantity: 3,
      customer: "Công ty ABC",
      date: "2026-04-17",
      revenue: 75000000,
    },
    {
      id: "2",
      product: "Mouse Logitech",
      quantity: 15,
      customer: "Cửa hàng XYZ",
      date: "2026-04-16",
      revenue: 7500000,
    },
    {
      id: "3",
      product: "iPhone 14 Pro",
      quantity: 5,
      customer: "Khách lẻ",
      date: "2026-04-16",
      revenue: 140000000,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Xuất kho</h1>
        <p className="text-gray-600 mt-1">Ghi nhận hàng hóa xuất kho</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Phiếu xuất kho
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sản phẩm *
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) =>
                      setFormData({ ...formData, product: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Chọn sản phẩm</option>
                    <option value="1">Laptop Dell XPS 13 (Tồn: 15)</option>
                    <option value="2">iPhone 14 Pro (Tồn: 8)</option>
                    <option value="3">MacBook Air M2 (Tồn: 12)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng *
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="VD: 5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khách hàng *
                  </label>
                  <input
                    type="text"
                    value={formData.customer}
                    onChange={(e) =>
                      setFormData({ ...formData, customer: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Tên khách hàng hoặc công ty"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá bán (VNĐ/sản phẩm) *
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) =>
                      setFormData({ ...formData, salePrice: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="VD: 25000000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày xuất *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="Ghi chú thêm (nếu có)..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Tạo phiếu xuất
              </button>
            </form>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Tổng xuất tháng này</p>
            <p className="text-3xl font-bold">389</p>
            <p className="text-sm opacity-90 mt-2">đơn vị sản phẩm</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Xuất kho gần đây</h3>
            <div className="space-y-3">
              {recentStockOuts.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Package className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.product}
                      </p>
                      <p className="text-xs text-gray-600">
                        SL: {item.quantity} • {item.customer}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
