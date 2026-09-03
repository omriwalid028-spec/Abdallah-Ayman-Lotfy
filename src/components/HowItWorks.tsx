import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  GitBranch, 
  PlayCircle, 
  ShieldCheck, 
  ArrowRight, 
  Workflow,
  Clock,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const steps = [
    {
      num: '01',
      icon: Compass,
      titleAr: 'تحليل العمليات وتحديد نقاط الهدر',
      titleEn: 'Discovery & Workflow Audit',
      descAr: 'فحص شامل لكافة الخطوات اليدوية في شركتك، وتحديد زمن كل مهمة، ورسم خارطة واضحة لأكثر العمليات استنزافاً للوقت والجهد.',
      descEn: 'Comprehensive assessment of current manual procedures, calculating hourly drain, and identifying high-impact pipeline automation targets.',
      timelineAr: 'خلال 24-48 ساعة',
      timelineEn: 'Within 24-48 Hours',
    },
    {
      num: '02',
      icon: GitBranch,
      titleAr: 'هندسة المخطط وسيناريوهات الخطأ',
      titleEn: 'Architecture & Failover Blueprint',
      descAr: 'تصميم هيكل سير العمل على n8n مع بناء مسارات احتياطية وتنبيهات فورية تمنع ضياع أي بيانات في حال تعطل أي خادم أو واجهة خارجية.',
      descEn: 'Blueprint detailed n8n execution logic with custom branching, fallback webhooks, and automated recovery loops for zero data loss.',
      timelineAr: 'مخطط تقني مفصل',
      timelineEn: 'Detailed Architectural Blueprint',
    },
    {
      num: '03',
      icon: PlayCircle,
      titleAr: 'البناء والربط والاختبار الواقعي',
      titleEn: 'n8n Production Deployment & Testing',
      descAr: 'ربط الـ APIs وقواعد البيانات وروبوتات تليجرام وواتساب، مع كتابة عقد برمجية بلغة JavaScript/Python للتعامل مع الحالات الخاصة بدقة.',
      descEn: 'Execute robust n8n integration, configure authentication keys, inject custom logic scripts, and stress-test every edge case.',
      timelineAr: 'تنفيذ دقيق وسريع',
      timelineEn: 'Rapid Production Execution',
    },
    {
      num: '04',
      icon: ShieldCheck,
      titleAr: 'المراقبة المستمرة والضمان الفني',
      titleEn: 'Continuous Telemetry & Handover',
      descAr: 'تفعيل لوحات مراقبة لحظية وإشعارات أخطاء مشفرة، مع تقديم تدريب كامل لفريقك وضمان فني مستمر للحفاظ على استقرار العمليات.',
      descEn: 'Activate real-time uptime telemetry and error logs, deliver staff walkthroughs, and provide dedicated technical maintenance.',
      timelineAr: 'استقرار تشغيلي 99.98%',
      timelineEn: '99.98% Uptime SLA',
    },
  ];

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isAr ? 'كيف ننقل عملياتك إلى الأتمتة الكاملة؟' : 'How We Automate Your Business in 4 Steps'}
          </h2>

          {/* Bold subtext */}
          <p className="font-arabic-body text-base sm:text-lg font-bold max-w-3xl leading-relaxed text-gray-300">
            {isAr
              ? 'منهجية هندسية صارمة تضمن سرعة الإنجاز، أمان البيانات، وبناء تدفقات مرنة وقابلة للتوسع مع نمو حجم أعمالك.'
              : 'A structured, rigorous engineering roadmap guaranteeing rapid delivery, enterprise-grade security, and scalable infrastructure.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl p-6 sm:p-7 glass-panel border-mint/20 hover:border-mint/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5 relative group"
              >
                {/* Step Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-mint/10 border border-mint/30 flex items-center justify-center text-mint">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>

                  {/* Bold paragraph for immediate readability */}
                  <p className="font-arabic-body text-xs sm:text-sm font-bold text-gray-300 leading-relaxed">
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </div>

                {/* Timeline Tag */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-bold text-mint">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAr ? step.timelineAr : step.timelineEn}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
