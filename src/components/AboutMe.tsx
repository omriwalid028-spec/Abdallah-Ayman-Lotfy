import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Calendar, 
  GraduationCap, 
  Globe, 
  CheckCircle, 
  Code, 
  ShieldCheck, 
  Cpu,
  Workflow,
  Sparkles
} from 'lucide-react';
import { ABOUT_DATA } from '../data/portfolioData';
import { Language } from '../types';

interface AboutMeProps {
  lang: Language;
}

export const AboutMe: React.FC<AboutMeProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const getIcon = (key: string) => {
    switch (key) {
      case 'name':
        return <User className="w-5 h-5 text-[#00f5a0]" />;
      case 'age':
        return <Calendar className="w-5 h-5 text-[#c99b52]" />;
      case 'education':
        return <GraduationCap className="w-5 h-5 text-[#38bdf8]" />;
      case 'nationality':
        return <Globe className="w-5 h-5 text-[#a855f7]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#00f5a0]" />;
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-b border-white/10">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-mint/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isAr ? ABOUT_DATA.titleAr : ABOUT_DATA.titleEn}
          </h2>

          {/* Bold subtext */}
          <p className="font-arabic-body text-base sm:text-lg font-bold text-gray-200 max-w-3xl leading-relaxed">
            {isAr ? ABOUT_DATA.subtitleAr : ABOUT_DATA.subtitleEn}
          </p>
        </div>

        {/* Interconnected Unfolding Data Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {ABOUT_DATA.infoCards.map((card, index) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl p-6 glass border-mint/15 hover:border-mint/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              {/* Top Socket for visual interconnection line */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-mint/20 flex items-center justify-center shadow-md group-hover:border-mint transition-colors">
                  {getIcon(card.key)}
                </div>

                <span className="text-[10px] text-mint font-bold bg-mint/10 px-2.5 py-0.5 rounded border border-mint/20 tracking-wider">
                  {card.key.toUpperCase()}
                </span>
              </div>

              {/* Label & Value */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                  {isAr ? card.labelAr : card.labelEn}
                </span>

                <h3 className="font-arabic-heading text-lg sm:text-xl font-bold group-hover:text-mint transition-colors leading-snug">
                  {isAr ? card.valueAr : card.valueEn}
                </h3>
              </div>

              {/* Unfolding Micro-indicator at bottom */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300 font-bold">
                <span className="text-mint flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                  Verified
                </span>
                <span className="text-gray-400 font-bold">2026</span>
              </div>

              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-2xl">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-mint/10 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comprehensive Bio & Automation Mindset Overview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl p-8 sm:p-10 glass-panel border-mint/20 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-mint text-xs tracking-widest uppercase font-bold">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'رؤية مهندس الأتمتة' : 'Automation Mindset & Engineering Principles'}</span>
              </div>

              <p className="font-arabic-body text-base sm:text-lg text-gray-200 leading-relaxed font-bold">
                {isAr ? ABOUT_DATA.bioAr : ABOUT_DATA.bioEn}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3">
              {(isAr ? ABOUT_DATA.capabilitiesAr : ABOUT_DATA.capabilitiesEn).map((cap, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl glass border-white/10 text-xs sm:text-sm text-gray-200 hover:border-mint/30 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                  <span className="font-arabic-body font-bold leading-normal">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
