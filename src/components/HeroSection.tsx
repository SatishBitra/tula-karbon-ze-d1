import React, { useState } from 'react';
import {
  Download,
  Sun,
  CloudSun,
  Activity,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { YearEmissionsData } from '../types';

interface HeroSectionProps {
  data: YearEmissionsData;
  onOpenSimulator: () => void;
  onOpenReportModal: () => void;
  onExportCSV: () => void;
  userName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  onOpenSimulator,
  onOpenReportModal,
  onExportCSV,
  userName = 'John'
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleDownload = () => {
    onExportCSV();
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="pt-4 pb-2">
      {/* Top row: Welcome header on left, action controls on right */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0B1926] tracking-tight">
              Welcome, {userName}!
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium text-emerald-700 bg-white/80 backdrop-blur-sm border border-emerald-200/70 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sensor Live
            </span>
          </div>
          <p className="text-[13px] sm:text-sm text-slate-600 font-normal mt-1">
            Take a look at the overview of your greenhouse gas emissions and real-time Net-Zero trajectory.
          </p>
        </div>

        {/* Action Controls matching Karbon & Renexa styles */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-xl shadow-2xs hover:bg-white text-xs font-medium text-[#0B1926] hover:text-[#0E6DBB] transition-all cursor-pointer"
          >
            {copiedNotification ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Exported CSV</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download CSV</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-xl shadow-2xs hover:bg-white text-xs font-medium text-[#0B1926] hover:text-[#0E6DBB] transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Compliance Brief</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0E6DBB] hover:bg-[#0b5aa0] text-white text-xs font-medium shadow-xs transition-all hover:shadow-[0_4px_16px_rgba(14,109,187,0.3)] hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Reductions</span>
          </button>
        </div>
      </div>

      {/* Environmental & Clean Tech Telemetry Ribbon (Inspired by Renexa Weather & Grid Monitoring Status) */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] text-[12px] transition-all">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-slate-500 font-medium">Solar Yield:</span>
          <span className="font-semibold text-[#0B1926] font-data">4–6.5 kWh/m²</span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] text-[12px] transition-all">
          <CloudSun className="w-3.5 h-3.5 text-[#0E6DBB]" />
          <span className="text-slate-500 font-medium">Atmospheric Status:</span>
          <span className="font-semibold text-[#0B1926]">42% Cloud Cover · Moderate Wind</span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] text-[12px] transition-all">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-slate-500 font-medium">Avoided Carbon:</span>
          <span className="font-semibold text-emerald-700 font-data">
            {data.energy.avoidedCarbon} tCO2e
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/85 shadow-[0_2px_8px_rgba(15,23,42,0.03)] text-[12px] transition-all">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span className="text-slate-500 font-medium">Grid Carbon Factor:</span>
          <span className="font-semibold text-[#0B1926] font-data">0.38 kg CO2e/kWh</span>
        </div>
      </div>
    </div>
  );
};
