export type Page = "home" | "blog-detail" | "profile" | "admin" | "about";
export type Role = "admin" | "user";

export interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  cover: string;
  featured?: boolean;
}
