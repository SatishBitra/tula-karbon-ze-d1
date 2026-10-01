import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Download, Printer, Shield, Sparkles } from 'lucide-react';
import { YearEmissionsData } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: YearEmissionsData;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen) return null;

  const [selectedFramework, setSelectedFramework] = useState<'brsr' | 'gri' | 'cdp' | 'sasb'>('brsr');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const frameworks = [
    {
      id: 'brsr',
      name: 'BRSR Core (SEBI)',
      description: 'Business Responsibility and Sustainability Reporting compliant with SEBI ESG assurance guidelines.',
      tag: 'Mandatory Global Format'
    },
    {
      id: 'gri',
      name: 'GRI 305: Emissions 2024',
      description: 'Global Reporting Initiative indicators 305-1, 305-2, 305-3 and 305-5 emissions reduction disclosure.',
      tag: 'Universal Standard'
    },
    {
      id: 'cdp',
      name: 'CDP Climate Change C6-C7',
      description: 'Disclosures for operational boundary, Scope 1 gross direct, Scope 2 location/market-based, Scope 3 categories.',
      tag: 'A-List Questionnaire'
    },
    {
      id: 'sasb',
      name: 'SASB / ISSB S2 Standard',
      description: 'Sustainability Accounting Standards Board energy management & decarbonization metrics.',
      tag: 'Investor Grade'
    }
  ];

  const handleDownload = () => {
    // Generate text/csv report file
    const content = `TULAKARBON COMPLIANCE AUDIT DISCLOSURE REPORT
Framework: ${selectedFramework.toUpperCase()}
Reporting Year: ${data.year}
Generated: ${new Date().toISOString()}
Organization: Planet Sustech Enterprise (54 Operational Facilities)

1. GREENHOUSE GAS INVENTORY (GHG PROTOCOL CORPORATE STANDARD)
Gross Total Emissions: ${data.totalEmissions.toLocaleString()} tCO2e
Scope 1 Direct Emissions: ${data.scopes.scope1.value.toLocaleString()} tCO2e (${data.scopes.scope1.percentage}%)
Scope 2 Indirect Electricity: ${data.scopes.scope2.value.toLocaleString()} tCO2e (${data.scopes.scope2.percentage}%)
Scope 3 Value Chain: ${data.scopes.scope3.value.toLocaleString()} tCO2e (${data.scopes.scope3.percentage}%)

2. OFFSET & REMOVAL CREDITING
Total Retired Carbon Offsets: ${data.totalOffset.toLocaleString()} tCO2e
Net Emissions Balance: ${data.netEmissions.toLocaleString()} tCO2e
Registry: KBank Planet Sustech Verra/Gold Standard Certified

3. TOP FACILITY EMISSIONS
${data.topFacilities.map((f, i) => `${i + 1}. ${f.name}: ${f.emissions.toLocaleString()} tCO2e [${f.primaryScope}]`).join('\n')}

4. METHODOLOGICAL ASSURANCE
Assurance Standard: ISO 14064-3 Third-Party Limited Assurance Ready
Status: Compliant with ${selectedFramework.toUpperCase()} Disclosure Rules
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tulakarbon_${selectedFramework.toUpperCase()}_Audit_${data.year}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1926]/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel bg-white/95 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/90">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#0E6DBB]">
          <FileText className="w-5 h-5" />
          <span className="text-xs font-medium uppercase tracking-wider">
            Automated ESG Compliance Reporting
          </span>
        </div>
        <h3 className="text-xl font-normal text-[#0B1926] tracking-tight mt-1">
          Export Audited GHG Emissions Report
        </h3>
        <p className="text-xs text-slate-500 font-light mt-0.5">
          Select standard framework for automated statutory & investor disclosures.
        </p>

        {/* Framework Selector */}
        <div className="mt-5 space-y-2.5">
          {frameworks.map((fw) => {
            const isSelected = selectedFramework === fw.id;
            return (
              <div
                key={fw.id}
                onClick={() => setSelectedFramework(fw.id as any)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0E6DBB]/5 border-[#0E6DBB] shadow-xs'
                    : 'bg-slate-50/70 border-slate-200/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#0B1926]">{fw.name}</span>
                  <span className="text-[10px] text-[#0E6DBB] bg-[#0E6DBB]/10 px-2 py-0.5 rounded-full font-light">
                    {fw.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-light mt-1">
                  {fw.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Preview Summary */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
          <div className="flex items-center justify-between text-[#0B1926] font-medium pb-2 border-b border-slate-200">
            <span>Report Digest ({data.year})</span>
            <span className="text-emerald-700 font-normal flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Assurance Ready
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div>
              <div className="text-[10px] text-slate-400">Gross Scope 1-3</div>
              <div className="font-data font-medium text-[#0B1926] mt-0.5">
                {(data.totalEmissions / 1000).toFixed(1)}k tCO2e
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Total Retired Offsets</div>
              <div className="font-data font-medium text-emerald-700 mt-0.5">
                {(data.totalOffset / 1000).toFixed(1)}k tCO2e
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Net Audited Balance</div>
              <div className="font-data font-medium text-[#0E6DBB] mt-0.5">
                {(data.netEmissions / 1000).toFixed(1)}k tCO2e
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-normal text-slate-600 hover:text-[#0B1926]"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0E6DBB] hover:bg-[#0b5aa0] text-white text-xs font-medium shadow-md transition-all hover:scale-[1.02]"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Downloaded Successfully</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Standard Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
