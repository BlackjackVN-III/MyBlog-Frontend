import React, { useState } from "react";
import { Bell, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import HomePage from "../pages/HomePage";
import BlogDetailPage from "../pages/BlogDetailPage";
import ProfilePage from "../pages/ProfilePage";
import AboutPage from "../pages/AboutPage";
import AdminGuard from "../components/AdminGuard";
import { useSignalR } from "../context/SignalRContext";
import { Page } from "../types";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { activeToast, dismissToast } = useSignalR();

  const handleReadPost = (id: string | number) => {
    setSelectedPostId(String(id));
    setPage("blog-detail");
  };

  const handleBackToHome = () => {
    setSelectedPostId(null);
    setPage("home");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar
        page={page}
        setPage={setPage}
        onLogin={() => setShowLogin(true)}
      />
      <main>
        {page === "home" && <HomePage onReadPost={handleReadPost} />}
        {page === "blog-detail" && selectedPostId && (
          <BlogDetailPage postId={selectedPostId} onBack={handleBackToHome} />
        )}
        {page === "profile" && <ProfilePage />}
        {page === "admin" && <AdminGuard onLogin={() => setShowLogin(true)} />}
        {page === "about" && <AboutPage />}
      </main>
      {page !== "admin" && <Footer setPage={setPage} />}

      {/* Floating Realtime Toast Notification */}
      {activeToast && (
        <div className="fixed top-20 right-4 z-[9999] max-w-sm w-full bg-card/85 backdrop-blur-md border border-primary/20 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-accent animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">Thông báo mới</span>
                <button
                  onClick={dismissToast}
                  className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                {activeToast.message}
              </p>
              <button
                onClick={() => {
                  handleReadPost(activeToast.postId);
                  dismissToast();
                }}
                className="mt-3 text-xs font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
              >
                Xem bài viết →
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setPage("home");
          }}
        />
      )}
    </div>
  );
}
