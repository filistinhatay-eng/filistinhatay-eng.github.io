import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NewsItem, ActivityItem, ImportantLink } from '../types';
import { 
  ArrowRight, Newspaper, Calendar, Link2, BookOpen, 
  Users, Award, ShieldAlert, GraduationCap, ArrowUpRight, Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  news: NewsItem[];
  activities: ActivityItem[];
  links: ImportantLink[];
  setCurrentTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ news, activities, links, setCurrentTab }) => {
  const { t, getText, dir, language } = useLanguage();

  const latestNews = news.slice(0, 2);
  const upcomingActivities = activities.filter(a => !a.isPast);
  const featuredActivity = upcomingActivities[0];
  const pastActivitiesHighlight = activities.filter(a => a.isPast).slice(0, 2);
  const quickLinks = links.slice(0, 3);

  // Custom traditional star/diamond divider component
  const OrnateDivider = () => (
    <div className="flex items-center justify-center gap-3 my-2 select-none">
      <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/40" />
      <span className="text-amber-500 text-[10px] tracking-widest">✦ 🌟 ✦</span>
      <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/40" />
    </div>
  );

  return (
    <div id="home-page-root" className="space-y-12">
      
      {/* Premium Elegant Hero Section with Islamic/Arabesque Geometric Background & Ornaments */}
      <section className="relative overflow-hidden bg-burgundy-950 text-white rounded-3xl border-2 border-burgundy-700/50 shadow-xl p-6 sm:p-10 md:p-12 lg:py-20">
        
        {/* Real background image overlay inside hero */}
        <div className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop")' }}></div>
        
        {/* Background Decorative Arabesque Geometric SVG Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f59e0b" strokeWidth="1"/>
                <path d="M 0 0 L 40 40 M 40 0 L 0 40" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.2"/>
                <circle cx="20" cy="20" r="4" fill="none" stroke="#f59e0b" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Elegant corner ornaments inside the hero card */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-500/50 rounded-tr-xl pointer-events-none hidden sm:block" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-500/50 rounded-bl-xl pointer-events-none hidden sm:block" />
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500/20 rounded-tl-xl pointer-events-none hidden sm:block" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500/20 rounded-br-xl pointer-events-none hidden sm:block" />

        {/* Sleek premium gold side accent bar */}
        <div className={`absolute top-0 bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-1.5 bg-gradient-to-b from-amber-500 via-burgundy-700 to-amber-500 select-none`} />

        {/* Hero content */}
        <div className="relative max-w-4xl space-y-6 md:pl-6">
          <div className="inline-flex items-center gap-2 bg-burgundy-950/70 text-amber-400 text-[10px] sm:text-xs font-extrabold px-4 py-1.5 rounded-full border border-amber-500/30 uppercase tracking-widest select-none shadow-inner backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{t('portalTitle')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
            <span className="bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
              {t('welcomeHeader')}
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl text-justify">
            {t('welcomeSub')}
          </p>

          <div className="star-divider !my-6 opacity-35" />

          <div className="pt-2 flex flex-wrap gap-3.5 select-none">
            <button
              id="hero-explore-news-btn"
              onClick={() => setCurrentTab('news')}
              className="flex items-center gap-2 px-6 py-3 bg-burgundy-700 hover:bg-burgundy-800 hover:shadow-lg hover:shadow-burgundy-700/20 text-white font-extrabold text-xs sm:text-sm rounded-xl transition duration-200"
            >
              <span>{t('learnMore')}</span>
              <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
            <button
              id="hero-explore-univ-btn"
              onClick={() => setCurrentTab('university')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900/80 hover:bg-slate-850 hover:border-amber-500/50 text-slate-100 font-extrabold text-xs sm:text-sm rounded-xl border border-slate-800 transition duration-200 backdrop-blur-sm"
            >
              <span>{t('university')}</span>
            </button>
          </div>
        </div>

      </section>

      {/* Grid: News Snippets & Featured Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Latest News Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3 select-none">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-burgundy-700" />
              <span>{t('news')}</span>
              <span className="text-[10px] text-amber-600 font-bold bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">✦ {language === 'ar' ? 'الجديد' : 'Yeni'}</span>
            </h3>
            <button
              id="home-view-all-news"
              onClick={() => setCurrentTab('news')}
              className="text-xs font-extrabold text-burgundy-700 hover:text-burgundy-800 hover:underline flex items-center gap-1"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {latestNews.map(item => (
              <div
                id={`home-news-snippet-${item.id}`}
                key={item.id}
                onClick={() => setCurrentTab('news')}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-burgundy-700/40 hover:shadow-md transition duration-300 cursor-pointer flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                {/* Traditional Corner Motif ornament inside card */}
                <div className="ornament-tatreez-corner" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-burgundy-700 bg-burgundy-50 px-2.5 py-0.5 rounded-md border border-burgundy-100/50 font-extrabold">
                      {getText(item.category)}
                    </span>
                    <span className="text-amber-500 text-xs">✦</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-burgundy-700 transition line-clamp-2 leading-snug">
                    {getText(item.title)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed text-justify">
                    {getText(item.content)}
                  </p>
                </div>
                
                <div className="text-[10px] text-slate-400 font-bold pt-3.5 border-t border-slate-100 flex items-center justify-between select-none relative z-10">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                  <span className="text-burgundy-700 font-extrabold group-hover:translate-x-1 transition-transform">{language === 'ar' ? 'عرض التفاصيل ←' : 'Detayları Gör →'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Activity Column */}
        {featuredActivity && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 select-none">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-burgundy-700" />
                <span>{t('activities')}</span>
              </h3>
              <button
                id="home-view-all-acts"
                onClick={() => setCurrentTab('activities')}
                className="text-xs font-extrabold text-burgundy-700 hover:text-burgundy-800 hover:underline flex items-center gap-1"
              >
                <span>{t('viewAll')}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div
              id={`home-activity-snippet-${featuredActivity.id}`}
              onClick={() => setCurrentTab('activities')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-burgundy-700/40 hover:shadow-md transition duration-300 cursor-pointer flex flex-col group relative"
            >
              {/* Corner Ornament */}
              <div className="ornament-tatreez-corner" />

              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img
                  src={featuredActivity.image}
                  alt={getText(featuredActivity.title)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-burgundy-950/90 text-amber-400 text-[10px] font-extrabold px-3 py-1 rounded-lg backdrop-blur border border-amber-500/20 select-none">
                  {featuredActivity.date}
                </span>
              </div>
              <div className="p-5 space-y-3.5 relative z-10">
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-burgundy-700 transition line-clamp-1 leading-snug">
                  {getText(featuredActivity.title)}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed text-justify">
                  {getText(featuredActivity.description)}
                </p>
                
                <OrnateDivider />

                <div className="text-[11px] text-burgundy-700 font-bold pt-2 flex items-center justify-between select-none">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 border border-slate-200/60 font-bold">{getText(featuredActivity.location)}</span>
                  <span className="flex items-center gap-1 text-burgundy-700 font-extrabold group-hover:underline">
                    <span>{t('registerNow')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Quick Access Portals Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 select-none">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-burgundy-700" />
            <span>{t('links')}</span>
          </h3>
          <button
            id="home-view-all-links"
            onClick={() => setCurrentTab('links')}
            className="text-xs font-extrabold text-burgundy-700 hover:text-burgundy-800 hover:underline flex items-center gap-1"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {quickLinks.map(link => (
            <a
              id={`home-link-snippet-${link.id}`}
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-burgundy-700/40 hover:shadow-md shadow-sm transition duration-200 flex items-center gap-4 group relative overflow-hidden"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-burgundy-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-burgundy-700 group-hover:text-white transition duration-300 shrink-0 border border-slate-100 shadow-inner">
                <Link2 className="w-4 h-4" />
              </div>
              <div className="truncate relative z-10 flex-1">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 block truncate group-hover:text-burgundy-700 transition">{getText(link.title)}</span>
                <span className="text-[10px] text-slate-400 block truncate font-mono mt-0.5">{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
              <span className="text-amber-500 opacity-30 group-hover:opacity-100 transition-opacity text-xs">✦</span>
            </a>
          ))}
        </div>
      </section>

      {/* Past Activities Highlight */}
      {pastActivitiesHighlight.length > 0 && (
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3 select-none">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-burgundy-700" />
              <span>{language === 'ar' ? 'من أنشطتنا السابقة' : 'Geçmiş Etkinliklerimizden'}</span>
            </h3>
            <button
              id="home-view-all-past-acts"
              onClick={() => setCurrentTab('pastActivities')}
              className="text-xs font-extrabold text-burgundy-700 hover:text-burgundy-800 hover:underline flex items-center gap-1"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastActivitiesHighlight.map(act => (
              <div
                id={`home-past-act-${act.id}`}
                key={act.id}
                onClick={() => setCurrentTab('pastActivities')}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-burgundy-700/40 hover:shadow-md transition duration-300 cursor-pointer flex flex-col sm:flex-row group relative"
              >
                <div className="ornament-tatreez-corner" />
                <div className="w-full sm:w-32 aspect-video sm:aspect-auto bg-slate-100 overflow-hidden shrink-0 relative">
                  <img
                    src={act.image}
                    alt={getText(act.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div className="space-y-1">
                    <span className="inline-block bg-amber-50 text-amber-700 text-[9px] font-extrabold px-2 py-0.5 rounded border border-amber-100">
                      ✓ {language === 'ar' ? 'تمت بنجاح' : 'Gerçekleşti'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-burgundy-700 transition line-clamp-1 leading-snug">
                      {getText(act.title)}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed text-justify">
                      {getText(act.description)}
                    </p>
                  </div>
                  <div className="text-[9px] text-slate-400 font-semibold pt-2 flex items-center gap-3">
                    <span>{act.date}</span>
                    <span>•</span>
                    <span className="truncate">{getText(act.location)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Beautiful Academic Statistics Cards with Islamic Star Borders */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 select-none pt-4">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 relative shadow-sm hover:border-burgundy-700/30 transition duration-300">
          <div className="absolute top-2 right-2 w-1 h-1 bg-amber-400 rotate-45" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-burgundy-700 rotate-45" />
          <GraduationCap className="w-7 h-7 text-burgundy-700 mx-auto" />
          <span className="block text-2xl font-extrabold text-slate-900">1</span>
          <span className="block text-[10px] text-slate-500 font-extrabold uppercase tracking-wide leading-relaxed">
            {language === 'ar' ? 'تجمع معتمد' : 'Onaylı Topluluk'}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 relative shadow-sm hover:border-burgundy-700/30 transition duration-300">
          <div className="absolute top-2 right-2 w-1 h-1 bg-amber-400 rotate-45" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-burgundy-700 rotate-45" />
          <BookOpen className="w-7 h-7 text-burgundy-700 mx-auto" />
          <span className="block text-2xl font-extrabold text-slate-900">100%</span>
          <span className="block text-[10px] text-slate-500 font-extrabold uppercase tracking-wide leading-relaxed">
            {language === 'ar' ? 'دعم أكاديمي' : 'Akademik Destek'}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 relative shadow-sm hover:border-burgundy-700/30 transition duration-300">
          <div className="absolute top-2 right-2 w-1 h-1 bg-amber-400 rotate-45" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-burgundy-700 rotate-45" />
          <Users className="w-7 h-7 text-burgundy-700 mx-auto" />
          <span className="block text-2xl font-extrabold text-slate-900">10+</span>
          <span className="block text-[10px] text-slate-500 font-extrabold uppercase tracking-wide leading-relaxed">
            {language === 'ar' ? 'تخصصات وكليات' : 'Bölüm & Fakülte'}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 relative shadow-sm hover:border-burgundy-700/30 transition duration-300">
          <div className="absolute top-2 right-2 w-1 h-1 bg-amber-400 rotate-45" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-burgundy-700 rotate-45" />
          <Award className="w-7 h-7 text-burgundy-700 mx-auto" />
          <span className="block text-2xl font-extrabold text-slate-900">3+</span>
          <span className="block text-[10px] text-slate-500 font-extrabold uppercase tracking-wide leading-relaxed">
            {language === 'ar' ? 'فعاليات سنوية' : 'Yıllık Faaliyet'}
          </span>
        </div>

      </section>

    </div>
  );
};
