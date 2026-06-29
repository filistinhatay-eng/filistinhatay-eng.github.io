import React, { useState } from 'react';
import { UniversityInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, GraduationCap, Building2, History, ChevronDown, ChevronUp, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UniversityInfoSectionProps {
  info: UniversityInfo;
}

export const UniversityInfoSection: React.FC<UniversityInfoSectionProps> = ({ info }) => {
  const { getText, t, dir, language } = useLanguage();
  const [expandedFacultyIndex, setExpandedFacultyIndex] = useState<number | null>(0);

  const toggleFaculty = (idx: number) => {
    setExpandedFacultyIndex(expandedFacultyIndex === idx ? null : idx);
  };

  return (
    <div id="univ-section-root" className="space-y-10">
      
      {/* Banner / Header */}
      <div className="relative bg-slate-950 rounded-3xl overflow-hidden shadow-xl text-white border-2 border-amber-500/30">
        
        {/* Background grid overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="univGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f59e0b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#univGrid)" />
          </svg>
        </div>

        {/* Sleek Golden/Amber Premium Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-red-700 to-amber-500"></div>

        <div className="relative p-8 sm:p-10 md:p-12 space-y-4 max-w-4xl z-10">
          <span className="inline-flex items-center gap-1.5 bg-slate-900/50 text-amber-400 text-[10px] sm:text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest select-none shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{t('universitySubTitle')}</span>
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
            {t('aboutIste')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
            {getText(info.description)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Center Columns: History & Faculties */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* History / Vision Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden group">
            {/* Corner ornament */}
            <div className="ornament-tatreez-corner" />
            
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <History className="w-5 h-5 text-red-600" />
              <span>{t('historyTitle')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify whitespace-pre-line relative z-10">
              {getText(info.history)}
            </p>
          </div>

          {/* Academic Faculties Accordion */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-red-600" />
                <span>{t('facultiesTitle')}</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-extrabold">{t('facultiesSub')}</p>
            </div>

            {/* Accordions list */}
            <div className="space-y-3">
              {info.faculties.map((fac, idx) => {
                const isExpanded = expandedFacultyIndex === idx;
                return (
                  <div
                    id={`faculty-accordion-${idx}`}
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-amber-500/20 transition-all duration-200"
                  >
                    {/* Header trigger */}
                    <button
                      id={`faculty-accordion-trigger-${idx}`}
                      onClick={() => toggleFaculty(idx)}
                      className="w-full p-5 flex items-center justify-between text-start font-extrabold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 transition"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-amber-500">✦</span>
                        <span>{getText(fac.name)}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-red-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>

                    {/* Expandable Departments List */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`faculty-accordion-body-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-slate-100 bg-slate-50/40"
                        >
                          <div className="p-5 space-y-3">
                            <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                              {t('departmentsTitle')}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                              {fac.departments.map((dept, deptIdx) => (
                                <div key={deptIdx} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-150/80 text-xs text-slate-700 hover:border-burgundy-200 transition">
                                  <div className="w-1.5 h-1.5 rounded-full bg-burgundy-700 shrink-0"></div>
                                  <span className="font-bold">{getText(dept)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Address and Map */}
        <div className="space-y-8">
          
          {/* Contacts info card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden group">
            {/* Side glow bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-burgundy-700" />

            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-1.5">
              <span>✦</span>
              <span>{t('contactTitle')}</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-burgundy-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block font-extrabold text-slate-800">{t('contactAddress')}</span>
                  <span className="text-slate-500 leading-relaxed">{getText(info.address)}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-burgundy-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block font-extrabold text-slate-800">{t('contactPhone')}</span>
                  <span className="text-slate-500 font-mono" dir="ltr">{info.contactPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-burgundy-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block font-extrabold text-slate-800">{t('contactEmail')}</span>
                  <span className="text-slate-500">{info.contactEmail}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 select-none">
              <a
                id="univ-website-link"
                href="https://iste.edu.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-slate-300 rounded-xl text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition shadow-sm"
              >
                <Globe className="w-4 h-4 text-burgundy-700" />
                <span>iste.edu.tr</span>
              </a>
            </div>
          </div>

          {/* Map Embed card */}
          {info.mapEmbedUrl && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest select-none">
                ✦ {t('findOnMap')}
              </span>
              <div className="rounded-xl overflow-hidden border border-slate-200 h-60 bg-slate-50">
                <iframe
                  id="univ-map-iframe"
                  src={info.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="İSTE Map Location"
                ></iframe>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
