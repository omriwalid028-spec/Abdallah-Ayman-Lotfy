import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ProductivityDashboard } from './components/ProductivityDashboard';
import { Technologies } from './components/Technologies';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Language, ThemeMode } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<ThemeMode>('cyber-mint');

  useEffect(() => {
    // Set HTML lang and dir for Arabic default
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    // Manage root theme classes
    const root = document.documentElement;
    root.classList.remove('theme-cyber-mint', 'theme-fitch-minimal', 'theme-oled-dark');
    root.classList.add(`theme-${theme}`);

    if (theme === 'fitch-minimal') {
      document.body.style.backgroundColor = '#f8f7f2';
      document.body.style.color = '#0f172a';
    } else if (theme === 'oled-dark') {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#0a0b0e';
      document.body.style.color = '#ffffff';
    }
  }, [theme]);

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${
      theme === 'fitch-minimal' ? 'text-[#0f172a]' : 'text-white'
    }`}>
      {/* Editorial background workflow grid pattern */}
      <div className="fixed inset-0 workflow-grid pointer-events-none z-0" />
      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
        <main>
          <Hero lang={lang} />
          <AboutMe lang={lang} />
          <ProjectsGallery lang={lang} />
          <ProductivityDashboard lang={lang} />
          <Technologies lang={lang} />
          <ContactSection lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </div>
  );
}
