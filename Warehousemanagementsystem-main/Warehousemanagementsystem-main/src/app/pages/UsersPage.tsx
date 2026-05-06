import { useState } from "react";
import { Plus, Edit, Trash2, UserCircle, Shield, User } from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff";
  status: "active" | "inactive";
  lastLogin: string;
}

const mockUsers: UserType[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "admin@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2026-04-17 10:30",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "manager@example.com",
    role: "Manager",
    status: "active",
    lastLogin: "2026-04-17 09:15",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "staff1@example.com",
    role: "Staff",
    status: "active",
    lastLogin: "2026-04-16 16:45",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "staff2@example.com",
    role: "Staff",
    status: "inactive",
    lastLogin: "2026-04-10 14:20",
  },
];

export function UsersPage() {
  const [users] = useState<UserType[]>(mockUsers);

  const getRoleIcon = (role: UserType["role"]) => {
    // Map role -> icon để nhất quán nhận diện trên toàn hệ thống
    switch (role) {
      case "Admin":
        return <Shield className="w-4 h-4" />;
      case "Manager":
        return <UserCircle className="w-4 h-4" />;
      case "Staff":
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: UserType["role"]) => {
    // Màu sắc theo vai trò giúp phân loại nhanh trong danh sách lớn
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-700";
      case "Manager":
        return "bg-blue-100 text-blue-700";
      case "Staff":
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Người dùng</h1>
          <p className="text-gray-600 mt-1">
            Quản lý tài khoản người dùng hệ thống
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Thêm người dùng
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Tổng người dùng</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {users.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Quản trị viên</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            {users.filter((u) => u.role === "Admin").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Nhân viên</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {users.filter((u) => u.role === "Staff").length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Người dùng
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Vai trò
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Trạng thái
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Đăng nhập cuối
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.email}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {getRoleIcon(user.role)}
                      <span className="text-xs font-medium">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
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
