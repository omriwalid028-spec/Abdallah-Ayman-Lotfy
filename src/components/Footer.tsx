import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 glass text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-mint text-[#0a0b0e] font-bold text-xs flex items-center justify-center shadow-mint-sm">
            A
          </div>
          <div>
            <p className="font-arabic-heading font-bold text-sm">
              {isAr ? 'عبد الله أيمن لطفي' : 'Abdallah Ayman Lotfy'}
            </p>
            <p className="text-[11px] font-bold text-gray-400">
              AI Automation Engineer | Specialist in complex n8n workflows
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-bold">
          <a
            href={CONTACT_DATA.gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-mint hover:underline"
            title="Open Abdallah's Gmail"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{CONTACT_DATA.email}</span>
          </a>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <span className="text-gray-400">© 2026 Abdallah Ayman Lotfy.</span>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-lg glass border-white/10 hover:border-mint/50 hover:text-mint transition-colors"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

