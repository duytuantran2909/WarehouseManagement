import { useState } from "react";
import { ClipboardCheck, AlertTriangle, CheckCircle } from "lucide-react";

// Định nghĩa interface cho một mục hàng tồn kho
interface InventoryItem {
  id: string; // ID duy nhất của mục hàng
  product: string; // Tên sản phẩm
  sku: string; // Mã SKU của sản phẩm
  systemStock: number; // Số lượng tồn kho theo hệ thống
  actualStock: number; // Số lượng tồn kho thực tế sau khi kiểm tra
  difference: number; // Chênh lệch giữa tồn kho thực tế và hệ thống
  status: "match" | "over" | "under"; // Trạng thái: khớp, thừa, hoặc thiếu
}

// Dữ liệu mẫu cho các mục hàng tồn kho (sẽ được thay thế bằng dữ liệu thực từ API)
const mockInventory: InventoryItem[] = [
  {
    id: "1",
    product: "Laptop Dell XPS 13",
    sku: "LT-001",
    systemStock: 15,
    actualStock: 15,
    difference: 0,
    status: "match",
  },
  {
    id: "2",
    product: "iPhone 14 Pro",
    sku: "IP-002",
    systemStock: 8,
    actualStock: 10,
    difference: 2,
    status: "over",
  },
  {
    id: "3",
    product: "Samsung Galaxy S23",
    sku: "SS-003",
    systemStock: 12,
    actualStock: 10,
    difference: -2,
    status: "under",
  },
  {
    id: "4",
    product: "MacBook Air M2",
    sku: "MB-004",
    systemStock: 6,
    actualStock: 6,
    difference: 0,
    status: "match",
  },
  {
    id: "5",
    product: "Mouse Logitech",
    sku: "MS-005",
    systemStock: 45,
    actualStock: 43,
    difference: -2,
    status: "under",
  },
];

// Component chính cho trang kiểm kho
export function InventoryPage() {
  // State để lưu trữ danh sách hàng tồn kho
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  // State để theo dõi mục hàng đang được chỉnh sửa (ID của mục đó)
  const [editMode, setEditMode] = useState<string | null>(null);
  // State để lưu giá trị số lượng thực tế đang nhập
  const [actualCount, setActualCount] = useState<string>("");

  // Hàm xử lý cập nhật số lượng tồn kho thực tế cho một mục hàng
  const handleUpdateStock = (id: string) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === id) {
          const actual = parseInt(actualCount); // Chuyển đổi giá trị nhập thành số nguyên
          const diff = actual - item.systemStock; // Tính chênh lệch
          return {
            ...item,
            actualStock: actual, // Cập nhật tồn kho thực tế
            difference: diff, // Cập nhật chênh lệch
            // Quy ước trạng thái dựa trên chênh lệch để thống nhất màu và nhãn hiển thị
            status:
              diff === 0 ? "match" : diff > 0 ? "over" : ("under" as const),
          };
        }
        return item;
      })
    );
    setEditMode(null); // Thoát chế độ chỉnh sửa
    setActualCount(""); // Xóa giá trị nhập
  };

  // Tính toán số lượng mục hàng theo từng trạng thái để hiển thị thống kê
  const matchCount = inventory.filter((i) => i.status === "match").length;
  const overCount = inventory.filter((i) => i.status === "over").length;
  const underCount = inventory.filter((i) => i.status === "under").length;

  return (
    <div className="space-y-6">
      {/* Phần tiêu đề của trang */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kiểm kho</h1>
        <p className="text-gray-600 mt-1">
          Kiểm tra và cập nhật số lượng tồn kho thực tế
        </p>
      </div>

      {/* Phần thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Tổng sản phẩm</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {inventory.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Khớp số liệu</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {matchCount}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Thừa</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{overCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Thiếu</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{underCount}</p>
        </div>
      </div>

      {/* Bảng hiển thị danh sách hàng tồn kho */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Tiêu đề bảng */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Sản phẩm
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  SKU
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Tồn kho hệ thống
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Tồn kho thực tế
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Chênh lệch
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Trạng thái
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Thao tác
                </th>
              </tr>
            </thead>
            {/* Nội dung bảng */}
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {item.product}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {item.systemStock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {/* Hiển thị input nếu đang chỉnh sửa, ngược lại hiển thị giá trị */}
                    {editMode === item.id ? (
                      <input
                        type="number"
                        value={actualCount}
                        onChange={(e) => setActualCount(e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-gray-900">
                        {item.actualStock}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${
                        item.difference === 0
                          ? "text-gray-900"
                          : item.difference > 0
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.difference > 0 ? "+" : ""}
                      {item.difference}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Hiển thị icon và nhãn dựa trên trạng thái */}
                      {item.status === "match" && (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600">Khớp</span>
                        </>
                      )}
                      {item.status === "over" && (
                        <>
                          <AlertTriangle className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-blue-600">Thừa</span>
                        </>
                      )}
                      {item.status === "under" && (
                        <>
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <span className="text-sm text-red-600">Thiếu</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* Hiển thị nút lưu/hủy nếu đang chỉnh sửa, ngược lại hiển thị nút kiểm tra */}
                    {editMode === item.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStock(item.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => {
                            setEditMode(null);
                            setActualCount("");
                          }}
                          className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditMode(item.id);
                          setActualCount(item.actualStock.toString());
                        }}
                        className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <ClipboardCheck className="w-4 h-4" />
                        <span className="text-sm">Kiểm tra</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
