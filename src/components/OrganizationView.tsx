import React from 'react';
import { Building2, MapPin, Zap, CheckCircle2, ChevronRight, Activity, ArrowUpRight } from 'lucide-react';
import { YearEmissionsData, EmitterItem } from '../types';

interface OrganizationViewProps {
  data: YearEmissionsData;
  onSelectFacility?: (facility: EmitterItem) => void;
}

export const OrganizationView: React.FC<OrganizationViewProps> = ({
  data,
  onSelectFacility
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-normal text-[#0B1926] tracking-tight">
            Facilities & Enterprise Operational Boundary
          </h2>
          <p className="text-xs text-slate-500 font-light mt-0.5">
            Real-time IoT sub-metering across 54 global production plants, assembly lines, and cloud data centers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 glass-panel text-slate-600">
            54 Facilities Active
          </span>
          <span className="px-3 py-1.5 glass-panel text-emerald-700">
            98.4% Telemetry Uptime
          </span>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.topFacilities.map((fac) => (
          <div
            key={fac.id}
            onClick={onSelectFacility ? () => onSelectFacility(fac) : undefined}
            className={`glass-card-top p-5 group flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300 ${
              onSelectFacility ? 'cursor-pointer' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E6DBB] bg-white/80 backdrop-blur-sm border border-[#0E6DBB]/20 px-2.5 py-0.5 rounded-full shadow-2xs">
                  {fac.primaryScope} Primary
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-white/80 backdrop-blur-sm border border-emerald-200/70 px-2 py-0.5 rounded-full shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-[#0B1926] mt-3 group-hover:text-[#0E6DBB] transition-colors line-clamp-1">
                {fac.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{fac.location}</span>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-200/60 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Emissions</div>
                <div className="text-base font-semibold font-data text-[#0B1926]">
                  {fac.emissions.toLocaleString()} <span className="text-xs text-slate-500 font-normal">tCO2e</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Target Variance</div>
                <div className={`text-xs font-semibold font-data ${fac.trend > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {fac.trend > 0 ? `+${fac.trend}%` : `${fac.trend}%`} YoY
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
