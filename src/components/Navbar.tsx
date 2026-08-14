import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Home,
  Info,
  User,
  Settings,
  Code2,
  ChevronDown,
  Shield,
  LogOut,
  Lock,
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const baseLinks = [
    { label: "Blog", to: "/", icon: <Home className="w-4 h-4" /> },
    { label: "About Me", to: "/about", icon: <Info className="w-4 h-4" /> },
    { label: "Profile", to: "/profile", icon: <User className="w-4 h-4" /> },
  ];

  const adminLink = { label: "Admin", to: "/admin", icon: <Settings className="w-4 h-4" /> };
  const links = user?.role === "admin" ? [...baseLinks, adminLink] : baseLinks;

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-xl" style={{ background: "rgba(240,250,244,0.92)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            DevLog<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-primary/15 text-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-secondary" }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              {l.icon}
              {l.label}
              {l.label === "Admin" && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-accent" style={{ fontFamily: "var(--font-mono)" }}>
                  ADM
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:border-primary/40 hover:bg-secondary transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-accent overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.userName} className="w-full h-full object-cover" />
                  ) : (
                    (user.userName || user.email || 'U').substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-foreground leading-none">{user.userName}</p>
                  {user.role === "admin" && (
                    <p className="text-[10px] text-primary mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>admin</p>
                  )}
                </div>
                <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{user.userName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-primary/15 text-accent" : "bg-secondary text-muted-foreground"
                    }`}>
                      <Shield className="w-3 h-3" />
                      {user.role === "admin" ? "Administrator" : "Thành viên"}
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      <User className="w-4 h-4" /> Trang cá nhân
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        <Settings className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Đăng nhập
            </button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: "bg-primary/15 text-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-secondary" }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              {l.icon} {l.label}
            </Link>
          ))}
          {!user && (
            <button
              onClick={() => { onLogin(); setMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-secondary transition-colors"
            >
              <Lock className="w-4 h-4" /> Đăng nhập
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
