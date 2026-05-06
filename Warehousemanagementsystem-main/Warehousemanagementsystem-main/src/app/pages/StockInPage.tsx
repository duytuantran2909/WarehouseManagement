import { useState } from "react";
import { Plus, Calendar, Package } from "lucide-react";

export function StockInPage() {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    supplier: "",
    purchasePrice: "",
    // Mặc định ngày hôm nay để giảm thao tác nhập liệu
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Stock in:", formData);
    setFormData({
      product: "",
      quantity: "",
      supplier: "",
      purchasePrice: "",
      // Reset về mặc định để form luôn sẵn sàng cho lần nhập tiếp theo
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
  };

  const recentStockIns = [
    {
      id: "1",
      product: "Laptop HP Pavilion",
      quantity: 20,
      supplier: "HP Vietnam",
      date: "2026-04-15",
      totalCost: 300000000,
    },
    {
      id: "2",
      product: "Mouse Logitech",
      quantity: 50,
      supplier: "Logitech VN",
      date: "2026-04-14",
      totalCost: 25000000,
    },
    {
      id: "3",
      product: "Bàn phím cơ",
      quantity: 30,
      supplier: "Corsair VN",
      date: "2026-04-13",
      totalCost: 45000000,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nhập kho</h1>
        <p className="text-gray-600 mt-1">Ghi nhận hàng hóa nhập kho</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Phiếu nhập kho
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
                    <option value="1">Laptop Dell XPS 13</option>
                    <option value="2">iPhone 14 Pro</option>
                    <option value="3">Samsung Galaxy S23</option>
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
                    placeholder="VD: 20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhà cung cấp *
                  </label>
                  <select
                    value={formData.supplier}
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Chọn nhà cung cấp</option>
                    <option value="1">Dell Vietnam</option>
                    <option value="2">Apple Store</option>
                    <option value="3">Samsung VN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá nhập (VNĐ/sản phẩm) *
                  </label>
                  <input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        purchasePrice: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="VD: 22000000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày nhập *
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
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Tạo phiếu nhập
              </button>
            </form>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            <Calendar className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Tổng nhập tháng này</p>
            <p className="text-3xl font-bold">456</p>
            <p className="text-sm opacity-90 mt-2">đơn vị sản phẩm</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Nhập kho gần đây</h3>
            <div className="space-y-3">
              {recentStockIns.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Package className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.product}
                      </p>
                      <p className="text-xs text-gray-600">
                        SL: {item.quantity} • {item.supplier}
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
