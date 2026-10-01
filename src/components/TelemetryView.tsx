import React from 'react';
import { Gauge, Radio, Cpu, Zap, Activity, Waves, Thermometer } from 'lucide-react';
import { YearEmissionsData } from '../types';

interface TelemetryViewProps {
  data: YearEmissionsData;
}

export const TelemetryView: React.FC<TelemetryViewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-normal text-[#0B1926] tracking-tight">
            Continuous Emissions Monitoring & Sensor Telemetry
          </h2>
          <p className="text-xs text-slate-500 font-light mt-0.5">
            Real-time optical CEMS sensors, smart transformer meters, and weather correlation streams.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 glass-panel text-emerald-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            142 Telemetry Nodes Synchronized
          </span>
        </div>
      </div>

      {/* Real-time telemetry cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card-top p-5 hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Stack Flue Gas Velocity</span>
            <Waves className="w-4 h-4 text-[#0E6DBB]" />
          </div>
          <div className="text-2xl font-semibold font-data text-[#0B1926] mt-2">
            18.4 <span className="text-xs text-slate-500 font-normal">m/s</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Nominal laminar flow
          </div>
        </div>

        <div className="glass-card-top p-5 hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Flue Gas Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-semibold font-data text-[#0B1926] mt-2">
            164.2 <span className="text-xs text-slate-500 font-normal">°C</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Economizer heat recovery active
          </div>
        </div>

        <div className="glass-card-top p-5 hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Grid Frequency & Power</span>
            <Zap className="w-4 h-4 text-[#0E6DBB]" />
          </div>
          <div className="text-2xl font-semibold font-data text-[#0B1926] mt-2">
            50.02 <span className="text-xs text-slate-500 font-normal">Hz</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Phase balanced · 0.98 PF
          </div>
        </div>

        <div className="glass-card-top p-5 hover:shadow-[0_16px_40px_rgba(11,25,38,0.06)] hover:border-white transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Carbon Intensity</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-semibold font-data text-emerald-700 mt-2">
            0.38 <span className="text-xs text-slate-500 font-normal">kg/kWh</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            12% lower than national grid
          </div>
        </div>
      </div>
    </div>
  );
};
