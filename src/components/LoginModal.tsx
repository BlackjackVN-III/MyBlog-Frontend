import React, { useState } from "react";
import { KeyRound, X, Shield, Lock, AlertTriangle } from "lucide-react";
import { useAuth, parseJwt } from "../context/AuthContext";

export default function LoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess?: (role: "admin" | "user") => void;
}) {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(userName, password);

      const token = localStorage.getItem("accessToken");
      let role: "admin" | "user" = "user";
      if (token) {
        const decoded = parseJwt(token);
        const roleClaim =
          decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
          decoded?.["role"];
        if (roleClaim === "Admin" || (Array.isArray(roleClaim) && roleClaim.includes("Admin"))) {
          role = "admin";
        }
      }

      onSuccess?.(role);
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Tên đăng nhập hoặc mật khẩu không chính xác."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(15,35,24,0.55)", backdropFilter: "blur(8px)" }}
    >
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Đăng nhập
              </h2>
              <p className="text-xs text-muted-foreground">DevLog · Tài khoản cá nhân</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cảnh báo tài khoản */}
        <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
          <p className="text-xs font-semibold text-accent flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Hệ thống chính thức
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Nhập tài khoản đăng ký trên hệ thống của bạn để đăng nhập.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tên đăng nhập</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm px-3 py-2 rounded-lg bg-red-400/10">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
