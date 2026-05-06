import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Building2, Phone, Mail, MapPin, X } from "lucide-react";
import { api } from "../api";

interface Supplier {
  supplierId: number;
  supplierName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface SupplierForm {
  supplierName: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
}

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState<SupplierForm>({
    supplierName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await api.get<Supplier[]>("/Supplier");
        setSuppliers(response.data);
      } catch (err) {
        console.error("Lỗi tải nhà cung cấp:", err);
        setError("Không thể tải danh sách nhà cung cấp.");
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  const handleDelete = async (supplierId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?")) return;
    try {
      await api.delete(`/Supplier/${supplierId}`);
      setSuppliers((prev) => prev.filter((item) => item.supplierId !== supplierId));
    } catch (err) {
      console.error("Lỗi xóa nhà cung cấp:", err);
      setError("Xóa nhà cung cấp thất bại. Vui lòng thử lại.");
    }
  };

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Map field sang PascalCase để đúng contract với backend
      const payload = {
        SupplierName: newSupplier.supplierName,
        ContactName: newSupplier.contactName,
        Phone: newSupplier.phone,
        Email: newSupplier.email,
        Address: newSupplier.address,
      };
      const response = await api.post<Supplier>("/Supplier", payload);
      setSuppliers((prev) => [...prev, response.data]);
      setShowAddModal(false);
      setNewSupplier({ supplierName: "", contactName: "", phone: "", email: "", address: "" });
    } catch (err) {
      console.error("Lỗi thêm nhà cung cấp:", err);
      setError("Thêm nhà cung cấp thất bại. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Đang tải danh sách nhà cung cấp...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nhà cung cấp</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin nhà cung cấp
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Thêm nhà cung cấp
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {supplier.name}
                  </h3>
                  <p className="text-sm text-gray-600">{supplier.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{supplier.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>{supplier.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Số sản phẩm cung cấp:{" "}
                <span className="font-bold text-gray-900">
                  {supplier.productCount}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
