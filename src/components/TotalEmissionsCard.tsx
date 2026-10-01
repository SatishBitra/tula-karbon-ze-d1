import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ShieldCheck, Info, Sparkles, Check } from 'lucide-react';
import { YearEmissionsData, ScopeType } from '../types';

interface TotalEmissionsCardProps {
  data: YearEmissionsData;
  activeScope?: ScopeType;
  setActiveScope?: (scope: ScopeType) => void;
  onScopeInspect?: (scopeKey: string) => void;
  userName?: string;
}

export const TotalEmissionsCard: React.FC<TotalEmissionsCardProps> = ({
  data,
  activeScope = 'all',
  setActiveScope
}) => {
  const [selectedScope, setSelectedScope] = useState<ScopeType>(activeScope || 'all');
  const [hoveredScope, setHoveredScope] = useState<string | null>(null);
  const [isCircleHovered, setIsCircleHovered] = useState(false);

  // Sync internal state if external setActiveScope changes
  const handleScopeSelect = (scope: ScopeType) => {
    setSelectedScope(scope);
    if (setActiveScope) setActiveScope(scope);
  };

  // Scope metrics breakdown
  const scope1 = data.scopes.scope1;
  const scope2 = data.scopes.scope2;
  const scope3 = data.scopes.scope3;

  // Selected values
  let currentTotal = data.totalEmissions;
  let currentLabel = 'Total Gross Emissions';
  let currentPct = 100;
  let currentDesc = 'Consolidated GHG inventory across direct operations and global value chain.';
  let currentScopeColor = '#0E6DBB';

  if (selectedScope === 'scope1') {
    currentTotal = scope1.value;
    currentLabel = 'Scope 1 (Direct Operations)';
    currentPct = scope1.percentage;
    currentDesc = scope1.description;
    currentScopeColor = scope1.color;
  } else if (selectedScope === 'scope2') {
    currentTotal = scope2.value;
    currentLabel = 'Scope 2 (Purchased Electricity & Heat)';
    currentPct = scope2.percentage;
    currentDesc = scope2.description;
    currentScopeColor = scope2.color;
  } else if (selectedScope === 'scope3') {
    currentTotal = scope3.value;
    currentLabel = 'Scope 3 (Upstream & Downstream Value Chain)';
    currentPct = scope3.percentage;
    currentDesc = scope3.description;
    currentScopeColor = scope3.color;
  }

  // Monthly emissions trend calculation (Month-over-Month change)
  // In GHG inventory, emissions reductions are ecologically positive (green), increases are warning (rose/red)
  const calculateMoMTrend = (scopeKey: 'all' | 'scope1' | 'scope2' | 'scope3') => {
    if (!data.monthly || data.monthly.length < 2) {
      return { diffPct: 3.2, isReduction: true };
    }
    const lastMonth = data.monthly[data.monthly.length - 1];
    const prevMonth = data.monthly[data.monthly.length - 2];

    const currentVal = scopeKey === 'all' ? lastMonth.total : lastMonth[scopeKey];
    const previousVal = scopeKey === 'all' ? prevMonth.total : prevMonth[scopeKey];

    if (!previousVal || previousVal === 0) {
      return { diffPct: 0, isReduction: true };
    }

    const diff = ((currentVal - previousVal) / previousVal) * 100;
    const isReduction = diff <= 0;
    return {
      diffPct: Math.abs(Number(diff.toFixed(1))),
      isReduction,
      rawDiff: diff
    };
  };

  const totalTrend = calculateMoMTrend('all');
  const activeTrend = calculateMoMTrend(selectedScope);
  const scope1Trend = calculateMoMTrend('scope1');
  const scope2Trend = calculateMoMTrend('scope2');
  const scope3Trend = calculateMoMTrend('scope3');

  // Number formatting helper
  const formatK = (val: number) => {
    return (val / 1000).toFixed(1) + 'k';
  };

  // SVG Pie / Donut Chart Geometry with Clean Gaps and Spacing
  const radius = 68;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~427.256px

  // Clean pixel gaps between slices
  const gapPixels = 4;
  const totalGaps = gapPixels * 3; // 12px
  const usableCircumference = circumference - totalGaps;

  // Slice lengths based on exact percentages
  const p1 = scope1.percentage / 100;
  const p2 = scope2.percentage / 100;
  const p3 = scope3.percentage / 100;

  const len1 = p1 * usableCircumference;
  const len2 = p2 * usableCircumference;
  const len3 = p3 * usableCircumference;

  // Offsets starting at -90deg (top of circle)
  const offset1 = 0;
  const offset2 = -(len1 + gapPixels);
  const offset3 = -(len1 + gapPixels + len2 + gapPixels);

  return (
    <div className="glass-card-top p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between h-full">
      {/* 1. Header: Title, Description, and Segmented Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-[19px] font-semibold text-[#0B1926] tracking-tight">
              Total CO2e Emissions
            </h2>
            <span className="text-[11px] font-medium text-slate-600 bg-white/80 backdrop-blur-sm border border-white/90 px-2.5 py-0.5 rounded-full shadow-2xs">
              ISO 14064
            </span>
            {/* Subtle color-coded trend badge */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-data font-medium px-2.5 py-0.5 rounded-full border shadow-2xs ${
                totalTrend.isReduction
                  ? 'text-emerald-700 bg-emerald-50/90 border-emerald-200/60'
                  : 'text-rose-600 bg-rose-50/90 border-rose-200/60'
              }`}
            >
              {totalTrend.isReduction ? (
                <ArrowDownRight className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
              ) : (
                <ArrowUpRight className="w-3 h-3 text-rose-500 stroke-[2.5]" />
              )}
              <span>{totalTrend.isReduction ? '-' : '+'}{totalTrend.diffPct}% MoM</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Operational boundary inventory across Scopes 1, 2, and 3
          </p>
        </div>

        {/* Clean Segmented Pill Filter */}
        <div className="flex items-center gap-1 p-1 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-2xs text-xs self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'Total' },
            { id: 'scope1', label: 'Scope 1' },
            { id: 'scope2', label: 'Scope 2' },
            { id: 'scope3', label: 'Scope 3' }
          ].map((tab) => {
            const isTabActive = selectedScope === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleScopeSelect(tab.id as ScopeType)}
                className={`px-3.5 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isTabActive
                    ? 'bg-black text-white shadow-xs font-medium'
                    : 'text-slate-600 hover:text-black hover:bg-white/60 font-normal'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Visual Body: Donut Chart on Left, Structured Scope Metrics on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center my-auto py-3 sm:py-4">
        {/* Left Column: Donut Chart with Zero Content Overlapping & Subtle Pulse Effect */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div
            onMouseEnter={() => setIsCircleHovered(true)}
            onMouseLeave={() => setIsCircleHovered(false)}
            className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center cursor-pointer"
          >
            <svg
              className="w-full h-full -rotate-90 transform select-none"
              viewBox="0 0 170 170"
              aria-label="Emissions Donut Chart"
            >
              {/* Background guide track */}
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth={strokeWidth}
              />

              {/* Scope 1 Arc (Muted Coral) */}
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke={scope1.color}
                strokeWidth={hoveredScope === 'scope1' || selectedScope === 'scope1' ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={`${len1} ${circumference}`}
                strokeDashoffset={offset1}
                strokeLinecap="round"
                className={`transition-all duration-400 ease-out cursor-pointer ${
                  isCircleHovered && (selectedScope === 'all' || selectedScope === 'scope1')
                    ? 'animate-ring-pulse opacity-100'
                    : ''
                }`}
                style={{
                  opacity:
                    selectedScope !== 'all' && selectedScope !== 'scope1' && hoveredScope !== 'scope1'
                      ? 0.3
                      : 1
                }}
                onMouseEnter={() => setHoveredScope('scope1')}
                onMouseLeave={() => setHoveredScope(null)}
                onClick={() => handleScopeSelect('scope1')}
              />

              {/* Scope 2 Arc (Amethyst) */}
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke={scope2.color}
                strokeWidth={hoveredScope === 'scope2' || selectedScope === 'scope2' ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={`${len2} ${circumference}`}
                strokeDashoffset={offset2}
                strokeLinecap="round"
                className={`transition-all duration-400 ease-out cursor-pointer ${
                  isCircleHovered && (selectedScope === 'all' || selectedScope === 'scope2')
                    ? 'animate-ring-pulse opacity-100'
                    : ''
                }`}
                style={{
                  opacity:
                    selectedScope !== 'all' && selectedScope !== 'scope2' && hoveredScope !== 'scope2'
                      ? 0.3
                      : 1
                }}
                onMouseEnter={() => setHoveredScope('scope2')}
                onMouseLeave={() => setHoveredScope(null)}
                onClick={() => handleScopeSelect('scope2')}
              />

              {/* Scope 3 Arc (Cyber Blue) */}
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke={scope3.color}
                strokeWidth={hoveredScope === 'scope3' || selectedScope === 'scope3' ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={`${len3} ${circumference}`}
                strokeDashoffset={offset3}
                strokeLinecap="round"
                className={`transition-all duration-400 ease-out cursor-pointer ${
                  isCircleHovered && (selectedScope === 'all' || selectedScope === 'scope3')
                    ? 'animate-ring-pulse opacity-100'
                    : ''
                }`}
                style={{
                  opacity:
                    selectedScope !== 'all' && selectedScope !== 'scope3' && hoveredScope !== 'scope3'
                      ? 0.3
                      : 1
                }}
                onMouseEnter={() => setHoveredScope('scope3')}
                onMouseLeave={() => setHoveredScope(null)}
                onClick={() => handleScopeSelect('scope3')}
              />
            </svg>

            {/* Inner Center Readout: Strictly centered with ample margins, NO overlapping */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
              <span className="text-2xl sm:text-[26px] font-semibold text-[#0B1926] tracking-tight font-data leading-none">
                {formatK(currentTotal)}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mt-1">
                CO2e (tonnes)
              </span>

              {/* Monthly Trend Indicator inside donut readout */}
              <div className="flex items-center gap-1 mt-1.5 pointer-events-auto">
                <span
                  className={`inline-flex items-center gap-0.5 font-data text-[10px] font-medium px-2 py-0.5 rounded-full border shadow-2xs ${
                    activeTrend.isReduction
                      ? 'text-emerald-700 bg-white/90 border-emerald-200/70'
                      : 'text-rose-600 bg-white/90 border-rose-200/70'
                  }`}
                >
                  {activeTrend.isReduction ? (
                    <ArrowDownRight className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <ArrowUpRight className="w-2.5 h-2.5 text-rose-500 stroke-[2.5]" />
                  )}
                  <span>{activeTrend.isReduction ? '-' : '+'}{activeTrend.diffPct}% MoM</span>
                </span>
                {selectedScope !== 'all' && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow-2xs bg-white/80"
                    style={{
                      color: currentScopeColor
                    }}
                  >
                    {currentPct}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Simple Clean Legend below Donut */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-2.5 text-[11px]">
            <button
              onClick={() => handleScopeSelect(selectedScope === 'scope1' ? 'all' : 'scope1')}
              className="flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-black bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/80 px-2.5 py-1 rounded-full shadow-2xs transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: scope1.color }}
              />
              <span className="font-medium">Scope 1 ({scope1.percentage}%)</span>
            </button>
            <button
              onClick={() => handleScopeSelect(selectedScope === 'scope2' ? 'all' : 'scope2')}
              className="flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-black bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/80 px-2.5 py-1 rounded-full shadow-2xs transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: scope2.color }}
              />
              <span className="font-medium">Scope 2 ({scope2.percentage}%)</span>
            </button>
            <button
              onClick={() => handleScopeSelect(selectedScope === 'scope3' ? 'all' : 'scope3')}
              className="flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-black bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/80 px-2.5 py-1 rounded-full shadow-2xs transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: scope3.color }}
              />
              <span className="font-medium">Scope 3 ({scope3.percentage}%)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Breakdown Cards with Progress Bars */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-2.5 sm:space-y-3 pl-0 md:pl-2">
          {/* Active Scope Highlight Banner */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-white/75 backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0B1926]">{currentLabel}</span>
              <div className="flex items-center gap-2">
                <span className="font-data font-semibold text-xs text-[#0B1926]">
                  {currentTotal.toLocaleString()} tCO2e
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 font-data text-[10px] font-medium px-2 py-0.5 rounded-md border shadow-2xs bg-white/90 ${
                    activeTrend.isReduction
                      ? 'text-emerald-700 border-emerald-200/60'
                      : 'text-rose-600 border-rose-200/60'
                  }`}
                >
                  {activeTrend.isReduction ? (
                    <ArrowDownRight className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <ArrowUpRight className="w-2.5 h-2.5 text-rose-500 stroke-[2.5]" />
                  )}
                  <span>{activeTrend.isReduction ? '-' : '+'}{activeTrend.diffPct}% MoM</span>
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-normal mt-1 line-clamp-2">
              {currentDesc}
            </p>
          </div>

          {/* 3 Scope Bars */}
          <div className="space-y-2">
            {/* Scope 1 Bar */}
            <div
              onClick={() => handleScopeSelect('scope1')}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                selectedScope === 'scope1'
                  ? 'bg-rose-50/75 border border-rose-200/80 shadow-[0_2px_8px_rgba(244,63,94,0.08)]'
                  : 'bg-white/50 hover:bg-white/75 border border-white/80 shadow-[0_2px_6px_rgba(15,23,42,0.02)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-700 font-medium">
                  Scope 1 Direct
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-data text-slate-900 font-semibold">
                    {scope1.value.toLocaleString()} t ({scope1.percentage}%)
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 font-data text-[9.5px] font-medium px-1.5 py-0.5 rounded border shadow-2xs bg-white/90 ${
                      scope1Trend.isReduction
                        ? 'text-emerald-700 border-emerald-200/60'
                        : 'text-rose-600 border-rose-200/60'
                    }`}
                  >
                    {scope1Trend.isReduction ? (
                      <ArrowDownRight className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-2.5 h-2.5 text-rose-500 stroke-[2.5]" />
                    )}
                    <span>{scope1Trend.isReduction ? '-' : '+'}{scope1Trend.diffPct}%</span>
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${scope1.percentage}%`, backgroundColor: scope1.color }}
                />
              </div>
            </div>

            {/* Scope 2 Bar */}
            <div
              onClick={() => handleScopeSelect('scope2')}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                selectedScope === 'scope2'
                  ? 'bg-purple-50/75 border border-purple-200/80 shadow-[0_2px_8px_rgba(168,85,247,0.08)]'
                  : 'bg-white/50 hover:bg-white/75 border border-white/80 shadow-[0_2px_6px_rgba(15,23,42,0.02)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-700 font-medium">
                  Scope 2 Electricity & Heat
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-data text-slate-900 font-semibold">
                    {scope2.value.toLocaleString()} t ({scope2.percentage}%)
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 font-data text-[9.5px] font-medium px-1.5 py-0.5 rounded border shadow-2xs bg-white/90 ${
                      scope2Trend.isReduction
                        ? 'text-emerald-700 border-emerald-200/60'
                        : 'text-rose-600 border-rose-200/60'
                    }`}
                  >
                    {scope2Trend.isReduction ? (
                      <ArrowDownRight className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-2.5 h-2.5 text-rose-500 stroke-[2.5]" />
                    )}
                    <span>{scope2Trend.isReduction ? '-' : '+'}{scope2Trend.diffPct}%</span>
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${scope2.percentage}%`, backgroundColor: scope2.color }}
                />
              </div>
            </div>

            {/* Scope 3 Bar */}
            <div
              onClick={() => handleScopeSelect('scope3')}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                selectedScope === 'scope3'
                  ? 'bg-blue-50/75 border border-blue-200/80 shadow-[0_2px_8px_rgba(14,109,187,0.08)]'
                  : 'bg-white/50 hover:bg-white/75 border border-white/80 shadow-[0_2px_6px_rgba(15,23,42,0.02)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-700 font-medium">
                  Scope 3 Value Chain
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-data text-slate-900 font-semibold">
                    {scope3.value.toLocaleString()} t ({scope3.percentage}%)
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 font-data text-[9.5px] font-medium px-1.5 py-0.5 rounded border shadow-2xs bg-white/90 ${
                      scope3Trend.isReduction
                        ? 'text-emerald-700 border-emerald-200/60'
                        : 'text-rose-600 border-rose-200/60'
                    }`}
                  >
                    {scope3Trend.isReduction ? (
                      <ArrowDownRight className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-2.5 h-2.5 text-rose-500 stroke-[2.5]" />
                    )}
                    <span>{scope3Trend.isReduction ? '-' : '+'}{scope3Trend.diffPct}%</span>
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${scope3.percentage}%`, backgroundColor: scope3.color }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Comparative Trajectory Benchmarks */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-3.5 sm:pt-4 border-t border-slate-200/60 text-xs">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex flex-col justify-between transition-all">
          <div className="text-[11px] text-slate-500 font-medium tracking-normal truncate">
            Prev years ({data.year - 1})
          </div>
          <div className="font-semibold text-slate-900 font-data text-xs sm:text-sm mt-1">
            {formatK(data.previousYear)}
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-medium font-data text-emerald-700 bg-white/90 border border-emerald-200/60 rounded-md px-1.5 py-0.5 mt-1.5 self-start shadow-2xs">
            <ArrowUpRight className="w-3 h-3 shrink-0" />
            <span className="truncate">+{data.previousYearPct}% YoY</span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex flex-col justify-between transition-all">
          <div className="text-[11px] text-slate-500 font-medium tracking-normal truncate">
            Baseline (2012)
          </div>
          <div className="font-semibold text-slate-900 font-data text-xs sm:text-sm mt-1">
            {formatK(data.baselineYear)}
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-medium font-data text-rose-600 bg-white/90 border border-rose-200/60 rounded-md px-1.5 py-0.5 mt-1.5 self-start shadow-2xs">
            <ArrowUpRight className="w-3 h-3 shrink-0" />
            <span className="truncate">+{data.baselineYearPct}%</span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex flex-col justify-between transition-all">
          <div className="text-[11px] text-slate-500 font-medium tracking-normal truncate">
            Targeted deviation
          </div>
          <div className="font-semibold text-slate-900 font-data text-xs sm:text-sm mt-1">
            {formatK(data.deviationFromTarget)}
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-medium font-data text-amber-700 bg-white/90 border border-amber-200/60 rounded-md px-1.5 py-0.5 mt-1.5 self-start shadow-2xs">
            <ArrowUpRight className="w-3 h-3 shrink-0" />
            <span className="truncate">+{data.deviationPct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
