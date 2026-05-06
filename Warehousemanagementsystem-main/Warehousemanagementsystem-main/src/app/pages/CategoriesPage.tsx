import { useState } from "react";
import { Plus, Edit, Trash2, Tag, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  color: string;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Laptop",
    description: "Máy tính xách tay các loại",
    productCount: 45,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "2",
    name: "Điện thoại",
    description: "Điện thoại thông minh",
    productCount: 78,
    color: "from-green-500 to-green-600",
  },
  {
    id: "3",
    name: "Phụ kiện",
    description: "Phụ kiện máy tính và điện thoại",
    productCount: 123,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "4",
    name: "Máy tính bảng",
    description: "Tablet các loại",
    productCount: 34,
    color: "from-orange-500 to-orange-600",
  },
];

export function CategoriesPage() {
  const [categories] = useState<Category[]>(mockCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Category added:", newCategory);
    // Đóng modal và reset form để tránh dữ liệu cũ lọt sang lần tạo tiếp theo
    setShowAddModal(false);
    setNewCategory({ name: "", description: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Danh mục</h1>
            <p className="text-indigo-100 text-lg">Quản lý danh mục sản phẩm</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            Thêm danh mục
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className={`h-32 bg-gradient-to-br ${category.color} p-6 flex items-center justify-center`}>
              <Tag className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {category.name}
                </h3>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {category.description}
              </p>
              <div className={`bg-gradient-to-r ${category.color} rounded-xl p-4 text-white`}>
                <p className="text-sm opacity-90 mb-1">Số sản phẩm</p>
                <p className="text-3xl font-bold">{category.productCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Thêm danh mục mới
            </h2>
            <form onSubmit={handleAddCategory} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên danh mục *
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="VD: Laptop"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition"
                  placeholder="Nhập mô tả danh mục..."
                />
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-semibold"
                >
                  Thêm danh mục
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border-2 border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}