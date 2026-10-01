import React, { useState } from 'react';
import { ChevronDown, BarChart2, TrendingUp, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { YearEmissionsData, ScopeType } from '../types';

interface MonthlyTimelineCardProps {
  data: YearEmissionsData;
}

export const MonthlyTimelineCard: React.FC<MonthlyTimelineCardProps> = ({ data }) => {
  const [chartMode, setChartMode] = useState<'area' | 'bar'>('area');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'scope1' | 'scope2' | 'scope3'>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);

  const months = data.monthly;

  // Max value calculation for chart scaling
  const maxMonthlyVal = Math.max(...months.map((m) => m.total));
  const chartHeight = 180;
  const chartWidth = 620;

  // Helper to get selected value for a month based on scopeFilter
  const getValue = (m: (typeof months)[0]) => {
    if (scopeFilter === 'scope1') return m.scope1;
    if (scopeFilter === 'scope2') return m.scope2;
    if (scopeFilter === 'scope3') return m.scope3;
    return m.total;
  };

  // Generate smooth cubic-bezier SVG path
  const points = months.map((m, index) => {
    const x = (index / (months.length - 1)) * (chartWidth - 60) + 40;
    const val = getValue(m);
    const y = chartHeight - (val / (maxMonthlyVal * 1.15)) * (chartHeight - 30) - 20;
    return { x, y, month: m.month, data: m };
  });

  // Build SVG path d string
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    pathD += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  // Area path closing at the bottom
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  return (
    <div className="glass-card-top p-5 sm:p-6 lg:p-7 relative overflow-hidden flex flex-col justify-between h-full hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300">
      {/* Header with Title and Scope Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-3.5 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-[19px] font-semibold text-[#0B1926] tracking-tight">
              Total Emissions over Months
            </h2>
            <span className="text-[11px] font-medium text-blue-700 bg-white/80 backdrop-blur-sm border border-blue-200/70 px-2.5 py-0.5 rounded-full shadow-2xs">
              Monthly Audit
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Dynamic monthly variance across Scope 1, 2, and 3
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Chart mode toggle: Cubic Area Spline vs Monthly Stacked Bars */}
          <div className="flex items-center p-1 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-2xs text-xs">
            <button
              onClick={() => setChartMode('area')}
              aria-label="Area spline chart"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                chartMode === 'area'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-slate-500 hover:text-[#0B1926]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartMode('bar')}
              aria-label="Stacked bar chart"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                chartMode === 'bar'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-slate-500 hover:text-[#0B1926]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scope Dropdown */}
          <div className="relative">
            <button
              onClick={() => setScopeDropdownOpen(!scopeDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur-md hover:bg-white/80 rounded-full text-xs font-medium text-slate-700 hover:text-[#0B1926] border border-white/80 shadow-2xs transition-all cursor-pointer"
            >
              <span className="capitalize">
                {scopeFilter === 'all' ? 'All Scopes' : scopeFilter.replace('scope', 'Scope ')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {scopeDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white/95 backdrop-blur-xl rounded-2xl p-1.5 shadow-xl border border-slate-200/90 z-50 animate-in fade-in zoom-in-95">
                {[
                  { id: 'all', label: 'All Scopes' },
                  { id: 'scope1', label: 'Scope 1 Only' },
                  { id: 'scope2', label: 'Scope 2 Only' },
                  { id: 'scope3', label: 'Scope 3 Only' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setScopeFilter(item.id as any);
                      setScopeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xl transition-colors cursor-pointer ${
                      scopeFilter === item.id
                        ? 'bg-[#0E6DBB]/10 text-[#0E6DBB] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div
        className="relative w-full h-[225px] flex items-center justify-center my-auto"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Top-Aligned Animated Hover Pop Card on Month Hover */}
        <AnimatePresence>
          {hoveredIndex !== null && months[hoveredIndex] && (
            <motion.div
              key="top-aligned-hover-card"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-auto max-w-[96%]"
            >
              <div className="bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_12px_36px_rgba(15,23,42,0.12)] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-center sm:justify-between gap-2.5 sm:gap-4 text-xs">
                {/* 1. Month Identifier & Audit Tag */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-[13px]">
                      {months[hoveredIndex].month} {data.year}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50/90 border border-emerald-200/60 px-2 py-0.5 rounded-full shadow-2xs">
                      Audit
                    </span>
                  </div>

                  <div className="h-4 w-px bg-slate-200/80" />

                  {/* 2. Total Monthly Metric */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                      Total:
                    </span>
                    <span className="text-sm sm:text-base font-bold font-data text-[#0B1926] leading-none">
                      {months[hoveredIndex].total.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal">tCO2e</span>
                  </div>
                </div>

                {/* 3. Scope Breakdown Pills (Horizontally arranged for compact, elegant hierarchy) */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  {/* Scope 1 Pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-50/80 border border-rose-200/60 shadow-2xs text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
                    <span className="text-slate-600 font-medium">Scope 1:</span>
                    <span className="font-semibold font-data text-slate-900">
                      {months[hoveredIndex].scope1.toLocaleString()}t
                    </span>
                    <span className="text-rose-600 font-medium text-[10px] font-data">
                      ({Math.round((months[hoveredIndex].scope1 / months[hoveredIndex].total) * 100)}%)
                    </span>
                  </div>

                  {/* Scope 2 Pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50/80 border border-purple-200/60 shadow-2xs text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                    <span className="text-slate-600 font-medium">Scope 2:</span>
                    <span className="font-semibold font-data text-slate-900">
                      {months[hoveredIndex].scope2.toLocaleString()}t
                    </span>
                    <span className="text-purple-600 font-medium text-[10px] font-data">
                      ({Math.round((months[hoveredIndex].scope2 / months[hoveredIndex].total) * 100)}%)
                    </span>
                  </div>

                  {/* Scope 3 Pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50/80 border border-blue-200/60 shadow-2xs text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E6DBB]" />
                    <span className="text-slate-600 font-medium">Scope 3:</span>
                    <span className="font-semibold font-data text-slate-900">
                      {months[hoveredIndex].scope3.toLocaleString()}t
                    </span>
                    <span className="text-[#0E6DBB] font-medium text-[10px] font-data">
                      ({Math.round((months[hoveredIndex].scope3 / months[hoveredIndex].total) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {chartMode === 'area' ? (
          <div className="w-full h-full relative pt-4">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <defs>
                {/* Cyber Blue subtle gradient fill matching PRD: Cyber Blue (rgba(14, 109, 187, 0.2)) to transparent */}
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E6DBB" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0E6DBB" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Minimal horizontal dashed grid lines */}
              {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
                const y = chartHeight - ratio * (chartHeight - 30) - 20;
                const labelVal = Math.round((ratio * maxMonthlyVal) / 1000) + 'k';
                return (
                  <g key={idx}>
                    <line
                      x1="35"
                      y1={y}
                      x2={chartWidth - 15}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />
                    <text
                      x="28"
                      y={y + 3}
                      textAnchor="end"
                      className="text-[9px] fill-slate-400 font-data font-light"
                    >
                      {labelVal}
                    </text>
                  </g>
                );
              })}

              {/* Area Fill */}
              <path d={areaD} fill="url(#areaGradient)" />

              {/* Cubic-bezier Area Stroke Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#0E6DBB"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* Interactive Scrubber Line for Active/Hovered Point */}
              {activePoint && (
                <g>
                  <line
                    x1={activePoint.x}
                    y1="10"
                    x2={activePoint.x}
                    y2={chartHeight}
                    stroke="#0E6DBB"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.75"
                  />
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r="5"
                    fill="#0E6DBB"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="shadow-sm"
                  />
                </g>
              )}

              {/* Month Labels along X-Axis */}
              {points.map((p, idx) => (
                <text
                  key={idx}
                  x={p.x}
                  y={chartHeight + 14}
                  textAnchor="middle"
                  className={`text-[10px] font-light transition-colors ${
                    hoveredIndex === idx ? 'fill-[#0E6DBB] font-medium' : 'fill-slate-400'
                  }`}
                >
                  {p.month}
                </text>
              ))}

              {/* Transparent interactive hover columns */}
              {points.map((p, idx) => {
                const colWidth = (chartWidth - 60) / (points.length - 1);
                return (
                  <rect
                    key={idx}
                    x={p.x - colWidth / 2}
                    y="0"
                    width={colWidth}
                    height={chartHeight}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                  />
                );
              })}
            </svg>
          </div>
        ) : (
          /* Stacked Scope Bar Chart (Direct homage to Karbon reference mockup) */
          <div className="w-full h-full flex items-end justify-between gap-1.5 px-4 pt-12 pb-2">
            {months.map((m, idx) => {
              const totalHeightPct = (m.total / (maxMonthlyVal * 1.15)) * 100;
              const s1Pct = (m.scope1 / m.total) * totalHeightPct;
              const s2Pct = (m.scope2 / m.total) * totalHeightPct;
              const s3Pct = (m.scope3 / m.total) * totalHeightPct;

              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="w-full max-w-[22px] flex flex-col justify-end rounded-t-md overflow-hidden transition-all duration-300"
                    style={{
                      height: `${totalHeightPct}%`,
                      transform: isHovered ? 'scaleY(1.04)' : 'none'
                    }}
                  >
                    {/* Scope 1 segment (Coral top) */}
                    <div className="w-full bg-[#F87171]" style={{ height: `${s1Pct}%` }} />
                    {/* Scope 2 segment (Amethyst middle) */}
                    <div className="w-full bg-[#A78BFA]" style={{ height: `${s2Pct}%` }} />
                    {/* Scope 3 segment (Dark Cyber Blue bottom) */}
                    <div className="w-full bg-[#0E6DBB]" style={{ height: `${s3Pct}%` }} />
                  </div>
                  <span
                    className={`text-[10px] mt-2 font-light ${
                      isHovered ? 'text-[#0E6DBB] font-medium' : 'text-slate-400'
                    }`}
                  >
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3.5 mt-2 border-t border-slate-200/60 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F87171]" />
            <span className="text-[11px] text-slate-700 font-medium">Scope 1 (Direct)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span className="text-[11px] text-slate-700 font-medium">Scope 2 (Power)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0E6DBB]" />
            <span className="text-[11px] text-slate-700 font-medium">Scope 3 (Supply)</span>
          </div>
        </div>

        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
          Cubic-Bezier Interpolation · ISO 14064-1
        </span>
      </div>
    </div>
  );
};
