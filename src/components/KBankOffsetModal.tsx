import React, { useState } from 'react';
import { X, Coins, ShieldCheck, CheckCircle2, Globe2, Trees, Wind, Factory, Award } from 'lucide-react';
import { CARBON_CREDIT_PROJECTS } from '../data/emissionsData';
import { CarbonCreditProject } from '../types';

interface KBankOffsetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOffset: number;
  onRetireCredits: (tonnes: number, projectName: string) => void;
}

export const KBankOffsetModal: React.FC<KBankOffsetModalProps> = ({
  isOpen,
  onClose,
  currentOffset,
  onRetireCredits
}) => {
  if (!isOpen) return null;

  const [selectedProject, setSelectedProject] = useState<CarbonCreditProject>(CARBON_CREDIT_PROJECTS[0]);
  const [retireAmount, setRetireAmount] = useState<number>(2500);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const totalCost = (retireAmount * selectedProject.pricePerTonne).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const handleRetire = () => {
    onRetireCredits(retireAmount, selectedProject.name);
    setSuccessMessage(
      `Successfully retired ${retireAmount.toLocaleString()} tCO2e via ${selectedProject.name}. Serial ID: KB-${Date.now().toString().slice(-6)}-VERRA`
    );
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1926]/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel bg-white/95 max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/90 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-emerald-600">
          <Coins className="w-5 h-5" />
          <span className="text-xs font-medium uppercase tracking-wider">
            KBank™ Verified Carbon Offsets
          </span>
        </div>
        <h3 className="text-xl font-normal text-[#0B1926] tracking-tight mt-1">
          Offset Your Residual Carbon Footprint
        </h3>
        <p className="text-xs text-slate-500 font-light mt-0.5">
          Access high-integrity carbon credits with verifiable permanence and additionality.
        </p>

        {successMessage ? (
          <div className="my-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-base font-medium text-emerald-900">Retirement Confirmed</h4>
            <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">{successMessage}</p>
            <p className="text-[11px] text-slate-400 mt-3 font-data">
              Certificate recorded on Planet Sustech Public Registry
            </p>
          </div>
        ) : (
          <>
            {/* Project List */}
            <div className="mt-5 space-y-3">
              <div className="text-xs font-medium text-slate-700">Select Verified Program</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CARBON_CREDIT_PROJECTS.map((project) => {
                  const isSelected = selectedProject.id === project.id;
                  return (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#0E6DBB]/5 border-[#0E6DBB] shadow-xs'
                          : 'bg-slate-50/70 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="text-xs font-normal text-[#0B1926] max-w-[200px] truncate">
                          {project.name}
                        </div>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-data">
                          ${project.pricePerTonne}/t
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 font-light mt-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-[#0E6DBB]" />
                        <span>{project.standard}</span>
                      </div>

                      <p className="text-[10px] text-slate-400 font-light mt-2 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Retirement Quantity Selector */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-normal text-[#0B1926]">Retire Volume (Tonnes CO2e)</span>
                <span className="font-data font-medium text-[#0E6DBB]">
                  {retireAmount.toLocaleString()} tonnes
                </span>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex gap-2 mb-3">
                {[500, 1500, 2500, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setRetireAmount(amt)}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                      retireAmount === amt
                        ? 'bg-[#0E6DBB] text-white'
                        : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    +{amt.toLocaleString()} t
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={retireAmount}
                onChange={(e) => setRetireAmount(Number(e.target.value))}
                className="w-full accent-[#0E6DBB] cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-slate-200">
                <span className="text-slate-500 font-light">Total Investment:</span>
                <span className="font-data font-semibold text-[#0B1926] text-sm">{totalCost}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-normal text-slate-600 hover:text-[#0B1926]"
              >
                Cancel
              </button>
              <button
                onClick={handleRetire}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-md transition-all hover:scale-[1.02]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Execute Verified Retirement ({retireAmount.toLocaleString()} tCO2e)</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
