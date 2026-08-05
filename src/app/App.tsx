import { useState } from "react";
import {
  Home, FileText, User, Settings, Info, Menu, X,
  Search, MessageSquare, Heart, Eye, Clock,
  Reply, ThumbsUp, Code2, Briefcase,
  Github, Twitter, Linkedin, Mail, ExternalLink,
  BarChart3, Plus, Edit3, Trash2, TrendingUp, Users,
  Calendar, ArrowRight, Globe,
  ChevronDown, Send, Star, Zap, Database, Layers,
  Monitor, Cpu, CheckCircle2,
  LogOut, Bell, Shield, Lock, KeyRound, AlertTriangle
} from "lucide-react";
import { useAuth, AuthUser, parseJwt } from "../context/AuthContext";

// ─── Types ───────────────────────────────────────────────────────────────────

type Page = "home" | "blog-detail" | "profile" | "admin" | "about";
type Role = "admin" | "user";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  cover: string;
  featured?: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Xây dựng hệ thống Microservices với Node.js và Kubernetes",
    excerpt: "Khám phá cách thiết kế và triển khai hệ thống microservices hiệu quả, từ service discovery đến load balancing và monitoring.",
    content: `Microservices architecture đã trở thành chuẩn mực trong phát triển phần mềm hiện đại. Trong bài viết này, tôi sẽ chia sẻ kinh nghiệm thực tế xây dựng hệ thống microservices cho ứng dụng thương mại điện tử với hàng triệu người dùng.

## Tại sao chọn Microservices?

Monolithic architecture đã phục vụ chúng ta tốt trong nhiều năm, nhưng khi ứng dụng phát triển lớn hơn, chúng ta bắt đầu gặp phải những hạn chế về khả năng mở rộng và deployment independence.

## Thiết kế Service Boundaries

Nguyên tắc đầu tiên khi thiết kế microservices là xác định bounded contexts dựa trên domain model. Mỗi service nên có single responsibility và data ownership rõ ràng.

\`\`\`javascript
// User Service
const userService = {
  endpoint: '/api/users',
  database: 'users_db',
  events: ['user.created', 'user.updated', 'user.deleted']
}

// Order Service
const orderService = {
  endpoint: '/api/orders',
  database: 'orders_db',
  events: ['order.placed', 'order.fulfilled']
}
\`\`\`

## Kubernetes Deployment

Kubernetes giúp chúng ta quản lý container orchestration một cách hiệu quả với auto-scaling, rolling updates và self-healing capabilities.`,
    author: "Nguyễn Văn Dev",
    date: "2 tháng 7, 2025",
    readTime: "12 phút",
    tags: ["Node.js", "Kubernetes", "Microservices", "DevOps"],
    views: 4821,
    likes: 312,
    comments: 28,
    cover: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop&auto=format",
    featured: true,
  },
  {
    id: 2,
    title: "React Server Components: Tương lai của Web Development",
    excerpt: "Tìm hiểu sâu về React Server Components và cách chúng thay đổi cách chúng ta xây dựng ứng dụng web hiệu suất cao.",
    content: "React Server Components represent a paradigm shift...",
    author: "Nguyễn Văn Dev",
    date: "25 tháng 6, 2025",
    readTime: "9 phút",
    tags: ["React", "Next.js", "Performance", "Frontend"],
    views: 3256,
    likes: 198,
    comments: 41,
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "PostgreSQL Performance Tuning: Từ 10s đến 50ms",
    excerpt: "Hành trình tối ưu hóa một câu query phức tạp từ 10 giây xuống còn 50ms thông qua indexing strategies và query optimization.",
    content: "Database performance is critical...",
    author: "Nguyễn Văn Dev",
    date: "18 tháng 6, 2025",
    readTime: "15 phút",
    tags: ["PostgreSQL", "Database", "Performance", "Backend"],
    views: 5643,
    likes: 421,
    comments: 67,
    cover: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "TypeScript 5.0: Những tính năng mới không thể bỏ qua",
    excerpt: "Khám phá những tính năng breakthrough trong TypeScript 5.0 từ decorators chuẩn đến const type parameters.",
    content: "TypeScript 5.0 brings many improvements...",
    author: "Nguyễn Văn Dev",
    date: "10 tháng 6, 2025",
    readTime: "7 phút",
    tags: ["TypeScript", "JavaScript", "Frontend"],
    views: 2891,
    likes: 156,
    comments: 22,
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "CI/CD Pipeline với GitHub Actions: Best Practices",
    excerpt: "Xây dựng pipeline CI/CD mạnh mẽ và đáng tin cậy với GitHub Actions, Docker và automated testing.",
    content: "A solid CI/CD pipeline is the backbone...",
    author: "Nguyễn Văn Dev",
    date: "3 tháng 6, 2025",
    readTime: "11 phút",
    tags: ["DevOps", "GitHub Actions", "Docker", "CI/CD"],
    views: 3102,
    likes: 234,
    comments: 35,
    cover: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "Tối ưu hóa Web Vitals: Core Web Vitals từ A đến Z",
    excerpt: "Hướng dẫn toàn diện cải thiện LCP, FID, CLS và đạt điểm Lighthouse 100/100 trong thực tế.",
    content: "Core Web Vitals are Google ranking signals...",
    author: "Nguyễn Văn Dev",
    date: "28 tháng 5, 2025",
    readTime: "13 phút",
    tags: ["Performance", "SEO", "Frontend", "UX"],
    views: 4230,
    likes: 287,
    comments: 49,
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format",
  },
];

const COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Trần Minh Khoa",
    avatar: "TK",
    date: "3 tháng 7, 2025",
    content: "Bài viết cực kỳ hữu ích! Mình đang triển khai microservices cho dự án của công ty và gặp đúng vấn đề service discovery mà bạn đề cập. Cảm ơn đã chia sẻ chi tiết như vậy.",
    likes: 24,
    replies: [
      {
        id: 11,
        author: "Nguyễn Văn Dev",
        avatar: "NV",
        date: "3 tháng 7, 2025",
        content: "Cảm ơn bạn Khoa! Với service discovery, mình recommend dùng Consul hoặc Kubernetes built-in service discovery. Nếu cần thêm chi tiết về phần này mình có thể viết bài riêng.",
        likes: 8,
      },
      {
        id: 12,
        author: "Lê Thị Hương",
        avatar: "LH",
        date: "4 tháng 7, 2025",
        content: "Mình cũng đang tìm hiểu về phần này, bài viết riêng về service discovery sẽ rất tuyệt!",
        likes: 5,
      },
    ],
  },
  {
    id: 2,
    author: "Phạm Đức Long",
    avatar: "PL",
    date: "3 tháng 7, 2025",
    content: "Phần về Kubernetes deployment khá concise. Bạn có thể chia sẻ thêm về cách handle distributed transactions giữa các services không? Đây là phần mình thấy tricky nhất khi switch sang microservices.",
    likes: 31,
    replies: [
      {
        id: 21,
        author: "Nguyễn Văn Dev",
        avatar: "NV",
        date: "4 tháng 7, 2025",
        content: "Câu hỏi rất hay! Distributed transactions là một trong những challenge lớn nhất. Mình thường dùng Saga pattern kết hợp với event sourcing. Mình sẽ viết bài về chủ đề này trong tháng tới!",
        likes: 15,
      },
    ],
  },
  {
    id: 3,
    author: "Võ Thanh Tú",
    avatar: "VT",
    date: "4 tháng 7, 2025",
    content: "Code example về Kubernetes manifest rất clear và practical. Đây là bài viết tiếng Việt đầu tiên về Microservices mình thấy đủ depth để áp dụng vào production. Keep it up!",
    likes: 19,
    replies: [],
  },
  {
    id: 4,
    author: "Hoàng Anh Tú",
    avatar: "HA",
    date: "5 tháng 7, 2025",
    content: "Bạn đã test load balancing strategy nào hiệu quả nhất? Round-robin hay weighted? Hệ thống của mình đang có traffic không đều giữa các service instances.",
    likes: 12,
    replies: [
      {
        id: 41,
        author: "Nguyễn Văn Dev",
        avatar: "NV",
        date: "5 tháng 7, 2025",
        content: "Với traffic không đều, mình recommend Least Connections hoặc Weighted Round Robin. Kubernetes Ingress NGINX hỗ trợ cả hai. Tùy vào resource profile của từng instance mà chọn weight phù hợp.",
        likes: 9,
      },
    ],
  },
];

const ALL_TAGS = ["Tất cả", "Node.js", "React", "TypeScript", "PostgreSQL", "Kubernetes", "DevOps", "Frontend", "Backend", "Performance", "Next.js"];

// ─── Shared Components ────────────────────────────────────────────────────────

function TagBadge({ tag, active, onClick }: { tag: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-accent"
      }`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {tag}
    </button>
  );
}

function Avatar({ initials, size = "md", src }: { initials: string; size?: "sm" | "md" | "lg"; src?: string }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  if (src) {
    return <img src={src} alt={initials} className={`${sizes[size]} rounded-full object-cover`} />;
  }
  return (
    <div className={`${sizes[size]} rounded-full bg-primary/20 text-accent font-semibold flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────

function LoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess?: (role: 'admin' | 'user') => void }) {
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
      
      const token = localStorage.getItem('accessToken');
      let role: 'admin' | 'user' = 'user';
      if (token) {
        const decoded = parseJwt(token);
        const roleClaim = decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded?.['role'];
        if (roleClaim === 'Admin' || (Array.isArray(roleClaim) && roleClaim.includes('Admin'))) {
          role = 'admin';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(15,35,24,0.55)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>Đăng nhập</h2>
              <p className="text-xs text-muted-foreground">DevLog · Tài khoản cá nhân</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
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

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({
  page, setPage, user, onLogin, onLogout,
}: {
  page: Page;
  setPage: (p: Page) => void;
  user: AuthUser | null;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const baseLinks: { label: string; page: Page; icon: JSX.Element }[] = [
    { label: "Blog", page: "home", icon: <Home className="w-4 h-4" /> },
    { label: "About Me", page: "about", icon: <Info className="w-4 h-4" /> },
    { label: "Profile", page: "profile", icon: <User className="w-4 h-4" /> },
  ];

  const adminLink = { label: "Admin", page: "admin" as Page, icon: <Settings className="w-4 h-4" /> };
  const links = user?.role === "admin" ? [...baseLinks, adminLink] : baseLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-xl" style={{ background: "rgba(240,250,244,0.92)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => setPage("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            DevLog<span className="text-primary">.</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => setPage(l.page)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                page === l.page
                  ? "bg-primary/15 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.icon}
              {l.label}
              {l.label === "Admin" && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-accent" style={{ fontFamily: "var(--font-mono)" }}>
                  ADM
                </span>
              )}
            </button>
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
                    user.userName.substring(0, 2).toUpperCase()
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
                    <button onClick={() => { setPage("profile"); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                      <User className="w-4 h-4" /> Trang cá nhân
                    </button>
                    {user.role === "admin" && (
                      <button onClick={() => { setPage("admin"); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                        <Settings className="w-4 h-4" /> Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => { onLogout(); setUserMenuOpen(false); }}
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
            <button
              key={l.page}
              onClick={() => { setPage(l.page); setMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                page === l.page ? "bg-primary/15 text-accent" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {l.icon} {l.label}
            </button>
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

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, onRead }: { post: BlogPost; onRead: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
      <div className="relative h-48 overflow-hidden bg-secondary">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
        <h2
          className="text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors line-clamp-2 cursor-pointer"
          style={{ fontFamily: "var(--font-display)" }}
          onClick={onRead}
        >
          {post.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 transition-colors ${liked ? "text-red-400" : "hover:text-red-400"}`}
            >
              <Heart className={`w-3 h-3 ${liked ? "fill-red-400" : ""}`} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{post.comments}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar initials="NV" size="sm" />
            <div>
              <p className="text-xs font-medium text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <button
            onClick={onRead}
            className="flex items-center gap-1 text-xs text-accent hover:gap-2 transition-all"
          >
            Đọc bài <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onReadPost }: { onReadPost: () => void }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("Tất cả");
  const featured = POSTS[0];

  const filtered = POSTS.filter((p) => {
    const matchTag = activeTag === "Tất cả" || p.tags.includes(activeTag);
    const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-accent text-sm mb-6">
          <Zap className="w-4 h-4" />
          Chia sẻ kiến thức lập trình & công nghệ
        </div>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Mỗi dòng code là một<br />
          <em className="text-primary not-italic">câu chuyện</em> để kể
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Blog cá nhân về lập trình, kiến trúc phần mềm, và trải nghiệm thực tế từ các dự án thực tế.
        </p>
      </div>

      {/* Featured */}
      <div
        className="relative rounded-3xl overflow-hidden mb-14 cursor-pointer group"
        onClick={onReadPost}
      >
        <div className="relative h-80 sm:h-96">
          <img
            src={featured.cover}
            alt={featured.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/60 to-transparent" />
        </div>
        <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end sm:justify-center sm:max-w-xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary text-xs font-medium text-white">Featured</span>
            {featured.tags.slice(0, 2).map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {featured.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-5 line-clamp-2">{featured.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{featured.views.toLocaleString()} lượt xem</span>
            <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-400" />{featured.likes}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.slice(0, 7).map((t) => (
            <TagBadge key={t} tag={t} active={activeTag === t} onClick={() => setActiveTag(t)} />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} onRead={onReadPost} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Không tìm thấy bài viết phù hợp</p>
        </div>
      )}
    </div>
  );
}

// ─── Blog Detail Page ─────────────────────────────────────────────────────────

function CommentItem({ comment }: { comment: Comment }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar initials={comment.avatar} size="md" />
        <div className="flex-1">
          <div className="bg-secondary rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-foreground">{comment.author}</span>
              <span className="text-xs text-muted-foreground">{comment.date}</span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2 ml-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-accent" : "text-muted-foreground hover:text-accent"}`}
            >
              <ThumbsUp className="w-3 h-3" />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
            >
              <Reply className="w-3 h-3" />
              Phản hồi
            </button>
            {comment.replies.length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-accent"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
                {expanded ? "Ẩn" : `${comment.replies.length} phản hồi`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {expanded && comment.replies.length > 0 && (
        <div className="ml-14 space-y-3">
          {comment.replies.map((r) => (
            <div key={r.id} className="flex gap-3">
              <Avatar initials={r.avatar} size="sm" />
              <div className="flex-1">
                <div className="bg-muted rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold text-xs ${r.author === "Nguyễn Văn Dev" ? "text-accent" : "text-foreground"}`}>
                      {r.author} {r.author === "Nguyễn Văn Dev" && "• Tác giả"}
                    </span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-sm text-foreground/90">{r.content}</p>
                </div>
                <div className="flex items-center gap-3 mt-1.5 ml-2">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
                    <ThumbsUp className="w-3 h-3" />{r.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReply && (
        <div className="ml-14 flex gap-3">
          <Avatar initials="ME" size="sm" />
          <div className="flex-1 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Viết phản hồi..."
              className="flex-1 px-4 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
            <button
              onClick={() => { setReplyText(""); setShowReply(false); }}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm hover:bg-primary/90 transition-colors flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogDetailPage({ onBack }: { onBack: () => void }) {
  const post = POSTS[0];
  const [comment, setComment] = useState("");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        ← Quay lại Blog
      </button>

      {/* Cover */}
      <div className="rounded-3xl overflow-hidden h-64 sm:h-80 mb-10 bg-secondary">
        <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {post.tags.map((t) => <TagBadge key={t} tag={t} />)}
      </div>

      <h1
        className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-border mb-10">
        <div className="flex items-center gap-3">
          <Avatar initials="NV" size="md" />
          <div>
            <p className="text-sm font-semibold text-foreground">{post.author}</p>
            <p className="text-xs text-muted-foreground">Full Stack Developer</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
          <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{post.views.toLocaleString()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-12 space-y-6">
        <p className="text-foreground/90 text-lg leading-relaxed">{post.excerpt}</p>
        <p className="text-foreground/80 leading-relaxed">
          Microservices architecture đã trở thành chuẩn mực trong phát triển phần mềm hiện đại. Trong bài viết này, tôi sẽ chia sẻ kinh nghiệm thực tế xây dựng hệ thống microservices cho ứng dụng thương mại điện tử với hàng triệu người dùng.
        </p>
        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Tại sao chọn Microservices?
        </h2>
        <p className="text-foreground/80 leading-relaxed">
          Monolithic architecture đã phục vụ chúng ta tốt trong nhiều năm, nhưng khi ứng dụng phát triển lớn hơn, chúng ta bắt đầu gặp phải những hạn chế về khả năng mở rộng và deployment independence. Mỗi deploy cần toàn bộ application restart, team lớn conflict code liên tục, và scaling chỉ có thể theo chiều dọc.
        </p>
        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Thiết kế Service Boundaries
        </h2>
        <p className="text-foreground/80 leading-relaxed">
          Nguyên tắc đầu tiên khi thiết kế microservices là xác định bounded contexts dựa trên domain model. Mỗi service nên có single responsibility và data ownership rõ ràng. Đừng chia service quá nhỏ — "nano-services" là một anti-pattern phổ biến.
        </p>
        <div
          className="rounded-xl p-5 border border-border overflow-x-auto"
          style={{ background: "#1a2e22", fontFamily: "var(--font-mono)" }}
        >
          <pre className="text-sm text-green-400/90 whitespace-pre">{`// User Service
const userService = {
  endpoint: '/api/users',
  database: 'users_db',
  events: ['user.created', 'user.updated']
}

// Order Service
const orderService = {
  endpoint: '/api/orders',
  database: 'orders_db',
  events: ['order.placed', 'order.fulfilled']
}`}</pre>
        </div>
        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Kubernetes Deployment Strategy
        </h2>
        <p className="text-foreground/80 leading-relaxed">
          Kubernetes giúp chúng ta quản lý container orchestration một cách hiệu quả với auto-scaling, rolling updates và self-healing capabilities. Với HPA (Horizontal Pod Autoscaler), system tự động scale up khi CPU vượt 70% và scale down khi traffic giảm.
        </p>
      </div>

      {/* Reactions */}
      <div className="flex items-center gap-4 py-6 border-y border-border mb-10">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/10 text-foreground transition-all">
          <Heart className="w-4 h-4" /> {post.likes} Thích
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/10 text-foreground transition-all">
          <MessageSquare className="w-4 h-4" /> {post.comments} Bình luận
        </button>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="w-4 h-4" />
          Chia sẻ bài viết
        </div>
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Bình luận ({COMMENTS.length})
        </h3>

        {/* New comment */}
        <div className="flex gap-4 mb-8">
          <Avatar initials="ME" size="md" />
          <div className="flex-1">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ suy nghĩ của bạn..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none transition-colors"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setComment("")}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" /> Gửi bình luận
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {COMMENTS.map((c) => <CommentItem key={c.id} comment={c} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

function ProfilePage() {
  const stats = [
    { label: "Bài viết", value: "42" },
    { label: "Lượt xem", value: "148K" },
    { label: "Người theo dõi", value: "2.3K" },
    { label: "Bình luận", value: "1.2K" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Profile Header */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden mb-8">
        <div className="h-40 relative" style={{ background: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #059669 100%)" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #16a34a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4ade80 0%, transparent 40%)" }} />
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 mb-6">
            <div className="w-24 h-24 rounded-2xl border-4 border-card bg-primary/20 flex items-center justify-center text-2xl font-bold text-accent shadow-xl" style={{ fontFamily: "var(--font-display)" }}>
              NV
            </div>
            <div className="sm:mb-2 flex-1">
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Nguyễn Văn Dev
              </h1>
              <p className="text-muted-foreground text-sm">Full Stack Developer · Ho Chi Minh City, Vietnam</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                Theo dõi
              </button>
              <button className="px-5 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors">
                Nhắn tin
              </button>
            </div>
          </div>

          <p className="text-foreground/80 text-sm leading-relaxed max-w-2xl mb-6">
            Full Stack Developer với 5+ năm kinh nghiệm. Đam mê xây dựng hệ thống scalable và chia sẻ kiến thức với cộng đồng developer Việt Nam. Hiện đang làm việc tại một startup fintech.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" />nguyenvandev.io</span>
            <span className="flex items-center gap-2"><Github className="w-4 h-4" />@nguyenvandev</span>
            <span className="flex items-center gap-2"><Twitter className="w-4 h-4" />@nvdev</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" />dev@example.com</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl bg-secondary">
                <p className="text-2xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <h2 className="text-xl font-bold text-foreground mb-5" style={{ fontFamily: "var(--font-display)" }}>
        Bài viết gần đây
      </h2>
      <div className="space-y-4">
        {POSTS.slice(0, 4).map((post) => (
          <div key={post.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
            <img src={post.cover} alt={post.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1 mb-1">
                {post.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-xs text-accent" style={{ fontFamily: "var(--font-mono)" }}>#{t}</span>
                ))}
              </div>
              <p className="text-sm font-semibold text-foreground line-clamp-1 mb-1">{post.title}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "posts" | "comments">("overview");

  const adminStats = [
    { label: "Tổng bài viết", value: "42", icon: <FileText className="w-5 h-5" />, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Tổng lượt xem", value: "148K", icon: <Eye className="w-5 h-5" />, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Người dùng", value: "2.3K", icon: <Users className="w-5 h-5" />, color: "text-violet-400", bg: "bg-violet-400/10" },
    { label: "Bình luận", value: "1.2K", icon: <MessageSquare className="w-5 h-5" />, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  const recentActivity = [
    { type: "comment", text: "Trần Minh Khoa bình luận bài 'Microservices với Node.js'", time: "5 phút trước", icon: <MessageSquare className="w-4 h-4 text-blue-400" /> },
    { type: "view", text: "Bài 'PostgreSQL Performance' đạt 5.000 lượt xem", time: "1 giờ trước", icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
    { type: "like", text: "25 người thích bài 'React Server Components'", time: "3 giờ trước", icon: <Heart className="w-4 h-4 text-red-400" /> },
    { type: "follower", text: "12 người mới theo dõi blog", time: "5 giờ trước", icon: <Users className="w-4 h-4 text-violet-400" /> },
  ];

  const tabs = [
    { id: "overview" as const, label: "Tổng quan", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "posts" as const, label: "Bài viết", icon: <FileText className="w-4 h-4" /> },
    { id: "comments" as const, label: "Bình luận", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Quản lý nội dung và theo dõi thống kê</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <Avatar initials="NV" size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Nguyễn Văn Dev</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-card rounded-xl p-1 border border-border w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {adminStats.map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-card border border-border">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4 ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top posts */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" /> Bài viết nổi bật
              </h3>
              <div className="space-y-4">
                {POSTS.slice(0, 5).map((post, i) => (
                  <div key={post.id} className="flex items-center gap-4">
                    <span className="w-6 text-center text-sm font-bold" style={{ color: i < 3 ? "#6366f1" : "#7a8aaa" }}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-foreground">{post.views.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">lượt xem</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> Hoạt động gần đây
              </h3>
              <div className="space-y-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      {a.icon}
                    </div>
                    <div>
                      <p className="text-xs text-foreground/80 leading-snug">{a.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "posts" && (
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Tất cả bài viết ({POSTS.length})</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" /> Viết bài mới
            </button>
          </div>
          <div className="divide-y divide-border">
            {POSTS.map((post) => (
              <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors">
                <img src={post.cover} alt={post.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-xs text-accent" style={{ fontFamily: "var(--font-mono)" }}>#{t}</span>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-xs text-muted-foreground flex-shrink-0">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{post.comments}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Xuất bản
                  </span>
                  <button className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-accent transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "comments" && (
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Bình luận gần đây</h3>
          </div>
          <div className="divide-y divide-border">
            {COMMENTS.flatMap((c) => [
              { ...c, postTitle: POSTS[0].title, type: "comment" },
              ...c.replies.map((r) => ({ ...r, postTitle: POSTS[0].title, type: "reply", replies: [] })),
            ]).map((item, i) => (
              <div key={i} className="flex gap-4 p-4 hover:bg-secondary/50 transition-colors">
                <Avatar initials={item.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{item.author}</span>
                    {item.type === "reply" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-accent">Phản hồi</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-1">Bài: {item.postTitle}</p>
                  <p className="text-sm text-foreground/80 line-clamp-2">{item.content}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-emerald-400/10 text-muted-foreground hover:text-emerald-400 transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── About Me Page ────────────────────────────────────────────────────────────

const SKILLS = [
  { category: "Frontend", icon: <Monitor className="w-5 h-5" />, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Redux"] },
  { category: "Backend", icon: <Cpu className="w-5 h-5" />, items: ["Node.js", "Express", "NestJS", "Python", "Django", "GraphQL"] },
  { category: "Database", icon: <Database className="w-5 h-5" />, items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", "Prisma"] },
  { category: "DevOps & Cloud", icon: <Layers className="w-5 h-5" />, items: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform", "Nginx"] },
];

const PROJECTS = [
  {
    name: "EduFlow LMS",
    desc: "Nền tảng học trực tuyến với 50,000+ học viên. Hệ thống real-time quiz, video streaming, và AI-powered recommendations.",
    tags: ["React", "Node.js", "PostgreSQL", "WebRTC"],
    stars: 842,
    status: "Production",
    link: "#",
    cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop&auto=format",
  },
  {
    name: "PayFlow Fintech",
    desc: "Ứng dụng thanh toán P2P với xử lý giao dịch real-time, tích hợp VNPay và Momo API, compliance PCI-DSS.",
    tags: ["Next.js", "NestJS", "Redis", "Kafka"],
    stars: 634,
    status: "Production",
    link: "#",
    cover: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&auto=format",
  },
  {
    name: "DevLog CMS",
    desc: "Headless CMS dành cho developers với Markdown editor, custom fields, và REST/GraphQL API dual support.",
    tags: ["TypeScript", "GraphQL", "MongoDB", "Docker"],
    stars: 1.2,
    status: "Open Source",
    link: "#",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop&auto=format",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Full Stack Developer",
    company: "TechViet Fintech",
    period: "03/2023 — Hiện tại",
    desc: "Phát triển core banking platform phục vụ 2M+ users. Lead team 5 engineers, thiết kế microservices architecture.",
    techs: ["React", "NestJS", "PostgreSQL", "Kubernetes"],
  },
  {
    role: "Full Stack Developer",
    company: "GreenTech Solutions",
    period: "06/2021 — 02/2023",
    desc: "Xây dựng SaaS platform quản lý chuỗi cung ứng cho 200+ doanh nghiệp vừa và nhỏ tại Việt Nam.",
    techs: ["Vue.js", "Node.js", "MongoDB", "Docker"],
  },
  {
    role: "Frontend Developer",
    company: "Sapo Technologies",
    period: "08/2019 — 05/2021",
    desc: "Phát triển merchant dashboard và mobile-first POS interface cho hệ sinh thái thương mại điện tử Sapo.",
    techs: ["React", "Redux", "TypeScript", "Ant Design"],
  },
];

function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16 items-center">
        <div className="lg:col-span-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-accent text-sm mb-6">
            <Globe className="w-4 h-4" /> Ho Chi Minh City, Vietnam
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Xin chào, tôi là<br />
            <span className="text-primary">Nguyễn Văn Dev</span>
          </h1>
          <p className="text-foreground/80 text-lg leading-relaxed mb-6">
            Full Stack Developer với 5+ năm kinh nghiệm xây dựng sản phẩm từ 0 đến 1 và scale từ startup đến enterprise. Đam mê kiến trúc phần mềm, open source, và chia sẻ kiến thức với cộng đồng.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              <Mail className="w-4 h-4" /> Liên hệ ngay
            </a>
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors">
              <Github className="w-4 h-4" /> GitHub Profile
            </a>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format"
                alt="Nguyễn Văn Dev"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 p-4 rounded-2xl bg-card border border-border shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Sẵn sàng nhận dự án</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Công nghệ & Kỹ năng
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Các công nghệ tôi sử dụng hàng ngày trong công việc</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SKILLS.map((cat) => (
            <div key={cat.category} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/15 text-accent flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-foreground">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium text-foreground/80 border border-border hover:border-primary/30 hover:text-accent transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Dự án nổi bật
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Một số sản phẩm tôi đã xây dựng và đóng góp</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((proj) => (
            <div key={proj.name} className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 group">
              <div className="h-36 overflow-hidden bg-secondary">
                <img src={proj.cover} alt={proj.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground">{proj.name}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${
                    proj.status === "Open Source" ? "bg-violet-400/10 text-violet-400" : "bg-emerald-400/10 text-emerald-400"
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{proj.desc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{typeof proj.stars === "number" && proj.stars > 100 ? `${proj.stars}` : `${proj.stars}K`}</span>
                  </div>
                  <a href={proj.link} className="flex items-center gap-1 text-xs text-accent hover:gap-2 transition-all">
                    Xem dự án <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Kinh nghiệm làm việc
        </h2>
        <p className="text-muted-foreground text-sm mb-10">Hành trình 5+ năm trong ngành phần mềm</p>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="relative flex gap-6">
                <div className="relative z-10 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-bold text-foreground">{exp.role}</h3>
                      <p className="text-accent text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-secondary border border-border" style={{ fontFamily: "var(--font-mono)" }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed mb-3">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.techs.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-accent border border-primary/20" style={{ fontFamily: "var(--font-mono)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, #16a34a 0%, #059669 100%)" }}>
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Có dự án muốn hợp tác?
        </h2>
        <p className="text-white/80 mb-7">Tôi luôn sẵn sàng lắng nghe và cùng nhau xây dựng những điều tuyệt vời.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:dev@example.com" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-medium hover:bg-white/90 transition-colors">
            <Mail className="w-4 h-4" /> dev@example.com
          </a>
          <div className="flex items-center gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="border-t border-border mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => setPage("home")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-foreground text-sm" style={{ fontFamily: "var(--font-display)" }}>
              DevLog<span className="text-primary">.</span>
            </span>
          </button>
          <p className="text-xs text-muted-foreground">
            © 2025 Nguyễn Văn Dev · Made with React & love
          </p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Admin Guard ──────────────────────────────────────────────────────────────

function AdminGuard({ onLogin }: { onLogin: () => void }) {
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

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleReadPost = () => setPage("blog-detail");
  const handleBackToHome = () => setPage("home");

  const handleLogout = () => {
    logout();
    if (page === "admin") setPage("home");
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar
        page={page}
        setPage={setPage}
        user={user}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
      <main>
        {page === "home" && <HomePage onReadPost={handleReadPost} />}
        {page === "blog-detail" && <BlogDetailPage onBack={handleBackToHome} />}
        {page === "profile" && <ProfilePage />}
        {page === "admin" && <AdminGuard onLogin={() => setShowLogin(true)} />}
        {page === "about" && <AboutPage />}
      </main>
      {page !== "admin" && <Footer setPage={setPage} />}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={(role) => {
            if (role === "admin") {
              setPage("admin");
            } else {
              setPage("profile");
            }
          }}
        />
      )}
    </div>
  );
}
