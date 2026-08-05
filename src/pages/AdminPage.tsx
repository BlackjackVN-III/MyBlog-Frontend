import React, { useState } from "react";
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
} from "lucide-react";
import { POSTS, COMMENTS } from "../mock/data";
import Avatar from "../components/Avatar";

export default function AdminPage() {
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
