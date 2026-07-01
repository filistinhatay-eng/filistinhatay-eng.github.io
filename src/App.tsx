/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { HomePage } from './components/HomePage';
import { NewsSection } from './components/NewsSection';
import { ImportantLinks } from './components/ImportantLinks';
import { CoursesSection } from './components/CoursesSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { PastActivitiesSection } from './components/PastActivitiesSection';
import { UniversityInfoSection } from './components/UniversityInfoSection';
import { AdminPanel } from './components/AdminPanel';
import { LoginModal } from './components/LoginModal';
import { DeptAnnouncementsSection } from './components/DeptAnnouncementsSection';
// @ts-ignore
import logoImg from './assets/images/logo.jpeg';

import { 
  NewsItem, CourseItem, DeptAnnouncementItem, ActivityItem, ImportantLink, 
  UniversityInfo, TopAnnouncement 
} from './types';

import { 
  initialNews, initialCourses, initialDeptAnnouncements, initialActivities, 
  initialImportantLinks, initialUniversityInfo, initialAnnouncements 
} from './data/initialData';

function AppMain() {
  const { t, dir } = useLanguage();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('pales_union_admin_logged') === 'true';
  });

  const [logo, setLogo] = useState<string>(() => {
    return localStorage.getItem('pales_union_custom_logo') || logoImg;
  });

  // Main Persistent States initialized directly and synchronously from local storage or initial values
  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_news');
      return saved ? JSON.parse(saved) : initialNews;
    } catch (e) {
      return initialNews;
    }
  });

  const [courses, setCourses] = useState<CourseItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_courses');
      return saved ? JSON.parse(saved) : initialCourses;
    } catch (e) {
      return initialCourses;
    }
  });

  const [deptAnnouncements, setDeptAnnouncements] = useState<DeptAnnouncementItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_dept_announcements');
      return saved ? JSON.parse(saved) : initialDeptAnnouncements;
    } catch (e) {
      return initialDeptAnnouncements;
    }
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_activities');
      return saved ? JSON.parse(saved) : initialActivities;
    } catch (e) {
      return initialActivities;
    }
  });

  const [links, setLinks] = useState<ImportantLink[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_links');
      return saved ? JSON.parse(saved) : initialImportantLinks;
    } catch (e) {
      return initialImportantLinks;
    }
  });

  const [univInfo, setUnivInfo] = useState<UniversityInfo>(() => {
    try {
      const saved = localStorage.getItem('pales_union_univ_info');
      return saved ? JSON.parse(saved) : initialUniversityInfo;
    } catch (e) {
      return initialUniversityInfo;
    }
  });

  const [announcements, setAnnouncements] = useState<TopAnnouncement[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_announcements');
      return saved ? JSON.parse(saved) : initialAnnouncements;
    } catch (e) {
      return initialAnnouncements;
    }
  });

  const [assistants, setAssistants] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_assistants');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync helpers with local storage to persist modifications directly and instantly
  const updateNewsState = (newNews: NewsItem[]) => {
    setNews(newNews);
    localStorage.setItem('pales_union_news', JSON.stringify(newNews));
  };

  const updateCoursesState = (newCourses: CourseItem[]) => {
    setCourses(newCourses);
    localStorage.setItem('pales_union_courses', JSON.stringify(newCourses));
  };

  const updateDeptAnnState = (newDeptAnns: DeptAnnouncementItem[]) => {
    setDeptAnnouncements(newDeptAnns);
    localStorage.setItem('pales_union_dept_announcements', JSON.stringify(newDeptAnns));
  };

  const updateActivitiesState = (newActs: ActivityItem[]) => {
    setActivities(newActs);
    localStorage.setItem('pales_union_activities', JSON.stringify(newActs));
  };

  const updateLinksState = (newLinks: ImportantLink[]) => {
    setLinks(newLinks);
    localStorage.setItem('pales_union_links', JSON.stringify(newLinks));
  };

  const updateUnivState = (newUniv: UniversityInfo) => {
    setUnivInfo(newUniv);
    localStorage.setItem('pales_union_univ_info', JSON.stringify(newUniv));
  };

  const updateAnnState = (newAnns: TopAnnouncement[]) => {
    setAnnouncements(newAnns);
    localStorage.setItem('pales_union_announcements', JSON.stringify(newAnns));
  };

  const updateAssistantsState = (newAssistants: any[]) => {
    setAssistants(newAssistants);
    localStorage.setItem('pales_union_assistants', JSON.stringify(newAssistants));
  };

  // ADMIN OPERATIONS: NEWS
  const handleSaveNewsItem = (item: NewsItem) => {
    const exists = news.some(n => n.id === item.id);
    let updatedNews: NewsItem[];
    if (exists) {
      updatedNews = news.map(n => n.id === item.id ? item : n);
    } else {
      updatedNews = [item, ...news];
    }
    updateNewsState(updatedNews);
  };

  const handleDeleteNewsItem = (id: string) => {
    const updatedNews = news.filter(n => n.id !== id);
    updateNewsState(updatedNews);
  };

  // ADMIN OPERATIONS: COURSES
  const handleSaveCourseItem = (item: CourseItem) => {
    const exists = courses.some(c => c.id === item.id);
    let updatedCourses: CourseItem[];
    if (exists) {
      updatedCourses = courses.map(c => c.id === item.id ? item : c);
    } else {
      updatedCourses = [item, ...courses];
    }
    updateCoursesState(updatedCourses);
  };

  const handleDeleteCourseItem = (id: string) => {
    const updatedCourses = courses.filter(c => c.id !== id);
    updateCoursesState(updatedCourses);
  };

  // ADMIN OPERATIONS: DEPARTMENT ANNOUNCEMENTS
  const handleSaveDeptAnnItem = (item: DeptAnnouncementItem) => {
    const exists = deptAnnouncements.some(d => d.id === item.id);
    let updatedDeptAnns: DeptAnnouncementItem[];
    if (exists) {
      updatedDeptAnns = deptAnnouncements.map(d => d.id === item.id ? item : d);
    } else {
      updatedDeptAnns = [item, ...deptAnnouncements];
    }
    updateDeptAnnState(updatedDeptAnns);
  };

  const handleDeleteDeptAnnItem = (id: string) => {
    const updatedDeptAnns = deptAnnouncements.filter(d => d.id !== id);
    updateDeptAnnState(updatedDeptAnns);
  };

  // ADMIN OPERATIONS: ACTIVITIES
  const handleSaveActivityItem = (item: ActivityItem) => {
    const exists = activities.some(a => a.id === item.id);
    let updatedActs: ActivityItem[];
    if (exists) {
      updatedActs = activities.map(a => a.id === item.id ? item : a);
    } else {
      updatedActs = [item, ...activities];
    }
    updateActivitiesState(updatedActs);
  };

  const handleDeleteActivityItem = (id: string) => {
    const updatedActs = activities.filter(a => a.id !== id);
    updateActivitiesState(updatedActs);
  };

  // ADMIN OPERATIONS: LINKS
  const handleSaveLinkItem = (item: ImportantLink) => {
    const exists = links.some(l => l.id === item.id);
    let updatedLinks: ImportantLink[];
    if (exists) {
      updatedLinks = links.map(l => l.id === item.id ? item : l);
    } else {
      updatedLinks = [item, ...links];
    }
    updateLinksState(updatedLinks);
  };

  const handleDeleteLinkItem = (id: string) => {
    const updatedLinks = links.filter(l => l.id !== id);
    updateLinksState(updatedLinks);
  };

  // ADMIN OPERATIONS: ANNOUNCEMENTS
  const handleSaveAnnItem = (item: TopAnnouncement) => {
    const exists = announcements.some(a => a.id === item.id);
    let updatedAnns: TopAnnouncement[];
    if (exists) {
      updatedAnns = announcements.map(a => a.id === item.id ? item : a);
    } else {
      updatedAnns = [item, ...announcements];
    }
    updateAnnState(updatedAnns);
  };

  const handleDeleteAnnItem = (id: string) => {
    const updatedAnns = announcements.filter(a => a.id !== id);
    updateAnnState(updatedAnns);
  };

  // STUDENT OPERATION: REGISTER FOR AN EVENT
  const handleRegisterForActivity = (activityId: string, regData: { name: string; studentId: string; phone: string; email: string }): boolean => {
    let success = false;
    const updatedActs = activities.map(act => {
      if (act.id === activityId) {
        if (!act.registrationEnabled) return act;
        if (act.maxSeats && act.registeredCount >= act.maxSeats) return act;
        
        success = true;
        const currentRegs = act.registrations || [];
        return {
          ...act,
          registeredCount: act.registeredCount + 1,
          registrations: [regData, ...currentRegs]
        };
      }
      return act;
    });

    if (success) {
      updateActivitiesState(updatedActs);
    }
    return success;
  };

  // NEWS OPERATION: INCREMENT VIEWS COUNTER
  const handleIncrementNewsViews = (id: string) => {
    const updatedNews = news.map(item => {
      if (item.id === id) {
        return { ...item, views: item.views + 1 };
      }
      return item;
    });
    updateNewsState(updatedNews);
  };

  // Admin Logged Status handlers
  const handleLoginSuccess = () => {
    isAdminLoggedInTrue();
  };

  const isAdminLoggedInTrue = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('pales_union_admin_logged', 'true');
    setCurrentTab('admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pales_union_admin_logged');
    localStorage.removeItem('pales_union_admin_username');
    if (currentTab === 'admin') {
      setCurrentTab('home');
    }
  };

  const renderActiveSection = () => {
    switch (currentTab) {
      case 'news':
        return <NewsSection news={news} incrementViews={handleIncrementNewsViews} />;
      case 'links':
        return <ImportantLinks links={links} />;
      case 'courses':
        return <CoursesSection courses={courses} />;
      case 'deptAnnouncements':
        return <DeptAnnouncementsSection announcements={deptAnnouncements} />;
      case 'activities':
        return (
          <ActivitiesSection 
            activities={activities.filter(a => !a.isPast)} 
            registerForActivity={handleRegisterForActivity} 
          />
        );
      case 'pastActivities':
        return <PastActivitiesSection activities={activities} />;
      case 'university':
        return <UniversityInfoSection info={univInfo} />;
      case 'admin':
        return isAdminLoggedIn ? (
          <AdminPanel
            news={news}
            courses={courses}
            deptAnnouncements={deptAnnouncements}
            activities={activities}
            links={links}
            univInfo={univInfo}
            announcements={announcements}
            logo={logo}
            assistants={assistants}
            onSaveLogo={(newLogo: string) => {
              setLogo(newLogo);
              localStorage.setItem('pales_union_custom_logo', newLogo);
            }}
            onSaveNews={handleSaveNewsItem}
            onDeleteNews={handleDeleteNewsItem}
            onSaveCourse={handleSaveCourseItem}
            onDeleteCourse={handleDeleteCourseItem}
            onSaveDeptAnn={handleSaveDeptAnnItem}
            onDeleteDeptAnn={handleDeleteDeptAnnItem}
            onSaveActivity={handleSaveActivityItem}
            onDeleteActivity={handleDeleteActivityItem}
            onSaveLink={handleSaveLinkItem}
            onDeleteLink={handleDeleteLinkItem}
            onSaveUnivInfo={updateUnivState}
            onSaveAnn={handleSaveAnnItem}
            onDeleteAnn={handleDeleteAnnItem}
            onSaveAssistants={updateAssistantsState}
          />
        ) : (
          <HomePage 
            news={news} 
            activities={activities} 
            links={links} 
            setCurrentTab={setCurrentTab} 
          />
        );
      default:
        return (
          <HomePage 
            news={news} 
            activities={activities} 
            links={links} 
            setCurrentTab={setCurrentTab} 
          />
        );
    }
  };

  return (
    <div id="pales-union-portal-root" className="min-h-screen flex flex-col bg-geometric-pattern font-sans antialiased text-slate-800 relative">
      
      {/* Decorative top gold lining */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-red-700 to-amber-500 w-full" />

      {/* Top Announcements Ticker */}
      <AnnouncementBanner announcements={announcements} />

      {/* Main Header / Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
        logo={logo}
      />

      {/* Main Page Canvas Stage */}
      <main id="app-main-content-stage" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderActiveSection()}
      </main>

      {/* Shared Footer component */}
      <Footer logo={logo} univInfo={univInfo} />

      {/* Admin Login Dialog */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        assistants={assistants}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppMain />
    </LanguageProvider>
  );
}
