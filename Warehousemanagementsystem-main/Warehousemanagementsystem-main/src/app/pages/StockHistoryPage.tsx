import { useState } from "react";
import { Search, ArrowDownToLine, ArrowUpFromLine, Filter } from "lucide-react";

interface Transaction {
  id: string;
  type: "in" | "out";
  product: string;
  quantity: number;
  date: string;
  person: string;
  reference: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "in",
    product: "Laptop HP Pavilion",
    quantity: 20,
    date: "2026-04-15 10:30",
    person: "HP Vietnam",
    reference: "PN-001",
  },
  {
    id: "2",
    type: "out",
    product: "Laptop Dell XPS 13",
    quantity: 3,
    date: "2026-04-17 14:20",
    person: "Công ty ABC",
    reference: "PX-001",
  },
  {
    id: "3",
    type: "in",
    product: "Mouse Logitech",
    quantity: 50,
    date: "2026-04-14 09:15",
    person: "Logitech VN",
    reference: "PN-002",
  },
  {
    id: "4",
    type: "out",
    product: "Mouse Logitech",
    quantity: 15,
    date: "2026-04-16 16:45",
    person: "Cửa hàng XYZ",
    reference: "PX-002",
  },
  {
    id: "5",
    type: "in",
    product: "Bàn phím cơ",
    quantity: 30,
    date: "2026-04-13 11:00",
    person: "Corsair VN",
    reference: "PN-003",
  },
  {
    id: "6",
    type: "out",
    product: "iPhone 14 Pro",
    quantity: 5,
    date: "2026-04-16 13:30",
    person: "Khách lẻ",
    reference: "PX-003",
  },
];

export function StockHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "in" | "out">("all");

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      // Cho phép "all" để bỏ qua lọc type, giúp UX lọc nhanh hơn
      filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lịch sử xuất nhập</h1>
        <p className="text-gray-600 mt-1">
          Theo dõi lịch sử giao dịch xuất nhập kho
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo sản phẩm hoặc mã phiếu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-900"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as "all" | "in" | "out")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">Tất cả</option>
              <option value="in">Nhập kho</option>
              <option value="out">Xuất kho</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Tổng giao dịch</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {mockTransactions.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Phiếu nhập</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {mockTransactions.filter((t) => t.type === "in").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Phiếu xuất</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {mockTransactions.filter((t) => t.type === "out").length}
          </p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Loại
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Mã phiếu
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Sản phẩm
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Số lượng
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Người liên quan
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${
                        transaction.type === "in"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {transaction.type === "in" ? (
                        <>
                          <ArrowDownToLine className="w-4 h-4" />
                          <span className="text-xs font-medium">Nhập</span>
                        </>
                      ) : (
                        <>
                          <ArrowUpFromLine className="w-4 h-4" />
                          <span className="text-xs font-medium">Xuất</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {transaction.reference}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {transaction.product}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {transaction.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {transaction.person}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {transaction.date}
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
