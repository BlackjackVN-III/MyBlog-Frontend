import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import HomePage from "../pages/HomePage";
import BlogDetailPage from "../pages/BlogDetailPage";
import ProfilePage from "../pages/ProfilePage";
import AboutPage from "../pages/AboutPage";
import AdminGuard from "../components/AdminGuard";
import { Page } from "../types";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleReadPost = (id: string | number) => {
    setSelectedPostId(String(id));
    setPage("blog-detail");
  };

  const handleBackToHome = () => {
    setSelectedPostId(null);
    setPage("home");
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
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
