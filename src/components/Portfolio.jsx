import { useEffect, useRef, useState, useCallback } from 'react'
import profileAvatar from '../assets/images/My_icon.jpg'
import imgEdTech from '../assets/images/Terakoya_EdTech.png'
import imgFullStack from '../assets/images/FullStack_Ieyasu.png'
import imgProduct from '../assets/images/ProductManager_Daijin.png'
import imgInterview from '../assets/images/Interview_app.png'
import imgPeakru from '../assets/images/Peakru.png'
import imgTodo from '../assets/images/ToDo_app.png'
import imgAlarm from '../assets/images/A-larm.png'

// ===========================
// DATA
// ===========================
const PROFILE = {
  name: '藤井 誠人',
  nameEn: 'Fujii Makoto',
  roles: ['フロントエンド/バックエンド'],
  currentStatus: '塾講師',
  hobbies: ['雑談', 'ネタ探し', '音楽鑑賞', '冒険'],
  favorites: ['犬', 'サッカー'],
}

const EDUCATION = [
  { year: '2024.03', title: '大分県立安心院高等学校', detail: '卒業' },
  { year: '2024.04', title: '福岡工業大学短期大学部', detail: '情報メディア学科 入学' },
  { year: '2026.03', title: '福岡工業大学短期大学部', detail: '情報メディア学科 卒業' },
  { year: '2026.04', title: '福岡工業大学', detail: '情報工学部 情報工学科 3年次編入' },
  { year: '2028.03', title: '福岡工業大学', detail: '情報工学部 情報工学科 卒業見込み' },
]

const HACKATHONS = [
  {
    name: '技育CAMP ハッカソン Vol.11',
    organizer: 'サポーターズ',
    date: '2025年8月',
    format: 'オンライン',
    description: 'エンジニア向けオンラインハッカソン。限られた時間でチーム開発に挑戦。',
    awards: [],
    link: 'https://talent.supporterz.jp/events/8f08f6cc-2545-4b9c-9d82-401ca325eed4/',
  },
  {
    name: 'はじめてのハッカソン by Voltech',
    organizer: 'NxTEND / Voltech',
    date: '2025年12月',
    format: '福岡・天神 (オフライン)',
    description: '九州の学生エンジニアコミュニティ「Voltech」主催の2日間ハッカソン。初心者向けのメンターサポート体制が充実。',
    awards: [],
    link: 'https://nxtend.connpass.com/event/374903/',
  },
  {
    name: 'GDGoC Japan Hackathon 2026',
    organizer: 'GDG on Campus Japan',
    date: '2026年2月〜3月',
    format: '東京 Google Japan (ハイブリッド)',
    description: '全国7会場をオンラインで繋ぎ、Googleの最先端テクノロジーを活用して新たなソリューションを生み出すハッカソン。',
    awards: ['AI賞', 'LGTM賞'],
    link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-university-of-aizu-fukushima-japan-presents-gdgoc-japan-hackathon/cohost-gdg-on-campus-tokyo-metropolitan-university-tokyo-japan/',
  },
]

const SKILL_CATEGORIES = [
  {
    label: 'プログラミング言語',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    items: ['C', 'Java', 'Python', 'PHP', 'JavaScript', 'SQL'],
  },
  {
    label: 'Web / フレームワーク',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    items: ['HTML/CSS', 'Streamlit'],
  },
  {
    label: 'ツール',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    items: ['Git', 'Figma', 'Notion'],
  },
]

const PROJECTS = [
  {
    name: 'A-larm',
    badge: 'チーム開発（技育CAMP Vol.11）',
    description: 'AI搭載スマートアラームアプリ。キャラクターとの会話で朝の習慣化をサポート。GeminiによるAI会話とVOICEVOXによる音声生成を搭載。',
    technologies: ['Android', 'Node.js', 'Docker', 'Gemini API', 'VOICEVOX'],
    link: 'https://x.com/geek_pjt/status/1959531551328501963',
    image: imgAlarm,
  },
  {
    name: 'Re: ゼロから始めるガクチカ生活',
    badge: 'チーム開発（Voltechハッカソン）',
    description: 'ガクチカづくりをRPGの冒険風に変えるWebアプリ。タスクを「クエスト」として追加し、行動力・思考力・対話力のステータスが成長。レーダーチャートで自分の強みを直感的に把握できる。',
    technologies: ['React', 'PHP', 'JavaScript', 'CSS', 'MySQL'],
    link: 'https://topaz.dev/projects/9f4f72f50a35ee5000ac',
    image: imgTodo,
  },
  {
    name: '面接練習アプリ（プロトタイプ）',
    badge: '個人開発',
    description: '面接の内容をAI面接官（Gemini）が評価するアプリ。ユーザーの回答をリアルタイムで分析し、改善点や強みをフィードバック。',
    technologies: ['Python', 'Streamlit', 'JSON', 'Gemini API'],
    image: imgInterview,
  },
  {
    name: '知識可視化ツール 「ピークる」',
    badge: 'チーム開発（GDGoC Hackathon）',
    description: 'Geminiとの会話履歴をインポートし、自分の知識を可視化するモバイルアプリ。分かったつもりを解消するため、音声入力によるテスト機能も実装している。AI賞・LGTM賞を受賞。',
    technologies: ['Flutter', 'Gemini API', 'Cloud Speech-to-Text API'],
    link: 'https://www.youtube.com/watch?v=Zxepl8I90kQ&t=5537s',
    slideLink: 'https://canva.link/r4c3usa57wy0ie4',
    image: imgPeakru,
  },
]

const CONTACTS = [
  {
    label: 'メール', value: 'f.makoto0514@gmail.com', href: 'mailto:f.makoto0514@gmail.com',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  },
  {
    label: 'GitHub', value: '@wisteriale', href: 'https://github.com/wisteriale/',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
  },
  {
    label: 'X (Twitter)', value: '@21ster141e', href: 'https://x.com/21ster141e?s=21&t=GY_j4FFoLBT48hQnU9BG5w',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  },
  {
    label: 'デジタル名刺', value: 'Prairie Card', href: 'https://my.prairie.cards/u/wisteriale',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
  },
]

const NAV_ITEMS = [
  { id: 'hero', label: 'ホーム' },
  { id: 'about', label: '経歴' },
  { id: 'skills', label: 'スキル' },
  { id: 'projects', label: 'プロジェクト' },
  { id: 'contact', label: 'お問い合わせ' },
]

// ===========================
// COMPONENT
// ===========================
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [rawScrollProgress, setRawScrollProgress] = useState(0)
  const scrollRef = useRef(null)
  const isDragging = useRef(false)
  const trackRef = useRef(null)

  // Track scroll position & active section (Vertical)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      // Determine active section
      const sections = el.querySelectorAll('.scroll-section')
      let current = 'hero'
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect()
        // If the section is spanning the middle of the screen
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          current = sec.id
        }
      })
      setActiveSection(current)

      // Update progress bar to snap strictly to items
      const index = NAV_ITEMS.findIndex(item => item.id === current)
      if (index !== -1) {
        setScrollProgress((index / (NAV_ITEMS.length - 1)) * 100)
      }

      // Continuous progress for parallax
      const totalScrollableHeight = el.scrollHeight - el.clientHeight
      if (totalScrollableHeight > 0) {
        setRawScrollProgress(el.scrollTop / totalScrollableHeight)
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.15, root: scrollRef.current }
    )
    scrollRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Progress bar drag (Discrete snapping)
  useEffect(() => {
    let lastIndex = -1
    const onMove = (e) => {
      if (!isDragging.current || !trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      const targetIndex = Math.round(ratio * (NAV_ITEMS.length - 1))

      if (targetIndex !== lastIndex) {
        lastIndex = targetIndex
        scrollTo(NAV_ITEMS[targetIndex].id)
      }
    }
    const onUp = () => { isDragging.current = false; lastIndex = -1; }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  const scrollTo = useCallback((id) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileMenuOpen(false)
  }, [])

  const handleTrackClick = (e) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    const index = Math.round(ratio * (NAV_ITEMS.length - 1))
    scrollTo(NAV_ITEMS[index].id)
  }

  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Background */}
      <div className="bg-ambient" aria-hidden="true">
        <div className="bg-orb bg-orb--1" style={{ transform: `translate3d(${rawScrollProgress * -30}px, ${rawScrollProgress * -50}px, 0)` }} />
        <div className="bg-orb bg-orb--2" style={{ transform: `translate3d(${rawScrollProgress * 40}px, ${rawScrollProgress * 60}px, 0)` }} />
      </div>

      {/* Progress Bar (Left Vertical) */}
      <div className="progress-bar">
        <span className="progress-bar__edge-label">始</span>
        <div className="progress-bar__track" ref={trackRef}
          onClick={handleTrackClick}
          onMouseDown={(e) => { isDragging.current = true; handleTrackClick(e) }}>
          <div className="progress-bar__fill" style={{ height: `${scrollProgress}%` }} />
          <div className="progress-bar__markers">
            {NAV_ITEMS.map((item, i) => (
              <button key={item.id}
                className={`progress-bar__marker ${activeSection === item.id ? 'progress-bar__marker--active' : ''}`}
                style={{ top: `${(i / (NAV_ITEMS.length - 1)) * 100}%` }}
                onClick={(e) => { e.stopPropagation(); scrollTo(item.id) }}>
                <span className="progress-bar__section-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <span className="progress-bar__edge-label">終</span>
      </div>

      {/* Navigation */}
      <header className="nav">
        <div className="nav__inner">
          <button className="nav__logo" onClick={() => scrollTo('hero')} aria-label="トップへ">
            <span className="nav__logo-mark">誠</span>
          </button>
          <nav className="nav__links" role="navigation">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className={`nav__hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="メニュー">
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll Container */}
      <div className="scroll-container" ref={scrollRef}>
        {/* ─── HERO ─── */}
        <section className="scroll-section scroll-section--hero" id="hero" data-active={activeSection === 'hero'}>
          <div className="scroll-section__inner reveal reveal--scale">
            <div className="hero-layout">
              <div className="hero__content">
                <h1 className="hero__name">
                  <span className="hero__name-main ink-text">{PROFILE.name}</span>
                  <span className="hero__name-jp">{PROFILE.nameEn}</span>
                </h1>
                <p className="hero__role-static">
                  {PROFILE.roles.join('　／　')}
                </p>
                <div className="hero__status">
                  <span className="hero__status-label">アルバイト：</span>
                  <span className="hero__status-text">{PROFILE.currentStatus}</span>
                </div>
                <div className="hero__personal">
                  <div className="hero__personal-group">
                    <span className="hero__personal-label">趣味</span>
                    <div className="hero__personal-tags">
                      {PROFILE.hobbies.map((h) => <span key={h} className="hero__personal-tag">{h}</span>)}
                    </div>
                  </div>
                  <div className="hero__personal-group">
                    <span className="hero__personal-label">好きなもの</span>
                    <div className="hero__personal-tags">
                      {PROFILE.favorites.map((f) => <span key={f} className="hero__personal-tag hero__personal-tag--fav">{f}</span>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero__visual">
                <div className="hero__avatar">
                  <div className="hero__avatar-ring" />
                  <div className="hero__avatar-inner">
                    <img src={profileAvatar} alt={PROFILE.name} className="hero__avatar-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section className="scroll-section" id="about" data-active={activeSection === 'about'}>
          <div className="scroll-section__inner">
            <div className="section__header reveal">
              <h2 className="section__title">学歴・キャリア</h2>
              <p className="section__subtitle">これまでの学びの軌跡と、これからの方向性</p>
            </div>
            <div className="about-grid">
              <div className="about__timeline reveal">
                <div className="timeline">
                  {EDUCATION.map((item, i) => (
                    <div key={i} className="timeline__item" style={{ transitionDelay: `${i * 0.08}s` }}>
                      <div className="timeline__marker">
                        <div className="timeline__dot" />
                      </div>
                      <div className="timeline__content">
                        <span className="timeline__year">{item.year}</span>
                        <h3 className="timeline__title">{item.title}</h3>
                        <p className="timeline__detail">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about__interests reveal" style={{ transitionDelay: '0.2s' }}>
                <h3 className="about__interests-title">興味・関心</h3>
                <div className="about__interest-cards">
                  {[
                    { bgImage: imgEdTech, title: 'EdTech', desc: '教育×テクノロジーで学びの体験を変革する' },
                    { bgImage: imgFullStack, title: 'フルスタック開発', desc: 'フロントからバックまで一気通貫で開発する' },
                    { bgImage: imgProduct, title: 'プロダクトマネジメント', desc: '上流工程から価値あるプロダクトを設計する' },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="about__interest-card"
                      style={{ backgroundImage: c.bgImage ? `url(${c.bgImage})` : 'none' }}
                    >
                      <div className="about__interest-content">
                        <h4>{c.title}</h4>
                        <p>{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* ─── HACKATHONS ─── */}
            <div className="about__hackathons reveal" style={{ transitionDelay: '0.3s' }}>
              <h3 className="about__hackathons-title">ハッカソン参加実績</h3>
              <div className="hackathon-cards">
                {HACKATHONS.map((h, i) => (
                  <div
                    key={i}
                    className="hackathon-card"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="hackathon-card__header">
                      <span className="hackathon-card__date">{h.date}</span>
                      <span className="hackathon-card__format">{h.format}</span>
                    </div>
                    <h4 className="hackathon-card__name">{h.name}</h4>
                    <p className="hackathon-card__organizer">{h.organizer}</p>
                    <p className="hackathon-card__desc">{h.description}</p>
                    {h.awards && h.awards.length > 0 && (
                      <div className="hackathon-card__awards">
                        {h.awards.map((award) => (
                          <span key={award} className="hackathon-card__award">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            {award}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="hackathon-card__actions" style={{ display: 'flex', gap: '16px', marginTop: 'auto', flexWrap: 'wrap' }}>
                      {h.link && (
                        <a href={h.link} target="_blank" rel="noopener noreferrer" className="hackathon-card__link-hint" style={{ textDecoration: 'none' }}>
                          詳細を見る →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SKILLS ─── */}
        <section className="scroll-section" id="skills" data-active={activeSection === 'skills'}>
          <div className="scroll-section__inner">
            <div className="section__header reveal">
              <h2 className="section__title">技術スタック</h2>
              <p className="section__subtitle">これまでに習得し、活用してきた技術</p>
            </div>
            <div className="skills-grid">
              {SKILL_CATEGORIES.map((cat, ci) => (
                <div key={cat.label} className="skill-category reveal reveal--scale" style={{ transitionDelay: `${ci * 0.12}s` }}>
                  <div className="skill-category__header">
                    <div className="skill-category__icon">{cat.icon}</div>
                    <h3 className="skill-category__label">{cat.label}</h3>
                  </div>
                  <div className="skill-category__items">
                    {cat.items.map((s) => (
                      <span key={s} className="skill-pill"><span className="skill-pill__dot" />{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section className="scroll-section" id="projects" data-active={activeSection === 'projects'}>
          <div className="scroll-section__inner">
            <div className="section__header reveal">
              <h2 className="section__title">制作実績</h2>
              <p className="section__subtitle">これまでに手がけたプロジェクト</p>
            </div>
            <div className="projects-showcase">
              {PROJECTS.map((p, i) => (
                <article key={i} className="project-feature reveal reveal--scale">
                  {p.image ? (
                    <div className="project-feature__visual" style={{ height: '180px', overflow: 'hidden' }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div className="project-feature__visual" style={{ height: '180px', background: 'rgba(0,0,0,0.05)' }}></div>
                  )}
                  <div className="project-feature__body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="project-feature__meta" style={{ marginBottom: '12px' }}>
                      <span className="project-feature__badge" style={{ display: 'inline-block', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, background: '#111', color: '#fff', borderRadius: '99px' }}>{p.badge}</span>
                    </div>
                    <h3 className="project-feature__title" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>{p.name}</h3>
                    <p className="project-feature__desc" style={{ fontSize: '0.85rem', color: '#555', marginBottom: '20px', flexGrow: 1 }}>{p.description}</p>
                    {p.technologies && p.technologies.length > 0 && (
                      <div className="project-feature__tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                        {p.technologies.map((t) => (
                          <span key={t} className="tech-tag" style={{ fontSize: '0.75rem', fontWeight: 600, background: '#e0e0e0', color: '#111', padding: '4px 12px', borderRadius: '4px' }}>{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-feature__actions" style={{ display: 'flex', gap: '12px', marginTop: 'auto', flexWrap: 'wrap' }}>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-feature__link-hint" style={{ padding: '8px 16px', background: '#111', color: '#fff', fontSize: '0.8rem', fontWeight: 700, borderRadius: '4px', textDecoration: 'none' }}>
                          詳細を見る →
                        </a>
                      )}
                      {p.slideLink && (
                        <a href={p.slideLink} target="_blank" rel="noopener noreferrer" className="project-feature__link-hint" style={{ padding: '8px 16px', background: '#fff', color: '#111', border: '1px solid #111', fontSize: '0.8rem', fontWeight: 700, borderRadius: '4px', textDecoration: 'none' }}>
                          発表資料 →
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section className="scroll-section" id="contact" data-active={activeSection === 'contact'}>
          <div className="scroll-section__inner">
            <div className="section__header reveal">
              <h2 className="section__title">ご連絡はこちら</h2>
              <p className="section__subtitle">お気軽にご連絡ください</p>
            </div>
            <div className="contact-grid">
              {CONTACTS.map((c, i) => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={c.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="contact-card reveal reveal--scale" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="contact-card__icon">{c.icon}</div>
                  <div className="contact-card__info">
                    <span className="contact-card__label">{c.label}</span>
                    <span className="contact-card__value">{c.value}</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="footer-inline reveal reveal--scale">
              <span className="footer__logo">誠</span>
              <span className="footer__name">{PROFILE.name}</span>
              <p className="footer__copy">© {currentYear} {PROFILE.name}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
