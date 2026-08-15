import React from "react";
import avatarImg from "../assets/avatar.png";
import {
  Monitor,
  Cpu,
  Database,
  Layers,
  Globe,
  Mail,
  Github,
  Star,
  ExternalLink,
  Briefcase,
} from "lucide-react";

const SKILLS = [
  { category: "Backend Developer", icon: <Cpu className="w-5 h-5" />, items: ["C#", ".NET Core API", "Entity Framework", "SQL Server", "CQRS / MediatR", "JWT Authentication"] },
  { category: "Frontend (Basic)", icon: <Monitor className="w-5 h-5" />, items: ["React", "Vite", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "TanStack Router"] },
  { category: "Caching & Message", icon: <Database className="w-5 h-5" />, items: ["Redis Cache", "SignalR Hub", "RESTful API"] },
  { category: "Tools & DevOps", icon: <Layers className="w-5 h-5" />, items: ["Docker", "Git / GitHub", "GitHub Actions", "Vercel", "Azure App Service"] },
];

const PROJECTS = [
  {
    name: "DevLog CMS / Personal Blog",
    desc: "Hệ thống Blog cá nhân đa chức năng tích hợp trình soạn thảo WYSIWYG (TipTap), đệm cache Redis tối ưu hiệu năng, SignalR thời gian thực, và phân quyền quản trị Admin.",
    tags: ["React", ".NET Core API", "SignalR", "Redis", "SQL Server"],
    stars: 5,
    status: "Production",
    link: "https://github.com/BlackjackVN-III/MyBlog-Frontend",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop&auto=format",
  }
];

const EXPERIENCE = [
  {
    role: "Fresher Backend Developer",
    company: "FPT Software",
    period: "04/2024 — 10/2024",
    desc: "Tham gia phát triển hệ thống backend sử dụng công nghệ .NET Core Web API, thiết kế cơ sở dữ liệu SQL Server, và triển khai quy trình CI/CD hỗ trợ các dự án phần mềm doanh nghiệp.",
    techs: ["C#", ".NET Core", "SQL Server", "Git", "Clean Architecture"],
  },
  {
    role: "Backend C# Developer Intern",
    company: "FPT Software",
    period: "01/2024 — 04/2024",
    desc: "Tiếp cận quy trình phát triển phần mềm Agile/Scrum chuyên nghiệp, nghiên cứu kiến trúc Clean Architecture, và tham gia xây dựng các API RESTful nền tảng cho hệ thống.",
    techs: ["C#", ".NET Core", "RESTful API", "Database Design"],
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16 items-center">
        <div className="lg:col-span-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-accent text-sm mb-6">
            <Globe className="w-4 h-4" /> Đà Nẵng, Việt Nam
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Xin chào, tôi là<br />
            <span className="text-primary">Trần Quốc Cường</span>
          </h1>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-6">
            Tôi là sinh viên chuyên ngành Kỹ thuật Phần mềm tại **Đại học FPT Đà Nẵng**. Với định hướng trở thành một Backend Developer chuyên nghiệp, tôi tập trung phát triển sâu vào công nghệ **C#/.NET Core**, thiết kế RESTful API hiệu năng cao, tối ưu cơ sở dữ liệu và tích hợp các giải pháp đệm cache (Redis). Ngoài ra, tôi có kiến thức nền tảng cơ bản về Frontend (React/Vite) được đúc kết trực tiếp thông qua dự án Blog này.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:cuongtq.dev@gmail.com" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              <Mail className="w-4 h-4" /> Liên hệ qua Email
            </a>
            <a href="https://github.com/BlackjackVN-III" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors">
              <Github className="w-4 h-4" /> GitHub Profile
            </a>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl overflow-hidden">
              <img
                src={avatarImg}
                alt="Trần Quốc Cường"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 p-4 rounded-2xl bg-card border border-border shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Đang học tập &amp; làm việc</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Công nghệ &amp; Kỹ năng
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Các công nghệ tôi sử dụng trong phát triển phần mềm</p>
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
        <p className="text-muted-foreground text-sm mb-8">Sản phẩm tiêu biểu tôi đang xây dựng và phát triển</p>
        <div className="grid grid-cols-1 gap-5 max-w-2xl">
          {PROJECTS.map((proj) => (
            <div key={proj.name} className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 group">
              <div className="h-48 overflow-hidden bg-secondary">
                <img src={proj.cover} alt={proj.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-foreground">{proj.name}</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400">
                    {proj.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-secondary text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{proj.stars}</span>
                  </div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-accent hover:gap-2 transition-all">
                    Xem trên GitHub <ExternalLink className="w-3.5 h-3.5" />
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
        <p className="text-muted-foreground text-sm mb-10">Lộ trình học hỏi và tích lũy kinh nghiệm trong năm 2024</p>
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
      <div className="rounded-3xl p-10 text-center animate-fade-in" style={{ background: "linear-gradient(135deg, #16a34a 0%, #059669 100%)" }}>
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Kết nối với tôi
        </h2>
        <p className="text-white/80 mb-7">Hãy liên hệ nếu bạn muốn trao đổi công việc hoặc hợp tác phát triển dự án.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:cuongtq.dev@gmail.com" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-medium hover:bg-white/90 transition-colors">
            <Mail className="w-4 h-4" /> cuongtq.dev@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
