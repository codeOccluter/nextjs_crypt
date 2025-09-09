export const heroData = {
    eyebrow: "INTRODUCE",
    title: "프로젝트를 소개합니다.",
    subtitle: "데이터 분석, SQL 질의문 분석, 데이터 모델링, AI 연구",
    actions: [
        { label: "바로 시작하기", href: "/main", primary: true },
        { label: "문서 보기", href: "/docs", primary: false },
    ],
};

export const valuesData = [
    {
        title: "연구 1",
        description: "어려운 데이터 분석을 누구나 쉽게.",
        icon: "💎",
    },
    {
        title: "연구 2",
        description: "SQL Query 튜닝을 통한 퍼포먼스 증대.",
        icon: "⚙️",
    },
    {
        title: "연구 3",
        description: "데이터 모델링 및 AI 연구.",
        icon: "🚀",
    },
];

export const techData = [
    {
        name: "Frontend",
        items: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts/Chart.js"],
    },
    {
        name: "Backend",
        items: ["Node.js", "Prisma/TypeORM", "PostgreSQL", "Redis"],
    },
    {
        name: "Infra",
        items: ["Vercel", "Docker", "CI/CD", "Monitoring"],
    },
];

export const timelineData = [
    { date: "2025-01", title: "프로젝트 시작", desc: "기획 및 초기 설계" },
    { date: "2025-02", title: "MVP 출시", desc: "핵심 기능 릴리즈" },
    { date: "2025-03", title: "피드백 반영", desc: "성능/UX 개선" },
];

export const teamData = [
    { name: "MOON", role: "Frontend", bio: "React/Next 중심 개발", avatar: "" },
    { name: "Teammate", role: "Backend", bio: "API/DB 설계", avatar: "" },
];

export const faqData = [
    { q: "무엇을 해결하나요?", a: "핵심 문제 정의와 해결 방식을 적어주세요." },
    { q: "어떻게 시작하나요?", a: "회원가입/게스트/데모 링크 안내." },
    { q: "요금/라이선스는?", a: "정책/플랜/문의 채널 안내." },
];

export const ctaData = {
    title: "지금 바로 시작해볼까요?",
    subtitle: "간단히 시작하고, 필요할 때 확장하세요.",
    primary: { label: "시작하기", href: "/main" },
    secondary: { label: "문의하기", href: "/contact" },
};
