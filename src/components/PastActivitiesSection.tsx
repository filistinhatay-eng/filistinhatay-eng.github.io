import React from 'react';
import { ActivityItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Clock, Award, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PastActivitiesSectionProps {
  activities: ActivityItem[];
}

export const PastActivitiesSection: React.FC<PastActivitiesSectionProps> = ({ activities }) => {
  const { getText, t, dir, language } = useLanguage();
  
  // Filter for activities that are explicitly past/completed
  const pastActivities = activities.filter(item => item.isPast);

  // Helper to split a date "YYYY-MM-DD" into Month and Day for visual calendar badges
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return { year: '', month: '', day: '' };
    
    const monthsAr = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const monthsTr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    const year = parts[0];
    const monthName = dir === 'rtl' ? monthsAr[monthIndex] : monthsTr[monthIndex];

    return { year, month: monthName, day };
  };

  return (
    <div id="past-activities-section-root" className="space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Award className="w-6 h-6 text-amber-600" />
          <span>{t('pastActivities')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
          {language === 'ar' 
            ? 'سجل حافل بالنشاطات والفعاليات الثقافية والاجتماعية والرياضية التي نظمها التجمع لخدمة طلابنا وتعزيز روابطنا.' 
            : 'Topluluğumuzun öğrencilerimize hizmet etmek ve bağlarımızı güçlendirmek için düzenlediği kültürel, sosyal ve sportif faaliyetlerin arşivi.'}
        </p>
        <div className="star-divider !my-4 opacity-50" />
      </div>

      {/* Past Activities Grid Layout */}
      {pastActivities.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          {language === 'ar' ? 'لا توجد أنشطة سابقة مضافة بعد.' : 'Henüz geçmiş etkinlik eklenmedi.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pastActivities.map((item, idx) => {
            const cal = parseDate(item.date);

            return (
              <motion.div
                id={`past-activity-card-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-amber-500/40 hover:shadow-md transition duration-300 flex flex-col sm:flex-row group relative"
              >
                {/* Corner Ornament */}
                <div className="ornament-tatreez-corner" />
                
                {/* Event Image & Calendar Badge Overlay */}
                <div className="relative w-full sm:w-48 aspect-video sm:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={getText(item.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  
                  {/* Visual Calendar Badge Overlay */}
                  <div className={`absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'} bg-white/95 rounded-xl border border-slate-200 shadow-md flex flex-col items-center p-2 min-w-[55px] backdrop-blur`}>
                    <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">{cal.month}</span>
                    <span className="text-lg font-extrabold text-slate-900 leading-none mt-0.5">{cal.day}</span>
                    <span className="text-[9px] text-slate-400 font-mono mt-1">{cal.year}</span>
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4 relative z-10">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {/* Category/Completed Indicator */}
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-amber-100">
                        ✓ {language === 'ar' ? 'فعالية مكتملة' : 'Tamamlanmış Etkinlik'}
                      </span>
                      <span className="text-amber-500 text-xs">✦</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-amber-600 transition">
                      {getText(item.title)}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 text-justify">
                      {getText(item.description)}
                    </p>
                  </div>

                  {/* Logistics Badges */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold select-none">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{item.time || '12:00 - 15:00'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">
                          {language === 'ar' ? 'ناجحة ومنجزة' : 'Başarıyla Gerçekleşti'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5 text-[10px] text-slate-500 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{getText(item.location)}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
};
