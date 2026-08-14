import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  Reply,
  ChevronDown,
  Send,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Globe,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useSignalR } from "../context/SignalRContext";
import Avatar from "../components/Avatar";
import TagBadge from "../components/TagBadge";

interface FrontendComment {
  id: string;
  author: string;
  avatar: string;
  avatarUrl?: string;
  date: string;
  content: string;
  likes: number;
  replies: FrontendComment[];
  parentCommentId?: string | null;
}

const buildCommentTree = (
  flatComments: any[],
  currentUsername?: string,
  currentUserAvatar?: string
): FrontendComment[] => {
  const commentMap: { [key: string]: FrontendComment } = {};

  flatComments.forEach((c) => {
    const authorName = c.user?.username || "Ẩn danh";
    const isSelf =
      currentUsername && authorName.toLowerCase() === currentUsername.toLowerCase();
    commentMap[c.id] = {
      id: c.id,
      author: authorName,
      avatar: authorName.substring(0, 2).toUpperCase(),
      avatarUrl: isSelf ? currentUserAvatar : (c.user?.avatarUrl || ""),
      date:
        new Date(c.createdAt).toLocaleDateString("vi-VN") +
        " " +
        new Date(c.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      content: c.content,
      likes: 0,
      replies: [],
      parentCommentId: c.parentCommentId,
    };
  });

  const roots: FrontendComment[] = [];

  flatComments.forEach((c) => {
    const mapped = commentMap[c.id];
    if (c.parentCommentId && commentMap[c.parentCommentId]) {
      commentMap[c.parentCommentId].replies.push(mapped);
    } else {
      roots.push(mapped);
    }
  });

  return roots;
};

function CommentItem({
  comment,
  onReload,
  postId,
}: {
  comment: FrontendComment;
  onReload: () => void;
  postId: string;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSendReply = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để phản hồi.");
      return;
    }
    if (!replyText.trim()) return;
    setLoading(true);
    try {
      await api.post("/api/comments", {
        postId,
        content: replyText,
        parentCommentId: comment.id,
      });
      setReplyText("");
      setShowReply(false);
      onReload();
    } catch (err) {
      console.error("Lỗi gửi phản hồi", err);
      alert("Gửi phản hồi thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar initials={comment.avatar} size="md" src={comment.avatarUrl} />
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
              className={`flex items-center gap-1 text-xs transition-colors ${
                liked ? "text-accent" : "text-muted-foreground hover:text-accent"
              }`}
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
              <Avatar initials={r.avatar} size="sm" src={r.avatarUrl} />
              <div className="flex-1">
                <div className="bg-muted rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-foreground">{r.author}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-sm text-foreground/90">{r.content}</p>
                </div>
                <div className="flex items-center gap-3 mt-1.5 ml-2">
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {r.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReply && (
        <div className="ml-14 flex gap-3">
          <Avatar
            initials={(user?.userName || "U").substring(0, 2).toUpperCase()}
            size="sm"
            src={user?.avatarUrl}
          />
          <div className="flex-1 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Viết phản hồi..."
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
            <button
              onClick={handleSendReply}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm hover:bg-primary/90 transition-colors flex items-center gap-1 disabled:opacity-60"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogDetailPage({
  postId,
  onBack,
}: {
  postId: string;
  onBack: () => void;
}) {
  const [post, setPost] = useState<any | null>(null);
  const [comments, setComments] = useState<FrontendComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const { user } = useAuth();
  const { connection, joinBlogGroup, leaveBlogGroup } = useSignalR();

  const fetchPostDetails = async () => {
    setLoading(true);
    try {
      const postRes = await api.get(`/api/blogs/${postId}`);
      setPost(postRes.data);
      await fetchComments();
    } catch (err) {
      console.error("Lỗi khi tải chi tiết bài viết", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsRes = await api.get(`/api/comments/post/${postId}`);
      const tree = buildCommentTree(commentsRes.data, user?.userName, user?.avatarUrl);
      setComments(tree);
    } catch (err) {
      console.error("Lỗi khi tải bình luận", err);
    }
  };

  // Join post hub group and listen for live comments
  useEffect(() => {
    if (postId && connection) {
      joinBlogGroup(postId);

      connection.on("ReceiveNewComment", (username: string, content: string) => {
        console.log("ReceiveNewComment event triggered:", { username, content });
        fetchComments();
      });

      return () => {
        connection.off("ReceiveNewComment");
        leaveBlogGroup(postId);
      };
    }
  }, [postId, connection]);

  useEffect(() => {
    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  useEffect(() => {
    if (!loading && post && typeof window !== "undefined" && (window as any).hljs) {
      setTimeout(() => {
        const blocks = document.querySelectorAll("pre code");
        blocks.forEach((block) => {
          (window as any).hljs.highlightElement(block);
        });
      }, 50);
    }
  }, [post, loading]);

  const handleSendComment = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để bình luận.");
      return;
    }
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      await api.post("/api/comments", {
        postId,
        content: newComment,
      });
      setNewComment("");
      await fetchComments();
    } catch (err) {
      console.error("Lỗi khi bình luận", err);
      alert("Bình luận thất bại.");
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin inline-block" />
        <p className="text-muted-foreground text-sm mt-4">Đang tải nội dung bài viết...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">Không tìm thấy bài viết</h2>
        <button onClick={onBack} className="text-primary hover:underline">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("vi-VN");
  const readTime = `${Math.ceil((post.content || "").split(/\s+/).length / 200)} phút đọc`;

  const authorName = post.author?.username || "";
  const isAuthorSelf = user && authorName.toLowerCase() === user.userName.toLowerCase();
  const authorAvatarUrl = isAuthorSelf ? user.avatarUrl : post.author?.avatarUrl;

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
        <img
          src={
            post.coverImageUrl ||
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85"
          }
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(post.tags || []).map((t: any) => (
          <TagBadge key={t.slug} tag={t.name} />
        ))}
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
          <Avatar
            initials={(post.author?.username || "U").substring(0, 2).toUpperCase()}
            size="md"
            src={authorAvatarUrl}
          />
          <div>
            <p className="text-sm font-semibold text-foreground">{post.author?.username || "Ẩn danh"}</p>
            <p className="text-xs text-muted-foreground">{post.author?.email || "Người viết bài"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="prose max-w-none mb-12 space-y-6 text-foreground/80 leading-relaxed text-base"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Reactions */}
      <div className="flex items-center gap-4 py-6 border-y border-border mb-10">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/10 text-foreground transition-all">
          <Heart className="w-4 h-4" /> 0 Thích
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/10 text-foreground transition-all">
          <MessageSquare className="w-4 h-4" /> {comments.length} Bình luận
        </button>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="w-4 h-4" />
          Chia sẻ bài viết
        </div>
      </div>

      {/* Comments */}
      <div>
        <h3
          className="text-xl font-bold text-foreground mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Bình luận ({comments.length})
        </h3>

        {/* New comment */}
        <div className="flex gap-4 mb-8">
          <Avatar
            initials={(user?.userName || "U").substring(0, 2).toUpperCase()}
            size="md"
            src={user?.avatarUrl}
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ suy nghĩ của bạn..."
              rows={3}
              disabled={submittingComment}
              className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none transition-colors"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSendComment}
                disabled={submittingComment}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                <Send className="w-4 h-4" /> {submittingComment ? "Đang gửi..." : "Gửi bình luận"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} onReload={fetchComments} postId={postId} />
          ))}
        </div>
      </div>
    </div>
  );
}
