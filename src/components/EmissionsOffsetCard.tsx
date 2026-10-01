import React, { useState } from 'react';
import { Maximize2, ShieldCheck, ExternalLink, Info, Check } from 'lucide-react';
import { YearEmissionsData } from '../types';

interface EmissionsOffsetCardProps {
  data: YearEmissionsData;
  onOpenOffsetModal?: () => void;
}

export const EmissionsOffsetCard: React.FC<EmissionsOffsetCardProps> = ({
  data
}) => {
  // 4 Project Status categories matching the user's uploaded reference image
  // 23 + 13 + 3 + 3 = 42 Total Active Offset Projects
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'count' | 'tonnage'>('count');
  const [isCardHovered, setIsCardHovered] = useState(false);

  const projectStatusData = [
    {
      id: 'in-progress',
      name: 'In Progress',
      count: 23,
      tonnage: 21400,
      color: '#F59E0B', // Deep warm amber
      dotClass: 'bg-[#F59E0B]',
      description: 'Active forestry, direct air capture & renewable displacement projects currently retiring credits.'
    },
    {
      id: 'completed',
      name: 'Completed',
      count: 13,
      tonnage: 11200,
      color: '#FBBF24', // Medium gold amber
      dotClass: 'bg-[#FBBF24]',
      description: 'Fully audited & certified vintage credits retired on Verra / Gold Standard registries.'
    },
    {
      id: 'in-review',
      name: 'In Review',
      count: 3,
      tonnage: 3100,
      color: '#FDE68A', // Light soft amber
      dotClass: 'bg-[#FDE68A]',
      description: 'Third-party auditor review (ISO 14064-3 limited assurance in progress).'
    },
    {
      id: 'on-hold',
      name: 'On Hold',
      count: 3,
      tonnage: 1800,
      color: '#E2E8F0', // Neutral light slate
      dotClass: 'bg-[#CBD5E1]',
      description: 'Buffer pool reserve held against potential reversal or leakage risk.'
    }
  ];

  const totalProjects = projectStatusData.reduce((acc, curr) => acc + curr.count, 0); // 42
  const totalTonnage = data.totalOffset; // 37,500 tCO2e

  // SVG Arch Gauge Math
  // Semi-circle spanning from 180° to 0°
  const cx = 110;
  const cy = 105;
  const r = 78;
  const strokeWidth = 14;
  const totalArcLength = Math.PI * r; // ~245.04px

  // 3 gaps of 3px between 4 segments
  const gapSize = 3;
  const totalGaps = gapSize * 3; // 9px
  const usableArcLength = totalArcLength - totalGaps;

  // Calculate arc lengths for each segment
  const segmentLengths = projectStatusData.map((item) => {
    return (item.count / totalProjects) * usableArcLength;
  });

  // Calculate dash offset for each segment along the semi-circle
  // Segment 1 starts at 0 offset (from 180°)
  const offset0 = 0;
  const offset1 = -(segmentLengths[0] + gapSize);
  const offset2 = -(segmentLengths[0] + gapSize + segmentLengths[1] + gapSize);
  const offset3 = -(segmentLengths[0] + gapSize + segmentLengths[1] + gapSize + segmentLengths[2] + gapSize);
  const offsets = [offset0, offset1, offset2, offset3];

  const activeCategory = hoveredCategory
    ? projectStatusData.find((p) => p.id === hoveredCategory)
    : null;

  return (
    <div
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="glass-card-top p-5 sm:p-6 lg:p-7 relative overflow-hidden flex flex-col justify-between h-full hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300"
    >
      {/* 1. Header: Project Status on left, Expand / Fullscreen icon button on right */}
      <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-[19px] font-semibold text-[#0B1926] tracking-tight">
              Project Status
            </h2>
            <span className="text-[11px] font-medium text-emerald-700 bg-white/80 backdrop-blur-sm border border-emerald-200/70 px-2.5 py-0.5 rounded-full shadow-2xs">
              KBank Active
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Carbon offset & removal portfolio
          </p>
        </div>
      </div>

      {/* 2. Center: Semi-Circle Gauge with Big Hero "42" and "Active Projects" */}
      <div className="relative w-full flex flex-col items-center justify-center my-auto py-3">
        <div className="relative w-[210px] sm:w-[230px] h-[115px] sm:h-[125px] flex items-end justify-center overflow-hidden">
          <svg
            viewBox="0 0 220 120"
            className="w-full h-full overflow-visible select-none"
            aria-label="Offset Project Status Gauge"
          >
            {/* Background subtle guide track */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              strokeDasharray={`${totalArcLength} ${totalArcLength * 2}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              transform={`rotate(-180 ${cx} ${cy})`}
            />

            {/* 4 Colored Segments along the semi-circle */}
            {projectStatusData.map((item, idx) => {
              const isHovered = hoveredCategory === item.id;
              const isOtherHovered = hoveredCategory !== null && !isHovered;

              return (
                <circle
                  key={item.id}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={`${segmentLengths[idx]} ${totalArcLength * 2}`}
                  strokeDashoffset={offsets[idx]}
                  strokeLinecap="round"
                  transform={`rotate(-180 ${cx} ${cy})`}
                  className={`transition-all duration-300 cursor-pointer ${
                    isCardHovered ? 'opacity-100' : ''
                  }`}
                  style={{
                    opacity: isOtherHovered ? 0.35 : 1
                  }}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              );
            })}
          </svg>

          {/* Centered Readout inside the Semi-circle Arch: "42" + "Active Projects" */}
          <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center text-center pointer-events-none">
            <span
              className={`text-2xl sm:text-[28px] font-semibold text-[#0B1926] tracking-tight font-data leading-none transition-all ${
                isCardHovered ? 'animate-subtle-pulse text-[#F59E0B]' : ''
              }`}
            >
              {activeCategory
                ? viewMode === 'count'
                  ? activeCategory.count
                  : `${(activeCategory.tonnage / 1000).toFixed(1)}k`
                : viewMode === 'count'
                ? totalProjects
                : `${(totalTonnage / 1000).toFixed(1)}k`}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mt-1 transition-all">
              {activeCategory
                ? activeCategory.name
                : viewMode === 'count'
                ? 'Active Projects'
                : 'tCO2e Retired'}
            </span>
          </div>
        </div>

        {/* Micro Toggle to switch between Project Count and Carbon Tonnage */}
        <button
          onClick={() => setViewMode(viewMode === 'count' ? 'tonnage' : 'count')}
          className="mt-3 text-[11px] text-slate-600 hover:text-[#0B1926] font-medium transition-colors flex items-center gap-1 cursor-pointer bg-white/60 hover:bg-white/80 px-3 py-1 rounded-full border border-white/80 shadow-2xs"
        >
          <span>
            {viewMode === 'count'
              ? 'Showing 42 Projects · View Tonnage'
              : 'Showing 37.5k tCO2e · View Projects'}
          </span>
        </button>
      </div>

      {/* 3. Bottom 2x2 Legend: Aligned with Colored Dots and Count in Parentheses */}
      <div className="pt-3.5 border-t border-slate-200/60">
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {projectStatusData.map((item) => {
            const isHovered = hoveredCategory === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCategory(item.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-2.5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex items-center gap-2.5 cursor-pointer transition-all ${
                  isHovered ? 'scale-102 bg-white/90 border-white' : ''
                }`}
              >
                {/* Colored Dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform shadow-xs"
                  style={{ backgroundColor: item.color }}
                />
                {/* Text and Count in Parentheses */}
                <div className="flex items-baseline gap-1 truncate text-slate-700">
                  <span className="text-xs font-medium truncate">{item.name}</span>
                  <span
                    className={`font-semibold text-xs text-[#0B1926] font-data transition-all ${
                      isCardHovered ? 'animate-subtle-pulse' : ''
                    }`}
                  >
                    ({viewMode === 'count' ? item.count : `${(item.tonnage / 1000).toFixed(1)}k`})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
