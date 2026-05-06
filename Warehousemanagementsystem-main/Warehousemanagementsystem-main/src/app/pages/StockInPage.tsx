// ============================================================================
// IMPORT REACT HOOKS VÀ ICONS
// ============================================================================
// useState: Hook React để quản lý state của form nhập kho
// Icons từ lucide-react:
// - Plus: Icon dấu cộng (nút tạo phiếu nhập)
// - Calendar: Icon lịch (hiển thị thống kê tháng)
// - Package: Icon gói hàng (biểu tượng sản phẩm)
import { useState } from "react";
import { Plus, Calendar, Package } from "lucide-react";

// ============================================================================
// COMPONENT CHÍNH: TRANG NHẬP KHO
// ============================================================================
// Trang này cho phép nhân viên ghi nhận hàng hóa nhập kho
// Bao gồm: 
// - Form nhập kho (sản phẩm, số lượng, nhà cung cấp, giá, ngày, ghi chú)
// - Thống kê nhập kho tháng này
// - Danh sách những lần nhập kho gần đây
export function StockInPage() {
  // ========== STATE FORM NHẬP KHO ==========
  // Lưu trữ dữ liệu form người dùng nhập vào
  // - product: Mã/ID sản phẩm được chọn
  // - quantity: Số lượng sản phẩm nhập vào
  // - supplier: Mã/ID nhà cung cấp
  // - purchasePrice: Giá nhập (VNĐ) cho mỗi sản phẩm
  // - date: Ngày nhập kho (mặc định là hôm nay để tiết kiệm thao tác)
  // - note: Ghi chú thêm về lần nhập này
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    supplier: "",
    purchasePrice: "",
    // Mặc định ngày hôm nay để giảm thao tác nhập liệu
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  // ========== HÀM XỬ LÝ SUBMIT FORM ==========
  // Hàm được gọi khi người dùng nhấn nút "Tạo phiếu nhập"
  // Nhiệm vụ:
  // 1. Ngăn chặn reload trang (e.preventDefault())
  // 2. In log để kiểm tra dữ liệu
  // 3. Reset form để sẵn sàng cho lần nhập tiếp theo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Stock in:", formData); // Ghi log dữ liệu
    // Reset form về mặc định
    setFormData({
      product: "",
      quantity: "",
      supplier: "",
      purchasePrice: "",
      // Reset về mặc định để form luôn sẵn sàng cho lần nhập tiếp theo
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
    // TODO: Gửi dữ liệu lên server API
  };

  // ========== DỮ LIỆU MẪU: DANH SÁCH NHẬP KHO GẦN ĐÂY ==========
  // Hiển thị 3 lần nhập kho gần đây nhất (demo data)
  // Mỗi item có: id, tên sản phẩm, số lượng, nhà cung cấp, ngày, tổng chi phí
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
    // ========== CONTAINER CHÍNH ==========
    // space-y-6: Khoảng cách 24px giữa các phần
    <div className="space-y-6">
      {/* ========== TIÊU ĐỀ TRANG ========== */}
      {/* 
        Phần đầu trang hiển thị:
        - Tiêu đề: "Nhập kho"
        - Mô tả: "Ghi nhận hàng hóa nhập kho"
      */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nhập kho</h1>
        <p className="text-gray-600 mt-1">Ghi nhận hàng hóa nhập kho</p>
      </div>

      {/* ========== LAYOUT CHÍNH ==========
        Grid 3 cột trên desktop (lg:):
        - 2 cột trái: Form nhập kho (lg:col-span-2)
        - 1 cột phải: Thống kê và danh sách gần đây (lg:col-span-1)
        
        Trên mobile: 1 cột duy nhất (grid-cols-1)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ========== PHẦN 1: FORM NHẬP KHO (2 cột) ========== */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Tiêu đề form */}
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Phiếu nhập kho
            </h2>
            {/* 
              Form chính
              - onSubmit={handleSubmit}: Gọi hàm khi submit
              - space-y-4: Khoảng cách 16px giữa các phần
            */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Grid 2 cột để sắp xếp các input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* TRƯỜNG 1: SẢN PHẨM */}
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

                {/* TRƯỜNG 2: SỐ LƯỢNG */}
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

                {/* TRƯỜNG 3: NHÀ CUNG CẤP */}
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

                {/* TRƯỜNG 4: GIÁ NHẬP */}
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

                {/* TRƯỜNG 5: NGÀY NHẬP */}
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

                {/* TRƯỜNG 6: GHI CHÚ (toàn bộ chiều rộng) */}
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

              {/* NÚT TẠO PHIẾU NHẬP */}
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

        {/* ========== PHẦN 2: THỐNG KÊ VÀ DANH SÁCH GẦN ĐÂY (1 cột) ========== */}
        <div className="space-y-6">
          {/* ========== THỐNG KÊ: TỔNG NHẬP THÁNG NÀY ========== */}
          {/* 
            Card gradient tóm tắt tổng số lượng sản phẩm nhập trong tháng này
            - Gradient từ xanh dương (500) đến xanh dương đậm (600)
            - Hiển thị: Icon, nhãn, số liệu, đơn vị
            - Màu trắng (text-white) để nổi bật trên background gradient
          */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            {/* Icon lịch - opacity 80% để không quá nổi bật */}
            <Calendar className="w-8 h-8 mb-3 opacity-80" />
            {/* Nhãn - text-sm với opacity 90% */}
            <p className="text-sm opacity-90 mb-1">Tổng nhập tháng này</p>
            {/* Số liệu chính - lớn, đậm */}
            <p className="text-3xl font-bold">456</p>
            {/* Đơn vị - text-sm với opacity 90% */}
            <p className="text-sm opacity-90 mt-2">đơn vị sản phẩm</p>
          </div>

          {/* ========== DANH SÁCH NHẬP KHO GẦN ĐÂY ========== */}
          {/* 
            Card hiển thị 3 lần nhập kho gần đây nhất
            Giúp nhân viên nhanh chóng xem lại những lần nhập gần đây
          */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Tiêu đề */}
            <h3 className="font-bold text-gray-900 mb-4">Nhập kho gần đây</h3>
            {/* Danh sách items */}
            <div className="space-y-3">
              {/* 
                Vòng lặp: Lặp qua mỗi item trong recentStockIns
                - key={item.id}: React key để định danh phần tử
              */}
              {recentStockIns.map((item) => (
                {/* 
                  Mỗi item nhập kho:
                  - p-3: Padding 12px
                  - bg-gray-50: Nền xám nhạt
                  - rounded-lg: Góc bo tròn
                */}
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  {/* Phần đầu: Icon + tên sản phẩm */}
                  <div className="flex items-start gap-2 mb-2">
                    {/* Icon package - màu xanh dương */}
                    <Package className="w-4 h-4 text-blue-600 mt-0.5" />
                    {/* Thông tin sản phẩm */}
                    <div className="flex-1">
                      {/* Tên sản phẩm - đậm */}
                      <p className="text-sm font-medium text-gray-900">
                        {item.product}
                      </p>
                      {/* Số lượng + nhà cung cấp - nhỏ, xám nhạt */}
                      <p className="text-xs text-gray-600">
                        SL: {item.quantity} • {item.supplier}
                      </p>
                    </div>
                  </div>
                  {/* Phần dưới: Ngày nhập - nhỏ, xám nhạt */}
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  /* 
    ============================================================================
    GIẢI THÍCH TỔNG THỂ COMPONENT:
    ============================================================================
    
    Component StockInPage là trang quản lý nhập kho với 2 phần chính:
    
    1. FORM NHẬP KHO (2 cột - phần lớn):
       - Sản phẩm: Chọn sản phẩm từ dropdown
       - Số lượng: Nhập số lượng sản phẩm nhập vào
       - Nhà cung cấp: Chọn nhà cung cấp từ dropdown
       - Giá nhập: Nhập giá mua (đơn vị: VNĐ)
       - Ngày nhập: Chọn ngày (mặc định hôm nay)
       - Ghi chú: Thêm ghi chú nếu cần
       - Nút tạo phiếu: Submit form để tạo phiếu nhập
    
    2. THỐNG KÊ VÀ LỊCH SỬ (1 cột - bên phải):
       - Card gradient: Hiển thị tổng số lượng nhập tháng này (456 cái)
       - Danh sách gần đây: Hiển thị 3 lần nhập gần đây nhất
         * Mỗi item cho thấy: Tên sản phẩm, số lượng, nhà cung cấp, ngày
    
    ============================================================================
    FLOW HOẠT ĐỘNG:
    ============================================================================
    1. Nhân viên mở trang StockInPage
    2. Điền thông tin phiếu nhập (sản phẩm, SL, NCC, giá, ngày, ghi chú)
    3. Nhấn nút "Tạo phiếu nhập"
    4. Form validate (required fields phải có giá trị)
    5. handleSubmit ghi log dữ liệu (sau này gửi API)
    6. Form reset về trạng thái mặc định (sẵn sàng cho lần nhập tiếp theo)
    7. Người dùng nhìn thấy phiếu vừa tạo trong danh sách "Nhập kho gần đây"
    
    ============================================================================
    CÔNG NGHỆ VÀ PATTERN:
    ============================================================================
    - State Management: useState lưu trữ formData
    - Form Handling: Controlled components (value + onChange)
    - Layout: Grid responsive (1 cột mobile, 3 cột desktop)
    - UX: Mặc định ngày hôm nay để tiết kiệm thao tác nhập
    
    ============================================================================
    TODO/CẦN LÀMÙ:
    ============================================================================
    1. Kết nối API để lấy danh sách sản phẩm từ server
    2. Kết nối API để lấy danh sách nhà cung cấp từ server
    3. Gửi dữ liệu form lên server khi nhấn \"Tạo phiếu nhập\"
    4. Cập nhật danh sách gần đây sau khi tạo phiếu thành công
    5. Thêm validation messages (giá phải > 0, SL phải > 0, etc.)
    6. Thêm loading state khi gửi request API
    7. Thêm error handling và success notification
  */
}
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
