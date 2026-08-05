import React, { useState } from "react";
import { Clock, Eye, Heart, MessageSquare, ArrowRight } from "lucide-react";
import { BlogPost } from "../types";
import TagBadge from "./TagBadge";
import Avatar from "./Avatar";

export default function PostCard({ post, onRead }: { post: BlogPost; onRead: (id: string | number) => void }) {
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
          onClick={() => onRead(post.id)}
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
            <Avatar initials={(post.author || "U").substring(0, 2).toUpperCase()} size="sm" src={post.authorAvatar} />
            <div>
              <p className="text-xs font-medium text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <button
            onClick={() => onRead(post.id)}
            className="flex items-center gap-1 text-xs text-accent hover:gap-2 transition-all"
          >
            Đọc bài <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
