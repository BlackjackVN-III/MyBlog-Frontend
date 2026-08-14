import React, { useState } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  useNavigate,
  useParams,
  Link,
} from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AdminGuard from "./components/AdminGuard";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import LoginModal from "./components/LoginModal";
import { useSignalR } from "./context/SignalRContext";
import { Bell, X } from "lucide-react";

// 1. Root Route Layout
function RootLayout() {
  const [showLogin, setShowLogin] = useState(false);
  const { activeToast, dismissToast } = useSignalR();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar onLogin={() => setShowLogin(true)} />
      
      <main>
        <Outlet />
      </main>
      
      {/* Footer handles active state link navigation */}
      <Footer />

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
                  navigate({
                    to: "/blog/$postId",
                    params: { postId: activeToast.postId },
                  });
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
            navigate({ to: "/" });
          }}
        />
      )}
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

// 2. Child Routes Definition
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function IndexComponent() {
    const navigate = useNavigate();
    return (
      <HomePage
        onReadPost={(id) =>
          navigate({
            to: "/blog/$postId",
            params: { postId: String(id) },
          })
        }
      />
    );
  },
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$postId",
  component: function BlogDetailComponent() {
    const { postId } = useParams({ from: "/blog/$postId" });
    const navigate = useNavigate();
    return (
      <BlogDetailPage
        postId={postId}
        onBack={() => navigate({ to: "/" })}
      />
    );
  },
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: function AdminComponent() {
    const [showLogin, setShowLogin] = useState(false);
    return (
      <>
        <AdminGuard onLogin={() => setShowLogin(true)} />
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSuccess={() => {
              window.location.reload();
            }}
          />
        )}
      </>
    );
  },
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

// 3. Assemble Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  blogDetailRoute,
  adminRoute,
  profileRoute,
  aboutRoute,
]);

// 4. Create and export Router instance
export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
