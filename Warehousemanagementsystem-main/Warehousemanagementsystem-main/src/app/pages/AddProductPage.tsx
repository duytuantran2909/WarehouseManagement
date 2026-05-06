import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import { api } from "../api";

interface Supplier {
  supplierId: number;
  supplierName: string;
}

interface FormState {
  productName: string;
  sku: string;
  categoryId: string;
  supplierId: string;
  price: string;
  stock: string;
  minStock: string;
  description: string;
  imageFile: File | null;
  imagePreview: string;
}

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Điện thoại" },
  { id: 3, name: "Phụ kiện" },
  { id: 4, name: "Máy tính bảng" },
];

export function AddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    productName: "",
    sku: "",
    categoryId: "",
    supplierId: "",
    price: "",
    stock: "",
    minStock: "",
    description: "",
    imageFile: null,
    imagePreview: "",
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await api.get<Supplier[]>("/Supplier");
        setSuppliers(response.data);
      } catch (err) {
        console.error("Lỗi tải nhà cung cấp:", err);
      }
    };

    loadSuppliers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      let imageUrl = null;

      if (formData.imageFile) {
        // Upload riêng để lấy URL từ backend, để lỗi upload không ảnh hưởng payload chính
        const formDataUpload = new FormData();
        formDataUpload.append("file", formData.imageFile);

        const uploadResponse = await api.post("/Product/upload-image", formDataUpload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadResponse.data.imageUrl;
      }

      // Backend dùng PascalCase nên cần map từ form state sang đúng tên trường
      await api.post("/Product", {
        SKU: formData.sku,
        ProductName: formData.productName,
        Price: parseFloat(formData.price) || 0,
        CategoryId: formData.categoryId ? Number(formData.categoryId) : null,
        SupplierId: formData.supplierId ? Number(formData.supplierId) : null,
        ImageURL: imageUrl,
      });
      navigate("/products");
    } catch (err) {
      console.error("Lỗi tạo sản phẩm:", err);
      setError("Không thể thêm sản phẩm. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      imageFile: file,
      imagePreview: file ? URL.createObjectURL(file) : "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/products")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thêm sản phẩm mới</h1>
          <p className="text-gray-600 mt-1">Nhập thông tin sản phẩm mới vào kho</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-100 rounded-xl p-4">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm *</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="VD: Laptop Dell XPS 13"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mã SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="VD: LT-001"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nhà cung cấp *</label>
              <select
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Chọn nhà cung cấp</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.supplierId} value={supplier.supplierId}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá (VNĐ) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="VD: 25000000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng tồn kho *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="VD: 15"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tồn kho tối thiểu *</label>
              <input
                type="number"
                name="minStock"
                value={formData.minStock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="VD: 5"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Nhập mô tả chi tiết về sản phẩm..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh sản phẩm</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {formData.imagePreview && (
                <div className="mt-2">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving}
            >
              <Save className="w-5 h-5" />
              {saving ? "Đang lưu..." : "Lưu sản phẩm"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
