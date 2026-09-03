import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  Sparkles, 
  MessageSquare,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONTACT_DATA } from '../data/portfolioData';
import { Language } from '../types';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectType, setProjectType] = useState<'telegram' | 'inventory' | 'custom' | 'consultation'>('telegram');
  const [clientName, setClientName] = useState('');
  const [clientNote, setClientNote] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_DATA.email);
    setCopiedEmail(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const generateWhatsAppLink = () => {
    const typeLabel = {
      telegram: isAr ? 'بوت تيليجرام متقدم' : 'Advanced Telegram Bot',
      inventory: isAr ? 'نظام أتمتة مخزون ومبيعات n8n' : 'n8n Inventory & Sales Workflow',
      custom: isAr ? 'تكامل واجهات APIs مخصصة' : 'Custom API Integration',
      consultation: isAr ? 'استشارة معمارية أتمتة' : 'Automation Architecture Consultation',
    }[projectType];

    const messageText = isAr
      ? `مرحباً عبد الله، أنا ${clientName || 'عميل محتمل'}. أود التنسيق معك بخصوص مشروع: ${typeLabel}. ${clientNote ? `\nتفاصيل إضافية: ${clientNote}` : ''}`
      : `Hello Abdallah, I'm ${clientName || 'a potential client'}. I'd like to discuss a project: ${typeLabel}. ${clientNote ? `\nDetails: ${clientNote}` : ''}`;

    return `https://wa.me/201017364361?text=${encodeURIComponent(messageText)}`;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/10">
      {/* Background glow orb */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-mint/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isAr ? CONTACT_DATA.titleAr : CONTACT_DATA.titleEn}
          </h2>

          {/* Bold subtext */}
          <p className="font-arabic-body text-base sm:text-lg font-bold text-gray-200 max-w-3xl leading-relaxed">
            {isAr ? CONTACT_DATA.subtitleAr : CONTACT_DATA.subtitleEn}
          </p>
        </div>

        {/* Content Layout: Contact Cards & Quick Inquiry Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Communication Channels (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl glass-panel border-mint/20 hover:border-mint/50 transition-all shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <a
                  href={CONTACT_DATA.gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-mint/10 border border-mint/30 flex items-center justify-center text-mint hover:bg-mint hover:text-[#0a0b0e] transition-colors"
                  title={isAr ? 'فتح في بريد Gmail' : 'Open in Gmail'}
                >
                  <Mail className="w-6 h-6" />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    id="open-gmail-btn"
                    href={CONTACT_DATA.gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mint/10 border border-mint/30 hover:bg-mint hover:text-[#0a0b0e] text-xs font-bold text-mint transition-colors"
                    title={isAr ? 'فتح جيميل مباشرة' : 'Open in Gmail'}
                  >
                    <span>{isAr ? 'فتح في Gmail' : 'Open Gmail'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border-white/10 hover:border-mint/40 text-xs font-bold text-gray-200 transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-mint" />
                        <span className="text-mint font-bold">{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-bold">{isAr ? 'نسخ' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  {isAr ? 'البريد الإلكتروني الرسمي (انقر للفتح في Gmail)' : 'Official Gmail (Click to compose)'}
                </span>
                <a
                  href={CONTACT_DATA.gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold hover:text-mint transition-colors block mt-1 break-all text-mint flex items-center gap-1.5 group"
                  title={isAr ? 'إرسال رسالة عبر Gmail' : 'Send message via Gmail'}
                >
                  <span>{CONTACT_DATA.email}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.a
              href={CONTACT_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl glass-panel border-white/10 hover:border-[#25d366]/50 transition-all shadow-xl flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25d366]/10 border border-[#25d366]/30 flex items-center justify-center text-[#25d366]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    WhatsApp Direct
                  </span>
                  <p className="text-base font-bold text-[#25d366] transition-colors mt-0.5">
                    {CONTACT_DATA.whatsappDisplay}
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-lg glass border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#25d366] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a
              href={CONTACT_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl glass-panel border-white/10 hover:border-[#0a66c2]/50 transition-all shadow-xl flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a66c2]/10 border border-[#0a66c2]/30 flex items-center justify-center text-[#38bdf8]">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    LinkedIn Profile
                  </span>
                  <p className="text-base font-bold text-[#38bdf8] transition-colors mt-0.5">
                    {CONTACT_DATA.linkedinDisplay}
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-lg glass border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#38bdf8] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Availability & Location Badge */}
            <div className="p-4 rounded-xl glass border-white/10 flex items-center gap-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-mint animate-ping shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-mint">
                  {isAr ? CONTACT_DATA.availabilityAr : CONTACT_DATA.availabilityEn}
                </span>
                <span className="text-gray-400 font-bold">
                  {isAr ? CONTACT_DATA.locationAr : CONTACT_DATA.locationEn}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Project Inquiry Builder (Right Column) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border-mint/20 shadow-2xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-arabic-heading text-xl sm:text-2xl font-bold">
                  {isAr ? 'تجهيز طلب الأتمتة المباشر' : 'Quick Project Dispatch'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-arabic-body font-bold">
                  {isAr
                    ? 'حدد متطلباتك لنقوم بتجهيز رسالة واتساب مفصلة ومباشرة مع عبد الله فوراً:'
                    : 'Select your automation scope to craft a direct pre-configured inquiry on WhatsApp:'}
                </p>
              </div>

              {/* Project Type Selector */}
              <div className="space-y-2">
                <label className="text-xs text-mint uppercase tracking-wider block font-bold">
                  {isAr ? 'مجال الأتمتة المطلوب:' : 'Select Workflow Domain:'}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'telegram', labelAr: 'بوت تليجرام تفاعلي', labelEn: 'Telegram Bot' },
                    { id: 'inventory', labelAr: 'إدارة مخازن & مبيعات n8n', labelEn: 'n8n Inventory Sync' },
                    { id: 'custom', labelAr: 'تكامل واجهات APIs & جداول', labelEn: 'API & Sheets Pipelines' },
                    { id: 'consultation', labelAr: 'استشارة معمارية وتطوير', labelEn: 'Architecture Audit' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProjectType(item.id as any)}
                      className={`p-3 rounded-xl text-xs text-start transition-all border ${
                        projectType === item.id
                          ? 'bg-mint text-[#0a0b0e] border-mint font-bold shadow-mint-sm'
                          : 'glass border-white/10 text-gray-300 hover:border-mint/40 font-bold'
                      }`}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 uppercase tracking-wider block font-bold">
                  {isAr ? 'اسمك أو اسم شركتك:' : 'Your Name / Organization:'}
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAr ? 'مثال: شركة النور للتجارة / محمد أحمد' : 'e.g. Acme Corp / Alex Reed'}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm focus:outline-none focus:border-mint font-arabic-body font-bold"
                />
              </div>

              {/* Quick Details Note */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 uppercase tracking-wider block font-bold">
                  {isAr ? 'نبذة سريعة عن التدفق المراد أتمتته:' : 'Brief Workflow Description:'}
                </label>
                <textarea
                  rows={3}
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  placeholder={
                    isAr
                      ? 'مثال: نحتاج ربط بوت التليجرام مع شيت المخزن لاستقبال الطلبات وتحديث الفواتير تلقائياً...'
                      : 'e.g. We want to connect Telegram bot with Google Sheets to automate incoming orders...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm focus:outline-none focus:border-mint font-arabic-body font-bold resize-none"
                />
              </div>

              {/* Submit to WhatsApp Button */}
              <a
                id="send-whatsapp-inquiry-btn"
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } })}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm bg-mint text-[#0a0b0e] hover:bg-[#20ffaa] shadow-lg shadow-mint/20 transition-all transform hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isAr ? 'إرسال الاستفسار عبر واتساب مباشرة' : 'Launch Inquiry on WhatsApp'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
