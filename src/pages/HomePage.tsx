import React, { useState, useEffect } from "react";
import { Zap, Search, Clock, Eye, Heart } from "lucide-react";
import api from "../services/api";
import { BlogPost } from "../types";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";

export default function HomePage({ onReadPost }: { onReadPost: (id: string | number) => void }) {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [activeTagSlug, setActiveTagSlug] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<{ name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("CreatedAt");
  const [isDecsending, setIsDecsending] = useState(true);

  const mapBlogToFrontend = (blog: any): BlogPost => {
    const authorName = blog.author?.username || "Ẩn danh";
    const isSelf = user && authorName.toLowerCase() === user.userName.toLowerCase();
    return {
      id: blog.id,
      title: blog.title || "",
      excerpt: blog.summary || "",
      content: blog.content || "",
      author: authorName,
      authorAvatar: isSelf ? user.avatarUrl : (blog.author?.avatarUrl || ""),
      date: new Date(blog.createdAt).toLocaleDateString("vi-VN"),
      readTime: `${Math.ceil((blog.content || "").split(/\s+/).length / 200)} phút đọc`,
      views: 0,
      likes: 0,
      comments: 0,
      cover: blog.coverImageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85",
      tags: (blog.tags || []).map((t: any) => t.name),
    };
  };

  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Load featured posts once on mount
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/api/blogs", {
          params: {
            pageNumber: 1,
            pageSize: 5,
          },
        });
        if (res.data && res.data.length > 0) {
          setFeaturedPosts(res.data.map(mapBlogToFrontend));
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết nổi bật", err);
      }
    };
    fetchFeatured();
  }, [user]);

  // Auto-slide featured posts every 5 seconds
  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredPosts]);

  // Load tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/api/tags");
        setTags(res.data);
      } catch (err) {
        console.error("Lỗi khi tải tags", err);
      }
    };
    fetchTags();
  }, []);

  // Load posts
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const res = await api.get("/api/blogs", {
            params: {
              search: query,
              tagSlug: activeTagSlug,
              sortBy,
              isDecsending,
              pageNumber,
              pageSize: 6,
            },
          });
          const mapped = res.data.map(mapBlogToFrontend);
          if (pageNumber === 1) {
            setPosts(mapped);
          } else {
            setPosts((prev) => [...prev, ...mapped]);
          }
          setHasMore(mapped.length === 6);
        } catch (err) {
          console.error("Lỗi tải bài viết", err);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, activeTagSlug, sortBy, isDecsending, pageNumber]);

  // Reset page number on filter changes
  useEffect(() => {
    setPageNumber(1);
  }, [query, activeTagSlug, sortBy, isDecsending]);

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
      {featuredPosts.length > 0 && (
        <div className="relative rounded-3xl overflow-hidden mb-14 cursor-pointer group">
          {/* Slide image wrapper */}
          <div
            className="relative h-80 sm:h-96"
            onClick={() => onReadPost(featuredPosts[currentSlide].id)}
          >
            <img
              key={`img-${currentSlide}`}
              src={featuredPosts[currentSlide].cover}
              alt={featuredPosts[currentSlide].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/60 to-transparent" />
          </div>

          {/* Slide content wrapper */}
          <div
            key={`content-${currentSlide}`}
            className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end sm:justify-center sm:max-w-xl pointer-events-none animate-fade-in"
          >
            <div className="inline-flex items-center gap-2 mb-4 pointer-events-auto">
              <span className="px-3 py-1 rounded-full bg-primary text-xs font-medium text-white">Featured</span>
              {featuredPosts[currentSlide].tags.slice(0, 2).map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight pointer-events-auto"
              style={{ fontFamily: "var(--font-display)" }}
              onClick={() => onReadPost(featuredPosts[currentSlide].id)}
            >
              {featuredPosts[currentSlide].title}
            </h2>
            <p className="text-muted-foreground text-sm mb-5 line-clamp-2">{featuredPosts[currentSlide].excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featuredPosts[currentSlide].readTime}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{featuredPosts[currentSlide].views.toLocaleString()} lượt xem</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-400" />{featuredPosts[currentSlide].likes}</span>
            </div>
          </div>

          {/* Dots Indicator */}
          {featuredPosts.length > 1 && (
            <div className="absolute bottom-6 right-8 flex gap-2 z-10">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  title={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

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
        <div className="flex flex-wrap gap-2 items-center">
          <TagBadge tag="Tất cả" active={activeTagSlug === ""} onClick={() => setActiveTagSlug("")} />
          {tags.map((t) => (
            <TagBadge key={t.slug} tag={t.name} active={activeTagSlug === t.slug} onClick={() => setActiveTagSlug(t.slug)} />
          ))}
        </div>
      </div>

      {loading && posts.length === 0 ? (
        <div className="py-24 text-center">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin inline-block" />
          <p className="text-muted-foreground text-sm mt-4">Đang tải bài viết...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Không tìm thấy bài viết phù hợp</p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onRead={onReadPost} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setPageNumber((prev) => prev + 1)}
                disabled={loading}
                className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary disabled:opacity-60 transition-colors"
              >
                {loading ? "Đang tải..." : "Tải thêm bài viết"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
