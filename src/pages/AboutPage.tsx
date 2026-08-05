import React from "react";
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

export default function AboutPage() {
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
        </div>
      </div>
    </div>
  );
}
