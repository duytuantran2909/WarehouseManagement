import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
// Đảm bảo file logo đã được tải về và đặt đúng thư mục assets
import logoImg from "../../assets/logo.jpg";

export function LoginPage() {
  // --- STATE MANAGEMENT ---
  // Đổi từ email sang username để khớp với yêu cầu đăng nhập hệ thống kho
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy hàm login và thông tin user từ AuthContext (Global State)
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // --- SIDE EFFECTS ---
  // Nếu user đã đăng nhập thành công, tự động chuyển hướng về trang chủ (Dashboard)
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // --- EVENT HANDLERS ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Chặn hành động load lại trang của Form
    setError("");
    setLoading(true);

    try {
      // Gọi hàm login từ Context. Lưu ý: Truyền tham số username đã đổi.
      // Hàm này sẽ thực hiện fetch API tới Backend C# của bạn.
      const success = await login(username, password);
      
      if (success) {
        navigate("/"); // Chuyển hướng khi đăng nhập đúng
      } else {
        // Hiển thị lỗi nếu Backend trả về Unauthorized (401)
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (err) {
      // Xử lý lỗi kết nối (ví dụ: Backend chưa bật, lỗi CORS...)
      setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại Backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative"
      style={{
        // Hình nền kho hàng hiện đại cho phù hợp với đề tài Warehouse Management
        backgroundImage: `url('https://images.unsplash.com/photo-1773399881946-8371e1c538d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXJlaG91c2UlMjBpbnZlbnRvcnklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzc2Mzk5NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
      }}
    >
      {/* Lớp phủ Gradient giúp giao diện trông sang trọng và làm nổi bật Form */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90"></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 backdrop-blur-sm">
        {/* LOGO SECTION */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src={logoImg}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* TIÊU ĐỀ HỆ THỐNG */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Đăng nhập
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Quản lý kho hàng thông minh (WMS)
        </p>

        {/* FORM ĐĂNG NHẬP */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hiển thị thông báo lỗi nếu có */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-pulse">
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          {/* INPUT TÊN ĐĂNG NHẬP */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Nhập username của bạn"
              required
            />
          </div>

          {/* INPUT MẬT KHẨU */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* NÚT SUBMIT - Sử dụng hiệu ứng Gradient và Loading state */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập ngay"}
          </button>
        </form>

        {/* THÔNG TIN HỖ TRỢ (FOOTER FORM) */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-center">
          <p className="text-xs text-gray-500">
            Dự án Phát triển phần mềm - Quản lý Kho hàng
          </p>
        </div>
      </div>
    </div>
  );
}