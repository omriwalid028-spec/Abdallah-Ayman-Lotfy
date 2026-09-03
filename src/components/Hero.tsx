import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Bot, 
  CheckCircle2, 
  Zap, 
  GitBranch, 
  Activity,
  Layers,
  Send,
  Table2
} from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Editorial Ambient Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-mint/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#c99b52]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left / Main Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start text-start space-y-6"
        >
          {/* Headline in Editorial High-Contrast Display */}
          <div className="space-y-4 w-full">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15]">
              {isAr 
                ? 'أتمتة ذكية لعمليات شركتك تُدار بالكامل على مدار الساعة' 
                : 'Autonomous Operations Engineered for Maximum Speed & Zero Error'}
            </h1>
          </div>

          {/* Bold, high-contrast sub-text in Arabic and English */}
          <p className="font-arabic-body text-base sm:text-xl font-bold text-gray-200 leading-relaxed max-w-3xl">
            {isAr ? HERO_DATA.descriptionAr : HERO_DATA.descriptionEn}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              id="hero-explore-flows-cta"
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-mint hover:bg-mint/90 text-[#0a0b0e] font-bold rounded-xl text-sm uppercase tracking-wider hover:scale-105 transition-all shadow-mint-glow group"
            >
              <span>{isAr ? 'ابدأ أتمتة نظامك الآن' : 'Start Your Automation Pipeline'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              id="hero-explore-flows-sandbox"
              href="#projects"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-gray-200 glass hover:border-mint/50 transition-all hover:scale-102"
            >
              <Terminal className="w-4 h-4 text-mint" />
              <span>{isAr ? 'جرّب محاكاة التدفقات الحية' : 'Test Live Workflow Sandbox'}</span>
            </a>
          </div>

          {/* Performance Metrics Bar with Bold Subtext */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 w-full border-t border-white/10">
            {HERO_DATA.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {metric.value}
                </span>
                <p className="text-xs sm:text-sm font-arabic-body font-bold text-gray-300">
                  {isAr ? metric.labelAr : metric.labelEn}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Editorial Glass Canvas & Floating Data Nodes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          {/* Biomechanic Core Graphic Container with Editorial Glass Styling */}
          <div className="relative w-full max-w-md aspect-square rounded-3xl p-6 glass border-mint/20 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Ambient grid background lines inside card */}
            <div className="absolute inset-0 workflow-grid pointer-events-none" />

            {/* Header telemetry */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
                <span className="text-xs text-mint uppercase tracking-wider font-bold">
                  n8n Pipeline Engine
                </span>
              </div>
              <span className="tech-tag font-bold">
                PROD-ACTIVE
              </span>
            </div>

            {/* Interconnected Simulated Nodes Flow */}
            <div className="relative my-4 space-y-3 z-10">
              {/* Node 1: Webhook Trigger */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3.5 rounded-2xl glass border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ff6d5a]/20 border border-[#ff6d5a]/40 flex items-center justify-center text-[#ff6d5a]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Telegram Webhook Trigger</p>
                    <p className="text-[10px] text-gray-300 font-bold">POST /webhook/gym-orders</p>
                  </div>
                </div>
                <span className="text-[10px] text-mint font-bold px-2 py-0.5 rounded bg-mint/10 border border-mint/20">
                  200 OK
                </span>
              </motion.div>

              {/* Connecting Data Line */}
              <div className="w-0.5 h-4 bg-gradient-to-b from-[#ff6d5a] to-mint mx-7" />

              {/* Node 2: AI Parser & Decision */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3.5 rounded-2xl glass border-mint/40 shadow-mint-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-mint/20 border border-mint/40 flex items-center justify-center text-mint">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Smart Switch & Validator</p>
                    <p className="text-[10px] text-gray-300 font-bold">Condition: SKU & Inventory Valid</p>
                  </div>
                </div>
                <span className="text-[10px] text-mint font-bold">14ms</span>
              </motion.div>

              {/* Connecting Data Line */}
              <div className="w-0.5 h-4 bg-gradient-to-b from-mint to-[#0f9d58] mx-7" />

              {/* Node 3: Google Sheets Two-Way Sync */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3.5 rounded-2xl glass border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0f9d58]/20 border border-[#0f9d58]/40 flex items-center justify-center text-[#0f9d58]">
                    <Table2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Google Sheets 2-Way Sync</p>
                    <p className="text-[10px] text-gray-300 font-bold">Append Row & Notify Admin</p>
                  </div>
                </div>
                <span className="text-[10px] text-mint font-bold">Synced</span>
              </motion.div>
            </div>

            {/* Bottom Real-time Payload Telemetry */}
            <div className="p-2.5 rounded-xl glass border-white/10 text-[10px] text-gray-300 font-bold z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-mint animate-spin" />
                <span>Payload: 4,821 ops / hr</span>
              </div>
              <span className="text-mint font-bold">Uptime 99.98%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
