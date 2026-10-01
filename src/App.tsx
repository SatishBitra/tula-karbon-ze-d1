/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FloatingNav } from './components/FloatingNav';
import { TotalEmissionsCard } from './components/TotalEmissionsCard';
import { EmissionsOffsetCard } from './components/EmissionsOffsetCard';
import { MonthlyTimelineCard } from './components/MonthlyTimelineCard';
import { TopEmittersCard } from './components/TopEmittersCard';
import { SimulationModal } from './components/SimulationModal';
import { ReportModal } from './components/ReportModal';
import { SearchModal } from './components/SearchModal';
import { OrganizationView } from './components/OrganizationView';
import { TelemetryView } from './components/TelemetryView';
import { EMISSIONS_DATA } from './data/emissionsData';
import { ScopeType, EmitterItem, YearEmissionsData } from './types';
import { Sparkles, Shield, Leaf, ArrowRight } from 'lucide-react';

// Framer-motion staggered entrance animation variants for luxury feel
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] // Luxury smooth cubic-bezier
    }
  }
};

export default function App() {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedOrg, setSelectedOrg] = useState<string>('org-global');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeScope, setActiveScope] = useState<ScopeType>('all');

  // Custom overridden year data if simulations or credit retirements were run
  const [customDataOverrides, setCustomDataOverrides] = useState<Record<number, Partial<YearEmissionsData>>>({});

  // Modals state
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Notifications badge
  const [notificationsCount, setNotificationsCount] = useState(2);

  // Resolve current active data
  const baseData = EMISSIONS_DATA[selectedYear] || EMISSIONS_DATA[2023];
  const override = customDataOverrides[selectedYear] || {};
  const currentData: YearEmissionsData = {
    ...baseData,
    ...override,
    scopes: {
      ...baseData.scopes,
      ...(override.scopes || {})
    }
  };

  // Handler for applying simulation outcomes to the dashboard
  const handleApplySimulation = (newTotal: number, newOffset: number) => {
    const net = Math.max(0, newTotal - newOffset);
    setCustomDataOverrides((prev) => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        totalEmissions: newTotal,
        netEmissions: net
      }
    }));
  };

  // Handler for retiring carbon credits from KBank
  const handleRetireCredits = (tonnes: number, projectName: string) => {
    const newOffset = currentData.totalOffset + tonnes;
    const newNet = Math.max(0, currentData.totalEmissions - newOffset);

    setCustomDataOverrides((prev) => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        totalOffset: newOffset,
        netEmissions: newNet
      }
    }));
  };

  // Real CSV export generator
  const handleExportCSV = () => {
    const headers = ['Month', 'Scope 1 (tCO2e)', 'Scope 2 (tCO2e)', 'Scope 3 (tCO2e)', 'Total Monthly (tCO2e)'];
    const rows = currentData.monthly.map((m) => [m.month, m.scope1, m.scope2, m.scope3, m.total]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['# TULAKARBON AUDITED GHG EMISSIONS REPORT', `# Year: ${currentData.year}`, headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tulakarbon_Emissions_${currentData.year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Search Action Routing
  const handleSearchAction = (action: string) => {
    if (action === 'simulator') {
      setIsSimulatorOpen(true);
    } else if (action === 'reports') {
      setIsReportModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D4E5FA] via-[#E4EFFC] via-15% via-white via-50% via-[#E4EFFC] via-85% to-[#D4E5FA] text-[#0B1926] relative pb-20 selection:bg-[#0E6DBB]/15 selection:text-[#0E6DBB]">
      {/* Top Floating Glass Navigation */}
      <FloatingNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        notificationsCount={notificationsCount}
      />

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 mt-4 sm:mt-5 space-y-5 sm:space-y-6">
        {/* Tab Router */}
        {(activeTab === 'dashboard' || activeTab === 'analysis' || activeTab === 'act' || activeTab === 'reduce' || activeTab === 'users') && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-5 sm:space-y-6"
          >
            {/* Top Row: 60% Total Emissions Card + 40% Total Emissions Offset Card */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 sm:gap-6 items-stretch">
              <motion.div variants={cardVariants} className="lg:col-span-6 flex flex-col">
                <TotalEmissionsCard
                  data={currentData}
                  activeScope={activeScope}
                  setActiveScope={setActiveScope}
                  userName="Alex"
                />
              </motion.div>

              <motion.div variants={cardVariants} className="lg:col-span-4 flex flex-col">
                <EmissionsOffsetCard
                  data={currentData}
                />
              </motion.div>
            </div>

            {/* Bottom Stack: 60% Monthly Emissions Card + 40% Top 5 Emitters Card */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 sm:gap-6 items-stretch">
              <motion.div variants={cardVariants} className="lg:col-span-6 flex flex-col">
                <MonthlyTimelineCard data={currentData} />
              </motion.div>

              <motion.div variants={cardVariants} className="lg:col-span-4 flex flex-col">
                <TopEmittersCard
                  data={currentData}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'organization' && (
          <OrganizationView
            data={currentData}
          />
        )}

        {activeTab === 'measure' && (
          <TelemetryView data={currentData} />
        )}
      </main>

      {/* Global Interactive Modals */}
      <SimulationModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        data={currentData}
        onApplySimulation={handleApplySimulation}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        data={currentData}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        data={currentData}
        onSelectAction={handleSearchAction}
      />
    </div>
  );
}
