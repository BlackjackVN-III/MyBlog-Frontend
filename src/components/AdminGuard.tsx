import React from "react";
import { Lock, Shield, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AdminPage from "../pages/AdminPage";

export default function AdminGuard({ onLogin }: { onLogin: () => void }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Bạn chưa đăng nhập
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          Vui lòng đăng nhập để truy cập trang Admin Dashboard.
        </p>
        <button
          onClick={onLogin}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          <Lock className="w-4 h-4" /> Đăng nhập ngay
        </button>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Không có quyền truy cập
        </h2>
        <p className="text-muted-foreground text-sm mb-2">
          Trang này chỉ dành cho <span className="text-accent font-medium">Admin</span>.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Tài khoản <span className="text-foreground font-medium">{user.userName}</span> của bạn không có quyền này.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground">
          <User className="w-4 h-4" /> Vai trò: Thành viên thường
        </div>
      </div>
    );
  }

  return <AdminPage />;
}
