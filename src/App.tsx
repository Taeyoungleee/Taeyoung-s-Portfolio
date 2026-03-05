import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Code, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Calendar,
  Instagram,
  Menu,
  X
} from 'lucide-react';

// --- Types ---
interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  details: string[];
  achievements: string[];
  images: string[];
}

interface Certificate {
  name: string;
  date: string;
}

// --- Data ---
const experiences: Experience[] = [
  {
    id: 'naver',
    company: '네이버 (NAVER)',
    role: '서비스 기획 지원 및 데이터 분석',
    period: '2025.10 ~ 현재',
    description: '쇼핑 카탈로그 기획 지원 및 AI 데이터 모델 품질 고도화',
    details: [
      '상품 카탈로그 자동화 로직 기획 지원 및 지속적인 개선',
      '상품 판매 어뷰징 케이스 유형화 및 차단 로직 개선 기여',
      '카탈로그 관련 정량 데이터 분석을 통한 서비스 인사이트 도출',
      'AI 데이터 정제 모델의 결과물 적절성 평가 및 오매칭 선별',
      '기존 및 개선 모델 간의 품질 차이 비교 분석 리포트 작성'
    ],
    achievements: [
      '카탈로그 자동화 50% 확대 달성',
      '농수산물 카테고리 데이터 사전화 및 표준화 성공',
      '상품 키워드 변경 이력 추적 로직 설계 기여',
      '최저가 오매칭 유형 정리를 통한 서비스 신뢰도 향상'
    ],
    images: [
      'https://raw.githubusercontent.com/Taeyoungleee/Taeyoung-s-Portfolio/f8b7882ee4feed5bd0183dc835a60d2900efcc29/naver_ex_1.png',
      'https://raw.githubusercontent.com/Taeyoungleee/Taeyoung-s-Portfolio/f8b7882ee4feed5bd0183dc835a60d2900efcc29/naver_ex_2.png'
    ]
  },
  {
    id: 'crowdworks',
    company: '크라우드웍스 (Crowdworks)',
    role: 'PA (Project Assistant)',
    period: '2024.09 ~ 2025.09',
    description: 'AI 학습 데이터 구축 프로젝트 기획 지원 및 품질 운영',
    details: [
      'AI 학습 데이터 구축 프로젝트 기획 지원 및 플랫폼 운영 관리',
      '작업 기준 설정, 가이드 제작 및 고객사-작업자 간 피드백 커뮤니케이션',
      '프로젝트 기간 및 월별 작업량 목표 설정 및 품질 검수',
      '위성 이미지 내 특정 객체 식별을 위한 Polygon 및 BBox 작업 및 검수'
    ],
    achievements: [
      '객체 오류율 5% 미만 철저 관리',
      '작업자 생산성 데이터 분석을 통한 1인당 생산성 30% 개선'
    ],
    images: [
      'https://raw.githubusercontent.com/Taeyoungleee/Taeyoung-s-Portfolio/f8b7882ee4feed5bd0183dc835a60d2900efcc29/crowdworks_ex_1.png',
      'https://raw.githubusercontent.com/Taeyoungleee/Taeyoung-s-Portfolio/f8b7882ee4feed5bd0183dc835a60d2900efcc29/crowdworks_ex_2.png'
    ]
  },
  {
    id: 'elentec',
    company: '이랜텍 (Elentec)',
    role: 'AI 활용 방안 조사 및 모델 테스트',
    period: '2023.10 ~ 2023.12',
    description: '제조 공정 최적화를 위한 AI 모델 연구 및 성능 검증',
    details: [
      '생산 공정 프로세스 최적화 방안 조사 및 AI 프로토타입 수행/개발',
      'CNN 기반 이미지 분류 모델 학습 및 전이학습 성능 향상 테스트',
      'YOLO 모델 파인튜닝을 통한 객체 및 문자 추출 최적화',
      'GAN 모델을 이용한 불량 데이터 생성 연구'
    ],
    achievements: [
      'GAN 활용 데이터 생성으로 모델 성능 10% 이상 개선',
      'YOLO와 OCR 모델 결합을 통한 복합 객체 탐지 성공'
    ],
    images: [
      'https://raw.githubusercontent.com/Taeyoungleee/Taeyoung-s-Portfolio/f8b7882ee4feed5bd0183dc835a60d2900efcc29/intern_ex_1.png',
      'https://raw.githubusercontent.com/Taeyoungleee/Taeyoung-s-Portfolio/f8b7882ee4feed5bd0183dc835a60d2900efcc29/intern_ex_2.png'
    ]
  }
];

const certificates: Certificate[] = [
  { name: 'SQLD (SQL 개발자)', date: '2024.04' },
  { name: '빅데이터분석기사', date: '2023.12' },
  { name: 'ADsP (데이터분석 준전문가)', date: '2022.09' },
  { name: '컴퓨터활용능력 1급', date: '2021.12' }
];

const skills = [
  { category: 'Programming & Query', items: ['Python', 'SQL'] },
  { category: 'Core Competencies', items: ['데이터 추출 및 가공', 'AI 모델 품질 QA', '서비스 로직 개선'] }
];

const SafeImage = ({ 
  src, 
  alt, 
  className, 
  style,
  fallback = "https://picsum.photos/seed/taeyoung/800/600" 
}: { 
  src: string, 
  alt: string, 
  className?: string, 
  style?: React.CSSProperties,
  fallback?: string 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  // Update imgSrc if the src prop changes
  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      style={style}
      referrerPolicy="no-referrer"
      onError={() => setImgSrc(fallback)}
    />
  );
};

const VerifiedBadge = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-blue-500"
  >
    <path 
      d="M12 2L14.4 4.8L17.8 4.4L18.8 7.6L22 8.6L21 12L22 15.4L18.8 16.4L17.8 19.6L14.4 19.2L12 22L9.6 19.2L6.2 19.6L5.2 16.4L2 15.4L3 12L2 8.6L5.2 7.6L6.2 4.4L9.6 4.8L12 2Z" 
      fill="currentColor" 
    />
    <path 
      d="M9 12L11 14L15 10" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const ProfileImage = ({ className, size = "w-full h-full" }: { className?: string, size?: string }) => {
  return (
    <SafeImage 
      src="https://raw.githubusercontent.com/Taeyoungleee/Taeyoung-s-Portfolio/f8b7882ee4feed5bd0183dc835a60d2900efcc29/my_image.png"
      alt="Taeyoung"
      className={`${size} object-cover transition-opacity duration-300 ${className || ""}`}
      style={{ imageRendering: 'auto' }}
      fallback="https://picsum.photos/seed/taeyoung/400/400"
    />
  );
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Account for mobile header if needed
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// --- Components ---

const Sidebar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-white/5 p-6 bg-bg z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
          <ProfileImage />
        </div>
        <span className="text-white font-semibold tracking-tight">Taeyoung.dev</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              scrollToSection(item.id);
            }}
            className={`sidebar-link w-full text-left ${activeSection === item.id ? 'active' : 'text-zinc-500'}`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
        <div className="px-2">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-4">Contact</p>
          <div className="space-y-3">
            <a href="mailto:lee1179717@naver.com" className="flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors">
              <Mail size={16} />
              <span>Email</span>
            </a>
            <a href="https://github.com/Taeyoungleee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors">
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNav = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100] p-4 bg-bg/80 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10">
            <ProfileImage />
          </div>
          <span className="text-white font-semibold text-sm">Taeyoung</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-1">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            <div className="flex flex-col gap-2 pb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    scrollToSection(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${activeSection === item.id ? 'bg-white/10 text-white' : 'text-zinc-500'}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  return (
    <section id="home" className="pt-24 lg:pt-12 pb-16">
      <div className="relative flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-start gap-6 z-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-zinc-900 shadow-inner">
              <ProfileImage />
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#050505] shadow-sm"></div>
          </div>

          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-white">Taeyoung</h1>
              <VerifiedBadge size={22} />
            </div>
            <p className="text-zinc-400 text-lg mb-6">
              Data & AI
            </p>
            
            <div className="space-y-6 mb-8">
              <p className="text-zinc-400 text-base leading-relaxed">
                Driven by data, defined by action.
              </p>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <span>Currently based in Seoul, South Korea 🇰🇷</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold text-sm hover:bg-zinc-200 transition-colors">
                View Resume
              </button>
              <a 
                href="mailto:lee1179717@naver.com"
                className="bg-white/5 text-white p-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://github.com/Taeyoungleee" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 text-white p-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ExperienceCard({ exp, isLast }: { exp: Experience, isLast: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-20 group"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 via-accent/10 to-transparent" />
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-[23px] h-[23px] rounded-full border-2 border-accent/30 bg-bg flex items-center justify-center z-10">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </div>

      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-white tracking-tighter group-hover:text-accent transition-colors duration-500">
                {exp.company}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
                Experience
              </span>
            </div>
            <p className="text-xl text-zinc-300 font-medium tracking-tight italic opacity-80">{exp.role}</p>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-sm font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Calendar size={14} className="text-accent" />
            <span>{exp.period}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-3xl">
          <p className="text-lg text-zinc-400 leading-relaxed font-light">
            {exp.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Responsibilities */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black flex items-center gap-3">
              <span className="w-8 h-[1px] bg-zinc-800" />
              Core Responsibilities
            </h4>
            <ul className="space-y-4">
              {exp.details.map((detail, i) => (
                <li key={i} className="flex gap-4 text-sm leading-relaxed text-zinc-400 group/item">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/30 group-hover/item:bg-accent transition-colors shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black flex items-center gap-3">
              <span className="w-8 h-[1px] bg-zinc-800" />
              Key Milestones
            </h4>
            <div className="space-y-3">
              {exp.achievements.map((ach, i) => (
                <div key={i} className="relative overflow-hidden group/ach">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover/ach:opacity-100 transition-opacity" />
                  <div className="relative p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-accent/20 transition-all">
                    <div className="flex gap-3 items-start">
                      <span className="text-accent font-mono text-xs mt-0.5">0{i + 1}</span>
                      <span className="text-sm font-medium text-zinc-300 leading-snug">{ach}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visuals Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {exp.images.map((img, i) => {
            const isElentec = exp.id === 'elentec';
            return (
              <div key={i} className={`group/img relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 ${isElentec ? 'p-2' : ''}`}>
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover/img:opacity-100 transition-opacity z-10 pointer-events-none mix-blend-overlay" />
                <SafeImage 
                  src={img} 
                  alt={`${exp.company} project ${i + 1}`} 
                  className={`w-full h-full ${isElentec ? 'object-contain' : 'object-cover'} group-hover/img:scale-105 transition-all duration-700 ease-out`}
                  fallback={`https://picsum.photos/seed/${exp.id}${i}/800/600`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity z-20">
                  <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Project Visual 0{i + 1}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 border-t border-white/5">
      <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-600 font-bold mb-12">Skills & Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-accent/20 transition-colors">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {skill.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, j) => (
                <span key={j} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 text-sm border border-white/5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-20 border-t border-white/5">
      <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-600 font-bold mb-12">Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((cert, i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-card border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Award size={20} />
              </div>
              <span className="text-white font-medium">{cert.name}</span>
            </div>
            <span className="text-zinc-600 font-mono text-xs">{cert.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 border-t border-white/5">
      <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-600 font-bold mb-12">Get in Touch</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-3xl font-bold mb-6">Let's build something <br /> <span className="text-accent">data-driven</span> together.</h3>
          <p className="text-zinc-400 mb-8 max-w-md">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Mail size={18} />
              </div>
              <span>lee1179717@naver.com</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Github size={18} />
              </div>
              <a href="https://github.com/Taeyoungleee" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                github.com/Taeyoungleee
              </a>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-card border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-card border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <textarea 
            placeholder="Message" 
            rows={5}
            className="w-full bg-card border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
          ></textarea>
          <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 text-center">
      <div className="mb-8">
        <svg viewBox="0 0 100 40" className="w-24 h-auto mx-auto fill-white opacity-50">
          <path d="M10,20 Q25,5 40,20 T70,20 T100,20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex justify-center gap-6 mb-8">
        <a href="https://github.com/Taeyoungleee" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <a href="mailto:lee1179717@naver.com" className="text-zinc-600 hover:text-white transition-colors">
          <Mail size={20} />
        </a>
      </div>
      <p className="text-zinc-600 text-xs tracking-widest uppercase">
        © 2026 Taeyoung. Designed with precision.
      </p>
    </footer>
  );
};

// --- Main App ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-white">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <Header />
          
          <section id="experience" className="py-20 border-t border-white/5">
            <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-600 font-bold mb-16">Work Experience</h2>
            {experiences.map((exp, index) => (
              <div key={exp.id}>
                <ExperienceCard 
                  exp={exp} 
                  isLast={index === experiences.length - 1} 
                />
              </div>
            ))}
          </section>

          <SkillsSection />
          <CertificatesSection />
          <ContactSection />
          <Footer />
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
