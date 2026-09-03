import React, { useState } from 'react';
import { 
  Cpu, 
  Globe, 
  Palette, 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { Language, ThemeMode } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  theme,
  setTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = lang === 'ar';

  const navLinks = [
    { href: '#about', labelAr: 'نبذة عني', labelEn: 'About Me' },
    { href: '#projects', labelAr: 'معرض المشاريع', labelEn: 'Projects' },
    { href: '#dashboard', labelAr: 'مؤشرات الأداء', labelEn: 'Goal Dashboard' },
    { href: '#technologies', labelAr: 'التقنيات', labelEn: 'Technologies' },
    { href: '#contact', labelAr: 'وسائل التواصل', labelEn: 'Contact' },
  ];

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  const cycleTheme = () => {
    if (theme === 'cyber-mint') setTheme('fitch-minimal');
    else if (theme === 'fitch-minimal') setTheme('oled-dark');
    else setTheme('cyber-mint');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300 bg-[#0a0b0e]/85 border-[#00ff9d]/15 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Title with Editorial Initial Monogram */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="h-10 w-10 rounded-full border border-mint/70 flex items-center justify-center text-mint font-bold hover:bg-mint hover:text-[#0a0b0e] transition-all shadow-mint-sm group-hover:scale-105">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-arabic-heading font-bold text-lg text-white group-hover:text-mint transition-colors tracking-wide">
              {isAr ? 'عبد الله أيمن لطفي' : 'Abdallah Ayman Lotfy'}
            </span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1.5" dir="ltr">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              <span className="tracking-wider uppercase text-mint/80 font-bold">AI Automation Engineer</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-lg text-xs font-bold text-gray-300 hover:text-mint hover:bg-white/5 transition-all flex items-center group"
            >
              <span>{isAr ? link.labelAr : link.labelEn}</span>
            </a>
          ))}
        </nav>

        {/* Controls: Language, Theme, & Contact CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Indicator & Switcher */}
          <button
            id="navbar-lang-toggle"
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#00ff9d]/20 bg-white/[0.03] hover:bg-white/[0.08] hover:border-mint text-xs text-gray-300 transition-colors"
            title="Toggle Arabic / English"
          >
            <span className="text-[11px] font-bold text-mint">{lang === 'ar' ? 'EN' : 'عربي'}</span>
            <span className="text-[10px] opacity-40 font-bold">AR/EN</span>
          </button>

          {/* Theme Switcher */}
          <button
            id="navbar-theme-toggle"
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs text-gray-300 transition-colors font-bold"
            title="Switch Visual Theme"
          >
            <Palette className="w-3.5 h-3.5 text-mint" />
            <span className="text-[11px]">
              {theme === 'cyber-mint' ? 'Mint' : theme === 'fitch-minimal' ? 'Fitch' : 'OLED'}
            </span>
          </button>

          {/* Direct CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-mint hover:bg-mint/90 text-[#0a0b0e] transition-all shadow-mint-sm hover:scale-105 uppercase tracking-wider"
          >
            <span>{isAr ? 'تواصل الآن' : 'Connect'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          id="navbar-mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#162028]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#0e141a] border-b border-[#212d38] space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:text-[#00f5a0] hover:bg-[#162028]"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1e2a36] flex items-center justify-between gap-2">
            <button
              onClick={cycleTheme}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#23313d] bg-[#141b24] text-xs font-bold text-gray-300"
            >
              <Palette className="w-3.5 h-3.5 text-[#00f5a0]" />
              <span>Theme: {theme}</span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#23313d] bg-[#141b24] text-xs font-bold text-gray-300"
            >
              <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
