import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GitBranch, 
  Send, 
  Table2, 
  Sparkles, 
  Terminal, 
  FileCode2, 
  Layers, 
  Cpu,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { TECHNOLOGIES_DATA } from '../data/portfolioData';
import { TechnologyItem, Language } from '../types';

interface TechnologiesProps {
  lang: Language;
}

export const Technologies: React.FC<TechnologiesProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeTech, setActiveTech] = useState<TechnologyItem>(TECHNOLOGIES_DATA[0]);

  const getTechIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'GitBranch':
        return <GitBranch className="w-6 h-6" style={{ color }} />;
      case 'Send':
        return <Send className="w-6 h-6" style={{ color }} />;
      case 'Table2':
        return <Table2 className="w-6 h-6" style={{ color }} />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" style={{ color }} />;
      case 'Terminal':
        return <Terminal className="w-6 h-6" style={{ color }} />;
      case 'FileCode2':
        return <FileCode2 className="w-6 h-6" style={{ color }} />;
      case 'Layers':
        return <Layers className="w-6 h-6" style={{ color }} />;
      default:
        return <Cpu className="w-6 h-6" style={{ color }} />;
    }
  };

  return (
    <section id="technologies" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isAr ? 'التقنيات والأدوات المستخدمة' : 'Technologies & Core Stack'}
          </h2>

          <p className="font-arabic-body text-base sm:text-lg font-bold text-gray-300 max-w-2xl leading-relaxed">
            {isAr
              ? 'تكامل متناغم بين محركات الأتمتة، واجهات برمجة التطبيقات، وخدمات الذكاء الاصطناعي لبناء حلول مؤسسية متكاملة.'
              : 'End-to-end integration between workflow orchestration engines, messaging APIs, and generative AI services.'}
          </p>
        </div>

        {/* Logos Grid with Dynamic Hover-Glow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {TECHNOLOGIES_DATA.map((tech) => {
            const isSelected = activeTech.id === tech.id;

            return (
              <motion.button
                key={tech.id}
                onClick={() => setActiveTech(tech)}
                whileHover={{ y: -6, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 relative group text-center cursor-pointer glass ${
                  isSelected
                    ? 'border-mint shadow-mint-glow ring-1 ring-mint/50 bg-white/[0.06]'
                    : 'border-white/10 hover:border-mint/50 hover:bg-white/[0.05]'
                }`}
              >
                {/* Glowing aura on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                  style={{ backgroundColor: `${tech.color}25` }}
                />

                <div 
                  className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform mb-3 shadow-inner"
                  style={{ borderColor: isSelected ? tech.color : undefined }}
                >
                  {getTechIcon(tech.iconName, tech.color)}
                </div>

                <span className="font-bold text-xs sm:text-sm text-white group-hover:text-mint transition-colors">
                  {tech.name}
                </span>

                <span className="text-[10px] text-gray-400 font-bold mt-1 truncate max-w-full uppercase tracking-wider">
                  {tech.category}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Selected Tech Inspector Panel */}
        <motion.div
          key={activeTech.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl p-6 sm:p-8 glass-panel border-mint/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl bg-white/[0.04] border flex items-center justify-center shrink-0 shadow-lg"
              style={{ borderColor: activeTech.color }}
            >
              {getTechIcon(activeTech.iconName, activeTech.color)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{activeTech.name}</h3>
                <span 
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wider uppercase"
                  style={{ 
                    borderColor: `${activeTech.color}40`,
                    backgroundColor: `${activeTech.color}15`,
                    color: activeTech.color
                  }}
                >
                  {activeTech.level}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-300 font-arabic-body max-w-2xl leading-relaxed">
                {isAr ? activeTech.descriptionAr : activeTech.descriptionEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-mint glass px-3.5 py-2 rounded-xl border border-mint/30 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-mint" />
            <span>{isAr ? 'تم استخدامه في المشاريع المعروضة' : 'Verified in Active Workflows'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
