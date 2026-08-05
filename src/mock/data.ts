export const POSTS = [
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

export const COMMENTS = [
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

export const ALL_TAGS = ["Tất cả", "Node.js", "React", "TypeScript", "PostgreSQL", "Kubernetes", "DevOps", "Frontend", "Backend", "Performance", "Next.js"];
