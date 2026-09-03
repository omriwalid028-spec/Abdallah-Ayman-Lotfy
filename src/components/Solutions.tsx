import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Bot, 
  Database, 
  Target, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { Language } from '../types';

interface SolutionsProps {
  lang: Language;
}

export const Solutions: React.FC<SolutionsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const solutions = [
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      badge: 'E-Commerce Autopilot',
      badgeAr: 'أتمتة المتاجر والمبيعات',
      titleAr: 'أتمتة المتاجر الإلكترونية وإدارة الطلبات',
      titleEn: 'E-Commerce & Automated Order Pipelines',
      descAr: 'ربط منصات المتاجر (سلة، زد، شوبيفاي) مع جداول المحاسبة وأنظمة المستودعات، مع إرسال إشعارات فورية وتحديث الفواتير آلياً.',
      descEn: 'Connect e-commerce storefronts with accounting sheets and fulfillment hubs, triggering instant customer notifications and automated invoice generation.',
      impactAr: 'توفير 20+ ساعة أسبوعياً ومنع أي تأخير في معالجة الشحنات',
      impactEn: 'Reclaim 20+ hours weekly with zero order fulfillment delays',
      stack: ['n8n Webhooks', 'Shopify / Salla', 'Google Sheets API', 'Telegram Bot API'],
      accentColor: '#ff6d5a',
    },
    {
      id: 'ai-bots',
      icon: Bot,
      badge: '24/7 AI Assistants',
      badgeAr: 'روبوتات ذكاء اصطناعي تفاعلية',
      titleAr: 'روبوتات الدعم الفني وخدمة العملاء الذكية',
      titleEn: 'Intelligent AI Support & Messaging Bots',
      descAr: 'هندسة روبوتات محادثة فورية عبر تليجرام وواتساب مدعومة بالذكاء الاصطناعي للإجابة على العملاء، تأكيد الحجوزات، والرد على الاستفسارات المعقدة.',
      descEn: 'Engineer smart conversational bots on Telegram and WhatsApp powered by AI agents to resolve customer queries, schedule appointments, and triage tickets around the clock.',
      impactAr: 'استجابة فورية 100% خلال أقل من 3 ثوانٍ على مدار الساعة',
      impactEn: 'Instant response time under 3 seconds with 24/7 live availability',
      stack: ['Telegram Bot API', 'OpenAI / Gemini', 'n8n AI Agents', 'Webhook Router'],
      accentColor: '#00f5a0',
    },
    {
      id: 'data-sync',
      icon: Database,
      badge: 'Bi-Directional Sync',
      badgeAr: 'مزامنة ثنائية الاتجاه',
      titleAr: 'مزامنة قواعد البيانات وجداول جوجل الحية',
      titleEn: 'Real-time Two-Way Database & Sheets Sync',
      descAr: 'تكامل مباشر ومرن بين أنظمة العمل وقواعد البيانات وجداول جوجل لمنع الإدخال اليدوي المتكرر وضمان تطابق السجلات لحظة بلحظة.',
      descEn: 'Seamless data pipeline bridging internal systems, SQL databases, and spreadsheets to eliminate manual double-entry and prevent discrepancies.',
      impactAr: 'صفر أخطاء بشرية في تسجيل الأرقام والبيانات المالية',
      impactEn: 'Zero manual data-entry errors with instant consistency across platforms',
      stack: ['PostgreSQL', 'Google Sheets', 'n8n Cron Schedules', 'JSON Transformations'],
      accentColor: '#38bdf8',
    },
    {
      id: 'lead-gen',
      icon: Target,
      badge: 'Lead Qualification',
      badgeAr: 'تأهيل العملاء الفوري',
      titleAr: 'تأهيل وتوزيع العملاء المحتملين تلقائياً',
      titleEn: 'Instant Lead Capture & CRM Routing',
      descAr: 'استقبال فوري للعملاء من الحملات الإعلانية، وتصنيفهم حسب الأولوية، وإرسال إشعار فوري لمسؤولي المبيعات مع المزامنة في الـ CRM.',
      descEn: 'Capture leads instantaneously from advertising channels, qualify criteria via automated logic, alert sales representatives, and log records to your CRM.',
      impactAr: 'مضاعفة معدل تحويل الصفقات بفضل سرعة التواصل الأول',
      impactEn: '3x higher sales conversion velocity through instant first contact',
      stack: ['Meta Webhooks', 'Google Forms / Sheets', 'Slack / Telegram', 'n8n Switch Nodes'],
      accentColor: '#c99b52',
    },
  ];

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isAr ? 'أنظمة أتمتة متكاملة ترفع كفاءة عملياتك' : 'Tailored Automation Systems Built for Scale'}
          </h2>

          {/* Bold, high-contrast subtext */}
          <p className="font-arabic-body text-base sm:text-lg font-bold max-w-3xl leading-relaxed text-gray-300">
            {isAr
              ? 'حلول تقنية مدروسة تزيل الاختناقات التشغيلية، تربط منصاتك في الزمن الحقيقي، وتضمن تدفق البيانات بسلاسة ودقة متناهية دون تدخل بشري.'
              : 'Engineered pipeline architectures designed to eliminate operational bottlenecks, synchronize disparate platforms in real-time, and guarantee zero-downtime execution.'}
          </p>
        </div>

        {/* 4 Core Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl p-7 sm:p-8 glass-panel border-mint/20 hover:border-mint/40 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-13 h-13 rounded-2xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105"
                      style={{ 
                        backgroundColor: `${item.accentColor}15`, 
                        borderColor: `${item.accentColor}40`,
                        color: item.accentColor 
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="tech-tag font-bold">
                      {isAr ? item.badgeAr : item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  {/* Bold Description for effortless reading */}
                  <p className="font-arabic-body text-sm sm:text-base font-bold text-gray-300 leading-relaxed">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  {/* Business Impact Pill */}
                  <div className="flex items-start gap-2.5 p-3 rounded-xl glass border-white/10 text-xs sm:text-sm font-semibold text-mint">
                    <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span className="font-arabic-body font-bold">{isAr ? item.impactAr : item.impactEn}</span>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.stack.map((t, tIdx) => (
                      <span key={tIdx} className="tech-tag text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Callout within Solutions */}
        <div className="rounded-2xl p-6 sm:p-8 glass-panel border-mint/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-start">
            <h4 className="text-lg sm:text-xl font-bold">
              {isAr ? 'هل لديك نظام أو منصة تريد ربطها؟' : 'Have a custom system or platform to connect?'}
            </h4>
            <p className="font-arabic-body text-sm sm:text-base font-bold text-gray-300">
              {isAr
                ? 'نقوم بهندسة حلول مخصصة بالكامل تتوافق مع أي Webhook أو API أو قاعدة بيانات تستخدمها.'
                : 'We engineer fully customized architectures tailored to your exact Webhooks, APIs, and business logic.'}
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-mint text-[#0a0b0e] font-bold text-xs uppercase tracking-wider hover:bg-[#20ffaa] shadow-mint-sm transition-all transform hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <span>{isAr ? 'اطلب استشارة مجانية' : 'Request Free Consultation'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
