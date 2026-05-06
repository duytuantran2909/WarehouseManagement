import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { ProductsPage } from "./pages/ProductsPage";
import { AddProductPage } from "./pages/AddProductPage";
import { EditProductPage } from "./pages/EditProductPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { StockInPage } from "./pages/StockInPage";
import { StockOutPage } from "./pages/StockOutPage";
import { StockHistoryPage } from "./pages/StockHistoryPage";
import { InventoryPage } from "./pages/InventoryPage";
import { ReportsPage } from "./pages/ReportsPage";
import { UsersPage } from "./pages/UsersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "products", Component: ProductsPage },
      { path: "products/add", Component: AddProductPage },
      { path: "products/edit/:id", Component: EditProductPage },
      { path: "categories", Component: CategoriesPage },
      { path: "suppliers", Component: SuppliersPage },
      { path: "stock-in", Component: StockInPage },
      { path: "stock-out", Component: StockOutPage },
      { path: "stock-history", Component: StockHistoryPage },
      { path: "inventory", Component: InventoryPage },
      { path: "reports", Component: ReportsPage },
      { path: "users", Component: UsersPage },
      { path: "settings", Component: SettingsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
