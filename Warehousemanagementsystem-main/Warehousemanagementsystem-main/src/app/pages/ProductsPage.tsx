import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Edit, Trash2, Package, Filter } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api } from "../api";

// Định nghĩa interface cho sản phẩm
interface Product {
  productId: number;
  sku: string;
  productName: string;
  price?: number;
  categoryId?: number;
  supplierId?: number;
  imageUrl?: string | null;
}

// Định nghĩa interface cho nhà cung cấp
interface Supplier {
  supplierId: number;
  supplierName: string;
}

// Map các ID danh mục sang tên danh mục
const categoryMap: Record<number, string> = {
  1: "Laptop",
  2: "Điện thoại",
  3: "Phụ kiện",
  4: "Máy tính bảng",
};

// Hàm lấy tên danh mục từ ID
const getCategoryName = (id?: number) => {
  if (!id) return "Chưa xác định";
  return categoryMap[id] ?? "Chưa xác định";
};

// Component trang quản lý sản phẩm
export function ProductsPage() {
  // State cho từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");
  // State cho danh sách sản phẩm
  const [products, setProducts] = useState<Product[]>([]);
  // State cho danh sách nhà cung cấp
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  // State cho trạng thái loading
  const [isLoading, setIsLoading] = useState(true);
  // State cho thông báo lỗi
  const [error, setError] = useState<string | null>(null);

  // useEffect để tải dữ liệu sản phẩm và nhà cung cấp khi component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Gọi API đồng thời để lấy sản phẩm và nhà cung cấp
        const [productRes, supplierRes] = await Promise.all([
          api.get<Product[]>("/Product"),
          api.get<Supplier[]>("/Supplier"),
        ]);
        setProducts(productRes.data);
        setSuppliers(supplierRes.data);
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
        setError("Không thể tải danh sách sản phẩm từ Backend.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Hàm xử lý xóa sản phẩm
  const handleDelete = async (productId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await api.delete(`/Product/${productId}`);
      setProducts((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
      setError("Xóa sản phẩm thất bại. Vui lòng thử lại.");
    }
  };

  // Hàm lấy tên nhà cung cấp từ ID
  const getSupplierName = (supplierId?: number) => {
    if (!supplierId) return "Chưa xác định";
    return suppliers.find((item) => item.supplierId === supplierId)?.supplierName ?? "Chưa xác định";
  };

  // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hàm lấy màu sắc cho trạng thái sản phẩm (tạm thời dựa trên productId)
  const getStatusColor = (product: Product) => {
    // Tạm sử dụng parity productId để mô phỏng trạng thái tồn kho
    return product.productId % 2 === 0
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  // Hàm lấy nhãn trạng thái sản phẩm (tạm thời dựa trên productId)
  const getStatusText = (product: Product) => (product.productId % 2 === 0 ? "Sắp hết" : "Còn hàng");

  // Hiển thị loading khi đang tải dữ liệu
  if (isLoading) {
    return <div className="p-10 text-center">Đang tải danh sách sản phẩm...</div>;
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Phần tiêu đề với gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Sản phẩm</h1>
            <p className="text-purple-100 text-lg">Quản lý danh sách sản phẩm trong kho</p>
          </div>
          <Link
            to="/products/add"
            className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Phần tìm kiếm và lọc */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm theo tên hoặc SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium">
            <Filter className="w-5 h-5" />
            Lọc
          </button>
        </div>
      </div>

      {/* Grid hiển thị danh sách sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
          >
            {/* Phần hình ảnh sản phẩm */}
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              {product.imageUrl ? (
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              )}
              {/* Badge trạng thái */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(product)}`}
                >
                  {getStatusText(product)}
                </span>
              </div>
            </div>

            {/* Phần thông tin sản phẩm */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.productName}</h3>
              <p className="text-sm text-gray-600 mb-4">{getSupplierName(product.supplierId)}</p>

              {/* Grid thông tin chi tiết */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">SKU</p>
                  <p className="font-semibold text-gray-900">{product.sku}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Danh mục</p>
                  <p className="font-semibold text-gray-900">{getCategoryName(product.categoryId)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tồn kho</p>
                  <p className="font-semibold text-gray-900">N/A</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Giá</p>
                  <p className="font-semibold text-purple-600">
                    {product.price ? product.price.toLocaleString() + ' đ' : '0 đ'}
                  </p>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex gap-2">
                <Link
                  to={`/products/edit/${product.productId}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Sửa
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(product.productId)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phần thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <p className="text-purple-100 mb-2">Tổng sản phẩm</p>
          <p className="text-4xl font-bold">{products.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <p className="text-green-100 mb-2">Còn hàng</p>
          <p className="text-4xl font-bold">{products.length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
          <p className="text-red-100 mb-2">Hết hàng</p>
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}