import React from 'react';
import { X, Building2, MapPin, Activity, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { EmitterItem } from '../types';

interface FacilityDetailModalProps {
  emitter: EmitterItem | null;
  onClose: () => void;
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  emitter,
  onClose
}) => {
  if (!emitter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1926]/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel bg-white/95 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/90">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#0E6DBB]">
          <Building2 className="w-5 h-5" />
          <span className="text-xs font-medium uppercase tracking-wider">
            {emitter.category === 'facility' ? 'Operational Facility Audit' : 'Emissions Source Stream'}
          </span>
        </div>

        <h3 className="text-xl font-normal text-[#0B1926] tracking-tight mt-1">
          {emitter.name}
        </h3>

        {emitter.location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-light mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{emitter.location}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="mt-6 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-center">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-light">Gross Volume</div>
            <div className="text-xl font-light font-data text-[#0B1926] mt-0.5">
              {emitter.emissions.toLocaleString()} <span className="text-xs">t</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">tCO2e (audited)</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase font-light">Org Share</div>
            <div className="text-xl font-light font-data text-[#0E6DBB] mt-0.5">
              {emitter.percentage}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">of total footprint</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase font-light">YoY Variance</div>
            <div className="text-xl font-light font-data text-emerald-600 mt-0.5">
              {emitter.trend > 0 ? `+${emitter.trend}%` : `${emitter.trend}%`}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">vs prior cycle</div>
          </div>
        </div>

        {/* Mitigation Roadmap Steps */}
        <div className="mt-5 space-y-2">
          <div className="text-xs font-medium text-[#0B1926]">Targeted Reduction Roadmap</div>
          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-[#0E6DBB] shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-[#0E6DBB]">Renewable PPA Shift:</span> Replace 45% of peak daytime industrial load with localized solar farm contract by Q4.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-emerald-700">IoT Meter Automation:</span> High-frequency sub-metering installed on central chillers & compressed air units.
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
