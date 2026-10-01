import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  ChevronDown,
  Bell,
  Check,
  Sparkles,
  Download,
  ShieldCheck,
  AlertTriangle,
  Send,
  Calendar,
  Layers,
  Activity,
  Sliders,
  X,
  User,
  Settings,
  LogOut,
  ExternalLink,
  Users
} from 'lucide-react';
import { ORGANIZATIONS } from '../data/emissionsData';

interface FloatingNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedOrg: string;
  setSelectedOrg: (org: string) => void;
  onOpenSearch: () => void;
  onOpenOffsetModal?: () => void;
  onOpenReportModal: () => void;
  onOpenSimulator: () => void;
  notificationsCount: number;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeTab,
  setActiveTab,
  selectedYear,
  setSelectedYear,
  selectedOrg,
  setSelectedOrg,
  onOpenSearch,
  onOpenOffsetModal,
  onOpenReportModal,
  onOpenSimulator,
  notificationsCount
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const handleCopyOrAction = (text: string, callback?: () => void) => {
    if (callback) callback();
    setCopiedNotice(text);
    setTimeout(() => setCopiedNotice(null), 2500);
    setOpenDropdown(null);
  };

  return (
    <header className="w-full bg-white/45 backdrop-blur-xl border-b border-white/60 sticky top-0 z-50 transition-all shadow-[0_2px_12px_rgba(11,25,38,0.02)]">
      <div
        ref={navRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 h-[64px] sm:h-[68px] flex items-center justify-between gap-2.5 sm:gap-4"
      >
        {/* LEFT: Green Leaf Logo + Brand Name (TulaKarbon) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-xs">
            {/* Green droplet / leaf carbon glyph */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-[#16a34a] fill-[#16a34a]"
            >
              <path d="M12 2C9.5 6 6 8.5 6 13a6 6 0 0 0 12 0c0-4.5-3.5-7-6-11z" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="text-[17px] sm:text-[19px] font-semibold text-[#0B1926] tracking-tight">
              Tula<span className="text-[#16a34a]">Karbon</span>
            </span>
          </div>
        </div>

        {/* CENTER: Exact Navigation Row from Image Content */}
        <nav
          aria-label="Main Navigation"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none flex-1 sm:flex-initial"
        >
          {/* 1. Dashboard */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setOpenDropdown(null);
            }}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all shrink-0 cursor-pointer shadow-xs ${
              activeTab === 'dashboard'
                ? 'bg-black text-white hover:bg-slate-900'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border border-slate-200/70'
            }`}
          >
            Dashboard
          </button>

          {/* 2. Organization */}
          <button
            onClick={() => {
              setActiveTab('organization');
              setOpenDropdown(null);
            }}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all shrink-0 cursor-pointer shadow-xs ${
              activeTab === 'organization'
                ? 'bg-black text-white hover:bg-slate-900'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border border-slate-200/70'
            }`}
          >
            Organization
          </button>

          {/* 3. Users ⌵ */}
          <div className="relative shrink-0">
            <button
              onClick={() => toggleDropdown('users')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-xs border ${
                openDropdown === 'users' || activeTab === 'users'
                  ? 'bg-slate-100 text-black border-slate-300 font-medium'
                  : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border-slate-200/70'
              }`}
            >
              <span>Users</span>
              <ChevronDown
                className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 transition-transform ${
                  openDropdown === 'users' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'users' && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl p-2 shadow-xl border border-slate-200/90 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Users & Stakeholders
                </div>
                <button
                  onClick={() => {
                    handleCopyOrAction('Stakeholders & Roles Directory');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800"
                >
                  <div className="font-normal">Team Members & Roles</div>
                  <div className="text-[10px] text-slate-400">14 active sustainability managers</div>
                </button>
                <button
                  onClick={() => {
                    handleCopyOrAction('Facility Leads Access Managed');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800"
                >
                  <div className="font-normal">Facility Leads & Approvers</div>
                  <div className="text-[10px] text-slate-400">54 operational site managers</div>
                </button>
                <button
                  onClick={() => {
                    handleCopyOrAction('Auditor Invitation Link Generated');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800"
                >
                  <div className="font-normal">Invite External Auditor</div>
                  <div className="text-[10px] text-slate-400">Read-only ISO 14064 verified portal</div>
                </button>
              </div>
            )}
          </div>

          {/* 4. Measure */}
          <button
            onClick={() => {
              setActiveTab('measure');
              setOpenDropdown(null);
            }}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all shrink-0 cursor-pointer shadow-xs ${
              activeTab === 'measure'
                ? 'bg-black text-white hover:bg-slate-900'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border border-slate-200/70'
            }`}
          >
            Measure
          </button>

          {/* 5. Analysis */}
          <button
            onClick={() => {
              setActiveTab('analysis');
              setOpenDropdown(null);
            }}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all shrink-0 cursor-pointer shadow-xs ${
              activeTab === 'analysis'
                ? 'bg-black text-white hover:bg-slate-900'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border border-slate-200/70'
            }`}
          >
            Analysis
          </button>

          {/* 6. Act ⌵ */}
          <div className="relative shrink-0">
            <button
              onClick={() => toggleDropdown('act')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-xs border ${
                openDropdown === 'act' || activeTab === 'act'
                  ? 'bg-slate-100 text-black border-slate-300 font-medium'
                  : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border-slate-200/70'
              }`}
            >
              <span>Act</span>
              <ChevronDown
                className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 transition-transform ${
                  openDropdown === 'act' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'act' && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl p-2 shadow-xl border border-slate-200/90 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Decarbonization Action Levers
                </div>
                <button
                  onClick={() => {
                    onOpenSimulator();
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl bg-emerald-50/60 hover:bg-emerald-50 text-emerald-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Run Pathway Simulator</span>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                    Interactive
                  </span>
                </button>
                <button
                  onClick={() => {
                    handleCopyOrAction('Renewable PPA Initiated');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800 mt-1"
                >
                  <div className="font-normal">Renewable PPA Contracts</div>
                  <div className="text-[10px] text-slate-400">Shift 65% facility power to solar</div>
                </button>
                <button
                  onClick={() => {
                    handleCopyOrAction('Fleet Electrification Scheduled');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800"
                >
                  <div className="font-normal">Fleet BEV Replacement</div>
                  <div className="text-[10px] text-slate-400">Commercial delivery van rollout</div>
                </button>
              </div>
            )}
          </div>

          {/* 7. Reduce ⌵ */}
          <div className="relative shrink-0">
            <button
              onClick={() => toggleDropdown('reduce')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-xs border ${
                openDropdown === 'reduce' || activeTab === 'reduce'
                  ? 'bg-slate-100 text-black border-slate-300 font-medium'
                  : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border-slate-200/70'
              }`}
            >
              <span>Reduce</span>
              <ChevronDown
                className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 transition-transform ${
                  openDropdown === 'reduce' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'reduce' && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl p-2 shadow-xl border border-slate-200/90 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Emissions Reduction Targets
                </div>
                <button
                  onClick={() => {
                    handleCopyOrAction('Scope 1 & 2 Abatement Levers Active');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800"
                >
                  <div className="font-normal">Scope 1 & 2 Abatement Levers</div>
                  <div className="text-[10px] text-slate-400">-18% emissions by Q4 2024</div>
                </button>
                <button
                  onClick={() => {
                    handleCopyOrAction('Energy Efficiency Levers Applied');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800"
                >
                  <div className="font-normal">Energy Efficiency Optimization</div>
                  <div className="text-[10px] text-slate-400">Waste heat recovery & LED retrofits</div>
                </button>
                <button
                  onClick={() => {
                    handleCopyOrAction('Scope 3 Supply Reductions Mandated');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-800"
                >
                  <div className="font-normal">Scope 3 Supply Chain Reductions</div>
                  <div className="text-[10px] text-slate-400">Low-carbon procurement mandates</div>
                </button>
              </div>
            )}
          </div>

          {/* 8. Reports */}
          <button
            onClick={() => {
              onOpenReportModal();
              setOpenDropdown(null);
            }}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all shrink-0 cursor-pointer shadow-xs ${
              activeTab === 'reports'
                ? 'bg-black text-white hover:bg-slate-900'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-50 border border-slate-200/70'
            }`}
          >
            Reports
          </button>
        </nav>

        {/* RIGHT: Circular Notification Bell + Circular User Avatar (Exact match to image) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Circular Bell Button with Green Bell Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
                setOpenDropdown(null);
              }}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full bg-white border border-slate-200/70 shadow-xs flex items-center justify-center text-[#16a34a] hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              <Bell className="w-[18px] h-[18px] text-[#16a34a]" strokeWidth={2} />
              {notificationsCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#16a34a] ring-2 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl p-3 shadow-2xl border border-slate-200/90 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-medium text-slate-800">
                  <span>System Audits & Telemetry</span>
                  <span className="text-[10px] text-[#16a34a] font-normal">Active Sync</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <div className="text-emerald-900 font-medium text-[11px] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                      KBank Carbon Offsets Retired
                    </div>
                    <div className="text-slate-600 text-[10px] mt-0.5">
                      37,500 tCO2e verified and retired on Verra registry.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                    <div className="text-blue-900 font-medium text-[11px]">
                      Rotterdam Terminal Meter
                    </div>
                    <div className="text-slate-600 text-[10px] mt-0.5">
                      Continuous emission telemetry stream confirmed at 04:30.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Circular User Avatar (Portrait of person matching the photo in the image) */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
                setOpenDropdown(null);
              }}
              className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-slate-200/80 shadow-xs cursor-pointer hover:ring-2 hover:ring-[#16a34a]/60 transition-all flex items-center justify-center bg-slate-100"
            >
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Johnathan Vance"
                className="w-full h-full object-cover"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl p-3 shadow-2xl border border-slate-200/90 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Johnathan Vance"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#0B1926]">Johnathan Vance</div>
                    <div className="text-[10px] text-slate-400">Chief Sustainability Officer</div>
                  </div>
                </div>

                <div className="mt-2 space-y-1 text-xs">
                  {/* Scope Boundary Switcher */}
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-[10px] text-slate-400 font-light uppercase tracking-wider mb-1">
                      Reporting Boundary
                    </div>
                    <select
                      value={selectedOrg}
                      onChange={(e) => setSelectedOrg(e.target.value)}
                      className="w-full text-xs font-medium text-slate-800 bg-transparent outline-none cursor-pointer"
                    >
                      {ORGANIZATIONS.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Switcher */}
                  <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-600">Audit Cycle Year</span>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="text-xs font-medium text-[#16a34a] bg-transparent outline-none cursor-pointer"
                    >
                      {[2023, 2024, 2025, 2022].map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      onOpenReportModal();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded-lg hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Compliance Credentials</span>
                  </button>

                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded-lg hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Toast for Actions */}
      {copiedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1926] text-white px-4 py-2.5 rounded-full text-xs shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{copiedNotice}</span>
        </div>
      )}
    </header>
  );
};
