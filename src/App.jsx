import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  FlaskConical,
  Menu,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Target,
  UserRoundCheck,
  X,
} from "lucide-react";

const PHONE_DISPLAY = "010-3808-0032";
const PHONE_VALUE = "01038080032";

const navItems = [
  { label: "브랜드 소개", href: "/brand" },
  { label: "교육과정", href: "/curriculum" },
  { label: "연혁", href: "/history" },
  { label: "문의", href: "/tuition" },
];

const pageMeta = {
  brand: { eyebrow: "BRAND", title: <>학생마다 다르기에,<br />가르치는 방법도 달라야 합니다.</> },
  curriculum: { eyebrow: "CURRICULUM", title: <>기초부터 심화까지,<br />학생에게 맞는 정확한 성장</> },
  history: { eyebrow: "HISTORY", title: <>학생과 함께 쌓아온<br />교육의 시간</> },
  tuition: { eyebrow: "CONSULTATION", title: <>학생의 현재를 듣는 것부터<br />상담은 시작됩니다.</> },
};

function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = (href) => {
    if (href === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.history.pushState({}, "", href);
    setPath(href);
    window.scrollTo({ top: 0 });
  };

  return [path, go];
}

function Logo({ onClick }) {
  return (
    <button className="brand-logo" onClick={() => onClick("/")} aria-label="홈으로 이동">
      <span className="brand-logo__mark"><img src="/assets/academy-logo-transparent.png" alt="김샘 학원 원형 로고" /></span>
      <span className="brand-logo__type"><strong>김샘</strong><em>수학 과학 학원</em></span>
    </button>
  );
}

function Header({ path, go }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Logo onClick={go} />
          <div className="header-right">
            <div className="header-utils"><span>포항 양덕</span><span className="dot" /> <a href={`tel:${PHONE_VALUE}`}>교육상담 {PHONE_DISPLAY}</a></div>
            <nav className="desktop-nav" aria-label="주요 메뉴">
              {navItems.map((item) => (
                <button key={item.href} className={path === item.href ? "active" : ""} onClick={() => go(item.href)}>{item.label}</button>
              ))}
              <a className="nav-consult" href={`tel:${PHONE_VALUE}`}><Phone size={17} /> 상담</a>
            </nav>
          </div>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기"><Menu /></button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <Logo onClick={(href) => { go(href); setMenuOpen(false); }} />
          <button onClick={() => setMenuOpen(false)} aria-label="메뉴 닫기"><X /></button>
        </div>
        <nav aria-label="모바일 메뉴">
          {navItems.map((item, index) => (
            <button key={item.href} onClick={() => go(item.href)}>
              <span><small>0{index + 1}</small>{item.label}</span><ArrowRight size={22} />
            </button>
          ))}
        </nav>
        <div className="mobile-menu__contact">
          <p>원장 직통 교육상담</p>
          <strong>{PHONE_DISPLAY}</strong>
          <div><a href={`tel:${PHONE_VALUE}`}><Phone size={18} /> 전화하기</a><a href={`sms:${PHONE_VALUE}`}><MessageSquareText size={18} /> 문자하기</a></div>
        </div>
      </div>
    </>
  );
}

function SectionHeading({ label, title, description, align = "center" }) {
  return (
    <div className={`section-heading ${align === "left" ? "left" : ""}`}>
      <span>{label}</span><h2>{title}</h2>{description && <p>{description}</p>}
    </div>
  );
}

function Home({ go }) {
  const programs = [
    { icon: BookOpen, num: "01", title: "개별 진도", copy: "학생별 수준과 속도에 맞춘 교재와 진도" },
    { icon: UserRoundCheck, num: "02", title: "6명 소수정예", copy: "한 명 한 명을 세밀하게 살피는 수업" },
    { icon: Target, num: "03", title: "성취도 관리", copy: "이해 여부를 확인하고 부족한 부분을 보완" },
    { icon: FlaskConical, num: "04", title: "수학·과학 전문", copy: "기초부터 심화, 학교 시험까지 체계적으로" },
  ];

  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <span className="hero-kicker">KIM'S MATH &amp; SCIENCE ACADEMY</span>
          <h1>학생마다 다른 가능성,<br /><em>김샘은 끝까지 봅니다.</em></h1>
          <p>한 반 최대 6명. 학생별 수준에 맞춘 개별 진도와 교재,<br />수업 이후까지 이어지는 꼼꼼한 관리.</p>
          <button onClick={() => go("/brand")}>김샘의 교육 알아보기 <ArrowRight size={20} /></button>
        </div>
        <div className="hero-image"><img src="/assets/academy-classroom-wide.jpg" alt="김샘 수학 과학 학원에서 공부하는 학생들" /></div>
      </section>

      <section className="program-section shell section-pad">
        <SectionHeading label="KIM'S PROGRAM" title="학생 한 명 한 명에게 맞춰집니다." description="모두에게 같은 답을 주는 수업이 아닌, 각 학생에게 필요한 교육을 찾습니다." />
        <div className="program-grid">
          {programs.map(({ icon: Icon, num, title, copy }) => (
            <article key={title}><span className="program-num">{num}</span><Icon className="program-icon" strokeWidth={1.5} /><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="academy-gallery section-pad">
        <div className="shell">
          <SectionHeading align="left" label="KIM'S ACADEMY" title={<>교육의 시간과 결과가<br />공간에 쌓입니다.</>} description="학생을 지도해 온 시간, 학습의 과정과 성취를 김샘 수학 과학 학원의 실제 모습으로 만나보세요." />
          <div className="academy-gallery__grid">
            <figure className="gallery-large"><img src="/assets/academy-awards-wall.jpg" alt="김샘 수학 과학 학원 내부의 수상 인증 공간" /></figure>
            <figure className="gallery-tall"><img src="/assets/academy-trophy-wall.jpg" alt="김샘 수학 과학 학원의 트로피와 상장 진열장" /></figure>
            <figure className="gallery-wide"><img src="/assets/academy-awards-close.jpg" alt="김샘 수학 과학 학원의 우수 지도교사상과 단체상" /></figure>
          </div>
        </div>
      </section>

      <section className="system-section section-pad">
        <div className="shell system-layout">
          <div className="system-copy">
            <SectionHeading align="left" label="EDUCATION SYSTEM" title={<>개인별 방향을 찾고,<br />끝까지 책임지는 5단계</>} description="상담에서 시작해 시험과 성적 관리까지, 학습 과정 전체를 지속적으로 확인합니다." />
            <button className="text-link" onClick={() => go("/brand")}>교육 시스템 자세히 보기 <ArrowRight size={18} /></button>
          </div>
          <div className="system-visual">
            <ol>
              <li><b>01</b><span>원장 심층상담</span><small>현재 학습 상태와 학습 습관을 정확히 파악합니다.</small></li>
              <li><b>02</b><span>개인별 방향 설정</span><small>수준과 필요에 맞춰 교재와 진도를 설계합니다.</small></li>
              <li><b>03</b><span>맞춤 수업</span><small>학생마다 필요한 내용과 속도에 맞춰 지도합니다.</small></li>
              <li><b>04</b><span>성취도 관리</span><small>이해 여부를 확인하고 부족한 부분을 보완합니다.</small></li>
              <li><b>05</b><span>시험·성적 관리</span><small>학교 시험과 결과를 분석해 다음 학습에 반영합니다.</small></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="trust-section section-pad shell">
        <div className="trust-image"><img src="/assets/academy-hme-awards.png" alt="김샘 수학 과학 학원 학생들의 수상 실적 전시" /></div>
        <div className="trust-copy">
          <span>OUR PHILOSOPHY</span>
          <h2>학생의 성적은<br />선생님의 능력입니다.</h2>
          <p>잘하는 학생은 더 높은 곳으로,<br />부족한 학생은 자신의 가능성을 발견할 수 있도록.</p>
          <button onClick={() => go("/history")}>김샘의 교육 경험 <ArrowRight size={18} /></button>
        </div>
      </section>

      <section className="home-contact section-pad">
        <div className="shell contact-banner">
          <div><span>EDUCATION CONSULTATION</span><h2>아이의 현재 학습 상태부터<br />차분히 상담해 드립니다.</h2><p>김샘 수학 과학 학원 · 포항 양덕</p></div>
          <div className="contact-actions"><a href={`tel:${PHONE_VALUE}`}><Phone /> 전화 상담<strong>{PHONE_DISPLAY}</strong></a><a className="dark" href={`sms:${PHONE_VALUE}`}><MessageSquareText /> 문자 상담<strong>바로 문의하기</strong></a></div>
        </div>
      </section>
    </main>
  );
}

function SubpageHero({ type }) {
  const meta = pageMeta[type];
  return (
    <div className="subpage-head shell">
      <h1>{meta.title}</h1>
    </div>
  );
}

function BrandPage({ go }) {
  const management = [
    ["숙제 관리", "수업에서 배운 내용을 스스로 완성할 수 있도록 학습 과정을 관리합니다."],
    ["단원평가", "단원별 이해도와 학습 성취도를 지속적으로 확인합니다."],
    ["오답 관리", "틀린 원인과 부족한 개념을 찾아 다시 보완합니다."],
    ["학교시험 분석", "학교별 시험과 학생의 결과를 분석해 취약 영역을 확인합니다."],
    ["시험 전 특별관리", "시험 기간에는 학생 상황에 맞춰 집중적으로 관리합니다."],
    ["학부모 상담", "학습 과정과 변화, 앞으로의 방향을 함께 공유합니다."],
  ];
  const careers = [
    ["1985–1989", "고등학교 교직 근무"], ["1989–1991", "대구 황제속셈학원"], ["1992–1995", "대구 청구입시학원"],
    ["1996–2018", "신세계입시학원 · GNB영어학원 · 동화나라어린이집 운영"], ["2015", "캔매쓰수학과학중고등부학원 운영"],
    ["2018–현재", "김샘 수학-과학 전문학원 운영"], ["2021–", "비상교육 자문·감수위원"], ["2024–", "동아출판 수매씽 자문단"],
  ];
  const awards = ["재정경제부 장관상", "경상북도지사상", "경주시장상", "포항시장상", "경상북도학원연합회장 표창", "포항시학원연합회장 표창", "한국수학학력평가연구원 우수학원 표창 다수", "㈜천재교육 관련 표창 다수", "고려대학교 전국학력평가원 관련 표창"];
  return (
    <main className="subpage">
      <SubpageHero type="brand" />
      <section className="brand-intro shell section-pad">
        <div className="brand-intro__copy"><span>BRAND INTRODUCTION</span><h2>모든 학생에게 똑같은 진도와<br />똑같은 방식을 적용하지 않습니다.</h2><p>기초가 필요한 학생에게는 부족한 부분을 정확히 찾아 채워주고, 실력을 갖춘 학생에게는 더 높은 단계로 성장할 수 있도록 지도합니다.</p><p>학생 한 명 한 명을 제대로 이해하고 끝까지 책임 있게 지도하는 것, 그것이 김샘의 교육입니다.</p></div>
        <div className="brand-intro__image"><img src="/assets/academy-brand-classroom.jpg" alt="김샘 수학 과학 학원의 실제 소수정예 수업" /></div>
      </section>
      <section className="philosophy-section section-pad">
        <div className="shell"><SectionHeading label="OUR PHILOSOPHY" title="학생의 성적은 선생님의 능력입니다!" description="각 학생에게 필요한 교육을 찾아주는 것, 김샘이 가장 중요하게 생각하는 기준입니다." />
          <div className="philosophy-grid"><article><UserRoundCheck /><b>01</b><h3>수준별 소그룹 지도</h3><p>한 반 최대 6명으로 학생 개개인의 학습 상황을 세밀하게 살핍니다.</p></article><article><Target /><b>02</b><h3>맞춤 개인별 지도</h3><p>현재 수준과 수업 과정을 확인하며 개인별 진도와 방향을 조정합니다.</p></article><article><ShieldCheck /><b>03</b><h3>성적향상 책임지도</h3><p>이해 여부와 성취도를 확인하고 부족한 부분을 다시 보완합니다.</p></article></div>
        </div>
      </section>
      <section className="steps-section section-pad shell"><SectionHeading label="KIM'S EDUCATION SYSTEM" title="6명 소수정예, 수업은 한 명 한 명에게 맞춰집니다." />
        <div className="steps-list">{["원장 심층상담", "개인별 학습 방향 설정", "개인별 맞춤 수업", "지속적인 성취도 관리", "시험 및 성적 관리"].map((step, i) => <div key={step}><b>0{i + 1}</b><span>{step}</span><Check /></div>)}</div>
      </section>
      <section className="management-section section-pad"><div className="shell"><SectionHeading align="left" label="STUDENT MANAGEMENT" title="수업 이후까지 이어지는 꼼꼼한 관리" />
        <div className="management-grid">{management.map(([title, copy]) => <article key={title}><span>{title}</span><p>{copy}</p></article>)}</div></div></section>
      <section className="director-section section-pad shell"><div className="director-title"><span>DIRECTOR</span><h2>오랜 교육 경험에서 나오는<br />개인별 지도</h2><p>학교 현장과 입시학원, 교육기관 운영을 거쳐 오랜 기간 학생을 직접 지도해 왔습니다. 현재도 직접 수업하며 진도와 성취도를 지속적으로 관리합니다.</p></div><div className="career-list">{careers.map(([year, text]) => <div key={year}><b>{year}</b><span>{text}</span></div>)}</div></section>
      <section className="awards-section section-pad"><div className="shell"><SectionHeading align="left" label="AWARDS & RECOGNITION" title="교육 현장에서 인정받아 온 지도 경험" /><div className="awards-layout"><figure><img src="/assets/academy-trophy-wall.jpg" alt="김샘 수학 과학 학원에 전시된 트로피와 상장" /><figcaption>학생과 함께 쌓아온 교육의 기록</figcaption></figure><div className="awards-grid">{awards.map((award) => <span key={award}><Check size={18} />{award}</span>)}</div></div></div></section>
    </main>
  );
}

const curriculumData = [
  { level: "초등 수학", subtitle: "탄탄한 교과에서 깊이 있는 사고력까지", text: "수학의 원리를 정확하게 이해하고 스스로 생각하는 힘을 키웁니다.", items: ["교과 개념 학습", "개념 이해 및 응용", "심화 문제 학습", "사고력 수학", "학생별 맞춤 교재·진도", "단원별 성취도 관리"] },
  { level: "중등 수학", subtitle: "개념부터 심화, 학교 시험까지 체계적으로", text: "현재 수준에 필요한 영역을 파악하고 개념·응용·심화 및 학교 시험까지 관리합니다.", items: ["교과 개념·유형 학습", "응용·심화 문제", "학교별 내신 관리", "단원평가·오답관리", "학생별 개인 진도", "시험 전 집중관리"] },
  { level: "고등 수학", subtitle: "목표와 수준에 맞춘 밀도 높은 수학 지도", text: "정확한 개념 이해와 적용 능력을 중심으로 교과, 내신, 심화 문제를 지도합니다.", items: ["교과 개념 완성", "학교별 내신 대비", "유형별 문제 해결", "응용·심화 학습", "모의고사·수능형 문제", "취약 영역·오답 집중"] },
];

function CurriculumPage({ go }) {
  return (
    <main className="subpage">
      <SubpageHero type="curriculum" />
      <section className="curriculum-intro shell section-pad"><div><span>CURRICULUM</span><h2>학생의 현재 수준에서 출발해<br />한 단계씩 정확하게</h2></div><p>같은 학년이라도 필요한 학습 내용과 속도는 다를 수 있습니다. 상담과 학습 결과를 바탕으로 개인별 교재와 진도를 설계합니다.</p></section>
      <section className="curriculum-section shell">
        <div className="subject-head"><span>MATHEMATICS</span><h2>수학</h2></div>
        <div className="course-list">{curriculumData.map((course, i) => <article key={course.level}><div className="course-level"><small>0{i + 1}</small><h3>{course.level}</h3></div><div className="course-copy"><h4>{course.subtitle}</h4><p>{course.text}</p></div><ul>{course.items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul></article>)}</div>
      </section>
      <section className="special-section section-pad shell"><div><span>SPECIAL CLASS</span><h2>과학고반 · 영재반</h2></div><p>보다 높은 수준의 학습이 필요한 학생을 위한 별도의 심화 프로그램입니다. 현재 실력과 학습 역량을 고려해 개인별 수준에 맞는 교육을 진행합니다.</p><button onClick={() => go("/tuition")}>과정 상담하기 <ArrowRight size={18} /></button></section>
    </main>
  );
}

const historyItems = [
  ["1985", "교육 현장에서 교직 생활 시작"], ["1989", "대구 황제속셈학원"], ["1992", "대구 청구입시학원"],
  ["1996–2018", "신세계입시학원 · GNB영어학원 · 동화나라어린이집 등 교육기관 운영"], ["2015", "캔매쓰수학과학중고등부학원 운영"],
  ["2018", "김샘 수학-과학 전문학원으로 상호 변경"], ["2019–2020", "초곡 2관 및 비욘드영어학원 운영"],
  ["2021", "비상교육 자문·감수위원 활동"], ["2024", "동아출판 수매씽 자문단 활동"], ["현재", "포항 양덕에서 김샘 수학 과학 학원 운영"],
];

function HistoryPage({ go }) {
  return (
    <main className="subpage">
      <SubpageHero type="history" />
      <section className="history-section shell section-pad">
        <div className="history-intro">
          <div className="history-side"><span>OUR HISTORY</span><h2>한결같은 마음으로<br />학생 곁을 지켜온 시간</h2><p>학교 현장부터 교육기관 운영, 그리고 오늘의 김샘까지.</p></div>
          <figure className="history-portrait"><img src="/assets/director-kimsaem.png" alt="김샘 수학 과학 학원 원장 선생님" /><figcaption><span>DIRECTOR</span><strong>김샘 수학 과학 학원 원장</strong></figcaption></figure>
        </div>
        <div className="timeline-scroll" tabIndex="0" aria-label="김샘 수학 과학 학원 연혁 가로 타임라인">
          <ol className="timeline">{historyItems.map(([year, text], i) => <li className={i === historyItems.length - 1 ? "current" : ""} key={`${year}-${text}`}><span className="timeline-dot" /><b>{year}</b><p>{text}</p></li>)}</ol>
        </div>
      </section>
      <section className="history-quote"><div className="shell"><span>KIM'S PROMISE</span><h2>잘하는 학생은 더 높은 곳으로,<br />부족한 학생은 자신의 가능성을 발견하도록.</h2><p>학생마다 다른 가능성을 끌어내는 것이 김샘의 교육철학입니다.</p></div></section>
    </main>
  );
}

function TuitionPage({ go }) {
  return (
    <main className="subpage consultation-page">
      <SubpageHero type="tuition" />
      <section className="consultation-main shell section-pad">
        <div className="consultation-copy"><span>DIRECT CONSULTATION</span><h2>원장 선생님이<br />직접 상담합니다.</h2><p>학생의 현재 학습 수준과 목표, 고민을 충분히 듣고 필요한 수업 방향을 안내합니다. 실제 수강료는 상담 과정에서 수업 횟수와 과정에 맞춰 정확히 안내드립니다.</p><ul><li><Check /> 학생의 현재 학습 상태 확인</li><li><Check /> 학년·수준별 수업 방향 안내</li><li><Check /> 가능한 시간과 과정 상담</li></ul></div>
        <div className="consult-card"><span>교육상담</span><small>평일·주말 상담 가능</small><strong>{PHONE_DISPLAY}</strong><p>수업 중에는 전화를 받지 못할 수 있습니다.<br />문자를 남겨주시면 확인 후 연락드리겠습니다.</p><div><a className="call" href={`tel:${PHONE_VALUE}`}><Phone />전화 상담</a><a className="message" href={`sms:${PHONE_VALUE}`}><MessageSquareText />문자 상담</a></div></div>
      </section>
      <section className="location-section section-pad"><div className="shell"><div><span>LOCATION</span><h2>김샘 수학 과학 학원</h2></div><div className="address-card"><strong>경상북도 포항시 북구 양덕로50번길 4-1, 3층</strong><p>양덕 풍림아이원 1차 맞은편 · 농협 옆 상가 3층</p><a href={`tel:${PHONE_VALUE}`}>{PHONE_DISPLAY} <ArrowRight size={17} /></a></div></div></section>
      <div className="mobile-sticky-contact"><a href={`tel:${PHONE_VALUE}`}><Phone size={19} />전화 상담</a><a href={`sms:${PHONE_VALUE}`}><MessageSquareText size={19} />문자 상담</a></div>
    </main>
  );
}

function Footer({ go }) {
  return (
    <footer className="site-footer"><div className="shell footer-main"><Logo onClick={go} /><nav>{navItems.map(item => <button key={item.href} onClick={() => go(item.href)}>{item.label}</button>)}</nav><div className="footer-contact"><span>교육상담</span><a href={`tel:${PHONE_VALUE}`}>{PHONE_DISPLAY}</a></div></div><div className="shell footer-bottom"><div><p>김샘 수학 과학 학원</p><p>경상북도 포항시 북구 양덕로50번길 4-1, 3층 (양덕동)</p><p>대표전화 {PHONE_DISPLAY} · 253-0582</p></div><small>© KIM'S MATH &amp; SCIENCE ACADEMY. ALL RIGHTS RESERVED.</small></div></footer>
  );
}

export function App() {
  const [path, go] = usePath();
  const renderPage = () => {
    if (path === "/brand") return <BrandPage go={go} />;
    if (path === "/curriculum") return <CurriculumPage go={go} />;
    if (path === "/history") return <HistoryPage go={go} />;
    if (path === "/tuition") return <TuitionPage go={go} />;
    return <Home go={go} />;
  };
  return <div className="app"><Header path={path} go={go} />{renderPage()}<Footer go={go} /></div>;
}
