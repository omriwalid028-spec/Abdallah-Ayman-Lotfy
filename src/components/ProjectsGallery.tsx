import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GitBranch, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Send, 
  Table2, 
  Sparkles, 
  Terminal,
  Clock,
  Code2
} from 'lucide-react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Language } from '../types';

interface ProjectsGalleryProps {
  lang: Language;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  // Track active sub-view for multi-view projects (like Project 2 with 2 views)
  const [activeViews, setActiveViews] = useState<Record<string, number>>({
    'project-gym': 0,
    'project-inventory': 0,
  });

  const handleSelectView = (projectId: string, viewIndex: number) => {
    setActiveViews((prev) => ({ ...prev, [projectId]: viewIndex }));
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#ff6d5a]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isAr ? 'معرض المشاريع والتدفقات الحية' : 'Production Workflow Engines'}
          </h2>

          {/* Bold subtext */}
          <p className="font-arabic-body text-base sm:text-lg font-bold text-gray-200 max-w-3xl leading-relaxed">
            {isAr
              ? 'استعراض دقيق لمخططات تدفقات n8n النشطة في بيئات الأعمال الحقيقية، مع تجربة المحاكاة التفاعلية لكل عقدة ومعاينة البيانات.'
              : 'Detailed inspection of active n8n production workflows deployed in live business environments, complete with interactive node execution simulation.'}
          </p>
        </div>

        {/* Projects List: Sequence of full-width Active Workflow Screens */}
        <div className="space-y-24">
          {PROJECTS_DATA.map((project, index) => {
            const currentViewIndex = activeViews[project.id] || 0;
            const currentView = project.views[currentViewIndex] || project.views[0];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl p-6 sm:p-8 lg:p-10 glass-panel border-mint/20 shadow-2xl relative space-y-8"
              >
                {/* Project Header Bar with Editorial Monogram Indicator */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="tech-tag font-bold">
                        {project.badge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] bg-white/[0.04] text-mint border border-white/10 font-bold">
                        {isAr ? project.categoryAr : project.categoryEn}
                      </span>
                    </div>

                    <h3 className="font-arabic-heading text-2xl sm:text-3xl font-bold leading-snug">
                      {isAr ? project.titleAr : project.titleEn}
                    </h3>

                    {/* Bold project description */}
                    <p className="font-arabic-body text-sm sm:text-base font-bold text-gray-200 leading-relaxed">
                      {isAr ? project.descAr : project.descEn}
                    </p>
                  </div>

                  {/* Production Stats Pill Cluster */}
                  <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 shrink-0">
                    <div className="flex items-center gap-3 p-3.5 rounded-xl glass border-white/10 text-xs font-bold">
                      <div className="text-right">
                        <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-bold">Uptime</span>
                        <span className="text-mint font-bold">{project.uptime}</span>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="text-right">
                        <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-bold">Executions</span>
                        <span className="font-bold">{project.executionCount}</span>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="text-right">
                        <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-bold">Latency</span>
                        <span className="text-mint font-bold">{project.latency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-View Switcher (Critical for Project 2 which uses both image_1 and image_2!) */}
                {project.views.length > 1 && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {project.views.map((v, vIdx) => (
                        <button
                          key={v.id}
                          onClick={() => handleSelectView(project.id, vIdx)}
                          className={`px-4 py-2 rounded-full text-xs transition-all duration-200 border ${
                            currentViewIndex === vIdx
                              ? 'bg-mint text-[#0a0b0e] border-mint font-bold shadow-mint-sm'
                              : 'glass text-gray-300 border-white/10 hover:border-mint/50 font-bold'
                          }`}
                        >
                          {isAr ? v.nameAr : v.nameEn}
                        </button>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-arabic-body font-bold">
                      {isAr ? currentView.descriptionAr : currentView.descriptionEn}
                    </p>
                  </div>
                )}

                {/* Full-width Interactively Animated 'Active Workflow Screen' */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                    <span className="flex items-center gap-1.5 text-mint font-bold">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      {isAr ? 'شاشة سير العمل النشطة (Active Workflow View)' : 'Active Workflow Visualizer'}
                    </span>
                    <span className="hidden sm:inline-block text-gray-400 font-bold">
                      {isAr ? 'اضغط على أي عقدة لاستعراض بياناتها، أو اضغط تشغيل المحاكاة' : 'Click any node to inspect payload or execute simulation'}
                    </span>
                  </div>

                  {/* Pixel-perfect n8n Interactive Canvas */}
                  <WorkflowCanvas
                    canvasHeader={currentView.canvasHeader}
                    nodes={currentView.nodes}
                    connections={currentView.connections}
                    lang={lang}
                  />
                </div>

                {/* Bottom Row: Key Highlights & Stack Badges */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-white/10">
                  {/* Key Highlights */}
                  <div className="lg:col-span-8 space-y-2">
                    <h4 className="text-xs uppercase tracking-wider text-mint font-bold">
                      {isAr ? 'أبرز مميزات المعمارية والتكامل:' : 'Architecture Highlights:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(isAr ? project.keyHighlightsAr : project.keyHighlightsEn).map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 p-3 rounded-xl glass border-white/10 text-xs sm:text-sm text-gray-200 hover:border-mint/30 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                          <span className="font-arabic-body font-bold leading-relaxed">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="lg:col-span-4 space-y-2">
                    <h4 className="text-xs uppercase tracking-wider text-mint font-bold">
                      {isAr ? 'التقنيات المستخدمة:' : 'Tech Stack:'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="tech-tag font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
