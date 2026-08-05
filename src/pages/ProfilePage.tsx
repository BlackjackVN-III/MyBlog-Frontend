import React, { useState, useEffect } from "react";
import { User, AlertTriangle, CheckCircle2, Globe, Github, Mail, Eye, Heart } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loadingBio, setLoadingBio] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [posts, setPosts] = useState<any[]>([]);

  // Đồng bộ lại Bio khi user thay đổi
  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      // Tải các bài viết của chính user này
      const fetchUserPosts = async () => {
        try {
          const res = await api.get("/api/blogs", {
            params: {
              search: user.userName,
              pageSize: 4,
            },
          });
          setPosts(res.data);
        } catch (err) {
          console.error("Lỗi tải bài viết cá nhân", err);
        }
      };
      fetchUserPosts();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-6">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Trang cá nhân
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Vui lòng đăng nhập để xem và quản lý thông tin tài khoản của bạn.
        </p>
      </div>
    );
  }

  const handleUpdateBio = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoadingBio(true);
    try {
      await api.put("/api/profile", { bio });
      updateUser({ bio });
      setSuccessMsg("Cập nhật phần giới thiệu thành công!");
      setIsEditing(false);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.response?.data?.Message || "Cập nhật thất bại.");
    } finally {
      setLoadingBio(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoadingPassword(true);
    try {
      await api.put("/api/profile/change-password", { currentPassword, newPassword });
      setSuccessMsg("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.response?.data?.Message || "Đổi mật khẩu thất bại.");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate client-side
    if (file.size > 5 * 1024 * 1024) {
      alert("Dung lượng ảnh vượt quá 5MB.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Định dạng file không được hỗ trợ (chỉ nhận JPG, JPEG, PNG, GIF, WEBP).");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoadingAvatar(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newAvatarUrl = res.data.avatarUrl;
      updateUser({ avatarUrl: newAvatarUrl });
      setSuccessMsg("Cập nhật ảnh đại diện thành công!");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.response?.data?.Message || "Tải ảnh lên thất bại.");
    } finally {
      setLoadingAvatar(false);
    }
  };

  const stats = [
    { label: "Bài viết", value: posts.length.toString() },
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
            <div className="relative group w-24 h-24 rounded-2xl border-4 border-card bg-primary/20 flex items-center justify-center text-2xl font-bold text-accent shadow-xl overflow-hidden">
              {loadingAvatar ? (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.userName} className="w-full h-full object-cover" />
              ) : (
                (user.userName || user.email || 'U').substring(0, 2).toUpperCase()
              )}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] text-white font-medium">
                Thay đổi
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={loadingAvatar} />
              </label>
            </div>
            <div className="sm:mb-2 flex-1">
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {user.userName}
              </h1>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa Bio"}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 text-sm text-red-400 p-3 rounded-xl bg-red-400/10 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 text-sm text-emerald-400 p-3 rounded-xl bg-emerald-400/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {successMsg}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleUpdateBio} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Giới thiệu bản thân (Bio)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Viết vài dòng giới thiệu ngắn về bạn..."
                  maxLength={500}
                  className="w-full min-h-[100px] px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
                />
                <p className="text-right text-[10px] text-muted-foreground mt-1">{bio.length}/500 ký tự</p>
              </div>
              <button
                type="submit"
                disabled={loadingBio}
                className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {loadingBio ? "Đang lưu..." : "Lưu Bio"}
              </button>
            </form>
          ) : (
            <p className="text-foreground/80 text-sm leading-relaxed max-w-2xl mb-6">
              {user.bio || "Chưa có giới thiệu bản thân. Hãy thêm bio để giới thiệu về mình."}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" />nguyenvandev.io (Mock)</span>
            <span className="flex items-center gap-2"><Github className="w-4 h-4" />@username (Mock)</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" />{user.email}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl bg-secondary">
                <p className="text-2xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>{s.value} {s.label === "Bài viết" ? "" : "(Mock)"}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="rounded-3xl border border-border bg-card p-8 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Đổi mật khẩu
        </h2>
        <p className="text-xs text-muted-foreground mb-6">Mật khẩu mới yêu cầu độ dài từ 12 ký tự trở lên.</p>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu cũ</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loadingPassword}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {loadingPassword ? "Đang đổi mật khẩu..." : "Cập nhật mật khẩu"}
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-foreground mb-5" style={{ fontFamily: "var(--font-display)" }}>
            Bài viết của tôi
          </h2>
          <div className="space-y-4">
            {posts.map((post) => {
              const formattedDate = new Date(post.createdAt).toLocaleDateString("vi-VN");
              return (
                <div key={post.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                  <img src={post.coverImageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85"} alt={post.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1 mb-1">
                      {(post.tags || []).map((t: any) => (
                        <span key={t.slug} className="text-xs text-accent" style={{ fontFamily: "var(--font-mono)" }}>#{t.name}</span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-foreground line-clamp-1 mb-1">{post.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
