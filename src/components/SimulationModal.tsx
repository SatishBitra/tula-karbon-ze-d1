import React, { useState } from 'react';
import { X, Sparkles, Sliders, ArrowRight, CheckCircle2, TrendingDown, DollarSign } from 'lucide-react';
import { YearEmissionsData } from '../types';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: YearEmissionsData;
  onApplySimulation: (newTotal: number, newOffset: number) => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({
  isOpen,
  onClose,
  data,
  onApplySimulation
}) => {
  if (!isOpen) return null;

  // Simulation Sliders State
  const [ppaRenewable, setPpaRenewable] = useState(60); // % renewable electricity
  const [fleetElectrification, setFleetElectrification] = useState(40); // % EV fleet
  const [efficiencyGain, setEfficiencyGain] = useState(15); // % heat & HVAC efficiency
  const [supplierEngagement, setSupplierEngagement] = useState(30); // % low carbon suppliers

  // Dynamic calculations
  // Scope 2 reductions from PPA
  const scope2Reduction = (data.scopes.scope2.value * (ppaRenewable / 100));
  // Scope 1 reductions from Fleet & Efficiency
  const scope1Reduction = (data.scopes.scope1.value * ((fleetElectrification * 0.4 + efficiencyGain * 0.6) / 100));
  // Scope 3 reductions from Supplier code
  const scope3Reduction = (data.scopes.scope3.value * (supplierEngagement * 0.25 / 100));

  const totalReduction = Math.round(scope1Reduction + scope2Reduction + scope3Reduction);
  const simulatedTotal = Math.max(0, data.totalEmissions - totalReduction);
  const simulatedNet = Math.max(0, simulatedTotal - data.totalOffset);
  const percentReduced = ((totalReduction / data.totalEmissions) * 100).toFixed(1);

  // Estimated annual energy cost savings ($85/MWh avoided)
  const estimatedSavings = (totalReduction * 92).toLocaleString();

  // Projected Net-Zero milestone year
  const projectedYear = simulatedTotal < 80000 ? 2029 : simulatedTotal < 110000 ? 2032 : 2036;

  const handleApply = () => {
    onApplySimulation(simulatedTotal, data.totalOffset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1926]/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel bg-white/95 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/90">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-[#0E6DBB]">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-medium uppercase tracking-wider">
            Decarbonization Pathway Simulator
          </span>
        </div>
        <h3 className="text-xl font-normal text-[#0B1926] tracking-tight mt-1">
          Model Actionable Emissions Reductions
        </h3>
        <p className="text-xs text-slate-500 font-light mt-0.5">
          Simulate strategic interventions across Scope 1, Scope 2, and supply chain initiatives.
        </p>

        {/* Sliders Grid */}
        <div className="mt-6 space-y-4">
          {/* Slider 1: Renewable PPA */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-normal text-[#0B1926]">
                Renewable Energy PPA Procurement (Scope 2)
              </span>
              <span className="font-data font-medium text-[#0E6DBB]">{ppaRenewable}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={ppaRenewable}
              onChange={(e) => setPpaRenewable(Number(e.target.value))}
              className="w-full accent-[#0E6DBB] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-light mt-1">
              <span>Current: 25%</span>
              <span>Target: 100% Green Tariff</span>
            </div>
          </div>

          {/* Slider 2: Fleet Electrification */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-normal text-[#0B1926]">
                Commercial Transport Fleet Electrification (Scope 1)
              </span>
              <span className="font-data font-medium text-[#0E6DBB]">{fleetElectrification}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={fleetElectrification}
              onChange={(e) => setFleetElectrification(Number(e.target.value))}
              className="w-full accent-[#0E6DBB] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-light mt-1">
              <span>0% ICE Vehicles</span>
              <span>100% Full BEV Commercial Fleet</span>
            </div>
          </div>

          {/* Slider 3: Industrial Energy Efficiency */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-normal text-[#0B1926]">
                Facility Waste Heat Recovery & Smart HVAC (Scope 1 & 2)
              </span>
              <span className="font-data font-medium text-[#0E6DBB]">{efficiencyGain}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              value={efficiencyGain}
              onChange={(e) => setEfficiencyGain(Number(e.target.value))}
              className="w-full accent-[#0E6DBB] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-light mt-1">
              <span>Baseline Efficiency</span>
              <span>Max 35% Heat Pump Integration</span>
            </div>
          </div>

          {/* Slider 4: Supplier Code of Conduct */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-normal text-[#0B1926]">
                Tier-1 Supplier Low-Carbon Procurement (Scope 3)
              </span>
              <span className="font-data font-medium text-[#0E6DBB]">{supplierEngagement}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={supplierEngagement}
              onChange={(e) => setSupplierEngagement(Number(e.target.value))}
              className="w-full accent-[#0E6DBB] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-light mt-1">
              <span>Standard Logistics</span>
              <span>Decarbonized Freight & Raw Metals</span>
            </div>
          </div>
        </div>

        {/* Live Simulation Outcome Readout */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-[#0E6DBB]/10 border border-emerald-500/20 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-light">
              Avoided CO2e
            </div>
            <div className="text-xl sm:text-2xl font-light font-data text-emerald-700 mt-0.5">
              -{totalReduction.toLocaleString()} <span className="text-xs">t</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-normal">
              ↓ {percentReduced}% reduction
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-light">
              Simulated Net CO2e
            </div>
            <div className="text-xl sm:text-2xl font-light font-data text-[#0B1926] mt-0.5">
              {(simulatedNet / 1000).toFixed(1)}k <span className="text-xs">t</span>
            </div>
            <div className="text-[11px] text-slate-500 font-light">
              from {(data.netEmissions / 1000).toFixed(1)}k
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-light">
              Projected Net-Zero
            </div>
            <div className="text-xl sm:text-2xl font-light font-data text-[#0E6DBB] mt-0.5">
              {projectedYear}
            </div>
            <div className="text-[11px] text-[#0E6DBB] font-normal">
              Accelerated by 5 yrs
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-normal text-slate-600 hover:text-[#0B1926]"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0E6DBB] hover:bg-[#0b5aa0] text-white text-xs font-medium shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Apply Scenario to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
