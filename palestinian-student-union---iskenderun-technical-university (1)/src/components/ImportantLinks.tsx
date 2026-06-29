import React from 'react';
import { ImportantLink } from '../types';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';
import { ExternalLink, Link2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ImportantLinksProps {
  links: ImportantLink[];
}

// Helper to resolve string icon name to a Lucide icon component
const IconRenderer: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  // @ts-ignore
  const LucideIcon = Icons[name];
  if (!LucideIcon) {
    return <Link2 className={className} />;
  }
  return <LucideIcon className={className} />;
};

export const ImportantLinks: React.FC<ImportantLinksProps> = ({ links }) => {
  const { getText, t, language } = useLanguage();

  return (
    <div id="links-section-root" className="space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Link2 className="w-6 h-6 text-red-600" />
          <span>{t('usefulPortals')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
          {t('portalsSub')}
        </p>
        <div className="star-divider !my-4 opacity-50" />
      </div>

      {/* Links Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, idx) => (
          <motion.a
            id={`link-card-${link.id}`}
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-500/40 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Red-Green Accent Tag on Hover */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-emerald-600 to-amber-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>

            {/* Corner Ornaments */}
            <div className="ornament-tatreez-corner" />

            <div className="space-y-4">
              {/* Icon Container */}
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shadow-inner group-hover:bg-red-700 group-hover:text-white transition duration-300">
                <IconRenderer name={link.iconName} className="w-5 h-5" />
              </div>

              {/* Text content */}
              <div className="space-y-1.5 relative z-10">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-red-600 transition leading-snug">
                  {getText(link.title)}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {getText(link.description)}
                </p>
              </div>
            </div>

            {/* Link Anchor Indicator */}
            <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-red-600 transition select-none relative z-10">
              <span className="truncate max-w-[180px] font-mono text-[10px] font-normal text-slate-400">
                {link.url.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
              <span className="flex items-center gap-1 font-extrabold text-red-600 group-hover:underline">
                <span>{t('visitSite')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>

          </motion.a>
        ))}
      </div>

    </div>
  );
};
