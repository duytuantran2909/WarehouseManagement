# Warehouse Management System (WMS)

## 📋 Giới Thiệu Dự Án

**Warehouse Management System** là một ứng dụng quản lý kho hàng hiện đại, được xây dựng với công nghệ **ASP.NET Core** backend và **React** frontend. Hệ thống giúp các doanh nghiệp quản lý hiệu quả các hoạt động liên quan đến kho hàng như:

- 📦 Quản lý sản phẩm (CRUD)
- 📊 Theo dõi tồn kho real-time
- 🎫 Quản lý phiếu nhập/xuất kho
- 📈 Thống kê và báo cáo dashboard
- 👥 Quản lý nhà cung cấp
- 🔐 Xác thực người dùng

---

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server 2019+
- **ORM**: Entity Framework Core
- **API**: RESTful API với Swagger
- **Language**: C#

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS/Tailwind
- **HTTP Client**: Axios
- **State Management**: React Hooks

---

## 📋 Yêu Cầu Hệ Thống

### Trước Khi Cài Đặt
Đảm bảo máy tính của bạn đã cài đặt:

1. **.NET SDK 8.0+**
   - Download: https://dotnet.microsoft.com/download
   - Kiểm tra: `dotnet --version`

2. **Node.js 16+**
   - Download: https://nodejs.org/
   - Kiểm tra: `node --version` và `npm --version`

3. **SQL Server 2019+**
   - Download: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   - Hoặc sử dụng: SQL Server Express

4. **Visual Studio Code / Visual Studio**
   - Download: https://code.visualstudio.com/

---

## 🚀 Hướng Dẫn Cài Đặt

### Bước 1: Clone Repository

```bash
cd d:\CNTT\CNPM
```

### Bước 2: Cài Đặt Database

#### 2.1 Tạo Database

1. Mở **SQL Server Management Studio (SSMS)**
2. Kết nối đến: `LAPTOP-PO4NN5AP\SQLEXPRESS`
3. Chạy script `WarehouseManagerDB.sql`:
   - File: `d:\CNTT\CNPM\WarehouseManagerDB.sql`
   - Chuột phải → **New Query**
   - Dán nội dung script
   - Nhấn **Execute (F5)**

#### 2.2 Kiểm Tra Kết Nối Database

- Mở file: `WarehouseManagement.Api\Data\WarehouseManagementDbContext.cs`
- Kiểm tra connection string:
  ```
  Server=LAPTOP-PO4NN5AP\SQLEXPRESS
  Database=WarehouseManagementDB
  ```

### Bước 3: Cài Đặt Backend

```bash
# Di chuyển đến thư mục backend
cd WarehouseManagement.Api

# Khôi phục NuGet packages
dotnet restore

# Build dự án
dotnet build

# Chạy ứng dụng
dotnet run
```

**Backend sẽ chạy tại**: `https://localhost:5001`  
**Swagger UI**: `https://localhost:5001/swagger`

### Bước 4: Cài Đặt Frontend

```bash
# Di chuyển đến thư mục frontend
cd Warehousemanagementsystem-main\Warehousemanagementsystem-main

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

**Frontend sẽ chạy tại**: `http://localhost:5173`

---

## 📂 Cấu Trúc Dự Án

```
CNPM/
├── WarehouseManagement.Api/          # Backend ASP.NET Core
│   ├── Controllers/                  # API Controllers
│   │   ├── AuthController.cs         # Xác thực người dùng
│   │   ├── ProductController.cs      # Quản lý sản phẩm
│   │   ├── InventoryController.cs    # Quản lý phiếu kho
│   │   ├── DashboardController.cs    # Thống kê & báo cáo
│   │   └── SuppliersController.cs    # Quản lý nhà cung cấp
│   ├── Models/                       # Entity Models & DTOs
│   │   ├── Product.cs                # Model sản phẩm
│   │   ├── Stock.cs                  # Model tồn kho
│   │   ├── InventoryTicket.cs        # Model phiếu kho
│   │   ├── User.cs                   # Model người dùng
│   │   └── DTOs/                     # Data Transfer Objects
│   ├── Data/                         # Database Context
│   │   └── WarehouseManagementDbContext.cs
│   ├── Service/                      # Business Logic
│   │   └── UserService.cs
│   ├── Properties/                   # Project Settings
│   ├── Program.cs                    # Application Entry Point
│   ├── appsettings.json              # Cấu hình ứng dụng
│   └── WarehouseManagement.Api.csproj
│
├── Warehousemanagementsystem-main/   # Frontend React
│   ├── src/                          # Source code
│   │   ├── components/               # React Components
│   │   ├── pages/                    # Pages
│   │   ├── services/                 # API Services
│   │   └── App.tsx                   # Root Component
│   ├── package.json                  # Dependencies
│   ├── vite.config.ts                # Vite Configuration
│   └── tsconfig.json                 # TypeScript Config
│
├── WarehouseManagerDB.sql            # Database Script
└── CNPM.sln                          # Solution File
```

---

## 🔗 API Endpoints

### Authentication (Xác Thực)
- `POST /api/auth/login` - Đăng nhập

### Products (Sản Phẩm)
- `GET /api/product` - Lấy danh sách sản phẩm
- `GET /api/product/{id}` - Lấy chi tiết sản phẩm
- `POST /api/product` - Tạo sản phẩm mới
- `PUT /api/product/{id}` - Cập nhật sản phẩm
- `DELETE /api/product/{id}` - Xóa sản phẩm
- `POST /api/product/upload-image` - Tải lên ảnh sản phẩm

### Inventory (Quản Lý Kho)
- `POST /api/inventory/create-ticket` - Tạo phiếu nhập/xuất kho

### Dashboard (Thống Kê)
- `GET /api/dashboard/stats` - Lấy thống kê chính
- `GET /api/dashboard/inventory-chart` - Lấy dữ liệu biểu đồ

### Suppliers (Nhà Cung Cấp)
- `GET /api/supplier` - Lấy danh sách nhà cung cấp
- `POST /api/supplier` - Tạo nhà cung cấp mới
- `DELETE /api/supplier/{id}` - Xóa nhà cung cấp

---

## 🧪 Kiểm Tra Ứng Dụng

### Từ Swagger UI (Backend)
1. Truy cập: `https://localhost:5001/swagger`
2. Chọn một endpoint
3. Nhấn **Try it out**
4. Nhập tham số (nếu cần) và **Execute**

### Từ Frontend
1. Truy cập: `http://localhost:5173`
2. Đăng nhập bằng tài khoản demo (nếu có)
3. Thử các tính năng

---

## 📝 Tài Khoản Demo (Nếu Có)

Nếu database đã được import từ script SQL:

| Tài Khoản | Mật Khẩu | Vai Trò |
|----------|---------|--------|
| admin | 123456 | Admin |
| manager | 123456 | Manager |

> ⚠️ **Lưu ý**: Đây là tài khoản demo cho mục đích phát triển. Trong production, cần đổi mật khẩu mạnh.

---

## 🐛 Xử Lý Sự Cố

### Backend không chạy được
```bash
# Kiểm tra .NET version
dotnet --version

# Cài đặt lại dependencies
dotnet clean
dotnet restore
dotnet build
```

### Lỗi kết nối database
1. Kiểm tra SQL Server đã chạy chưa
2. Kiểm tra connection string trong `appsettings.json`
3. Kiểm tra firewall có chặn SQL Server không

### Frontend không tải được
```bash
# Cài đặt lại node modules
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Lỗi CORS (API không gọi được)
- Kiểm tra `Program.cs` - CORS policy đã được cấu hình

---

## 📚 Tài Liệu Thêm

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core Guide](https://docs.microsoft.com/ef/core)
- [React Official Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

---

## 👥 Đóng Góp

Nếu bạn muốn đóng góp cho dự án:

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Tạo Pull Request

---

## 📧 Liên Hệ

- **Email**: support@warehousemanagement.com
- **Issues**: GitHub Issues
- **Documentation**: [Wiki](./wiki)

---

## 📄 License

Dự án này được cấp phép dưới MIT License - xem file `LICENSE` để biết chi tiết.

---

## 🙏 Cảm Ơn

Cảm ơn bạn đã sử dụng **Warehouse Management System**!

**Happy Coding! 🚀**

---

### Cập Nhật Lần Cuối
- **Ngày**: Tháng 5 năm 2026
- **Phiên Bản**: 1.0.0
- **Trạng Thái**: Development
