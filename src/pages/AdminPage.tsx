import React, { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  Users,
  MessageSquare,
  TrendingUp,
  Heart,
  BarChart3,
  Bell,
  Plus,
  CheckCircle2,
  Edit3,
  Trash2,
  Zap,
  X,
  Upload,
  Link as LinkIcon,
  AlertTriangle,
} from "lucide-react";
import api from "../services/api";
import Avatar from "../components/Avatar";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface AdminPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  createdAt: string;
  authorName: string;
  tags: Tag[];
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-") // Remove duplicate -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "posts">("posts");
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Input states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/blogs", {
        params: {
          pageSize: 100, // Load all for management
        },
      });
      const mapped = res.data.map((blog: any) => ({
        id: blog.id,
        title: blog.title || "",
        slug: blog.slug || "",
        summary: blog.summary || "",
        content: blog.content || "",
        coverImageUrl: blog.coverImageUrl || "",
        createdAt: new Date(blog.createdAt).toLocaleDateString("vi-VN"),
        authorName: blog.author?.username || "Ẩn danh",
        tags: blog.tags || [],
      }));
      setPosts(mapped);
    } catch (err) {
      console.error("Lỗi khi tải bài viết", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await api.get("/api/tags");
      setTags(res.data);
    } catch (err) {
      console.error("Lỗi khi tải tags", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingPostId) {
      // Auto generate slug during creation
      setSlug(slugify(val));
    }
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("Dung lượng ảnh tối đa là 5MB.");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/upload/image", formData);
      setCoverImageUrl(res.data.url || res.data.Url);
    } catch (err) {
      console.error("Lỗi tải ảnh lên", err);
      alert("Tải ảnh bìa lên thất bại.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOpenCreateForm = () => {
    setEditingPostId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setCoverImageUrl("");
    setSelectedTagIds([]);
    setErrorMsg("");
    setShowForm(true);
  };

  const handleOpenEditForm = (post: AdminPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setSummary(post.summary);
    setContent(post.content);
    setCoverImageUrl(post.coverImageUrl);
    setSelectedTagIds(post.tags.map((t) => t.id));
    setErrorMsg("");
    setShowForm(true);
  };

  const handleToggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setFormLoading(true);

    const payload = {
      title,
      slug,
      summary,
      content,
      coverImageUrl,
      tagIds: selectedTagIds,
    };

    try {
      if (editingPostId) {
        await api.put(`/api/blogs/${editingPostId}`, payload);
      } else {
        await api.post("/api/blogs", payload);
      }
      setShowForm(false);
      await fetchPosts();
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Lưu bài viết thất bại. Hãy kiểm tra các ràng buộc thông tin."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" không?`)) return;

    try {
      await api.delete(`/api/blogs/${id}`);
      await fetchPosts();
    } catch (err: any) {
      alert("Xóa bài viết thất bại.");
    }
  };

  // Stats calculation
  const totalPostsCount = posts.length;
  const adminStats = [
    { label: "Tổng bài viết", value: totalPostsCount.toString(), icon: <FileText className="w-5 h-5" />, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Nhãn tags", value: tags.length.toString(), icon: <TrendingUp className="w-5 h-5" />, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Tổng lượt xem", value: "148K (Mock)", icon: <Eye className="w-5 h-5" />, color: "text-violet-400", bg: "bg-violet-400/10" },
    { label: "Bình luận", value: "1.2K (Mock)", icon: <MessageSquare className="w-5 h-5" />, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  const tabs = [
    { id: "overview" as const, label: "Tổng quan", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "posts" as const, label: "Bài viết", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Quản lý nội dung và theo dõi thống kê hệ thống</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <Avatar initials="AD" size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Admin Account</p>
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
                <TrendingUp className="w-4 h-4 text-accent" /> Bài viết gần đây
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 5).map((post, i) => (
                  <div key={post.id} className="flex items-center gap-4">
                    <span className="w-6 text-center text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.createdAt} · {post.authorName}</p>
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
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>· Bài viết mới nhất vừa cập nhật.</p>
                <p>· Tín hiệu kết nối cơ sở dữ liệu ổn định.</p>
                <p>· Trạng thái caching Redis bình thường.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "posts" && (
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Tất cả bài viết ({posts.length})</h3>
            <button
              onClick={handleOpenCreateForm}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> Viết bài mới
            </button>
          </div>
          {loading && posts.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block mr-2 align-middle" />
              Đang tải danh sách bài viết...
            </div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Chưa có bài viết nào trong cơ sở dữ liệu.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors">
                  <img
                    src={post.coverImageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85"}
                    alt={post.title}
                    className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">{post.createdAt} · {post.authorName}</span>
                      {post.tags.map((t) => (
                        <span key={t.id} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-accent">
                          #{t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleOpenEditForm(post)}
                      className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-accent transition-colors"
                      title="Sửa bài"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="p-2 rounded-lg hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors"
                      title="Xóa bài"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editor Modal overlay */}
      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(15,35,24,0.55)", backdropFilter: "blur(8px)" }}
        >
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {editingPostId ? "Chỉnh sửa bài viết" : "Viết bài mới"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 text-sm text-red-400 p-3 rounded-xl bg-red-400/10 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tiêu đề bài viết</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Nhập tiêu đề hấp dẫn..."
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Đường dẫn tĩnh (Slug)</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="vi-du-tieu-de-bai-viet"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tóm tắt ngắn (Summary)</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Nhập nội dung tóm tắt xem trước..."
                  rows={2}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ảnh bìa (Cover Image)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                  />
                  <label className="flex items-center gap-2 px-4 py-3 bg-primary text-white text-xs font-semibold rounded-xl cursor-pointer hover:bg-primary/90 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingImage ? "Đang tải..." : "Tải ảnh lên"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadCover}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {coverImageUrl && (
                  <img
                    src={coverImageUrl}
                    alt="Cover preview"
                    className="mt-3 w-40 h-24 object-cover rounded-xl border border-border"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Chọn nhãn (Tags)</label>
                <div className="flex flex-wrap gap-2 p-3 bg-secondary rounded-xl border border-border">
                  {tags.map((t) => {
                    const checked = selectedTagIds.includes(t.id);
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => handleToggleTag(t.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          checked
                            ? "bg-primary/20 border-primary text-accent"
                            : "bg-card border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {checked ? "✓ " : ""}#{t.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nội dung bài viết (Markdown/HTML)</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết nội dung bài viết ở đây..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors resize-y"
                />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={formLoading || uploadingImage}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center gap-1.5"
                >
                  {formLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  {formLoading ? "Đang lưu..." : "Lưu bài viết"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
