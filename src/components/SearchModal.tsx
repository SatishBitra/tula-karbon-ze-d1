import React, { useState } from 'react';
import { X, Search, Building2, Flame, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { YearEmissionsData } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: YearEmissionsData;
  onSelectAction: (action: string, param?: any) => void;
}

interface SearchableItem {
  type: string;
  title: string;
  subtitle: string;
  action: string;
  payload?: any;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelectAction
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchableItems: SearchableItem[] = [
    ...data.topFacilities.map((f) => ({
      type: 'facility',
      title: f.name,
      subtitle: `${f.emissions.toLocaleString()} tCO2e · ${f.location || f.primaryScope}`,
      action: 'facility',
      payload: f
    })),
    ...data.topSources.map((s) => ({
      type: 'source',
      title: s.name,
      subtitle: `${s.emissions.toLocaleString()} tCO2e · ${s.primaryScope}`,
      action: 'source',
      payload: s
    })),
    {
      type: 'action',
      title: 'Decarbonization Pathway Simulator',
      subtitle: 'Simulate Renewable PPAs, fleet BEVs, and efficiency gains',
      action: 'simulator'
    },
    {
      type: 'action',
      title: 'KBank Verified Carbon Offset Portfolio',
      subtitle: 'Retire certified carbon removal and avoided emissions credits',
      action: 'kbank'
    },
    {
      type: 'action',
      title: 'BRSR & GRI 305 Compliance Export',
      subtitle: 'Download statutory investor-grade sustainability report',
      action: 'reports'
    }
  ];

  const filtered = searchableItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#0B1926]/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel bg-white/95 max-w-xl w-full p-4 shadow-2xl relative border border-white/90">
        <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search facilities, emissions sources, reports, simulators..."
            className="w-full text-sm text-[#0B1926] bg-transparent outline-none placeholder:text-slate-400 font-light"
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 max-h-72 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching facilities, sources, or tools found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectAction(item.action, item.payload);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
              >
                <div>
                  <div className="text-xs font-normal text-[#0B1926] group-hover:text-[#0E6DBB] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-light mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0E6DBB] transition-colors" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
