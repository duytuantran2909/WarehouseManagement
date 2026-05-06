// ============================================================================
// IMPORT CÁC THƯ VIỆN BIỂU ĐỒ TỪ RECHARTS
// ============================================================================
// Recharts là thư viện vẽ biểu đồ React được xây dựng trên D3.js
// Các component được import:
// - BarChart, Bar: Biểu đồ cột (để so sánh doanh thu vs chi phí)
// - LineChart, Line: Biểu đồ đường (để theo dõi xu hướng lợi nhuận)
// - PieChart, Pie, Cell: Biểu đồ tròn (để hiển thị tỷ lệ phần trăm theo danh mục)
// - XAxis, YAxis, CartesianGrid: Các thành phần trục x, y và lưới nền
// - Tooltip: Hiển thị thông tin chi tiết khi hover lên biểu đồ
// - Legend: Chú thích hiển thị tên các chuỗi dữ liệu
// - ResponsiveContainer: Làm cho biểu đồ tự động thích ứng với kích thước màn hình
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

// ============================================================================
// IMPORT CÁC ICON TỪ THƯ VIỆN LUCIDE-REACT
// ============================================================================
// Lucide-react cung cấp các icon SVG đẹp và nhẹ
// - Download: Icon tải xuống (dùng cho nút "Xuất báo cáo")
// - Calendar: Icon lịch (biểu tượng cho chi phí theo thời gian)
// - TrendingUp: Icon xu hướng tăng (biểu tượng cho doanh thu/lợi nhuận)
// - Package: Icon gói hàng (biểu tượng cho số sản phẩm bán được)
import { Download, Calendar, TrendingUp, Package } from "lucide-react";

// ============================================================================
// DỮ LIỆU DOANH THU VÀ CHI PHÍ TRONG 6 THÁNG
// ============================================================================
// Dữ liệu này được sử dụng để vẽ biểu đồ cột (revenue & cost) và biểu đồ đường (profit)
// Mỗi phần tử là một tháng với các thông tin:
// - month: Tên tháng (T1 = Tháng 1, T2 = Tháng 2, v.v...)
// - revenue: Doanh thu tháng đó (đơn vị: triệu đồng)
// - cost: Chi phí kinh doanh tháng đó (đơn vị: triệu đồng)
// - profit: Lợi nhuận = revenue - cost (đơn vị: triệu đồng)
const monthlyData = [
  { month: "T1", revenue: 450, cost: 320, profit: 130 },
  { month: "T2", revenue: 380, cost: 280, profit: 100 },
  { month: "T3", revenue: 520, cost: 370, profit: 150 },
  { month: "T4", revenue: 480, cost: 340, profit: 140 },
  { month: "T5", revenue: 620, cost: 420, profit: 200 },
  { month: "T6", revenue: 580, cost: 390, profit: 190 },
];

// ============================================================================
// DỮ LIỆU PHÂN BỐ SẢN PHẨM THEO DANH MỤC
// ============================================================================
// Dữ liệu này được sử dụng để vẽ biểu đồ tròn (Pie Chart)
// Hiển thị tỷ lệ phần trăm bán hàng theo từng danh mục sản phẩm
// Mỗi phần tử chứa:
// - name: Tên danh mục sản phẩm
// - value: Số lượng hoặc tỷ lệ (%) mà danh mục này chiếm
// - color: Màu sắc để hiển thị trong biểu đồ (hex color code)
const categoryData = [
  { name: "Laptop", value: 45, color: "#3b82f6" },        // Xanh dương (Blue)
  { name: "Điện thoại", value: 35, color: "#10b981" },   // Xanh lá (Green)
  { name: "Phụ kiện", value: 15, color: "#f59e0b" },     // Vàng cam (Amber)
  { name: "Tablet", value: 5, color: "#8b5cf6" },        // Tím (Purple)
];

// ============================================================================
// DỮ LIỆU TOP 5 SẢN PHẨM BÁN CHẠY NHẤT
// ============================================================================
// Dữ liệu này hiển thị những sản phẩm bán chạy nhất trong một khoảng thời gian
// Được sắp xếp theo thứ tự từ cao xuống thấp (top 1, 2, 3, 4, 5)
// Mỗi phần tử chứa:
// - product: Tên sản phẩm
// - sold: Số lượng sản phẩm đã bán
// - revenue: Doanh thu từ sản phẩm đó (đơn vị: triệu đồng)
const topProducts = [
  { product: "Laptop Dell XPS 13", sold: 45, revenue: 1125 },
  { product: "iPhone 14 Pro", sold: 38, revenue: 1064 },
  { product: "MacBook Air M2", sold: 32, revenue: 1024 },
  { product: "Samsung Galaxy S23", sold: 28, revenue: 616 },
  { product: "Mouse Logitech", sold: 156, revenue: 390 },
];

// ============================================================================
// COMPONENT CHÍNH: TRANG BÁO CÁO
// ============================================================================
// Đây là component React hiển thị trang dashboard báo cáo toàn diện
// Bao gồm: tiêu đề, 4 thẻ thống kê tóm tắt, và các biểu đồ phân tích dữ liệu
// Cấu trúc layout sử dụng Tailwind CSS để tạo giao diện responsive
export function ReportsPage() {
  return (
    // Container chính với khoảng cách giữa các phần (space-y-6 = margin 24px)
    <div className="space-y-6">
      {/* ========== PHẦN ĐẦU TRANG - TIÊU ĐỀ VÀ NÚT HÀNH ĐỘNG ========== */}
      {/* 
        Phần này hiển thị:
        1. Tiêu đề: "Báo cáo"
        2. Mô tả: "Thống kê và phân tích dữ liệu kinh doanh"
        3. Nút "Xuất báo cáo" với icon tải xuống (nằm bên phải)
        
        Layout: 
        - flex items-center justify-between: Sắp xếp theo hàng ngang, 
          một bên trái (tiêu đề), một bên phải (nút)
      */}
      <div className="flex items-center justify-between">
        <div>
          {/* Tiêu đề chính của trang, kích thước 3xl, đậm, màu xám đậm */}
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo</h1>
          {/* Mô tả phụ, màu xám nhạt, cách tiêu đề 8px */}
          <p className="text-gray-600 mt-1">
            Thống kê và phân tích dữ liệu kinh doanh
          </p>
        </div>
        {/* 
          Nút xuất báo cáo (chưa có chức năng, chỉ giao diện)
          - bg-blue-600: Nền xanh dương
          - hover:bg-blue-700: Khi hover chuột sẽ đậm hơn
          - transition-colors: Hiệu ứng chuyển màu mượt mà
          - flex items-center gap-2: Xếp icon và text ngang nhau, cách 8px
        */}
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Xuất báo cáo
        </button>
      </div>

      {/* ========== PHẦN 1: 4 THẺ THỐNG KÊ TÓM TẮT ========== */}
      {/* 
        Phần này hiển thị 4 chỉ số quan trọng nhất:
        1. Doanh thu tháng
        2. Chi phí tháng
        3. Lợi nhuận tháng
        4. Số sản phẩm bán được
        
        Layout Grid:
        - 1 cột trên mobile
        - 2 cột trên màn hình medium (md:)
        - 4 cột trên màn hình large (lg:)
        - gap-6: Khoảng cách giữa các thẻ là 24px
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ========== THẺ 1: DOANH THU THÁNG ========== */}
        {/* 
          Hiển thị doanh thu tháng hiện tại (T6)
          - Giá trị chính: 580 triệu đồng
          - Thay đổi so với tháng trước: +12% (màu xanh = tăng)
          - Icon: Mũi tên trending up (xu hướng tăng)
          - Màu nền: Xanh dương nhạt (blue-100)
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              {/* Nhãn dưới */}
              <p className="text-sm text-gray-600">Doanh thu tháng</p>
              {/* Giá trị chính - đậm, lớn, xám đậm */}
              <p className="text-2xl font-bold text-gray-900 mt-2">
                580 tr VNĐ
              </p>
              {/* Thay đổi so với tháng trước - xanh lá (tăng) */}
              <p className="text-sm text-green-600 mt-1">+12% so với T5</p>
            </div>
            {/* Icon bên phải - xanh dương */}
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* ========== THẺ 2: CHI PHÍ THÁNG ========== */}
        {/* 
          Hiển thị chi phí kinh doanh tháng hiện tại
          - Giá trị chính: 390 triệu đồng
          - Thay đổi so với tháng trước: +8% (màu đỏ = tăng chi phí)
          - Icon: Lịch (biểu tượng thời gian)
          - Màu nền: Cam nhạt (orange-100) - cảnh báo chi phí tăng
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              {/* Nhãn dưới */}
              <p className="text-sm text-gray-600">Chi phí tháng</p>
              {/* Giá trị chính - đậm, lớn, xám đậm */}
              <p className="text-2xl font-bold text-gray-900 mt-2">
                390 tr VNĐ
              </p>
              {/* Thay đổi so với tháng trước - đỏ (cảnh báo chi phí tăng) */}
              <p className="text-sm text-red-600 mt-1">+8% so với T5</p>
            </div>
            {/* Icon bên phải - cam */}
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* ========== THẺ 3: LỢI NHUẬN THÁNG ========== */}
        {/* 
          Hiển thị lợi nhuận tháng hiện tại (doanh thu - chi phí)
          Công thức: 580 - 390 = 190 triệu đồng
          - Giá trị chính: 190 triệu đồng
          - Thay đổi so với tháng trước: +18% (màu xanh = lợi nhuận tăng)
          - Icon: Mũi tên trending up (xu hướng tăng lợi nhuận)
          - Màu nền: Xanh lá nhạt (green-100) - tích cực
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              {/* Nhãn dưới */}
              <p className="text-sm text-gray-600">Lợi nhuận tháng</p>
              {/* Giá trị chính - đậm, lớn, xám đậm */}
              <p className="text-2xl font-bold text-gray-900 mt-2">
                190 tr VNĐ
              </p>
              {/* Thay đổi so với tháng trước - xanh lá (lợi nhuận tăng tốt) */}
              <p className="text-sm text-green-600 mt-1">+18% so với T5</p>
            </div>
            {/* Icon bên phải - xanh lá */}
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* ========== THẺ 4: SỐ SẢN PHẨM BÁN ĐƯỢC ========== */}
        {/* 
          Hiển thị tổng số sản phẩm đã bán trong tháng
          - Giá trị chính: 389 sản phẩm
          - Thay đổi so với tháng trước: +5% (màu xanh = bán hàng tăng)
          - Icon: Gói hàng/Package (biểu tượng sản phẩm)
          - Màu nền: Tím nhạt (purple-100) - tích cực
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              {/* Nhãn dưới */}
              <p className="text-sm text-gray-600">Sản phẩm bán</p>
              {/* Giá trị chính - đậm, lớn, xám đậm */}
              <p className="text-2xl font-bold text-gray-900 mt-2">389</p>
              {/* Thay đổi so với tháng trước - xanh lá (bán hàng tăng) */}
              <p className="text-sm text-green-600 mt-1">+5% so với T5</p>
            </div>
            {/* Icon bên phải - tím */}
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ========== PHẦN 2: HAI BIỂU ĐỒ HÀNG 1 ========== */}
      {/* 
        Hiển thị 2 biểu đồ cạnh nhau:
        - Bên trái: Biểu đồ cột (Bar Chart) so sánh doanh thu vs chi phí
        - Bên phải: Biểu đồ đường (Line Chart) xu hướng lợi nhuận
        
        Layout Grid:
        - 1 cột trên mobile (grid-cols-1)
        - 2 cột trên màn hình large (lg:grid-cols-2)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========== BIỂU ĐỒ 1: DOANH THU & CHI PHÍ 6 THÁNG ========== */}
        {/* 
          Biểu đồ cột (Bar Chart) so sánh doanh thu vs chi phí hàng tháng
          - Trục X: Tên tháng (T1-T6)
          - Trục Y: Giá trị (triệu đồng)
          - Cột xanh dương: Doanh thu (revenue)
          - Cột đỏ: Chi phí (cost)
          - Grid nền: Đường gạch ngang giúp dễ đọc giá trị
          - Tooltip: Hiển thị chi tiết khi hover lên cột
          - Legend: Chú thích ở dưới
          
          Tác dụng: Giúp nhìn rõ mối quan hệ giữa doanh thu và chi phí qua các tháng
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Tiêu đề biểu đồ */}
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Doanh thu & Chi phí 6 tháng
          </h2>
          {/* 
            ResponsiveContainer: Làm cho biểu đồ tự động thích ứng
            - width="100%": Chiều rộng 100% của container cha
            - height={300}: Chiều cao cố định 300px
          */}
          <ResponsiveContainer width="100%" height={300}>
            {/* 
              BarChart: Thành phần vẽ biểu đồ cột
              - data={monthlyData}: Sử dụng dữ liệu đã khai báo ở trên
            */}
            <BarChart data={monthlyData}>
              {/* Lưới nền giúp đọc giá trị dễ hơn (đường gạch ngang 3px, khoảng trắng 3px) */}
              <CartesianGrid strokeDasharray="3 3" />
              {/* Trục X: Hiển thị tên tháng */}
              <XAxis dataKey="month" />
              {/* Trục Y: Hiển thị giá trị (tự động điều chỉnh) */}
              <YAxis />
              {/* Tooltip: Hiển thị chi tiết khi hover lên cột */}
              <Tooltip />
              {/* Legend: Chú thích các cột (xanh = doanh thu, đỏ = chi phí) */}
              <Legend />
              {/* Cột doanh thu: Xanh dương, lấy giá trị từ key "revenue" */}
              <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu (tr)" />
              {/* Cột chi phí: Đỏ, lấy giá trị từ key "cost" */}
              <Bar dataKey="cost" fill="#ef4444" name="Chi phí (tr)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ========== BIỂU ĐỒ 2: XU HƯỚNG LỢI NHUẬN ========== */}
        {/* 
          Biểu đồ đường (Line Chart) theo dõi xu hướng lợi nhuận qua 6 tháng
          - Trục X: Tên tháng (T1-T6)
          - Trục Y: Giá trị lợi nhuận (triệu đồng)
          - Đường xanh lá: Lợi nhuận (profit)
          - Độ dày đường: 2px để dễ nhìn
          - type="monotone": Đường cong mượt mà (không gập góc)
          
          Tác dụng: Giúp nhìn rõ xu hướng lợi nhuận (tăng hay giảm)
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Tiêu đề biểu đồ */}
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Biến động lợi nhuận
          </h2>
          {/* 
            ResponsiveContainer: Làm cho biểu đồ tự động thích ứng
            - width="100%": Chiều rộng 100% của container cha
            - height={300}: Chiều cao cố định 300px
          */}
          <ResponsiveContainer width="100%" height={300}>
            {/* 
              LineChart: Thành phần vẽ biểu đồ đường
              - data={monthlyData}: Sử dụng dữ liệu đã khai báo ở trên
            */}
            <LineChart data={monthlyData}>
              {/* Lưới nền giúp đọc giá trị dễ hơn */}
              <CartesianGrid strokeDasharray="3 3" />
              {/* Trục X: Hiển thị tên tháng */}
              <XAxis dataKey="month" />
              {/* Trục Y: Hiển thị giá trị (tự động điều chỉnh) */}
              <YAxis />
              {/* Tooltip: Hiển thị chi tiết khi hover lên đường */}
              <Tooltip />
              {/* Legend: Chú thích (xanh lá = lợi nhuận) */}
              <Legend />
              {/* 
                Đường lợi nhuận: Xanh lá, lấy giá trị từ key "profit"
                - type="monotone": Vẽ đường cong mượt mà (không gập góc)
                - strokeWidth={2}: Độ dày đường là 2px
              */}
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

      {/* ========== PHẦN 3: HAI BIỂU ĐỒ HÀNG 2 ========== */}
      {/* 
        Hiển thị 2 phần thông tin:
        - Bên trái (1 cột): Biểu đồ tròn (Pie Chart) phân bổ theo danh mục
        - Bên phải (2 cột): Danh sách top sản phẩm bán chạy
        
        Layout Grid:
        - 1 cột trên mobile (grid-cols-1)
        - 3 cột trên màn hình large (lg:grid-cols-3)
        - Phần bên trái: 1 cột
        - Phần bên phải: 2 cột (lg:col-span-2)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ========== BIỂU ĐỒ 3: PHÂN BỔ THEO DANH MỤC ========== */}
        {/* 
          Biểu đồ tròn (Pie Chart) hiển thị tỷ lệ bán hàng theo danh mục
          - Laptop: 45% (xanh dương)
          - Điện thoại: 35% (xanh lá)
          - Phụ kiện: 15% (vàng cam)
          - Tablet: 5% (tím)
          
          Tác dụng: Giúp nhìn rõ cơ cấu bán hàng theo danh mục, sản phẩm nào chiếm thị phần lớn
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Tiêu đề biểu đồ */}
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Phân bổ theo danh mục
          </h2>
          {/* 
            ResponsiveContainer: Làm cho biểu đồ tự động thích ứng
            - width="100%": Chiều rộng 100% của container cha
            - height={250}: Chiều cao cố định 250px (nhỏ hơn các biểu đồ khác)
          */}
          <ResponsiveContainer width="100%" height={250}>
            {/* 
              PieChart: Thành phần vẽ biểu đồ tròn
              (Không cần truyền data vào đây, data được khai báo ở trong Pie)
            */}
            <PieChart>
              {/* 
                Pie: Thành phần tính toán và vẽ hình tròn
                - data={categoryData}: Sử dụng dữ liệu danh mục
                - cx="50%": Vị trí tâm X (50% chiều rộng)
                - cy="50%": Vị trí tâm Y (50% chiều cao)
                - labelLine={false}: Không vẽ đường từ hình tròn đến label
                - outerRadius={80}: Bán kính tối đa của hình tròn là 80px
                - dataKey="value": Lấy giá trị từ key "value" của từng item
              */}
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                {/* 
                  Label function: Tùy chỉnh cách hiển thị label trên biểu đồ
                  - Lấy name (tên danh mục) và percent (tỷ lệ phần trăm)
                  - Hiển thị: "Tên 45%" chẳng hạn
                  - toFixed(0): Làm tròn phần trăm không lấy số thập phân
                */}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {/* 
                  Vòng lặp để gán màu sắc cho từng phần của hình tròn
                  - categoryData.map(): Lặp qua từng danh mục
                  - Cell: Thành phần đại diện cho một phần của hình tròn
                  - key={`cell-${index}`}: Tạo key duy nhất (cách React cập nhật element)
                  - fill={entry.color}: Gán màu từ dữ liệu (xanh dương, xanh lá, vàng cam, tím)
                */}
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* Tooltip: Hiển thị chi tiết khi hover lên phần của hình tròn */}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ========== DANH SÁCH TOP SẢN PHẨM BÁN CHẠY ========== */}
        {/* 
          Hiển thị danh sách 5 sản phẩm bán chạy nhất, sắp xếp từ cao xuống thấp
          - Hiển thị: Xếp hạng (#1-#5), tên sản phẩm, số lượng bán, doanh thu
          
          Tác dụng: Giúp quản lý nắm rõ những sản phẩm nào bán chạy nhất
          để có chiến lược marketing/inventory phù hợp
        */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Tiêu đề */}
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Top sản phẩm bán chạy
          </h2>
          {/* 
            Container cho danh sách
            - space-y-3: Khoảng cách giữa các item là 12px
          */}
          <div className="space-y-3">
            {/* 
              topProducts.map(): Vòng lặp qua từng sản phẩm
              - product: Dữ liệu sản phẩm hiện tại
              - index: Vị trí trong danh sách (0, 1, 2, 3, 4)
            */}
            {topProducts.map((product, index) => (
              {/* 
                Mỗi hàng sản phẩm:
                - key={index}: Định danh duy nhất (mặc dù không phải cách tốt nhất, nhưng ổn cho dữ liệu tĩnh)
                - flex items-center justify-between: Sắp xếp ngang, một bên trái (tên) một bên phải (doanh thu)
                - p-4: Padding (khoảng cách bên trong) 16px
                - bg-gray-50: Nền xám nhạt
                - rounded-lg: Góc bo tròn
              */}
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                {/* Phần bên trái: Xếp hạng + Tên sản phẩm + Số lượng */}
                <div className="flex items-center gap-3">
                  {/* 
                    Hộp xếp hạng:
                    - w-8 h-8: Kích thước 32px x 32px (hình vuông)
                    - bg-blue-100: Nền xanh dương nhạt
                    - rounded-lg: Góc bo tròn
                    - flex items-center justify-center: Căn giữa nội dung
                  */}
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    {/* Hiển thị xếp hạng: #1, #2, #3, v.v (index + 1 vì index bắt đầu từ 0) */}
                    <span className="text-blue-600 font-bold">
                      #{index + 1}
                    </span>
                  </div>
                  {/* Thông tin sản phẩm */}
                  <div>
                    {/* Tên sản phẩm - đậm, xám đậm */}
                    <p className="font-medium text-gray-900">
                      {product.product}
                    </p>
                    {/* Số lượng bán - nhỏ, xám nhạt */}
                    <p className="text-sm text-gray-600">
                      Đã bán: {product.sold} sản phẩm
                    </p>
                  </div>
                </div>
                {/* Phần bên phải: Doanh thu */}
                <div className="text-right">
                  {/* Doanh thu chính - đậm, lớn, xám đậm */}
                  <p className="font-bold text-gray-900">
                    {product.revenue} tr
                  </p>
                  {/* Nhãn "Doanh thu" - nhỏ, xám nhạt */}
                  <p className="text-sm text-gray-600">Doanh thu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ========== KẾT THÚC COMPONENT ========== */}
    </div>
  );
  /* 
    ============================================================================
    GIẢI THÍCH TỔNG THỂ COMPONENT:
    ============================================================================
    
    Component ReportsPage là một Dashboard báo cáo kinh doanh toàn diện với các tính năng:
    
    1. TIÊU ĐỀ VÀ NÚT HÀNH ĐỘNG:
       - Hiển thị tiêu đề "Báo cáo" và mô tả mục đích
       - Nút "Xuất báo cáo" cho phép người dùng tải xuống báo cáo (chưa được triển khai)
    
    2. 4 THẺ THỐNG KÊ TÓM TẮT:
       - Doanh thu tháng: 580 triệu đồng, +12% vs tháng trước
       - Chi phí tháng: 390 triệu đồng, +8% vs tháng trước
       - Lợi nhuận tháng: 190 triệu đồng (580-390), +18% vs tháng trước
       - Sản phẩm bán: 389 cái, +5% vs tháng trước
       
       Mỗi thẻ có:
       - Nhãn (label)
       - Giá trị chính (lớn, đậm)
       - Thay đổi so với tháng trước (%)
       - Icon biểu tượng phù hợp
       - Màu sắc khác nhau để dễ phân biệt
    
    3. BIỂU ĐỒ CỘT (Bar Chart):
       - So sánh doanh thu (xanh dương) vs chi phí (đỏ) qua 6 tháng (T1-T6)
       - Giúp nhanh chóng nhìn thấy mối quan hệ giữa doanh thu và chi phí
       - Tooltip hiển thị chi tiết khi hover
    
    4. BIỂU ĐỒ ĐƯỜNG (Line Chart):
       - Theo dõi xu hướng lợi nhuận (xanh lá) qua 6 tháng
       - Dễ dàng nhận ra xu hướng tăng/giảm lợi nhuận
       - Đường cong mượt mà không có góc nhọn
    
    5. BIỂU ĐỒ TRÒN (Pie Chart):
       - Phân bổ sản phẩm bán hàng theo 4 danh mục chính:
         * Laptop: 45% (xanh dương)
         * Điện thoại: 35% (xanh lá)
         * Phụ kiện: 15% (vàng cam)
         * Tablet: 5% (tím)
       - Giúp quản lý nắm rõ cơ cấu sản phẩm bán hàng
    
    6. DANH SÁCH TOP SẢN PHẨM BÁN CHẠY:
       - Hiển thị top 5 sản phẩm bán chạy nhất
       - Mỗi item cho thấy:
         * Xếp hạng (#1-#5)
         * Tên sản phẩm
         * Số lượng bán được
         * Doanh thu từ sản phẩm đó
       - Giúp quản lý tập trung vào những sản phẩm này
    
    ============================================================================
    THIẾT KẾ RESPONSIVE:
    ============================================================================
    - Mobile (grid-cols-1): Hiển thị 1 cột, các phần xếp dọc theo nhau
    - Tablet (md: hoặc lg:): Hiển thị 2 cột hoặc 3 cột
    - Desktop (lg:): Hiển thị tối đa theo layout được thiết lập
    
    ============================================================================
    CÔNG NGHỆ SỬ DỤNG:
    ============================================================================
    - Recharts: Thư viện vẽ biểu đồ tương tác (Bar, Line, Pie)
    - Lucide-react: Thư viện icon SVG đẹp
    - Tailwind CSS: Framework CSS utility-first cho styling
    - React: Framework JavaScript cho giao diện
    
    ============================================================================
    CÁC CHỈ SỐ CHÍNH (KPI) ĐƯỢC TRACKING:
    ============================================================================
    1. Doanh thu tháng
    2. Chi phí tháng
    3. Lợi nhuận tháng
    4. Số sản phẩm bán
    5. Xu hướng lợi nhuận qua 6 tháng
    6. Phân bổ sản phẩm theo danh mục
    7. Top sản phẩm bán chạy
    
    Tất cả các chỉ số này giúp quản lý có cái nhìn toàn diện về tình hình kinh doanh.
  */
}
