/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, TrendingUp, Cpu, ChevronLeft, ChevronRight, Play, Eye, Tv, Clock, 
  ArrowRight, Info, Palette, Compass, BookOpen, Tag, Box, Archive, Package, 
  LayoutGrid, Scissors, X, Mail, Phone, MapPin, XCircle, ArrowDownRight, Film
} from 'lucide-react';

// --- Types & Constants ---
type Language = 'zh' | 'en';

const TABS = [
  { id: 0, label: '首页', en: 'HOME', icon: Cpu },
  { id: 1, label: '3D动画', en: '3D ANIMATION', icon: Film },
  { id: 2, label: '平面设计', en: 'GRAPHIC DESIGN', icon: LayoutGrid },
  { id: 3, label: '包装设计', en: 'PACKAGING DESIGN', icon: Package },
];

const PACKAGING_VIEWS = [
  {
    id: 0,
    title: "礼盒立体正侧渲染视角",
    titleEn: "Gift Box 3D Side Perspective",
    subtitle: "透视侧视图",
    subtitleEn: "Side View Perspective",
    mat: "至臻黑卡原纸 / Black Cardboard",
    fin: "24K 黄金压印 / Foil Stamping",
    proc: "高精密击凸与哑膜光油工艺 / Embossing",
    color: "from-stone-800 via-stone-950 to-black",
    specs: ["重量: 1200g", "厚度: 2.5mm", "公差: ±0.1mm"],
    specsEn: ["Weight: 1200g", "Thickness: 2.5mm", "Tolerance: ±0.1mm"]
  },
  {
    id: 1,
    title: "经典上下盖开箱立体展示",
    titleEn: "Classic Lid & Base Unboxing",
    subtitle: "开箱结构演示",
    subtitleEn: "Unboxing Structure",
    mat: "1200g 强化卡板内胚 / Coated Cardboard",
    fin: "香槟金烫金工艺 / Champagne Gold",
    proc: "高精度 V 槽开槽工艺 / V-Slotting",
    color: "from-slate-800 via-slate-900 to-stone-950",
    specs: ["类型: 天地盖", "内衬: EVA 植绒", "结构: 磁吸"],
    specsEn: ["Type: Lid & Base", "Internal: EVA Velvet", "Mechanism: Magnetic"]
  },
  {
    id: 2,
    title: "内部植绒EVA卡槽构造细节",
    titleEn: "Internal EVA Slot Details",
    subtitle: "内托缓冲结构",
    subtitleEn: "Inner Cushioning Structure",
    mat: "高密度环保高弹 EVA / High Density EVA",
    fin: "奢华仿麂皮植绒饰面 / Velvet Finish",
    proc: "激光刀模精密打样及成型 / Laser Cut",
    color: "from-zinc-800 via-zinc-950 to-neutral-950",
    specs: ["密度: 60kg/m³", "特性: 防静电", "精度: 激光级"],
    specsEn: ["Density: 60kg/m³", "Feature: Anti-static", "Precision: Laser Level"]
  },
  {
    id: 3,
    title: "平面精密包装印刷刀模线",
    titleEn: "Graphic Packaging Die-cut Lines",
    subtitle: "工程展开图",
    subtitleEn: "Engineering Blueprint",
    mat: "高精印刷原厂工程文件 / Full Template",
    fin: "纯矢量精确尺寸定位线 / Vector Art",
    proc: "电脑智能座标切割打样 / Digital Plotting",
    color: "from-neutral-900 via-zinc-950 to-black",
    specs: ["分辨率: 300DPI", "格式: .AI / .C4D", "比例: 1:1"],
    specsEn: ["Res: 300DPI", "Format: .AI / .C4D", "Scale: 1:1"]
  }
];

const GRAPHIC_CARDS = [
  { 
    id: 0, 
    cat: 'layout', 
    title: '极简未来主义海报', 
    titleEn: 'Minimalist Futurist Poster',
    icon: Palette, 
    color: 'from-emerald-950/80', 
    accent: 'emerald', 
    textColor: 'text-emerald-400', 
    bgColor: 'bg-emerald-500/20', 
    borderColor: 'border-emerald-500/20', 
    label: '版式设计',
    labelEn: 'Layout Design',
    tech: 'Typographic System / Grid Theory',
    desc: '探索排版在三维空间中的张力与平衡。',
    descEn: 'Exploring the tension and balance of typography in 3D space.',
    year: '2026'
  },
  { 
    id: 1, 
    cat: 'brand', 
    title: '太空探索主题品牌画册', 
    titleEn: 'Space Exploration Brand Book',
    icon: Compass, 
    color: 'from-indigo-950/80', 
    accent: 'indigo', 
    textColor: 'text-indigo-400', 
    bgColor: 'bg-indigo-500/20', 
    borderColor: 'border-indigo-500/20', 
    label: '品牌KV',
    labelEn: 'Brand Identity',
    tech: 'Visual Identity / Print System',
    desc: '构建一个跨星系的视觉符号语言。',
    descEn: 'Constructing a cross-galactic visual symbolic language.',
    year: '2025'
  },
  { 
    id: 2, 
    cat: 'brand', 
    title: 'ORIGEN 品牌核心主KV', 
    titleEn: 'ORIGEN Brand Core KV',
    icon: Eye, 
    color: 'from-blue-950/80', 
    accent: 'blue', 
    textColor: 'text-blue-400', 
    bgColor: 'bg-blue-500/20', 
    borderColor: 'border-blue-500/20', 
    label: '品牌全案', 
    labelEn: 'Global Campaign',
    featured: true,
    tech: 'Global Campaign / Master KV',
    desc: 'ORIGEN全案视觉体系的核心，定义品牌美学基调。',
    descEn: 'Core of ORIGEN visual system, defining brand aesthetic tone.',
    year: '2026'
  },
  { 
    id: 3, 
    cat: 'layout', 
    title: '黑金奢华概念杂志内页', 
    titleEn: 'Black Gold Luxury Magazine',
    icon: BookOpen, 
    color: 'from-pink-950/80', 
    accent: 'pink', 
    textColor: 'text-pink-400', 
    bgColor: 'bg-pink-500/20', 
    borderColor: 'border-pink-500/20', 
    label: '版式设计',
    labelEn: 'Layout Design',
    tech: 'Editorial Design / Luxury Grid',
    desc: '极致的留白与比例，还原纸质媒介的尊享感。',
    descEn: 'Extreme whitespace and proportion, restoring tactile luxury.',
    year: '2026'
  },
  { 
    id: 4, 
    cat: 'brand', 
    title: '奢华护肤视觉基因设定', 
    titleEn: 'Luxury Skincare Visual DNA',
    icon: Tag, 
    color: 'from-amber-950/80', 
    accent: 'amber', 
    textColor: 'text-amber-400', 
    bgColor: 'bg-amber-500/20', 
    borderColor: 'border-amber-500/20', 
    label: '品牌KV',
    labelEn: 'Brand Key Visual',
    tech: 'Visual DNA / Product Strategy',
    desc: '将科技感融入奢华感，重新定义高端护肤视觉。',
    descEn: 'Merging tech and luxury, redefining high-end skincare visuals.',
    year: '2025'
  },
];

// --- Sub-Components ---

const BentoGallery = ({ cards, activeIndex, setActiveIndex, filter, lang, t }: { cards: any[], activeIndex: number, setActiveIndex: (i: number) => void, filter: string, lang: Language, t: any }) => {
  const filtered = cards.filter(c => filter === 'all' || c.cat === filter);
  
  return (
    <div className="w-full h-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center relative">
      <AnimatePresence mode="wait">
        {activeIndex === -1 ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-8 w-full h-[40rem] md:h-[48rem]"
          >
            {filtered.map((card, idx) => {
              const gridClasses = [
                "md:col-span-6 md:row-span-2", 
                "md:col-span-3 md:row-span-1", 
                "md:col-span-3 md:row-span-2", 
                "md:col-span-3 md:row-span-1", 
                "md:col-span-3 md:row-span-1",
              ][idx % 5];

              return (
                <motion.div
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  onClick={() => setActiveIndex(card.id)}
                  className={`${gridClasses} relative rounded-[2.5rem] overflow-hidden cursor-pointer group border border-white/5 bg-slate-900/40 backdrop-blur-md`}
                  whileHover={{ scale: 0.98, transition: { duration: 0.4 } }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-[9px] font-black tracking-[0.3em] uppercase ${card.textColor}`}
                      >
                        {card.cat} // 0{card.id + 1}
                      </motion.div>
                      <card.icon className={`w-5 h-5 ${card.textColor} opacity-40 group-hover:opacity-100 transition-opacity`} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform">{lang === 'zh' ? card.title : card.titleEn}</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">{card.tech}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            key="focus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col md:flex-row gap-8 items-stretch"
          >
            <motion.div 
              layoutId={`card-${activeIndex}`}
              className="flex-1 rounded-[3.5rem] overflow-hidden relative border border-white/10 bg-slate-950 shadow-2xl min-h-[30rem]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cards.find(c => c.id === activeIndex)?.color} opacity-40`} />
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                 <div className="w-full h-full rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl flex items-center justify-center group overflow-hidden relative">
                    <span className="text-[12vw] font-black text-white/[0.03] select-none uppercase tracking-tighter">{t.selectedPiece}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                       {(() => {
                         const IconComp = cards.find(c => c.id === activeIndex)?.icon || Eye;
                         return <IconComp className="w-32 h-32 text-white/5 animate-pulse" />;
                       })()}
                    </div>
                 </div>
              </div>
              
              <button 
                onClick={() => setActiveIndex(-1)}
                className="absolute top-8 left-8 w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-20 group"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-[32rem] flex flex-col justify-between py-6"
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 ${cards.find(c => c.id === activeIndex)?.textColor} text-[9px] font-bold tracking-[0.2em] uppercase`}>
                      {lang === 'zh' ? cards.find(c => c.id === activeIndex)?.label : cards.find(c => c.id === activeIndex)?.labelEn}
                    </span>
                    <span className="text-slate-500 text-[9px] tracking-[0.3em] uppercase">{t.archive} // 2026</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-4">
                    {lang === 'zh' ? cards.find(c => c.id === activeIndex)?.title : cards.find(c => c.id === activeIndex)?.titleEn}
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-sm font-light">
                    {lang === 'zh' ? cards.find(c => c.id === activeIndex)?.desc : cards.find(c => c.id === activeIndex)?.descEn}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: t.techDetail, value: cards.find(c => c.id === activeIndex)?.tech },
                    { label: t.year, value: cards.find(c => c.id === activeIndex)?.year },
                    { label: t.role, value: t.leadDesigner },
                    { label: t.region, value: t.global }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 hover:bg-white/[0.04] transition-colors">
                      <div className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
                      <div className="text-[10px] text-white font-medium truncate">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between border-t border-white/5 gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                       {i}
                    </div>
                  ))}
                </div>
                <button className="flex-1 px-8 py-3.5 rounded-2xl bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase hover:bg-blue-500 hover:text-white transition-all shadow-xl flex items-center justify-center space-x-2">
                  <span>{t.fullCase}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PackagingShowcase = ({ currentView, setView, lang, t }: { currentView: number, setView: (i: number) => void, lang: Language, t: any }) => {
  const data = PACKAGING_VIEWS[currentView];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center relative p-4 md:p-12 overflow-hidden -mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full items-center relative z-10">
        
        {/* Left: Technical Info Panel */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-10">
          <motion.div
            key={`info-${currentView}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-8 h-[1px] bg-blue-500"></span>
                <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">{t.packagingSpecs}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-3">
                {lang === 'zh' ? data.title : data.titleEn}
              </h2>
              <p className="text-slate-500 text-[11px] font-mono tracking-[0.3em] uppercase">{lang === 'zh' ? data.subtitle : data.subtitleEn}</p>
            </div>

            <div className="space-y-6">
              {[
                { label: t.matTech, value: data.mat },
                { label: t.surface, value: data.fin },
                { label: t.process, value: data.proc }
              ].map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-2 group-hover:text-blue-400 transition-colors uppercase">{item.label}</div>
                  <div className="text-sm text-slate-200 font-medium pb-2 border-b border-white/5 transition-all group-hover:border-blue-500/30 group-hover:pl-2">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Center: Interactive 3D Mockup Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="lg:col-span-6 h-[32rem] md:h-[40rem] relative flex items-center justify-center"
          style={{ perspective: '2500px' }}
        >
          <div className="pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30, z: -200 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: mousePos.x, 
                  rotateX: -mousePos.y,
                  z: 0 
                }}
                exit={{ opacity: 0, scale: 1.1, rotateY: 30, z: 200 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 100, 
                  damping: 20,
                  rotateY: { duration: 0.1 }, 
                  rotateX: { duration: 0.1 } 
                }}
                className="relative w-80 md:w-[32rem] aspect-square group cursor-grab active:cursor-grabbing"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${data.color} rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col justify-center items-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
                  <motion.div 
                    animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 opacity-10"
                    style={{ 
                      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
                      backgroundSize: '40px 40px'
                    }}
                  />
                  <div className="text-center space-y-4 relative z-10 p-8">
                    <div className="w-16 h-16 mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
                      <Box className="w-full h-full text-blue-500/80" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-white tracking-[0.3em] uppercase">ORIGEN</h4>
                      <p className="text-[10px] text-blue-400 font-bold tracking-[0.4em] uppercase">{t.excellence}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Perspective & Selector Panel */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
             {PACKAGING_VIEWS.map((view, i) => (
                <button
                  key={view.id}
                  onClick={() => setView(i)}
                  className={`w-full group relative flex items-center p-5 rounded-2xl transition-all duration-500 overflow-hidden ${
                    currentView === i 
                      ? 'bg-white/5 border border-white/10 ring-1 ring-blue-500/50' 
                      : 'hover:bg-white/[0.03] border border-white/5'
                  }`}
                >
                  <div className={`w-1 tracking-tighter transition-all duration-500 mr-4 ${currentView === i ? 'h-10 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'h-4 bg-white/10 group-hover:h-8 group-hover:bg-white/30'}`} />
                  <div className="text-left">
                    <div className={`text-[8px] font-black tracking-widest uppercase mb-1 transition-colors ${currentView === i ? 'text-blue-400' : 'text-slate-500'}`}>
                       {t.viewPerspective} 0{i + 1}
                    </div>
                    <div className={`text-[11px] font-bold transition-colors ${currentView === i ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} uppercase tracking-wider`}>
                      {lang === 'zh' ? view.subtitle : view.subtitleEn}
                    </div>
                  </div>
                </button>
             ))}
          </div>
          
          <div className="pt-6 border-t border-white/5">
            <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-4">{t.metadata}</div>
            <div className="flex flex-wrap gap-2">
              {(lang === 'zh' ? data.specs : data.specsEn).map((spec, i) => (
                <span key={i} className="text-[8px] px-2.5 py-1.5 bg-blue-500/5 text-blue-400/60 rounded-lg font-mono border border-blue-500/10 uppercase tracking-tight">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const NavButton = ({ active, tab, onClick, lang }: { key?: any; active: boolean; tab: any; onClick: () => void; lang: Language }) => (
  <button 
    id={`nav-btn-${tab.id}`}
    onClick={onClick}
    className="relative group flex-1 py-3 outline-none touch-none"
  >
    <div className={`relative flex flex-col items-center justify-center space-y-1 transition-all duration-500 ${active ? 'scale-110' : 'scale-100 group-hover:scale-105 opacity-40 group-hover:opacity-70'}`}>
      <tab.icon className={`w-4 h-4 md:w-5 md:h-5 ${active ? 'text-blue-400' : 'text-slate-400'}`} />
      <span className={`text-xs md:text-sm font-black tracking-widest block transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
        {lang === 'zh' ? tab.label : tab.en}
      </span>
      <span className={`text-[7px] md:text-[8px] uppercase tracking-[0.2em] block font-bold transition-colors ${active ? 'text-blue-500' : 'text-slate-600'}`}>
        {tab.en}
      </span>
    </div>
    
    <AnimatePresence>
      {active && (
        <>
          <motion.div 
            layoutId="tab-active-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-500/[0.08] rounded-2xl -z-10 border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.1)]"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
          <motion.div 
            layoutId="tab-active-line"
            className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        </>
      )}
    </AnimatePresence>
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [lang, setLang] = useState<Language>('zh');
  const [showContact, setShowContact] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  // 3D Tilt Ref
  const avatarRef = useRef<HTMLDivElement>(null);
  const pkgRef = useRef<HTMLDivElement>(null);
  const pkgBoxRef = useRef<HTMLDivElement>(null);

  // Coverflow & Gallery States
  const [coverflowIndex, setCoverflowIndex] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(-1);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [pkgView, setPkgView] = useState(1);

  const t = {
    zh: {
      slogan1: "光造虚实",
      slogan2: "影造深浅",
      slogan3: "解构创意",
      badge: "AI 赋能主流跨境电商平台视觉体系搭建",
      remote: "支持远程办公",
      curiosity: "保持好奇颗粒度",
      pyramid: "构筑创意金字塔",
      intro: "把产品从堆图中打捞出来，用光的层次替顾客摸到质感。",
      userName: "公羽sir",
      profile: "履历详情",
      skill1: "全案设计助力设计",
      skill2: "审美积淀设计加分",
      skill3: "重塑自然写实光影",
      animationTitle: "三维动画渲染",
      animationSub: "电影级三维动画渲染演示",
      watchNow: "立即观看",
      packagingSpecs: "包装参数详情",
      matTech: "材质工艺",
      surface: "表面处理",
      process: "制作工序",
      metadata: "工程文件元数据",
      viewPerspective: "视角阶段",
      excellence: "卓越视觉体系",
      selectedPiece: "展示作品",
      archive: "存档",
      techDetail: "技术细节",
      year: "年份",
      role: "角色",
      leadDesigner: "主创设计师",
      region: "地区",
      global: "全球",
      fullCase: "查看全案",
      cta: "开始探索作品集",
      navHome: "首页",
      navContact: "联系方式",
    },
    en: {
      slogan1: "Light Shaping",
      slogan2: "Shadow Creating",
      slogan3: "Creative Deconstruction",
      badge: "AI Powers Visual Systems for Cross-border E-commerce",
      remote: "Remote Friendly",
      curiosity: "Granular Curiosity",
      pyramid: "Creative Pyramid",
      intro: "Rescuing products from mediocre images, using layers of light to let customers feel the texture.",
      userName: "Gongyu Sir",
      profile: "Profile Details",
      skill1: "Full Design Empowerment",
      skill2: "Aesthetic Design Value",
      skill3: "Realistic Lighting & Shadow",
      animationTitle: "3D Animation Rendering",
      animationSub: "Cinematic 3D Animation Showcase",
      watchNow: "Watch Now",
      packagingSpecs: "Packaging Specs",
      matTech: "Material & Tech",
      surface: "Surface Finish",
      process: "Production Process",
      metadata: "Engineering Metadata",
      viewPerspective: "Perspective View",
      excellence: "Excellence System",
      selectedPiece: "Selected Work",
      archive: "Archive",
      techDetail: "Tech Details",
      year: "Year",
      role: "Role",
      leadDesigner: "Creative Lead",
      region: "Region",
      global: "Global",
      fullCase: "Full Case",
      cta: "Explore Portfolio",
      navHome: "Home",
      navContact: "Contact",
    }
  }[lang];

  // --- Handlers ---
  const handleAvatarMove = (e: MouseEvent) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 12;
    const angleY = (x - xc) / 12;
    avatarRef.current.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleAvatarLeave = () => {
    if (!avatarRef.current) return;
    avatarRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const handlePkgMove = (e: MouseEvent) => {
    if (!pkgBoxRef.current || !pkgRef.current) return;
    const rect = pkgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 6;
    const angleY = (x - xc) / 6;
    pkgBoxRef.current.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
  };

  const handlePkgLeave = () => {
    if (!pkgBoxRef.current) return;
    pkgBoxRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  const filteredGallery = GRAPHIC_CARDS.filter(c => galleryFilter === 'all' || c.cat === galleryFilter);

  return (
    <div className="bg-dark-bg text-slate-100 h-screen overflow-hidden flex flex-col font-sans select-none antialiased relative">
      {/* Background Layers */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      <div className="fixed inset-0 glow-overlay pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen"></div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.04] bg-dark-bg/60 backdrop-blur-md">
        <div className="flex items-center space-x-8">
          <div onClick={() => setActiveTab(0)} className="flex items-center space-x-3 cursor-pointer group">
            <div className="px-5 py-1.5 rounded-full bg-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border border-white/10 uppercase">
              <span className="text-white font-bold text-[10px] tracking-tighter">LSTUDIO</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-slate-400 border-l border-white/10 pl-8">
            <button onClick={() => setActiveTab(0)} className="hover:text-white transition-colors duration-200">{t.navHome}</button>
            <button onClick={() => setShowContact(true)} className="hover:text-white transition-colors duration-200">{t.navContact}</button>
          </nav>
        </div>

        <div className="flex items-center bg-slate-900/80 border border-white/[0.08] rounded-full p-0.5 text-xs">
          <button 
            onClick={() => setLang('zh')}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-300 ${lang === 'zh' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >中</button>
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-300 ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >EN</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col justify-center px-4 md:px-12 py-4 bg-[#05070B]">
        {/* Dynamic Ambient Glow */}
        <motion.div 
          animate={{
            x: activeTab * 200 - 300,
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 20 },
            opacity: { duration: 4, repeat: Infinity },
            scale: { duration: 6, repeat: Infinity }
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full blur-[160px] pointer-events-none z-0 mix-blend-screen transition-colors duration-1000 ${activeTab === 0 ? 'bg-blue-500/10' : activeTab === 1 ? 'bg-purple-500/10' : activeTab === 2 ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}
        />

        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.section 
              key="tab-0"
              initial={{ opacity: 0, filter: 'blur(10px)', x: -40 }}
              animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', x: 40 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="tab-content w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 border border-dark-bg flex items-center justify-center text-[8px] text-black font-bold">A</div>
                    <div className="w-5 h-5 rounded-full bg-cyan-500 border border-dark-bg flex items-center justify-center text-[8px] text-black font-bold">I</div>
                    <div className="w-5 h-5 rounded-full bg-rose-500 border border-dark-bg flex items-center justify-center text-[8px] text-black font-bold">3D</div>
                  </div>
                  <span className="text-sm tracking-widest text-slate-400 font-light uppercase">{t.badge}</span>
                </motion.div>

                <div className="relative space-y-4 select-none">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative inline-block"
                  >
                    <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white leading-[0.85]">{t.slogan1}</h1>
                    <span className="absolute -top-8 -right-24 text-[12px] bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full text-blue-400 font-bold whitespace-nowrap animate-float backdrop-blur-md shadow-lg shadow-blue-500/10">{t.remote}</span>
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-7xl md:text-9xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 leading-[0.85]"
                  >{t.slogan2}</motion.h2>
                  <motion.h3 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white/50 leading-[0.85]"
                  >{t.slogan3}</motion.h3>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6 pt-10 border-t border-white/[0.05] max-w-3xl"
                >
                  <div className="flex items-center space-x-4 text-base text-slate-400 font-medium tracking-[0.3em] uppercase">
                    <span>{t.curiosity}</span>
                    <span className="text-slate-700">—</span>
                    <span>{t.pyramid}</span>
                  </div>
                  <p className="text-xl text-slate-300 font-light leading-relaxed">{t.intro}</p>
                </motion.div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-end">
                <motion.div 
                  ref={avatarRef}
                  onMouseMove={handleAvatarMove}
                  onMouseLeave={handleAvatarLeave}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="relative w-full max-w-2xl transition-all duration-100 ease-out"
                >
                  <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel p-5 flex flex-col justify-between shadow-2xl group border border-white/[0.1] hover:border-blue-500/30">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <div className="w-full h-full grayscale group-hover:grayscale-0 contrast-[1.15] transition-all duration-1000 scale-100 group-hover:scale-105 ease-out bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2564&auto=format&fit=crop")' }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                      </div>
                    </div>

                    <div className="relative z-10 self-end bg-black/50 backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-1 text-xs text-slate-300 font-medium tracking-widest shadow-lg">{t.userName}</div>

                    <div className="relative z-10 grid grid-cols-3 gap-3 mt-auto">
                      {[
                        { icon: Layers, color: 'blue', title: t.skill1, items: ['▪ Adobe Family', '▪ C4D / OC / RS', '▪ Keyshot'] },
                        { icon: TrendingUp, color: 'purple', title: t.skill2, items: ['▪ Junior', '▪ Intermediate', '▪ Senior'] },
                        { icon: Cpu, color: 'pink', title: t.skill3, items: ['▪ Midjourney', '▪ ChatGPT', '▪ Gemini'] }
                      ].map((card, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          className="glass-panel p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className={`flex items-center space-x-1.5 text-${card.color}-400 mb-1.5`}><card.icon className="w-3.5 h-3.5" /><span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">{t.profile}</span></div>
                          <h4 className="text-[10px] text-white font-medium mb-1 truncate">{card.title}</h4>
                          <div className="space-y-0.5 text-[8px] text-slate-400">{card.items.map((item, i) => <div key={i}>{item}</div>)}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          )}

          {activeTab === 1 && (
            <motion.section 
              key="tab-1"
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateX: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="tab-content w-full max-w-7xl mx-auto flex flex-col justify-center items-center space-y-6"
            >
              <div className="text-center space-y-2 mb-2">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-neon"></span>
                  <span>{t.animationSub}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">{t.animationTitle}</h2>
              </div>

              <div className="relative w-full flex items-center justify-center py-6 select-none group">
                <button 
                  onClick={() => setCoverflowIndex(p => (p - 1 + 3) % 3)}
                  className="absolute left-2 md:left-10 z-30 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-blue-600/90 text-white border border-white/[0.08] hover:border-blue-400/50 flex items-center justify-center transition-all duration-300 shadow-lg"
                ><ChevronLeft className="w-5 h-5" /></button>

                <div className="w-full max-w-[85rem] h-[36rem] md:h-[45rem] relative flex items-center justify-center overflow-visible" style={{ perspective: '1500px' }}>
                  {[0, 1, 2].map((idx) => {
                    const offset = idx - coverflowIndex;
                    const isActive = idx === coverflowIndex;
                    return (
                      <motion.div
                        key={idx}
                        onClick={() => setCoverflowIndex(idx)}
                        animate={{
                          x: offset * (window.innerWidth < 768 ? 240 : 420),
                          rotateY: offset * -40,
                          scale: isActive ? 1.2 : 0.85,
                          zIndex: isActive ? 30 : 10,
                          opacity: isActive ? 1 : 0.35,
                          filter: isActive ? 'blur(0px)' : 'blur(5px)',
                        }}
                        transition={{ type: 'spring', damping: 24, stiffness: 70 }}
                        className={`absolute w-[90%] max-w-[36rem] h-[24rem] md:h-[32rem] rounded-[3rem] overflow-hidden glass-panel cursor-pointer flex flex-col justify-end ${isActive ? 'nav-active-box shadow-[0_0_100px_-25px_rgba(59,130,246,0.4)]' : ''}`}
                      >
                         <div className={`absolute inset-0 bg-gradient-to-br ${idx === 1 ? 'from-blue-900/40' : idx === 0 ? 'from-indigo-900/60' : 'from-purple-900/60'} via-slate-950/90 to-dark-bg`}>
                            <div className="w-full h-full opacity-60 flex items-center justify-center relative">
                                <span className="text-[10px] tracking-[0.3em] text-slate-500 font-extrabold uppercase">
                                  {idx === 0 ? 'MAINE COON CAT SHOWCASE' : idx === 1 ? 'FEATURED REEL' : 'PARTICLE DUST SIMULATION'}
                                </span>
                            </div>
                        </div>
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.button 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              onClick={(e) => { e.stopPropagation(); setShowVideo(true); }} 
                              className="pointer-events-auto w-16 h-16 rounded-full bg-blue-500/10 border-2 border-blue-400 flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 pulse-neon-border"
                            >
                              <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </motion.button>
                          </div>
                        )}
                        <div className="p-6 relative z-10 bg-gradient-to-t from-black/95 to-transparent">
                          <span className="bg-blue-600/80 text-[9px] px-2.5 py-0.5 rounded text-white tracking-widest uppercase mb-2 inline-block">3D Animation</span>
                          <h3 className="text-lg font-bold text-white mb-1">
                            {idx === 0 
                              ? (lang === 'zh' ? '好奇时刻 · 3D写实毛发' : 'Curious Moment · Realistic Fur') 
                              : idx === 1 
                                ? (lang === 'zh' ? 'Curious Moment' : 'Curious Moment') 
                                : (lang === 'zh' ? '自然写实微尘模拟' : 'Realistic Dust Simulation')}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {idx === 0 
                              ? (lang === 'zh' ? '缅因猫全骨骼绑定与自然动态解算' : 'Maine Coon skeletal binding & dynamics') 
                              : idx === 1 
                                ? (lang === 'zh' ? '电影级镜头运动与打光示范' : 'Cinematic camera movement & lighting') 
                                : (lang === 'zh' ? '精细环境流体动力学及散景深度渲染' : 'Refined fluid dynamics & bokeh depth rendering')}
                          </p>
                          {isActive && (
                             <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10 pt-2.5 mt-3"
                             >
                                <span className="flex items-center space-x-1"><Tv className="w-3.5 h-3.5 text-blue-400" /><span>4K RESOLUTION</span></span>
                                <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5 text-blue-400" /><span>00:45</span></span>
                                <button onClick={(e) => {e.stopPropagation(); setShowVideo(true);}} className="text-white hover:text-blue-400 font-semibold flex items-center space-x-1"><span>{t.watchNow}</span><ArrowRight className="w-3 h-3" /></button>
                             </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setCoverflowIndex(p => (p + 1) % 3)}
                  className="absolute right-2 md:right-10 z-30 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-blue-600/90 text-white border border-white/[0.08] hover:border-blue-400/50 flex items-center justify-center transition-all duration-300 shadow-lg"
                ><ChevronRight className="w-5 h-5" /></button>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                {[0, 1, 2].map(i => (
                  <button 
                    key={i}
                    onClick={() => setCoverflowIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === coverflowIndex ? 'w-6 bg-blue-500 shadow-neonBlue' : 'w-2.5 bg-slate-700'}`}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 2 && (
            <motion.section 
              key="tab-2"
              initial={{ opacity: 0, filter: 'blur(20px)', rotateX: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
              exit={{ opacity: 0, filter: 'blur(20px)', rotateX: -10 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="tab-content w-full h-full flex flex-col justify-center items-center relative overflow-hidden"
            >
              {/* Cinematic Background Glow System */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ 
                    opacity: [0.15, 0.25, 0.15] 
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[200px]"
                />
              </div>

              <div className="absolute top-0 inset-x-0 py-8 text-center z-20 pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[11px] font-black tracking-[0.4em] text-slate-500 uppercase">Interactive Studio Interface // v2.6</span>
                </motion.div>
              </div>

              <BentoGallery 
                cards={GRAPHIC_CARDS}
                activeIndex={galleryIndex}
                setActiveIndex={setGalleryIndex}
                filter={galleryFilter}
                lang={lang}
                t={t}
              />

              <div className="absolute bottom-4 flex items-center space-x-4 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md opacity-30 hover:opacity-100 transition-opacity cursor-default z-20">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase">Studio Workspace: Layout Dynamics / Kinetic Focus</span>
              </div>
            </motion.section>
          )}

          {activeTab === 3 && (
            <motion.section 
              key="tab-3"
              initial={{ opacity: 0, filter: 'blur(30px)', scale: 0.9 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(30px)', scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="tab-content w-full h-full flex items-center justify-center"
            >
              <PackagingShowcase 
                currentView={pkgView}
                setView={setPkgView}
                lang={lang}
                t={t}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Nav */}
      <footer className="fixed bottom-0 inset-x-0 z-50 px-4 pb-8 md:pb-10 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel rounded-[2rem] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 bg-slate-950/40 backdrop-blur-3xl relative overflow-hidden group"
          >
            {/* Inner glow effect for the dock */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-stretch justify-between gap-1 relative z-10">
              {TABS.map((tab) => (
                <NavButton 
                  key={tab.id}
                  tab={tab}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  lang={lang}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-4"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300"
            ><X className="w-6 h-6" /></button>
            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative flex items-center justify-center bg-black">
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin flex items-center justify-center">
                  <Film className="w-8 h-8 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold tracking-widest text-white">
                    {lang === 'zh' ? '缅因猫写实骨骼及运动捕捉数据载入中...' : 'Loading Maine Coon Skeleton & Motion Data...'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {lang === 'zh' ? '正在与渲染农场进行多线程视频流交互' : 'Multi-threaded video streaming with render farm...'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel rounded-3xl p-8 max-w-md w-full relative space-y-6"
            >
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              ><X className="w-5 h-5" /></button>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'zh' ? '联系公羽sir / Get In Touch' : 'Get In Touch with Gongyu'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'zh' ? '期待与您合作，构筑更具价值的商业视觉美学' : 'Looking forward to building valuable commercial visual aesthetics with you'}
                </p>
              </div>
              <div className="space-y-3.5 text-sm text-slate-300">
                <div className="flex items-center space-x-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{lang === 'zh' ? '联系方式：18359256086 (微信)' : 'Contact: 18359256086 (WeChat)'}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>{lang === 'zh' ? '电子邮箱：731287969@qq.com' : 'Email: 731287969@qq.com'}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>{lang === 'zh' ? '办公地址：中国 · 厦门' : 'Location: Xiamen, China'}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowContact(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm tracking-widest transition-all"
              >{lang === 'zh' ? '确认并关闭' : 'Confirm & Close'}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
