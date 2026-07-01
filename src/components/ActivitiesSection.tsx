import React, { useState } from 'react';
import { ActivityItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, Ticket, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActivitiesSectionProps {
  activities: ActivityItem[];
  registerForActivity: (activityId: string, registration: { name: string; studentId: string; phone: string; email: string }) => boolean;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities, registerForActivity }) => {
  const { getText, t, dir, language } = useLanguage();
  const [registeringActivity, setRegisteringActivity] = useState<ActivityItem | null>(null);
  
  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [formError, setFormError] = useState('');

  const handleOpenRegistration = (item: ActivityItem) => {
    setRegisteringActivity(item);
    setFullName('');
    setStudentId('');
    setEmail('');
    setPhone('');
    setSuccessMessage(false);
    setFormError('');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError(t('invalidCredentials')); // simplified error key
      return;
    }

    if (!registeringActivity) return;

    const registrationData = {
      name: fullName.trim(),
      studentId: '',
      email: '',
      phone: ''
    };

    const success = registerForActivity(registeringActivity.id, registrationData);
    if (success) {
      setSuccessMessage(true);
      setTimeout(() => {
        setRegisteringActivity(null);
        setSuccessMessage(false);
      }, 2500);
    } else {
      setFormError(t('registrationClosed'));
    }
  };

  // Helper to split a date "YYYY-MM-DD" into Month and Day for visual calendar badges
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return { year: '', month: '', day: '' };
    
    // Month name translation map
    const monthsAr = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const monthsTr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    const year = parts[0];
    const monthName = dir === 'rtl' ? monthsAr[monthIndex] : monthsTr[monthIndex];

    return { year, month: monthName, day };
  };

  return (
    <div id="activities-section-root" className="space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Ticket className="w-6 h-6 text-red-600" />
          <span>{t('unionEvents')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
          {t('eventsSub')}
        </p>
        <div className="star-divider !my-4 opacity-50" />
      </div>

      {/* Activities Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activities.map((item, idx) => {
          const cal = parseDate(item.date);
          const spotsLeft = item.maxSeats ? item.maxSeats - item.registeredCount : null;
          const isFull = spotsLeft !== null && spotsLeft <= 0;

          return (
            <motion.div
              id={`activity-card-${item.id}`}
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
                  <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest">{cal.month}</span>
                  <span className="text-lg font-extrabold text-slate-900 leading-none mt-0.5">{cal.day}</span>
                  <span className="text-[9px] text-slate-400 font-mono mt-1">{cal.year}</span>
                </div>
              </div>

              {/* Event Details Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4 relative z-10">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    {/* Category Indicator */}
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-red-100">
                      🇵🇸 {language === 'ar' ? 'فعالية فلسطينية' : 'Filistin Etkinliği'}
                    </span>
                    <span className="text-amber-500 text-xs">✦</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-red-600 transition">
                    {getText(item.title)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 text-justify">
                    {getText(item.description)}
                  </p>
                </div>

                {/* Logistics Badges & Action */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold select-none">
                    <Clock className="w-3.5 h-3.5 text-red-600" />
                    <span>{item.time || '12:00 - 15:00'}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-[10px] text-slate-500 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{getText(item.location)}</span>
                  </div>

                  {/* Register Trigger button */}
                  {item.registrationEnabled && (
                    <div className="pt-1 select-none">
                      {isFull ? (
                        <button
                          id={`reg-btn-closed-${item.id}`}
                          disabled
                          className="w-full text-center py-2 rounded-xl bg-slate-150 text-slate-400 text-xs font-extrabold border border-slate-200 cursor-not-allowed"
                        >
                          {t('registrationClosed')}
                        </button>
                      ) : (
                        <button
                          id={`reg-btn-open-${item.id}`}
                          onClick={() => handleOpenRegistration(item)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold transition duration-150 shadow-sm cursor-pointer hover:shadow-red-700/10 hover:shadow-md"
                        >
                          <span>{t('registerNow')}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Registration Modal Dialog Overlay with Traditional Arabesque styling */}
      <AnimatePresence>
        {registeringActivity && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            
            <motion.div
              id="registration-modal"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-md w-full border-2 border-amber-500/30 shadow-xl overflow-hidden relative"
            >
              
              {/* Modal Flag Accent Line */}
              <div className="h-1.5 bg-gradient-to-r from-red-700 via-red-600 to-amber-500 w-full"></div>

              {/* Corner pattern */}
              <div className="absolute top-6 right-6 w-1 h-1 bg-amber-400 rotate-45 pointer-events-none" />

              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>{t('eventRegistration')}</span>
                  </h3>
                  <p className="text-xs text-red-600 font-extrabold mt-1">
                    {getText(registeringActivity.title)}
                  </p>
                </div>
                <button
                  id="close-reg-modal"
                  onClick={() => setRegisteringActivity(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body / Form */}
              <div className="p-6">
                {successMessage ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                    <p className="text-sm sm:text-base font-extrabold text-slate-900">
                      {t('registeredSuccess')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs sm:text-sm">
                    
                    {formError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-extrabold">
                        {formError}
                      </div>
                    )}

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-extrabold text-xs">{t('fullName')}</label>
                      <input
                        id="reg-input-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Ahmad Al-Saeed"
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 text-xs"
                      />
                    </div>

                    {/* Buttons panel */}
                    <div className="pt-4 flex gap-2 justify-end select-none">
                      <button
                        id="reg-cancel-btn"
                        type="button"
                        onClick={() => setRegisteringActivity(null)}
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-slate-700 transition text-xs"
                      >
                        {t('cancel')}
                      </button>
                      <button
                        id="reg-submit-btn"
                        type="submit"
                        className="px-5 py-2 bg-red-700 hover:bg-red-800 rounded-xl font-bold text-white transition shadow-sm text-xs"
                      >
                        {t('submitRegistration')}
                      </button>
                    </div>

                  </form>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
