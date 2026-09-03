import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { WEEKLY_METRICS } from '../data/portfolioData';
import { Language } from '../types';

interface ProductivityDashboardProps {
  lang: Language;
}

export const ProductivityDashboard: React.FC<ProductivityDashboardProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedDayIndex, setSelectedDayIndex] = useState(5); // Thursday by default

  const totalWeeklyExecutions = WEEKLY_METRICS.reduce((acc, curr) => acc + curr.executions, 0);
  const weeklyTarget = 22000;
  const progressPercent = Math.min(Math.round((totalWeeklyExecutions / weeklyTarget) * 100), 100);
  const maxDaily = Math.max(...WEEKLY_METRICS.map((m) => m.executions));

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isAr ? 'لوحة إنتاجية الأتمتة وتتبع الأهداف' : 'Automation Productivity Dashboard'}
          </h2>

          {/* Bold subtext */}
          <p className="font-arabic-body text-base sm:text-lg font-bold text-gray-200 max-w-3xl leading-relaxed">
            {isAr
              ? 'متابعة لحظية لدقة تدفقات n8n، ومعدلات التنفيذ الناجحة، وساعات العمل اليدوي التي تم توفيرها أسبوعياً.'
              : 'Real-time telemetry tracking n8n execution volume, zero-downtime reliability, and cumulative human hours reclaimed.'}
          </p>
        </div>

        {/* Dynamic Theme-Adaptive Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden glass-panel border-mint/20"
        >
          {/* Header Progress Summary */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-mint">
                {isAr ? 'تقرير التقدم الأسبوعي المباشر' : 'WEEKLY GOAL TRACKER'}
              </span>
              <h3 className="font-arabic-heading text-2xl sm:text-3xl font-bold tracking-tight">
                {isAr ? 'معدل إنجاز الأهداف: ' : 'Weekly Automation Goal: '}
                <span className="text-mint">{progressPercent}%</span>
              </h3>
              <p className="text-sm sm:text-base font-arabic-body font-bold text-gray-300">
                {isAr
                  ? `تم تنفيذ ${totalWeeklyExecutions.toLocaleString()} عملية مؤتمتة من أصل هدف ${weeklyTarget.toLocaleString()} هذا الأسبوع.`
                  : `${totalWeeklyExecutions.toLocaleString()} of ${weeklyTarget.toLocaleString()} operations completed successfully.`}
              </p>
            </div>

            {/* Overall Progress Gauge Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl glass border-white/10 shadow-sm">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="currentColor"
                    className="text-gray-500/20"
                    strokeWidth="5"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="currentColor"
                    className="text-mint transition-all duration-1000"
                    strokeWidth="5"
                    strokeDasharray={163.36}
                    strokeDashoffset={163.36 - (163.36 * progressPercent) / 100}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span className="absolute font-bold text-sm text-mint">
                  {progressPercent}%
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {isAr ? 'حالة الهدف' : 'Goal Status'}
                </span>
                <p className="text-sm font-bold flex items-center gap-1.5 text-mint font-arabic-body">
                  <CheckCircle2 className="w-4 h-4 text-mint" />
                  {isAr ? 'على المسار المتفوق' : 'Exceeding Velocity'}
                </p>
              </div>
            </div>
          </div>

          {/* Goal Progress Bar */}
          <div className="my-8 space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-300">
              <span>{isAr ? 'التقدم المحقق' : 'Current Progress'}</span>
              <span>{totalWeeklyExecutions.toLocaleString()} / {weeklyTarget.toLocaleString()} Ops</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full rounded-full bg-mint transition-all duration-1000 shadow-mint-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Daily Goal Throughput Bar Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-mint">
                {isAr ? 'توزيع العمليات على أيام الأسبوع (Sat - Fri)' : 'Daily Execution Breakdown'}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {isAr ? 'اضغط على اليوم لعرض التفاصيل' : 'Select bar to view day stats'}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4 pb-2 items-end h-48 sm:h-56">
              {WEEKLY_METRICS.map((day, idx) => {
                const heightPercent = Math.round((day.executions / maxDaily) * 100);
                const isSelected = selectedDayIndex === idx;

                return (
                  <div 
                    key={day.day}
                    onClick={() => setSelectedDayIndex(idx)}
                    className="flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
                  >
                    {/* Tooltip on hover/selected */}
                    <span 
                      className={`text-[10px] font-bold transition-opacity ${
                        isSelected ? 'opacity-100 text-mint' : 'opacity-0 group-hover:opacity-100 text-gray-400'
                      }`}
                    >
                      {day.executions}
                    </span>

                    {/* Bar */}
                    <div 
                      className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 ${
                        isSelected 
                          ? 'bg-mint shadow-mint-sm opacity-100' 
                          : 'bg-white/20 group-hover:bg-white/40'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />

                    {/* Day Label */}
                    <span 
                      className={`text-xs mt-1 ${
                        isSelected ? 'text-mint font-bold' : 'text-gray-300 font-bold'
                      }`}
                    >
                      {isAr ? day.dayAr : day.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Selected Day Metrics Cards */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass border-white/10">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                {isAr ? 'عمليات اليوم المختار' : 'Selected Day Ops'}
              </span>
              <span className="text-xl sm:text-2xl font-bold mt-1 block">
                {WEEKLY_METRICS[selectedDayIndex].executions.toLocaleString()}
              </span>
              <span className="text-[10px] font-arabic-body font-bold text-mint">
                {isAr ? `يوم ${WEEKLY_METRICS[selectedDayIndex].dayAr}` : WEEKLY_METRICS[selectedDayIndex].day}
              </span>
            </div>

            <div className="p-4 rounded-2xl glass border-white/10">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                {isAr ? 'معدل النجاح' : 'Success Rate'}
              </span>
              <span className="text-xl sm:text-2xl font-bold mt-1 block text-mint">
                {WEEKLY_METRICS[selectedDayIndex].successRate}%
              </span>
              <span className="text-[10px] font-arabic-body font-bold text-[#c99b52]">
                {isAr ? '0 أخطاء حرجة' : '0 Critical Faults'}
              </span>
            </div>

            <div className="p-4 rounded-2xl glass border-white/10">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                {isAr ? 'ساعات تم توفيرها' : 'Human Hours Saved'}
              </span>
              <span className="text-xl sm:text-2xl font-bold mt-1 block">
                46.5 hrs
              </span>
              <span className="text-[10px] font-arabic-body font-bold text-mint">
                {isAr ? 'وفر أسبوعي للعميل' : 'Reclaimed this week'}
              </span>
            </div>

            <div className="p-4 rounded-2xl glass border-white/10">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                {isAr ? 'متوسط زمن الاستجابة' : 'Mean Latency'}
              </span>
              <span className="text-xl sm:text-2xl font-bold mt-1 block text-mint">
                198ms
              </span>
              <span className="text-[10px] font-arabic-body font-bold text-mint">
                {isAr ? 'معالجة فورية فائقة' : 'Sub-second API sync'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
