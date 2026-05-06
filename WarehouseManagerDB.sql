USE master; -- Chuyển về db hệ thống để có quyền đóng db khác
GO

--  Đóng tất cả kết nối đang hoạt động và Xóa Database cũ
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'WarehouseManagementDB')
BEGIN
    ALTER DATABASE WarehouseManagementDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE WarehouseManagementDB;
END
GO

--  Tạo mới Database
CREATE DATABASE WarehouseManagementDB;
GO

USE WarehouseManagementDB;
GO


-- =============================================
--  TẠO CẤU TRÚC BẢNG 
-- =============================================

CREATE TABLE Category (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX)
);

CREATE TABLE Supplier (
    SupplierID INT IDENTITY(1,1) PRIMARY KEY,
    SupplierName NVARCHAR(200) NOT NULL,
    Email VARCHAR(255),
    Phone NVARCHAR(20),
    Address NVARCHAR(MAX)
);

CREATE TABLE WareHouse (
    warehouseID INT IDENTITY(1,1) PRIMARY KEY,
    WarehouseName NVARCHAR(100) NOT NULL,
    Location NVARCHAR(200)
);

CREATE TABLE [User] (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Password NVARCHAR(MAX) NOT NULL,
    FullName NVARCHAR(100),
    Role NVARCHAR(20) CHECK (Role IN ('Admin', 'Staff', 'Customer'))
);

CREATE TABLE Product (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    SKU NVARCHAR(50) UNIQUE NOT NULL,
    ProductName NVARCHAR(200) NOT NULL,
    Price DECIMAL(18,2),
    CategoryID INT FOREIGN KEY REFERENCES Category(CategoryID),
    SupplierID INT FOREIGN KEY REFERENCES Supplier(SupplierID),
    ImageURL NVARCHAR(MAX)
);

CREATE TABLE InventoryTicket (
    TicketID INT IDENTITY(1,1) PRIMARY KEY,
    TicketType INT CHECK (TicketType IN (1, 2)), -- 1: Nhập, 2: Xuất
    CreatedDate DATETIME DEFAULT GETDATE(),
    UserID INT FOREIGN KEY REFERENCES [User](UserID),
    Note NVARCHAR(MAX)
);

CREATE TABLE TicketDetail (
    DetailID INT IDENTITY(1,1) PRIMARY KEY,
    TicketID INT FOREIGN KEY REFERENCES InventoryTicket(TicketID),
    ProductID INT FOREIGN KEY REFERENCES Product(ProductID),
    Quantity INT CHECK (Quantity > 0),
    UnitPrice DECIMAL(18,2)
);

CREATE TABLE Stock (
    StockID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT FOREIGN KEY REFERENCES Product(ProductID),
    WarehouseID INT FOREIGN KEY REFERENCES WareHouse(warehouseID),
    Quantity INT DEFAULT 0 CHECK (Quantity >= 0)
);



IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_UpdateStock')
BEGIN
    DROP TRIGGER trg_UpdateStock;
    PRINT 'Dropped existing trigger trg_UpdateStock.';
END
GO

--  TẠO  TRIGGER TỰ ĐỘNG CẬP NHẬT KHO

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_UpdateStock')
BEGIN
    DROP TRIGGER trg_UpdateStock;
    PRINT 'Deleted old trigger.';
END
GO

CREATE TRIGGER trg_UpdateStock
ON TicketDetail
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ProductID INT, @Quantity INT, @TicketID INT, @Type INT;

    -- Lấy thông tin bản ghi vừa chèn
    SELECT @ProductID = ProductID, @Quantity = Quantity, @TicketID = TicketID FROM inserted;
    
    -- Lấy loại phiếu (1: Nhập, 2: Xuất)
    SELECT @Type = TicketType FROM InventoryTicket WHERE TicketID = @TicketID;

    -- Cập nhật bảng Stock
    IF @Type = 1 -- Nhập hàng -> Cộng vào kho
    BEGIN
        UPDATE Stock SET Quantity = Quantity + @Quantity 
        WHERE ProductID = @ProductID AND WarehouseID = 1;
    END
    ELSE IF @Type = 2 -- Xuất hàng -> Trừ khỏi kho
    BEGIN
        UPDATE Stock SET Quantity = Quantity - @Quantity 
        WHERE ProductID = @ProductID AND WarehouseID = 1;
    END

    PRINT 'Stock updated successfully.';
END
GO


-- =============================================
--  CHÈN DỮ LIỆU MẪU - 10 DÒNG MỖI BẢNG
-- =============================================

INSERT INTO Category (CategoryName, Description) VALUES 
(N'Laptop', N'Máy tính xách tay các hãng'),
(N'CPU', N'Bộ vi xử lý Intel và AMD'),
(N'VGA', N'Card đồ họa rời'),
(N'RAM', N'Bộ nhớ trong'),
(N'SSD', N'Ổ cứng thể rắn'),
(N'Mainboard', N'Bo mạch chủ'),
(N'Monitor', N'Màn hình máy tính'),
(N'Keyboard', N'Bàn phím cơ và văn phòng'),
(N'Mouse', N'Chuột gaming và không dây'),
(N'PSU', N'Nguồn máy tính');

INSERT INTO Supplier (SupplierName, Email, Phone, Address) VALUES 
(N'Phong Vũ', 'contact@phongvu.vn', '18006867', N'TP. Hồ Chí Minh'),
(N'Hà Nội Computer', 'hnc@hnc.vn', '19001903', N'Hà Nội'),
(N'GearVN', 'info@gearvn.com', '18006975', N'TP. Hồ Chí Minh'),
(N'FPT Shop', 'fpt@fpt.com.vn', '18006601', N'Toàn quốc'),
(N'An Phát PC', 'anphat@anphat.vn', '19000323', N'Hà Nội'),
(N'Thế Giới Di Động', 'tgdd@mwg.vn', '18001060', N'Toàn quốc'),
(N'MemoryZone', 'info@memoryzone.vn', '0287301', N'TP. Hồ Chí Minh'),
(N'Nguyễn Kim', 'nk@nguyenkim.com', '18006800', N'Toàn quốc'),
(N'Viettel Store', 'viettel@viettel.vn', '18008123', N'Toàn quốc'),
(N'Hoàng Hà Mobile', 'hoangha@hoangha.vn', '19002091', N'Hà Nội');

INSERT INTO WareHouse (WarehouseName, Location) VALUES 
(N'Kho chính Hà Nội', N'Cầu Giấy, Hà Nội'),
(N'Kho chi nhánh HCM', N'Quận 1, TP. HCM'),
(N'Kho Đà Nẵng', N'Hải Châu, Đà Nẵng'),
(N'Kho hàng lỗi', N'Từ Liêm, Hà Nội'),
(N'Kho trung chuyển 1', N'Thanh Xuân, Hà Nội'),
(N'Kho dự phòng', N'Long Biên, Hà Nội'),
(N'Kho linh kiện cũ', N'Hà Đông, Hà Nội'),
(N'Kho Quận 7', N'Quận 7, TP. HCM'),
(N'Kho Cần Thơ', N'Ninh Kiều, Cần Thơ'),
(N'Kho Hải Phòng', N'Lê Chân, Hải Phòng');

INSERT INTO [User] (Username, Password, FullName, Role) VALUES 
('admin', 'admin123', N'Trần Duy Tuấn', 'Admin'),
('nhanvien1', 'pass123', N'Nguyễn Văn Bình', 'Staff'),
('nhanvien2', 'pass123', N'Lê Thị Thùy Anh', 'Staff'),
('manager', 'manager123', N'Phạm Minh Hoàng', 'Admin'),
('khachhang1', 'pass123', N'Trần Văn An', 'Customer'), 
('khachhang2', 'pass123', N'Nguyễn Thị Mai', 'Customer'), 
('staff5', 'pass123', N'Lý Công Uẩn', 'Staff'),
('staff6', 'pass123', N'Vũ Đức Đam', 'Staff'),
('staff7', 'pass123', N'Phan Anh', 'Staff'),
('staff8', 'pass123', N'Bùi Tiến Dũng', 'Staff');

INSERT INTO Product (SKU, ProductName, Price, CategoryID, SupplierID) VALUES 
('LAP-MAC-01', N'Macbook Pro M2', 35000000, 1, 4),
('CPU-INT-01', N'Intel Core i9-13900K', 15000000, 2, 1),
('VGA-RTX-01', N'ASUS RTX 4090', 52000000, 3, 3),
('RAM-COR-01', N'Corsair Vengeance 32GB', 3500000, 4, 2),
('SSD-SAM-01', N'Samsung 980 Pro 1TB', 2800000, 5, 5),
('MB-ROG-01', N'ROG Maximus Z790', 18000000, 6, 2),
('MON-LG-01', N'LG UltraGear 27 inch', 9000000, 7, 4),
('KB-RAZ-01', N'Razer BlackWidow V4', 4500000, 8, 3),
('MS-LOG-01', N'Logitech G Pro X Superlight', 3200000, 9, 3),
('PSU-COR-01', N'Corsair RM1000x', 4200000, 10, 1);

INSERT INTO InventoryTicket (TicketType, CreatedDate, UserID, Note) VALUES 
(1, '2026-04-01', 1, N'Nhập hàng đầu tháng'),
(1, '2026-04-05', 2, N'Nhập bổ sung SSD'),
(2, '2026-04-10', 3, N'Xuất kho bán lẻ'),
(1, '2026-04-12', 1, N'Nhập lô chuột mới'),
(2, '2026-04-15', 2, N'Xuất kho bảo hành'),
(1, '2026-04-18', 2, N'Nhập Macbook số lượng lớn'),
(2, '2026-04-20', 1, N'Xuất cho dự án công ty'),
(2, '2026-04-21', 7, N'Xuất lẻ chi nhánh'),
(1, '2026-04-22', 7, N'Nhập bổ sung linh kiện'),
(2, '2026-04-22', 9, N'Xuất kho cuối ngày');

INSERT INTO TicketDetail (TicketID, ProductID, Quantity, UnitPrice) VALUES 
(1, 1, 10, 34000000),
(1, 2, 20, 14500000),
(2, 5, 50, 2600000),
(3, 1, 2, 35500000),
(4, 9, 30, 3000000),
(5, 3, 1, 52000000),
(6, 1, 15, 34200000),
(7, 4, 10, 3400000),
(8, 7, 5, 9100000),
(9, 6, 5, 17500000);

INSERT INTO Stock (ProductID, WarehouseID, Quantity) VALUES 
(1, 1, 25),
(2, 1, 15),
(3, 2, 5),
(4, 3, 40),
(5, 1, 100),
(6, 2, 10),
(7, 3, 12),
(8, 1, 20),
(9, 2, 35),
(10, 1, 8);


