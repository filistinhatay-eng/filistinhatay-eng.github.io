import React, { useState, useEffect } from 'react';
import { TopAnnouncement } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Megaphone, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnnouncementBannerProps {
  announcements: TopAnnouncement[];
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ announcements }) => {
  const { getText, language, dir, t } = useLanguage();
  const activeAnnouncements = announcements.filter(ann => ann.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (activeAnnouncements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeAnnouncements.length]);

  if (!isVisible || activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[currentIndex];

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-burgundy-700 text-white';
      case 'warning':
        return 'bg-amber-500 text-slate-900';
      default:
        return 'bg-burgundy-800 text-white';
    }
  };

  const nextAnn = () => {
    setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
  };

  const prevAnn = () => {
    setCurrentIndex((prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length);
  };

  return (
    <div id="announcement-banner-container" className="bg-slate-900 border-b border-burgundy-950 text-white relative py-2.5 px-4 overflow-hidden shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side: Indicator Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm ${getTypeStyle(current.type)}`}>
            <Megaphone className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline text-[11px]">{t('announcementsTitle')}</span>
          </span>
        </div>

        {/* Center: Scrolling / Animated Announcement Text */}
        <div className="flex-1 overflow-hidden relative min-h-[22px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: dir === 'rtl' ? 10 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir === 'rtl' ? -10 : 10 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm font-medium text-slate-100 text-center select-none"
            >
              {getText(current.text)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Controls and Close */}
        <div className="flex items-center gap-2 shrink-0 select-none">
          {activeAnnouncements.length > 1 && (
            <div className="flex items-center gap-1 bg-slate-800/80 rounded-md p-0.5 border border-slate-700">
              <button 
                id="ann-prev-btn"
                onClick={prevAnn} 
                className="hover:text-burgundy-400 p-0.5 rounded transition"
                title="Previous"
              >
                {dir === 'rtl' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <span className="text-[10px] font-mono text-slate-400 px-1">
                {currentIndex + 1}/{activeAnnouncements.length}
              </span>
              <button 
                id="ann-next-btn"
                onClick={nextAnn} 
                className="hover:text-burgundy-400 p-0.5 rounded transition"
                title="Next"
              >
                {dir === 'rtl' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          )}
          <button 
            id="ann-close-btn"
            onClick={() => setIsVisible(false)} 
            className="text-slate-400 hover:text-white p-1 rounded transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
