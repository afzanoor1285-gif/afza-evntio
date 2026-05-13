import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Users, Search, Briefcase, ShieldCheck, BookOpen, ChevronDown, Building2, UtensilsCrossed, Cake, Music, Flower2, Camera, Scissors, Mail } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import heroWedding from "@/assets/hero-wedding.jpg";
import heroConference from "@/assets/hero-conference.jpg";
import heroConcert from "@/assets/hero-concert.jpg";
import heroReception from "@/assets/hero-reception.jpg";
import heroCrowd from "@/assets/hero-crowd.jpg";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project Afza — Plan Your Perfect Event" },
      { name: "description", content: "Find the best venues, caterers, photographers and more — all in one place." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

type Lang = "en" | "ar";

type Dict = {
  nav: { home: string; browse: string; about: string; venues: string; contact: string };
  signIn: string; addVendor: string; tagline: string;
  heroTitle1: string; heroTitleHighlight: string; heroTitle2: string;
  heroSub1: string; heroSub2: string;
  features: { title: string; sub: string }[];
  search: { location: string; locationPh: string; date: string; datePh: string; services: string; servicesPh: string; guests: string; guestsPh: string; btn: string };
  servicesTitle: string;
  services: string[];
  testimonialsTitle: string;
  testimonials: { name: string; text: string }[];
  ctaTitle: string; ctaSub: string; ctaBtn: string;
  footer: {
    tagline: string; company: string; support: string; legal: string;
    links: { about: string; careers: string; press: string; help: string; contact: string; faq: string; privacy: string; terms: string; cookies: string };
    rights: string;
  };
};

const translations: Record<Lang, Dict> = {
  en: {
    nav: { home: "Home", browse: "Browse Services", about: "About", venues: "Venues", contact: "Contact" },
    signIn: "Sign In",
    addVendor: "Add Vendor",
    tagline: "PLAN · BOOK · CELEBRATE",
    heroTitle1: "Your Dream Event,",
    heroTitleHighlight: "Perfectly",
    heroTitle2: "Planned",
    heroSub1: "Find the best venues, Caterers, photographers and more.",
    heroSub2: "All in one Place, in just a few Clicks.",
    features: [
      { title: "Verified Vendors", sub: "Tested & Reviewed" },
      { title: "Best Price Guarantee", sub: "Compare & save" },
      { title: "Easy Booking", sub: "Fast & Simple" },
    ],
    search: {
      location: "Location",
      locationPh: "Country, City or Venue",
      date: "Date of Event",
      datePh: "Select Date",
      services: "Services",
      servicesPh: "Select Services",
      guests: "Guests",
      guestsPh: "No. of Guests",
      btn: "Search Now",
    },
    servicesTitle: "Explore Service",
    services: ["Venues", "Catering", "Bakeries", "Musicians", "Flowering", "Photographers", "Salons", "E-Invitation"],
    testimonialsTitle: "What Our Couples Say",
    testimonials: [
      { name: "Sarah & James", text: "Project Afza made our wedding planning effortless. Every vendor was top-notch!" },
      { name: "Aisha & Omar", text: "From venue to catering, everything was perfect. Highly recommend!" },
      { name: "Emma & Liam", text: "The best decision we made for our big day. Stress-free and beautiful." },
    ],
    ctaTitle: "Ready to Plan Your Perfect Day?",
    ctaSub: "Join thousands who trusted Project Afza for their perfect event.",
    ctaBtn: "Get Started",
    footer: {
      tagline: "Plan, Book, and Celebrate — all in one place.",
      company: "Company",
      support: "Support",
      legal: "Legal",
      links: {
        about: "About", careers: "Careers", press: "Press",
        help: "Help Center", contact: "Contact Us", faq: "FAQ",
        privacy: "Privacy", terms: "Terms", cookies: "Cookies",
      },
      rights: "© 2026 Evnto. All rights reserved.",
    },
  },
  ar: {
    nav: { home: "الرئيسية", browse: "تصفح الخدمات", about: "من نحن", venues: "القاعات", contact: "اتصل بنا" },
    signIn: "تسجيل الدخول",
    addVendor: "إضافة مزود",
    tagline: "خطط · احجز · احتفل",
    heroTitle1: "حدثك المثالي،",
    heroTitleHighlight: "مخطط",
    heroTitle2: "بإتقان",
    heroSub1: "اعثر على أفضل القاعات والمطاعم والمصورين والمزيد.",
    heroSub2: "كل ذلك في مكان واحد، ببضع نقرات فقط.",
    features: [
      { title: "مزودون موثوقون", sub: "مختبرون ومقيمون" },
      { title: "ضمان أفضل سعر", sub: "قارن ووفر" },
      { title: "حجز سهل", sub: "سريع وبسيط" },
    ],
    search: {
      location: "الموقع",
      locationPh: "الدولة، المدينة أو القاعة",
      date: "تاريخ الحدث",
      datePh: "اختر التاريخ",
      services: "الخدمات",
      servicesPh: "اختر الخدمات",
      guests: "الضيوف",
      guestsPh: "عدد الضيوف",
      btn: "ابحث الآن",
    },
    servicesTitle: "استكشف الخدمات",
    services: ["القاعات", "الضيافة", "المخابز", "الموسيقيون", "الزهور", "المصورون", "الصالونات", "الدعوات الإلكترونية"],
    testimonialsTitle: "ماذا يقول عملاؤنا",
    testimonials: [
      { name: "سارة وجيمس", text: "جعلت إفنتو تخطيط زفافنا سهلاً. كل مزود كان من الدرجة الأولى!" },
      { name: "عائشة وعمر", text: "من القاعة إلى الضيافة، كان كل شيء مثالياً. أنصح بشدة!" },
      { name: "إيما وليام", text: "أفضل قرار اتخذناه ليومنا الكبير. بلا توتر وجميل." },
    ],
    ctaTitle: "هل أنت مستعد لتخطيط يومك المثالي؟",
    ctaSub: "انضم إلى آلاف الأزواج الذين وثقوا بإفنتو لحدثهم المميز.",
    ctaBtn: "ابدأ الآن",
    footer: {
      tagline: "خطط، احجز، واحتفل — كل ذلك في مكان واحد.",
      company: "الشركة",
      support: "الدعم",
      legal: "قانوني",
      links: {
        about: "عن الشركة", careers: "وظائف", press: "الصحافة",
        help: "مركز المساعدة", contact: "اتصل بنا", faq: "الأسئلة الشائعة",
        privacy: "الخصوصية", terms: "الشروط", cookies: "ملفات تعريف الارتباط",
      },
      rights: "© 2026 إفنتو. جميع الحقوق محفوظة.",
    },
  },
};

function Logo() {
  return <img src={logoImg} alt="Evnto" className="h-10 w-auto" />;
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-full border border-foreground/15 p-0.5 text-xs font-semibold">
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition-colors ${lang === "en" ? "bg-foreground text-background" : "text-foreground/60"}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ar")}
        className={`rounded-full px-3 py-1 transition-colors ${lang === "ar" ? "bg-foreground text-background" : "text-foreground/60"}`}
      >
        AR
      </button>
    </div>
  );
}

function Header({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: Dict }) {
  const links = [t.nav.home, t.nav.browse, t.nav.about, t.nav.venues, t.nav.contact];
  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch lang={lang} setLang={setLang} />
          <button className="hidden text-sm font-medium text-foreground/80 hover:text-foreground sm:inline">{t.signIn}</button>
          <button
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm"
            style={{ background: "var(--gradient-cta)" }}
          >
            {t.addVendor}
          </button>
        </div>
      </div>
    </header>
  );
}

function Feature({ color, icon, title, sub }: { color: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-foreground/55">{sub}</p>
      </div>
    </div>
  );
}

function SearchField({ icon, label, placeholder }: { icon: React.ReactNode; label: string; placeholder: string }) {
  return (
    <div className="rounded-xl px-4 py-2 hover:bg-muted/50">
      <p className="text-xs font-semibold text-foreground/70">{label}</p>
      <div className="mt-1 flex items-center gap-2 text-foreground/50">
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40" placeholder={placeholder} />
        <span>{icon}</span>
      </div>
    </div>
  );
}

function DateField({ label, placeholder }: { label: string; placeholder: string }) {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="rounded-xl px-4 py-2 text-left hover:bg-muted/50">
          <p className="text-xs font-semibold text-foreground/70">{label}</p>
          <div className="mt-1 flex items-center gap-2 text-foreground/50">
            <span className={cn("w-full text-sm", !date && "text-foreground/40")}>
              {date ? format(date, "PPP") : placeholder}
            </span>
            <CalendarIcon className="h-4 w-4" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3 pointer-events-auto" />
      </PopoverContent>
    </Popover>
  );
}

function Hero({ t }: { t: Dict }) {
  const featureIcons = [
    { color: "oklch(0.7 0.18 10)", icon: <ShieldCheck className="h-4 w-4 text-white" /> },
    { color: "oklch(0.58 0.2 305)", icon: <Briefcase className="h-4 w-4 text-white" /> },
    { color: "oklch(0.78 0.17 45)", icon: <BookOpen className="h-4 w-4 text-white" /> },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 pt-10 pb-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-pink-500">{t.tagline}</p>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl">
            {t.heroTitle1}
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-text)" }}>
              {t.heroTitleHighlight}
            </span>{" "}
            {t.heroTitle2}
          </h1>
          <p className="mt-5 max-w-md text-base text-foreground/60">{t.heroSub1}</p>
          <p className="mt-1 max-w-md text-base text-foreground/60">{t.heroSub2}</p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            {t.features.map((f, i) => (
              <Feature key={i} color={featureIcons[i].color} icon={featureIcons[i].icon} title={f.title} sub={f.sub} />
            ))}
          </div>
        </div>

        <div className="relative h-[480px] w-full">
          <div className="absolute left-0 top-0 h-[280px] w-[52%] overflow-hidden rounded-3xl shadow-xl">
            <img src={heroWedding} alt="Wedding" className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-0 top-[20px] h-[260px] w-[44%] overflow-hidden rounded-3xl shadow-xl">
            <img src={heroConference} alt="Conference" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 h-[180px] w-[32%] overflow-hidden rounded-3xl shadow-xl">
            <img src={heroConcert} alt="Concert" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-[34%] h-[180px] w-[32%] overflow-hidden rounded-3xl shadow-xl">
            <img src={heroReception} alt="Reception" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[180px] w-[32%] overflow-hidden rounded-3xl shadow-xl">
            <img src={heroCrowd} alt="Crowd" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-white p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <SearchField icon={<MapPin className="h-4 w-4" />} label={t.search.location} placeholder={t.search.locationPh} />
          <DateField label={t.search.date} placeholder={t.search.datePh} />
          <SearchField icon={<ChevronDown className="h-4 w-4" />} label={t.search.services} placeholder={t.search.servicesPh} />
          <SearchField icon={<Users className="h-4 w-4" />} label={t.search.guests} placeholder={t.search.guestsPh} />
          <button
            className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            style={{ background: "var(--gradient-cta)" }}
          >
            <Search className="h-4 w-4" /> {t.search.btn}
          </button>
        </div>
      </div>
    </section>
  );
}

const serviceMeta = [
  { color: "oklch(0.58 0.2 305)", Icon: Building2 },
  { color: "oklch(0.78 0.17 45)", Icon: UtensilsCrossed },
  { color: "oklch(0.7 0.18 10)", Icon: Cake },
  { color: "oklch(0.68 0.2 350)", Icon: Music },
  { color: "oklch(0.72 0.17 160)", Icon: Flower2 },
  { color: "oklch(0.65 0.18 240)", Icon: Camera },
  { color: "oklch(0.78 0.17 45)", Icon: Scissors },
  { color: "oklch(0.7 0.18 10)", Icon: Mail },
];

function Services({ t }: { t: Dict }) {
  return (
    <section
      className="mt-8 px-6 py-16"
      style={{ background: "linear-gradient(180deg, oklch(0.97 0.025 25), oklch(0.985 0.012 30))" }}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">{t.servicesTitle}</h2>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {t.services.map((name, i) => {
            const { Icon, color } = serviceMeta[i];
            return (
              <div key={name} className="flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-foreground">{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ t }: { t: Dict }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">{t.testimonialsTitle}</h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {t.testimonials.map((r) => (
            <div key={r.name} className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm leading-relaxed text-foreground/75">"{r.text}"</p>
              <p className="mt-4 text-sm font-semibold text-foreground">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ t }: { t: Dict }) {
  return (
    <section className="px-6 pb-16">
      <div
        className="mx-auto max-w-5xl rounded-3xl px-8 py-14 text-center text-white shadow-xl"
        style={{ background: "var(--gradient-cta)" }}
      >
        <h2 className="text-3xl font-bold md:text-4xl">{t.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">{t.ctaSub}</p>
        <button className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold text-foreground shadow hover:bg-white/90">
          {t.ctaBtn}
        </button>
      </div>
    </section>
  );
}

function Footer({ t }: { t: Dict }) {
  const cols = [
    { title: t.footer.company, items: [t.footer.links.about, t.footer.links.careers, t.footer.links.press] },
    { title: t.footer.support, items: [t.footer.links.help, t.footer.links.contact, t.footer.links.faq] },
    { title: t.footer.legal, items: [t.footer.links.privacy, t.footer.links.terms, t.footer.links.cookies] },
  ];
  return (
    <footer className="border-t border-foreground/10 bg-background px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-foreground/60">{t.footer.tagline}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-foreground">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-foreground/60 hover:text-foreground">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-center text-xs text-foreground/50">{t.footer.rights}</p>
    </footer>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  const isAr = lang === "ar";

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", isAr ? "rtl" : "ltr");
    html.setAttribute("lang", lang);
    html.style.fontFamily = isAr
      ? "'Tajawal', system-ui, sans-serif"
      : "'Inter', system-ui, sans-serif";
  }, [isAr, lang]);

  return (
    <main
      className="min-h-screen bg-background transition-[opacity,transform] duration-300"
      key={lang}
      style={{ animation: "fadeIn 0.35s ease both" }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0.4; } to { opacity: 1; } }`}</style>
      <Header lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Services t={t} />
      <Testimonials t={t} />
      <CTA t={t} />
      <Footer t={t} />
    </main>
  );
}
