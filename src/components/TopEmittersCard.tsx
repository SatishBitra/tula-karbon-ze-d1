import React, { useState } from 'react';
import { Building2, Flame, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { YearEmissionsData, EmitterItem } from '../types';

interface TopEmittersCardProps {
  data: YearEmissionsData;
  onSelectEmitter?: (emitter: EmitterItem) => void;
}

export const TopEmittersCard: React.FC<TopEmittersCardProps> = ({
  data
}) => {
  const [emitterMode, setEmitterMode] = useState<'facilities' | 'sources'>('facilities');

  const items = emitterMode === 'facilities' ? data.topFacilities : data.topSources;
  const maxEmissions = Math.max(...items.map((i) => i.emissions));

  return (
    <div className="glass-card-top p-5 sm:p-6 lg:p-7 relative overflow-hidden flex flex-col justify-between h-full hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300">
      {/* Header and Toggle Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-3.5 border-b border-slate-200/60">
        <div>
          <h2 className="text-base sm:text-[19px] font-semibold text-[#0B1926] tracking-tight">
            Top 5 Emitters (tCO2e)
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Critical hotspots for prioritized mitigation intervention
          </p>
        </div>

        {/* Sources vs Facilities Segmented Toggle matching Karbon reference */}
        <div className="flex items-center p-1 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-2xs text-xs self-start sm:self-auto">
          <button
            onClick={() => setEmitterMode('sources')}
            className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              emitterMode === 'sources'
                ? 'bg-black text-white shadow-xs font-medium'
                : 'text-slate-600 hover:text-black font-normal'
            }`}
          >
            Sources
          </button>
          <button
            onClick={() => setEmitterMode('facilities')}
            className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              emitterMode === 'facilities'
                ? 'bg-black text-white shadow-xs font-medium'
                : 'text-slate-600 hover:text-black font-normal'
            }`}
          >
            Facilities
          </button>
        </div>
      </div>

      {/* List with frosted glass item containers */}
      <div className="space-y-2.5 my-auto py-2">
        {items.map((item, idx) => {
          const widthPct = Math.round((item.emissions / maxEmissions) * 100);

          return (
            <div
              key={item.id}
              className="p-2.5 sm:p-3 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-200"
            >
              {/* Top row: Name on left, exact numeric emissions on right */}
              <div className="flex items-center justify-between text-xs text-[#0B1926] mb-1">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="text-[11px] font-data font-semibold text-slate-500 bg-white/90 px-2 py-0.5 rounded-lg border border-white/90 shadow-2xs shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="font-medium text-slate-800 text-xs sm:text-[13px] truncate">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="font-data font-semibold text-xs sm:text-[13px] text-[#0B1926]">
                    {item.emissions.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">t</span>
                </div>
              </div>

              {/* Sleek Progress Bar */}
              <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden my-1.5">
                <div
                  className="bg-[#0E6DBB] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${widthPct}%` }}
                />
              </div>

              {/* Sub-label with primary scope & location */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1">
                <span>{item.location || item.primaryScope}</span>
                <span className="flex items-center gap-0.5">
                  {item.trend > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-data font-medium px-1.5 py-0.5 rounded-md border shadow-2xs bg-white/90 text-rose-600 border-rose-200/60">
                      +{item.trend}% YoY
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-data font-medium px-1.5 py-0.5 rounded-md border shadow-2xs bg-white/90 text-emerald-700 border-emerald-200/60">
                      {item.trend}% YoY
                    </span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer indicator */}
      <div className="pt-3.5 mt-1 border-t border-slate-200/60 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-normal">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E6DBB]" />
          Prioritized operational mitigation levers
        </span>
        <span className="font-data text-slate-600 font-medium text-[11px]">
          Top 5 accounts for 58% of gross volume
        </span>
      </div>
    </div>
  );
};
