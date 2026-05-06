import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

// Component trang 404 - hiển thị khi người dùng truy cập vào URL không tồn tại
export function NotFoundPage() {
  return (
    // Container chính của trang, căn giữa nội dung theo chiều dọc và ngang
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      // Phần hiển thị mã lỗi và thông báo
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">
          Không tìm thấy trang
        </h2>
        <p className="text-gray-600 mt-2">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
      </div>

      // Phần chứa các nút hành động
      <div className="flex items-center gap-4">
        // Nút về trang chủ sử dụng Link từ React Router để điều hướng
        <Link
          to="/"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Về trang chủ
        </Link>
        // Nút quay lại sử dụng history API của trình duyệt
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
      </div>
    </div>
  );
}
