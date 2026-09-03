import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Send, 
  Table2, 
  Code2, 
  Clock, 
  GitFork, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Webhook,
  Activity,
  Terminal,
  X
} from 'lucide-react';
import { WorkflowNode, WorkflowConnection, Language } from '../types';

interface WorkflowCanvasProps {
  canvasHeader: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  lang: Language;
  onExecutionComplete?: () => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  canvasHeader,
  nodes,
  connections,
  lang,
}) => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const isAr = lang === 'ar';

  // Compute bounding box for nodes to ensure responsive container
  const maxX = Math.max(...nodes.map((n) => n.x), 1000) + 260;
  const maxY = Math.max(...nodes.map((n) => n.y), 400) + 160;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.65));
  const handleResetZoom = () => setZoom(1);

  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStepIndex(0);
    setExecutionLog([
      isAr ? `[${new Date().toLocaleTimeString()}] بدء تنفيذ التدفق بنجاح...` : `[${new Date().toLocaleTimeString()}] Starting workflow execution...`
    ]);

    // Simulate step by step through nodes
    nodes.forEach((node, index) => {
      setTimeout(() => {
        setActiveStepIndex(index);
        setExecutionLog((prev) => [
          ...prev,
          `[OK 200] ${node.title} (${node.subtitle || 'executed in 18ms'})`
        ]);

        if (index === nodes.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setActiveStepIndex(-1);
            setExecutionLog((prev) => [
              ...prev,
              isAr ? `✓ اكتملت الدورة بنجاح في 184ms دون أي أخطاء.` : `✓ Workflow finished in 184ms with 0 errors.`
            ]);
          }, 800);
        }
      }, (index + 1) * 450);
    });
  };

  const getNodeIcon = (type: WorkflowNode['iconType']) => {
    switch (type) {
      case 'telegram':
        return <Send className="w-5 h-5 text-[#229ed9]" />;
      case 'sheets':
        return <Table2 className="w-5 h-5 text-[#0f9d58]" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-[#ff6d5a]" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-[#f59e0b]" />;
      case 'branch':
        return <GitFork className="w-5 h-5 text-[#a855f7]" />;
      case 'openai':
        return <Sparkles className="w-5 h-5 text-[#10a37f]" />;
      case 'webhook':
        return <Webhook className="w-5 h-5 text-[#00f5a0]" />;
      default:
        return <Activity className="w-5 h-5 text-[#00f5a0]" />;
    }
  };

  return (
    <div 
      className={`relative w-full rounded-2xl overflow-hidden border border-[#1f2d36] bg-[#14161a] transition-all duration-300 shadow-2xl ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : 'h-[540px] md:h-[620px]'
      }`}
    >
      {/* n8n Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1d23] border-b border-[#252a33] select-none text-xs text-gray-300 z-20 relative">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff6d5a]" />
          <span className="text-[#00f5a0] text-xs font-bold truncate">
            {canvasHeader}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-[#222933] text-gray-400 font-bold">
            v2.4
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active Workflow
          </span>

          <button
            id="toggle-fullscreen-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-[#282f3c] text-gray-400 hover:text-white transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-[calc(100%-44px)] overflow-auto bg-n8n-canvas cursor-grab active:cursor-grabbing">
        <div 
          className="relative transition-transform duration-150 origin-top-left p-8"
          style={{
            transform: `scale(${zoom})`,
            width: `${maxX}px`,
            height: `${maxY}px`,
          }}
        >
          {/* SVG Connections Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="mintFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6d5a" />
                <stop offset="50%" stopColor="#00f5a0" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              // Connect from right of fromNode to left of toNode
              const startX = fromNode.x + 160;
              const startY = fromNode.y + 45;
              const endX = toNode.x;
              const endY = toNode.y + 45;

              // Cubic bezier control points for genuine n8n wire aesthetics
              const dx = Math.max(Math.abs(endX - startX) * 0.5, 40);
              const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

              const isConnectionActive = isRunning && activeStepIndex >= 0;

              return (
                <g key={`conn-${idx}`}>
                  {/* Background shadow line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#232a35"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Foreground line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={conn.condition ? '#00f5a0' : '#4a5568'}
                    strokeWidth={isConnectionActive ? "2.5" : "1.8"}
                    strokeLinecap="round"
                    className={isConnectionActive ? 'animate-pulse-flow' : ''}
                  />

                  {/* Pulsing electric packet during simulation */}
                  {isConnectionActive && (
                    <circle r="4" fill="#00f5a0" className="shadow-mint-glow">
                      <animateMotion
                        path={pathD}
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin={`${idx * 0.2}s`}
                      />
                    </circle>
                  )}

                  {conn.label && (
                    <text
                      x={(startX + endX) / 2}
                      y={(startY + endY) / 2 - 8}
                      fill={conn.label === 'false' ? '#f87171' : '#00f5a0'}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="bg-[#12161c] px-1"
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Nodes Layer */}
          {nodes.map((node, idx) => {
            const isHighlighted = isRunning && activeStepIndex === idx;
            const isCompleted = isRunning && activeStepIndex > idx;

            return (
              <motion.div
                key={node.id}
                id={`node-${node.id}`}
                onClick={() => setSelectedNode(node)}
                whileHover={{ scale: 1.03, y: -2 }}
                className={`absolute z-10 w-[160px] rounded-xl border p-3 cursor-pointer transition-all duration-200 select-none bg-[#191d24] ${
                  isHighlighted
                    ? 'border-[#00f5a0] shadow-mint-glow ring-2 ring-[#00f5a0]/40'
                    : isCompleted
                    ? 'border-emerald-500/80 bg-[#162220]'
                    : 'border-[#29323f] hover:border-gray-500 hover:shadow-lg'
                }`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                }}
              >
                {/* Node Top Row: Icon & Status */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#222834] flex items-center justify-center border border-[#313b4d]">
                    {getNodeIcon(node.iconType)}
                  </div>

                  {node.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#ff6d5a]/20 text-[#ff6d5a] font-bold border border-[#ff6d5a]/30">
                      {node.badge}
                    </span>
                  )}

                  {isCompleted && (
                    <CheckCircle2 className="w-4 h-4 text-[#00f5a0]" />
                  )}
                </div>

                {/* Node Title & Subtitle */}
                <div className="text-left">
                  <p className="text-[11px] font-bold text-gray-100 truncate" title={node.title}>
                    {node.title}
                  </p>
                  {node.subtitle && (
                    <p className="text-[9px] text-gray-400 font-bold truncate mt-0.5">
                      {node.subtitle}
                    </p>
                  )}
                </div>

                {/* Input / Output connection sockets */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#313b4d] border-2 border-[#191d24]" />
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00f5a0] border-2 border-[#191d24]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Toolbar & Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#1a1d24]/90 backdrop-blur-md rounded-xl border border-[#2d3748] pointer-events-auto shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-[#2d3748] text-gray-300 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-[#2d3748] text-gray-300 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-lg hover:bg-[#2d3748] text-gray-300 hover:text-white transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-bold text-gray-400 px-2 select-none">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Primary Action: Run Simulation / Execute Workflow */}
        <div className="pointer-events-auto">
          <button
            id="execute-workflow-simulation-btn"
            onClick={startSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xl ${
              isRunning
                ? 'bg-emerald-600/80 text-white cursor-wait animate-pulse'
                : 'bg-gradient-to-r from-[#ff6d5a] to-[#ff5138] hover:from-[#ff5a44] hover:to-[#ff3d22] text-white shadow-orange-500/30'
            }`}
          >
            <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>
              {isRunning
                ? (isAr ? 'جاري تنفيذ العقد...' : 'Executing Nodes...')
                : (isAr ? 'تشغيل محاكاة التدفق (Execute Workflow)' : 'Execute Workflow Simulation')}
            </span>
          </button>
        </div>
      </div>

      {/* Real-time Execution Log Mini-Terminal */}
      {executionLog.length > 0 && (
        <div className="absolute top-12 left-4 max-w-sm hidden sm:block p-3 rounded-xl bg-[#0e1216]/95 border border-[#222933] text-[10px] text-gray-300 pointer-events-auto shadow-2xl backdrop-blur-md max-h-36 overflow-y-auto z-20 font-bold">
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-gray-800 text-gray-400">
            <span className="flex items-center gap-1 text-[#00f5a0]">
              <Terminal className="w-3 h-3" /> Live Telemetry
            </span>
            <button onClick={() => setExecutionLog([])} className="hover:text-white">
              <X className="w-3 h-3" />
            </button>
          </div>
          {executionLog.slice(-4).map((log, i) => (
            <p key={i} className="text-gray-300 leading-relaxed font-bold">
              {log}
            </p>
          ))}
        </div>
      )}

      {/* Node Detail Inspector Drawer */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: isAr ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAr ? -50 : 50 }}
            className={`absolute top-12 ${
              isAr ? 'left-4' : 'right-4'
            } w-80 p-4 rounded-2xl bg-[#161b22]/95 border border-[#2b3544] text-white shadow-2xl backdrop-blur-lg z-30 text-xs font-bold`}
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#29323f]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#222834] flex items-center justify-center">
                  {getNodeIcon(selectedNode.iconType)}
                </div>
                <span className="font-bold text-gray-200">{selectedNode.title}</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded hover:bg-[#252c38] text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-[11px] text-gray-300">
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Node Type:</span>
                <span className="text-[#00f5a0]">{selectedNode.type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Execution Status:</span>
                <span className="text-emerald-400">Ready (200 OK)</span>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Payload Mock Output:</p>
                <pre className="p-2 rounded bg-[#0b0f12] text-[10px] text-emerald-300 overflow-x-auto border border-gray-800">
                  {JSON.stringify(
                    selectedNode.outputData || {
                      status: 'success',
                      nodeId: selectedNode.id,
                      timestamp: Date.now(),
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
