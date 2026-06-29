import React, { useState } from 'react';
import { DeptAnnouncementItem, DriveFile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, Bell, Download, FileText, Calendar, CheckCircle, 
  Folder, ChevronDown, ChevronUp, Cpu, Anchor, 
  Plane, Compass, Globe, Languages, GraduationCap, ChevronLeft, ChevronRight, LayoutGrid, AlertCircle, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeptAnnouncementsSectionProps {
  announcements: DeptAnnouncementItem[];
}

const DEFAULT_FACULTIES = [
  {
    name: { ar: "كلية الهندسة والعلوم الطبيعية", tr: "Mühendislik ve Doğa Bilimleri Fakültesi" },
    departments: [
      { ar: "هندسة الكمبيوتر", tr: "Bilgisayar Mühendisliği" },
      { ar: "الهندسة الكهربائية والإلكترونية", tr: "Elektrik-Elektronik Mühendisliği" },
      { ar: "الهندسة المدنية", tr: "İnşaat Mühendisliği" },
      { ar: "الهندسة الميكانيكية", tr: "Makine Mühendisliği" },
      { ar: "الهندسة الكيميائية", tr: "Kimya Mühendisliği" },
      { ar: "هندسة المعادن والمواد", tr: "Metalurji ve Malzeme Mühendisliği" },
      { ar: "الهندسة الصناعية", tr: "Endüstri Mühendisliği" }
    ]
  },
  {
    name: { ar: "كلية بارباروس خير الدين لبناء السفن والعلوم البحرية", tr: "Barbaros Hayrettin Gemi İnşaatı ve Denizcilik Fakültesi" },
    departments: [
      { ar: "هندسة بناء السفن والآلات البحرية", tr: "Gemi İnşaatı ve Gemi Makineleri Mühendisliği" },
      { ar: "إدارة النقل البحري واللوجستيات", tr: "Deniz Ulaştırma İşletme Mühendisliği" }
    ]
  },
  {
    name: { ar: "كلية الطيران والعلوم الفضائية", tr: "Havacılık ve Uzay Bilimleri Fakültesi" },
    departments: [
      { ar: "إدارة الطيران", tr: "Havacılık Yönetimi" },
      { ar: "هندسة الطيران والـجوفضاء", tr: "Havacılık ve Uzay Mühendisliği" }
    ]
  },
  {
    name: { ar: "كلية العمارة والتصميم", tr: "Mimarlık ve Tasarım Fakültesi" },
    departments: [
      { ar: "الهندسة المعمارية", tr: "Mimarlık" },
      { ar: "عمارة المناظر الطبيعية (اللاندسكيب)", tr: "Peyzaj Mimarlığı" },
      { ar: "التصميم الصناعي", tr: "Endüstriyel Tasarım" }
    ]
  },
  {
    name: { ar: "كلية السياحة", tr: "Turizm Fakültesi" },
    departments: [
      { ar: "الإرشاد السياحي", tr: "Turist Rehberliği" },
      { ar: "إدارة الفنادق والضيافة", tr: "Turizm İşletmeciliği" },
      { ar: "فن الطهي والطهو", tr: "Gastronomi ve Mutfak Sanatları" }
    ]
  },
  {
    name: { ar: "مدرسة اللغات الأجنبية", tr: "Yabancı Diller Yüksekokulu" },
    departments: [
      { ar: "المدرسة التحضيرية للغات", tr: "Hazırlık Sınıfı" }
    ]
  }
];

const getFacultyIcon = (index: number) => {
  switch (index) {
    case 0: return <Cpu className="w-8 h-8 text-burgundy-700 shrink-0" />;
    case 1: return <Anchor className="w-8 h-8 text-burgundy-700 shrink-0" />;
    case 2: return <Plane className="w-8 h-8 text-burgundy-700 shrink-0" />;
    case 3: return <Compass className="w-8 h-8 text-burgundy-700 shrink-0" />;
    case 4: return <Globe className="w-8 h-8 text-burgundy-700 shrink-0" />;
    case 5: return <Languages className="w-8 h-8 text-burgundy-700 shrink-0" />;
    default: return <GraduationCap className="w-8 h-8 text-burgundy-700 shrink-0" />;
  }
};

export const DeptAnnouncementsSection: React.FC<DeptAnnouncementsSectionProps> = ({ announcements }) => {
  const { getText, t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Navigation levels
  // 0 = faculties, 1 = departments of selected faculty, 2 = announcements of selected department
  const [navStage, setNavStage] = useState<0 | 1 | 2>(0);
  const [selectedFaculty, setSelectedFaculty] = useState<typeof DEFAULT_FACULTIES[number] | null>(null);
  const [selectedDept, setSelectedDept] = useState<{ ar: string; tr: string } | null>(null);

  // File download simulation states
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);
  const [downloadSuccessFileId, setDownloadSuccessFileId] = useState<string | null>(null);

  const handleDownloadFile = (file: { id: string; name: string; url: string; size?: string }) => {
    setDownloadingFileId(file.id);
    setTimeout(() => {
      setDownloadingFileId(null);
      setDownloadSuccessFileId(file.id);
      
      try {
        const link = document.createElement('a');
        link.href = file.url === '#' ? 'about:blank' : file.url;
        link.download = file.name;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("File download error:", err);
      }

      setTimeout(() => {
        setDownloadSuccessFileId(null);
      }, 2000);
    }, 1000);
  };

  // Check if an announcement matches search term (Global Search)
  const isSearchActive = searchTerm.trim().length > 0;

  const searchedAnnouncements = announcements.filter((item) => {
    if (!isSearchActive) return false;
    const term = searchTerm.toLowerCase();
    const titleMatch = getText(item.title).toLowerCase().includes(term);
    const descMatch = getText(item.description).toLowerCase().includes(term);
    const deptMatch = getText(item.department).toLowerCase().includes(term);
    const facultyMatch = item.faculty ? getText(item.faculty).toLowerCase().includes(term) : false;
    return titleMatch || descMatch || deptMatch || facultyMatch;
  });

  // Calculate dynamic stats
  const getFacultyAnnouncementsCount = (facName: { ar: string; tr: string }) => {
    return announcements.filter(c => c.faculty && (c.faculty.ar === facName.ar || c.faculty.tr === facName.tr)).length;
  };

  const getDeptAnnouncementsCount = (facName: { ar: string; tr: string }, deptName: { ar: string; tr: string }) => {
    return announcements.filter(c => 
      c.faculty && (c.faculty.ar === facName.ar || c.faculty.tr === facName.tr) &&
      c.department && (c.department.ar === deptName.ar || c.department.tr === deptName.tr)
    ).length;
  };

  // Get announcements of active selection
  const activeSectionAnns = announcements.filter(c => 
    selectedFaculty && c.faculty && (c.faculty.ar === selectedFaculty.name.ar || c.faculty.tr === selectedFaculty.name.tr) &&
    selectedDept && c.department && (c.department.ar === selectedDept.ar || c.department.tr === selectedDept.tr)
  );

  return (
    <div id="dept-announcements-section-root" className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Page Title & Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 select-none">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Bell className="w-6 h-6 text-burgundy-700 animate-bounce" />
          <span>{t('deptAnnouncements')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
          {t('deptAnnouncementsSub')}
        </p>
        <div className="star-divider !my-4 opacity-50" />
      </div>

      {/* Global Search input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 h-[3px] bg-burgundy-700" />
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <LayoutGrid className="w-4 h-4 text-burgundy-700" />
          <span>
            {isSearchActive 
              ? (language === 'ar' ? `نتائج البحث عن "${searchTerm}":` : `"${searchTerm}" için arama sonuçları:`)
              : (language === 'ar' ? 'إعلانات الكليات والأقسام الموجهة بالتحديد' : 'Fakülteler ve Bölümler Özel Duyuru Portalı')
            }
          </span>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            id="dept-anns-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن إعلان، قسم، أو كلية...' : 'Duyuru, bölüm veya fakülte ara...'}
            className="w-full pr-9 pl-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-burgundy-500/20 focus:border-burgundy-600 text-slate-800 font-medium"
          />
        </div>
      </div>

      {/* BREADCRUMBS (Only shown when not searching) */}
      {!isSearchActive && navStage > 0 && (
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-150 select-none">
          <button 
            onClick={() => { setNavStage(0); setSelectedFaculty(null); setSelectedDept(null); }}
            className="hover:text-burgundy-700 transition"
          >
            {language === 'ar' ? 'دليل الإعلانات' : 'Duyuru Paneli'}
          </button>
          
          {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5 text-slate-300" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
          
          <button 
            onClick={() => { setNavStage(1); setSelectedDept(null); }}
            className={`hover:text-burgundy-700 transition truncate max-w-[150px] sm:max-w-none ${navStage === 1 ? 'text-burgundy-700 font-extrabold' : ''}`}
            disabled={navStage === 1}
          >
            {selectedFaculty ? getText(selectedFaculty.name) : ''}
          </button>

          {navStage === 2 && selectedDept && (
            <>
              {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5 text-slate-300" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
              <span className="text-burgundy-700 font-extrabold truncate max-w-[150px] sm:max-w-none">
                {getText(selectedDept)}
              </span>
            </>
          )}
        </nav>
      )}

      {/* MAIN CONTAINER */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {/* SEARCH RESULTS MODE */}
          {isSearchActive ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {searchedAnnouncements.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs font-bold">
                  {language === 'ar' ? 'لم يتم العثور على أي إعلانات مطابقة للبحث.' : 'Arama kriterlerinize uygun duyuru bulunamadı.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchedAnnouncements.map((item) => (
                    <AnnCard 
                      key={item.id}
                      item={item}
                      getText={getText}
                      language={language}
                      t={t}
                      downloadingFileId={downloadingFileId}
                      downloadSuccessFileId={downloadSuccessFileId}
                      handleDownloadFile={handleDownloadFile}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <>
              {/* STAGE 0: FACULTIES GRID */}
              {navStage === 0 && (
                <motion.div
                  key="stage-faculties"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {DEFAULT_FACULTIES.map((faculty, index) => {
                    const annCount = getFacultyAnnouncementsCount(faculty.name);
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -4, scale: 1.01 }}
                        onClick={() => {
                          setSelectedFaculty(faculty);
                          setNavStage(1);
                        }}
                        className="bg-white rounded-2xl border-2 border-slate-150 p-6 shadow-xs hover:border-burgundy-700/35 hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group"
                      >
                        <div className="ornament-tatreez-corner" />
                        <div className="space-y-3 relative z-10">
                          <div className="bg-burgundy-50 p-3 rounded-xl w-fit group-hover:bg-burgundy-700 transition-colors duration-300 group-hover:text-white">
                            {getFacultyIcon(index)}
                          </div>
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-950 group-hover:text-burgundy-700 transition-colors duration-300 leading-snug">
                            {getText(faculty.name)}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-bold text-slate-400 select-none relative z-10">
                          <span>
                            {language === 'ar' ? `${faculty.departments.length} أقسام` : `${faculty.departments.length} Bölüm`}
                          </span>
                          <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[9px] font-extrabold">
                            {language === 'ar' ? `${annCount} إعلانات نشطة` : `${annCount} Aktif Duyuru`}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* STAGE 1: DEPARTMENTS LIST */}
              {navStage === 1 && selectedFaculty && (
                <motion.div
                  key="stage-departments"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 select-none">
                    <h3 className="text-sm font-extrabold text-slate-800">
                      {language === 'ar' ? 'أقسام وتخصصات الكلية' : 'Fakülte Bölümleri'}
                    </h3>
                    <button 
                      onClick={() => { setNavStage(0); setSelectedFaculty(null); }}
                      className="text-[10px] font-extrabold text-burgundy-700 hover:underline bg-burgundy-50 px-2.5 py-1 rounded-md"
                    >
                      {language === 'ar' ? '← العودة للكليات' : '← Fakültelere Dön'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedFaculty.departments.map((dept, idx) => {
                      const annCount = getDeptAnnouncementsCount(selectedFaculty.name, dept);
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => {
                            setSelectedDept(dept);
                            setNavStage(2);
                          }}
                          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-burgundy-700/20 shadow-xs hover:shadow-sm cursor-pointer transition flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Folder className="w-5 h-5 text-amber-500 shrink-0 group-hover:scale-110 transition duration-300" />
                            <span className="text-xs font-extrabold text-slate-800 group-hover:text-burgundy-700 transition leading-snug truncate">
                              {getText(dept)}
                            </span>
                          </div>
                          <span className="bg-slate-50 border border-slate-150 text-slate-500 font-bold px-2 py-0.5 rounded text-[9px] shrink-0">
                            {language === 'ar' ? `${annCount} إعلانات` : `${annCount} Duyuru`}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: ANNOUNCEMENTS LIST */}
              {navStage === 2 && selectedFaculty && selectedDept && (
                <motion.div
                  key="stage-anns"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 select-none">
                    <h3 className="text-sm font-extrabold text-slate-800">
                      {language === 'ar' ? 'إعلانات وتنبيهات القسم' : 'Bölüm Duyuru Listesi'}
                    </h3>
                    <button 
                      onClick={() => { setNavStage(1); setSelectedDept(null); }}
                      className="text-[10px] font-extrabold text-burgundy-700 hover:underline bg-burgundy-50 px-2.5 py-1 rounded-md"
                    >
                      {language === 'ar' ? '← العودة للأقسام' : '← Bölümlere Dön'}
                    </button>
                  </div>

                  {activeSectionAnns.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs font-bold">
                      {t('noDeptAnnouncementsFound')}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeSectionAnns.map((item) => (
                        <AnnCard 
                          key={item.id}
                          item={item}
                          getText={getText}
                          language={language}
                          t={t}
                          downloadingFileId={downloadingFileId}
                          downloadSuccessFileId={downloadSuccessFileId}
                          handleDownloadFile={handleDownloadFile}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ANNOUNCEMENT CARD SUB-COMPONENT */
interface AnnCardProps {
  item: DeptAnnouncementItem;
  getText: (text: any) => string;
  language: string;
  t: (key: string) => string;
  downloadingFileId: string | null;
  downloadSuccessFileId: string | null;
  handleDownloadFile: (file: any) => void;
}

const AnnCard: React.FC<AnnCardProps> = ({
  item, getText, language, t, downloadingFileId, downloadSuccessFileId, handleDownloadFile
}) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-xs hover:border-burgundy-700/30 hover:shadow-sm transition duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group">
      <div className="ornament-tatreez-corner" />
      
      <div className="space-y-4 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] select-none">
          <div className="flex items-center gap-1.5">
            {item.faculty && (
              <span className="bg-slate-50 text-slate-500 font-extrabold px-2 py-0.5 rounded border border-slate-150">
                {getText(item.faculty)}
              </span>
            )}
            <span className="bg-amber-50 text-amber-800 font-extrabold px-2 py-0.5 rounded border border-amber-200/50">
              {getText(item.department)}
            </span>
          </div>
          <span className="bg-red-50 text-red-600 font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <AlertCircle className="w-2.5 h-2.5" />
            <span>{language === 'ar' ? 'هام' : 'Önemli'}</span>
          </span>
        </div>

        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug group-hover:text-burgundy-700 transition-colors">
          {getText(item.title)}
        </h3>

        <p className="text-[11px] text-slate-500 leading-relaxed text-justify whitespace-pre-wrap">
          {getText(item.description)}
        </p>

        {/* External links or attachments */}
        {(item.pdfFiles && item.pdfFiles.length > 0 || item.externalUrl) && (
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 space-y-2.5">
            <span className="block text-[10px] font-extrabold text-slate-600 select-none">
              {language === 'ar' ? 'المرفقات والروابط التوضيحية:' : 'Ekler ve Açıklayıcı Bağlantılar:'}
            </span>

            {/* Direct uploaded files */}
            {item.pdfFiles && item.pdfFiles.length > 0 && (
              <div className="grid grid-cols-1 gap-1.5">
                {item.pdfFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-burgundy-700/10 hover:bg-slate-50/50 transition text-[11px]"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1.5">
                      <FileText className="w-3.5 h-3.5 text-burgundy-700 shrink-0" />
                      <span className="truncate font-bold text-slate-700" title={file.name}>
                        {file.name}
                      </span>
                      {file.size && (
                        <span className="text-[9px] text-slate-400 font-mono shrink-0 select-none">
                          ({file.size})
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleDownloadFile(file)}
                      disabled={downloadingFileId !== null}
                      className={`px-2 py-0.5 rounded text-[9px] font-extrabold flex items-center gap-1 transition shrink-0 select-none ${
                        downloadSuccessFileId === file.id
                          ? 'bg-emerald-50 text-emerald-700'
                          : downloadingFileId === file.id
                          ? 'bg-slate-100 text-slate-400'
                          : 'bg-burgundy-50 text-burgundy-700 hover:bg-burgundy-700 hover:text-white'
                      }`}
                    >
                      {downloadSuccessFileId === file.id ? (
                        <>
                          <CheckCircle className="w-2.5 h-2.5" />
                          <span>{t('actionSuccess')}</span>
                        </>
                      ) : downloadingFileId === file.id ? (
                        <span className="w-2 h-2 border border-burgundy-700 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <Download className="w-2.5 h-2.5" />
                          <span>{language === 'ar' ? 'تحميل' : 'İndir'}</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* External URL */}
            {item.externalUrl && (
              <a 
                href={item.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-burgundy-700/10 hover:bg-slate-50/50 transition text-[11px] text-burgundy-700 font-extrabold"
              >
                <span className="truncate">{language === 'ar' ? 'زيارة الرابط المرفق بالإعلان' : 'Duyuruya İlişkin Bağlantıyı Ziyaret Et'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center text-[9px] text-slate-400 font-semibold select-none relative z-10">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{t('addedOn')}: {item.dateAdded}</span>
        </span>
      </div>
    </div>
  );
};
