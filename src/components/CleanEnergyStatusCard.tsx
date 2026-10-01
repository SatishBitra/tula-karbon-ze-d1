import React, { useState } from 'react';
import { Wind, Sun, ArrowUpRight, Zap, BatteryCharging, Gauge } from 'lucide-react';
import { YearEmissionsData } from '../types';

interface CleanEnergyStatusCardProps {
  data: YearEmissionsData;
  onOpenEnergyDetail?: () => void;
}

export const CleanEnergyStatusCard: React.FC<CleanEnergyStatusCardProps> = ({
  data,
  onOpenEnergyDetail
}) => {
  const [activeAsset, setActiveAsset] = useState<'turbine' | 'solar'>('turbine');

  return (
    <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] text-[#0E6DBB] font-light uppercase tracking-wider">
            Clean Tech & On-Site Generation
          </div>
          <h2 className="text-base font-medium text-[#0B1926] tracking-tight">
            Renewable Energy & Power Balance
          </h2>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100/70 rounded-xl text-xs">
          <button
            onClick={() => setActiveAsset('turbine')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              activeAsset === 'turbine'
                ? 'bg-white text-[#0B1926] shadow-xs font-medium'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wind className="w-3 h-3 text-[#0E6DBB]" />
            <span>Wind VAWT</span>
          </button>
          <button
            onClick={() => setActiveAsset('solar')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              activeAsset === 'solar'
                ? 'bg-white text-[#0B1926] shadow-xs font-medium'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sun className="w-3 h-3 text-amber-500" />
            <span>PV Solar</span>
          </button>
        </div>
      </div>

      {/* Hero Asset Feature Card (Visual inspired by Renexa Wind Turbine Card) */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0B1926] via-[#102A43] to-[#0E6DBB] p-5 text-white overflow-hidden shadow-md">
        {/* Subtle decorative vector lines representing wind turbine & solar geometry */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-15 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current animate-spin" style={{ animationDuration: '30s' }}>
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M50 10 L55 50 L50 90 L45 50 Z" />
            <path d="M10 50 L50 55 L90 50 L50 45 Z" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-[11px] font-light text-cyan-200 uppercase tracking-wider">
            {activeAsset === 'turbine' ? 'Renewable Energy of Turbine' : 'Renewable Energy of Solar Array'}
          </div>
          <div className="text-lg font-normal tracking-tight text-white mt-0.5">
            {activeAsset === 'turbine' ? 'Vertical Axis Wind Turbine' : 'High-Efficiency Bifacial PV Plant'}
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-light font-data text-white">
              {activeAsset === 'turbine' ? data.energy.windProduced : data.energy.solarProduced}
            </span>
            <span className="text-xs font-light text-cyan-200">kWh / hour</span>
          </div>

          {/* Micro telemetry badges */}
          <div className="mt-3 pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-[10px] text-slate-300 font-light">Wind Speed</div>
              <div className="font-normal font-data text-white flex items-center gap-1">
                <span>{data.energy.windSpeed} M/S</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-300 font-light">Rotor Rate</div>
              <div className="font-normal font-data text-white">
                {data.energy.windRpm}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-300 font-light">Efficiency</div>
              <div className="font-normal font-data text-emerald-300">
                {data.energy.efficiency}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Energy Balance Row (Produced vs Consumed vs Surplus) */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="text-[10px] text-slate-400 font-light">Produced</div>
          <div className="font-normal text-[#0B1926] font-data text-sm mt-0.5">
            {data.energy.totalProduced} <span className="text-[10px] text-slate-400">kWh</span>
          </div>
          <div className="w-full bg-blue-100 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#0E6DBB] h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="text-[10px] text-slate-400 font-light">Consumed</div>
          <div className="font-normal text-[#0B1926] font-data text-sm mt-0.5">
            {data.energy.totalConsumed} <span className="text-[10px] text-slate-400">kWh</span>
          </div>
          <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-slate-600 h-full rounded-full" style={{ width: '61%' }} />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
          <div className="text-[10px] text-emerald-700 font-light">Surplus / Fed</div>
          <div className="font-normal text-emerald-800 font-data text-sm mt-0.5">
            +{data.energy.surplus} <span className="text-[10px] text-emerald-600">kWh</span>
          </div>
          <div className="w-full bg-emerald-200 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '39%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
