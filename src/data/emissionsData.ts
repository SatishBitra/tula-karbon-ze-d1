import { YearEmissionsData, CarbonCreditProject } from '../types';

export const EMISSIONS_DATA: Record<number, YearEmissionsData> = {
  2023: {
    year: 2023,
    totalEmissions: 141600, // 141.6k tCO2e
    previousYear: 137800,  // 137.8k
    baselineYear: 105100,  // 105.1k (2012 baseline)
    deviationFromTarget: 8600, // 8.6k
    previousYearPct: 8,
    baselineYearPct: 6,
    deviationPct: 4,
    netEmissions: 104100, // 104.1k
    totalOffset: 37500,   // 37.5k
    scopes: {
      scope1: {
        name: 'Scope 1 (Direct)',
        scope: 'Scope 1',
        percentage: 17,
        value: 24072,
        color: '#F87171', // Muted Coral
        description: 'Direct emissions from owned furnaces, fleet vehicles, and on-site boilers.'
      },
      scope2: {
        name: 'Scope 2 (Electricity/Heat)',
        scope: 'Scope 2',
        percentage: 9,
        value: 12744,
        color: '#A78BFA', // Amethyst
        description: 'Indirect emissions from purchased electricity, steam, and facility cooling.'
      },
      scope3: {
        name: 'Scope 3 (Value Chain)',
        scope: 'Scope 3',
        percentage: 74,
        value: 104784,
        color: '#0E6DBB', // Cyber Blue / Enterprise Slate
        description: 'Upstream freight, business flights, supplier materials, and product lifecycle.'
      }
    },
    monthly: [
      { month: 'Jan', scope1: 1820, scope2: 950, scope3: 7450, total: 10220 },
      { month: 'Feb', scope1: 1740, scope2: 920, scope3: 7600, total: 10260 },
      { month: 'Mar', scope1: 1890, scope2: 1010, scope3: 8400, total: 11300 },
      { month: 'Apr', scope1: 1980, scope2: 1040, scope3: 8900, total: 11920 },
      { month: 'May', scope1: 1940, scope2: 1020, scope3: 8850, total: 11810 },
      { month: 'Jun', scope1: 2050, scope2: 1110, scope3: 9200, total: 12360 },
      { month: 'Jul', scope1: 2180, scope2: 1180, scope3: 9450, total: 12810 },
      { month: 'Aug', scope1: 2150, scope2: 1160, scope3: 9320, total: 12630 },
      { month: 'Sep', scope1: 2020, scope2: 1090, scope3: 8950, total: 12060 },
      { month: 'Oct', scope1: 2090, scope2: 1130, scope3: 9100, total: 12320 },
      { month: 'Nov', scope1: 2112, scope2: 1074, scope3: 8964, total: 12150 },
      { month: 'Dec', scope1: 2100, scope2: 1060, scope3: 8600, total: 11760 }
    ],
    topFacilities: [
      {
        id: 'fac-1',
        name: 'Facility Name - 1 (Rotterdam Port Terminal)',
        category: 'facility',
        emissions: 12344,
        percentage: 8.7,
        location: 'Rotterdam, Netherlands',
        primaryScope: 'Scope 1',
        trend: 3.2
      },
      {
        id: 'fac-2',
        name: 'Facility Name - 2 (Munich Assembly Plant)',
        category: 'facility',
        emissions: 8903,
        percentage: 6.3,
        location: 'Munich, Germany',
        primaryScope: 'Scope 2',
        trend: -4.1
      },
      {
        id: 'fac-3',
        name: 'Facility Name - 3 (Austin Data Center)',
        category: 'facility',
        emissions: 6026,
        percentage: 4.3,
        location: 'Austin, Texas, USA',
        primaryScope: 'Scope 2',
        trend: 1.8
      },
      {
        id: 'fac-4',
        name: 'Facility Name - 4 (Singapore Logistics Hub)',
        category: 'facility',
        emissions: 2338,
        percentage: 1.6,
        location: 'Tuas, Singapore',
        primaryScope: 'Scope 3',
        trend: -2.4
      },
      {
        id: 'fac-5',
        name: 'Facility Name - 5 (São Paulo Manufacturing)',
        category: 'facility',
        emissions: 1820,
        percentage: 1.3,
        location: 'São Paulo, Brazil',
        primaryScope: 'Scope 1',
        trend: -1.2
      }
    ],
    topSources: [
      {
        id: 'src-1',
        name: 'Purchased Electricity (Grid Consumption)',
        category: 'source',
        emissions: 38420,
        percentage: 27.1,
        primaryScope: 'Scope 2',
        trend: 2.1
      },
      {
        id: 'src-2',
        name: 'Natural Gas High-Temp Heating & Steam',
        category: 'source',
        emissions: 18910,
        percentage: 13.4,
        primaryScope: 'Scope 1',
        trend: -1.8
      },
      {
        id: 'src-3',
        name: 'Upstream Freight Transport & Distribution',
        category: 'source',
        emissions: 14230,
        percentage: 10.1,
        primaryScope: 'Scope 3',
        trend: 5.4
      },
      {
        id: 'src-4',
        name: 'Purchased Raw Materials & Capital Goods',
        category: 'source',
        emissions: 9840,
        percentage: 7.0,
        primaryScope: 'Scope 3',
        trend: -3.2
      },
      {
        id: 'src-5',
        name: 'Commercial Aviation & Employee Mobility',
        category: 'source',
        emissions: 6010,
        percentage: 4.2,
        primaryScope: 'Scope 3',
        trend: -8.5
      }
    ],
    energy: {
      windProduced: 650.0,
      solarProduced: 570.2,
      totalProduced: 1220.2,
      totalConsumed: 750.5,
      surplus: 469.7,
      avoidedCarbon: 428.4,
      windSpeed: 15.5,
      windRpm: '25-50 RPM',
      efficiency: 91
    }
  },
  2024: {
    year: 2024,
    totalEmissions: 132400,
    previousYear: 141600,
    baselineYear: 105100,
    deviationFromTarget: 5200,
    previousYearPct: -6.5,
    baselineYearPct: 4.8,
    deviationPct: 2.1,
    netEmissions: 88200,
    totalOffset: 44200,
    scopes: {
      scope1: {
        name: 'Scope 1 (Direct)',
        scope: 'Scope 1',
        percentage: 16,
        value: 21184,
        color: '#F87171',
        description: 'Direct emissions reduced through heat pump electrification.'
      },
      scope2: {
        name: 'Scope 2 (Electricity/Heat)',
        scope: 'Scope 2',
        percentage: 7,
        value: 9268,
        color: '#A78BFA',
        description: 'Procured 65% clean solar PPA power across major manufacturing sites.'
      },
      scope3: {
        name: 'Scope 3 (Value Chain)',
        scope: 'Scope 3',
        percentage: 77,
        value: 101948,
        color: '#0E6DBB',
        description: 'Supply chain freight consolidation and regional routing.'
      }
    },
    monthly: [
      { month: 'Jan', scope1: 1700, scope2: 780, scope3: 7200, total: 9680 },
      { month: 'Feb', scope1: 1650, scope2: 740, scope3: 7350, total: 9740 },
      { month: 'Mar', scope1: 1750, scope2: 800, scope3: 8100, total: 10650 },
      { month: 'Apr', scope1: 1810, scope2: 820, scope3: 8400, total: 11030 },
      { month: 'May', scope1: 1790, scope2: 810, scope3: 8300, total: 10900 },
      { month: 'Jun', scope1: 1860, scope2: 840, scope3: 8600, total: 11300 },
      { month: 'Jul', scope1: 1940, scope2: 880, scope3: 8900, total: 11720 },
      { month: 'Aug', scope1: 1910, scope2: 860, scope3: 8750, total: 11520 },
      { month: 'Sep', scope1: 1800, scope2: 800, scope3: 8400, total: 11000 },
      { month: 'Oct', scope1: 1850, scope2: 830, scope3: 8600, total: 11280 },
      { month: 'Nov', scope1: 1864, scope2: 798, scope3: 8500, total: 11162 },
      { month: 'Dec', scope1: 1860, scope2: 780, scope3: 8100, total: 10740 }
    ],
    topFacilities: [
      {
        id: 'fac-1',
        name: 'Facility Name - 1 (Rotterdam Port Terminal)',
        category: 'facility',
        emissions: 10940,
        percentage: 8.2,
        location: 'Rotterdam, Netherlands',
        primaryScope: 'Scope 1',
        trend: -11.4
      },
      {
        id: 'fac-2',
        name: 'Facility Name - 2 (Munich Assembly Plant)',
        category: 'facility',
        emissions: 7620,
        percentage: 5.8,
        location: 'Munich, Germany',
        primaryScope: 'Scope 2',
        trend: -14.4
      },
      {
        id: 'fac-3',
        name: 'Facility Name - 3 (Austin Data Center)',
        category: 'facility',
        emissions: 5410,
        percentage: 4.1,
        location: 'Austin, Texas, USA',
        primaryScope: 'Scope 2',
        trend: -10.2
      },
      {
        id: 'fac-4',
        name: 'Facility Name - 4 (Singapore Logistics Hub)',
        category: 'facility',
        emissions: 2190,
        percentage: 1.7,
        location: 'Tuas, Singapore',
        primaryScope: 'Scope 3',
        trend: -6.3
      },
      {
        id: 'fac-5',
        name: 'Facility Name - 5 (São Paulo Manufacturing)',
        category: 'facility',
        emissions: 1690,
        percentage: 1.3,
        location: 'São Paulo, Brazil',
        primaryScope: 'Scope 1',
        trend: -7.1
      }
    ],
    topSources: [
      {
        id: 'src-1',
        name: 'Purchased Electricity (Grid Consumption)',
        category: 'source',
        emissions: 31200,
        percentage: 23.5,
        primaryScope: 'Scope 2',
        trend: -18.7
      },
      {
        id: 'src-2',
        name: 'Natural Gas High-Temp Heating & Steam',
        category: 'source',
        emissions: 17200,
        percentage: 13.0,
        primaryScope: 'Scope 1',
        trend: -9.0
      },
      {
        id: 'src-3',
        name: 'Upstream Freight Transport & Distribution',
        category: 'source',
        emissions: 13800,
        percentage: 10.4,
        primaryScope: 'Scope 3',
        trend: -3.0
      },
      {
        id: 'src-4',
        name: 'Purchased Raw Materials & Capital Goods',
        category: 'source',
        emissions: 9400,
        percentage: 7.1,
        primaryScope: 'Scope 3',
        trend: -4.5
      },
      {
        id: 'src-5',
        name: 'Commercial Aviation & Employee Mobility',
        category: 'source',
        emissions: 5200,
        percentage: 3.9,
        primaryScope: 'Scope 3',
        trend: -13.5
      }
    ],
    energy: {
      windProduced: 780.0,
      solarProduced: 690.5,
      totalProduced: 1470.5,
      totalConsumed: 760.2,
      surplus: 710.3,
      avoidedCarbon: 562.1,
      windSpeed: 16.2,
      windRpm: '30-55 RPM',
      efficiency: 93
    }
  },
  2022: {
    year: 2022,
    totalEmissions: 137800,
    previousYear: 131200,
    baselineYear: 105100,
    deviationFromTarget: 6100,
    previousYearPct: 5.0,
    baselineYearPct: 5.2,
    deviationPct: 3.1,
    netEmissions: 111800,
    totalOffset: 26000,
    scopes: {
      scope1: {
        name: 'Scope 1 (Direct)',
        scope: 'Scope 1',
        percentage: 18,
        value: 24804,
        color: '#F87171',
        description: 'Facility boilers and transport operations.'
      },
      scope2: {
        name: 'Scope 2 (Electricity/Heat)',
        scope: 'Scope 2',
        percentage: 11,
        value: 15158,
        color: '#A78BFA',
        description: 'Standard grid mix electricity across operations.'
      },
      scope3: {
        name: 'Scope 3 (Value Chain)',
        scope: 'Scope 3',
        percentage: 71,
        value: 97838,
        color: '#0E6DBB',
        description: 'High-volume international logistics and business travel.'
      }
    },
    monthly: [
      { month: 'Jan', scope1: 1910, scope2: 1150, scope3: 7200, total: 10260 },
      { month: 'Feb', scope1: 1840, scope2: 1110, scope3: 7300, total: 10250 },
      { month: 'Mar', scope1: 1980, scope2: 1220, scope3: 8100, total: 11300 },
      { month: 'Apr', scope1: 2050, scope2: 1260, scope3: 8500, total: 11810 },
      { month: 'May', scope1: 2010, scope2: 1230, scope3: 8400, total: 11640 },
      { month: 'Jun', scope1: 2110, scope2: 1310, scope3: 8800, total: 12220 },
      { month: 'Jul', scope1: 2210, scope2: 1380, scope3: 9100, total: 12690 },
      { month: 'Aug', scope1: 2190, scope2: 1360, scope3: 9000, total: 12550 },
      { month: 'Sep', scope1: 2060, scope2: 1280, scope3: 8600, total: 11940 },
      { month: 'Oct', scope1: 2130, scope2: 1320, scope3: 8800, total: 12250 },
      { month: 'Nov', scope1: 2150, scope2: 1290, scope3: 8650, total: 12090 },
      { month: 'Dec', scope1: 2160, scope2: 1258, scope3: 8350, total: 11768 }
    ],
    topFacilities: [
      {
        id: 'fac-1',
        name: 'Facility Name - 1 (Rotterdam Port Terminal)',
        category: 'facility',
        emissions: 12890,
        percentage: 9.3,
        location: 'Rotterdam, Netherlands',
        primaryScope: 'Scope 1',
        trend: 4.8
      },
      {
        id: 'fac-2',
        name: 'Facility Name - 2 (Munich Assembly Plant)',
        category: 'facility',
        emissions: 9810,
        percentage: 7.1,
        location: 'Munich, Germany',
        primaryScope: 'Scope 2',
        trend: 2.1
      },
      {
        id: 'fac-3',
        name: 'Facility Name - 3 (Austin Data Center)',
        category: 'facility',
        emissions: 6420,
        percentage: 4.7,
        location: 'Austin, Texas, USA',
        primaryScope: 'Scope 2',
        trend: 6.3
      },
      {
        id: 'fac-4',
        name: 'Facility Name - 4 (Singapore Logistics Hub)',
        category: 'facility',
        emissions: 2490,
        percentage: 1.8,
        location: 'Tuas, Singapore',
        primaryScope: 'Scope 3',
        trend: 3.1
      },
      {
        id: 'fac-5',
        name: 'Facility Name - 5 (São Paulo Manufacturing)',
        category: 'facility',
        emissions: 1940,
        percentage: 1.4,
        location: 'São Paulo, Brazil',
        primaryScope: 'Scope 1',
        trend: 1.5
      }
    ],
    topSources: [
      {
        id: 'src-1',
        name: 'Purchased Electricity (Grid Consumption)',
        category: 'source',
        emissions: 41200,
        percentage: 29.9,
        primaryScope: 'Scope 2',
        trend: 4.2
      },
      {
        id: 'src-2',
        name: 'Natural Gas High-Temp Heating & Steam',
        category: 'source',
        emissions: 19500,
        percentage: 14.1,
        primaryScope: 'Scope 1',
        trend: 1.1
      },
      {
        id: 'src-3',
        name: 'Upstream Freight Transport & Distribution',
        category: 'source',
        emissions: 13900,
        percentage: 10.1,
        primaryScope: 'Scope 3',
        trend: 6.8
      },
      {
        id: 'src-4',
        name: 'Purchased Raw Materials & Capital Goods',
        category: 'source',
        emissions: 10200,
        percentage: 7.4,
        primaryScope: 'Scope 3',
        trend: 2.9
      },
      {
        id: 'src-5',
        name: 'Commercial Aviation & Employee Mobility',
        category: 'source',
        emissions: 6900,
        percentage: 5.0,
        primaryScope: 'Scope 3',
        trend: 11.2
      }
    ],
    energy: {
      windProduced: 520.0,
      solarProduced: 430.5,
      totalProduced: 950.5,
      totalConsumed: 780.0,
      surplus: 170.5,
      avoidedCarbon: 310.2,
      windSpeed: 14.1,
      windRpm: '20-40 RPM',
      efficiency: 87
    }
  },
  2025: {
    year: 2025,
    totalEmissions: 118200,
    previousYear: 132400,
    baselineYear: 105100,
    deviationFromTarget: 1800,
    previousYearPct: -10.7,
    baselineYearPct: 2.1,
    deviationPct: 0.9,
    netEmissions: 64200,
    totalOffset: 54000,
    scopes: {
      scope1: {
        name: 'Scope 1 (Direct)',
        scope: 'Scope 1',
        percentage: 15,
        value: 17730,
        color: '#F87171',
        description: 'Direct fleet converted to 85% commercial BEVs.'
      },
      scope2: {
        name: 'Scope 2 (Electricity/Heat)',
        scope: 'Scope 2',
        percentage: 5,
        value: 5910,
        color: '#A78BFA',
        description: '92% of operational sites covered by certified green energy contracts.'
      },
      scope3: {
        name: 'Scope 3 (Value Chain)',
        scope: 'Scope 3',
        percentage: 80,
        value: 94560,
        color: '#0E6DBB',
        description: 'Low-carbon marine logistics and supplier decarbonization pledges.'
      }
    },
    monthly: [
      { month: 'Jan', scope1: 1450, scope2: 490, scope3: 6700, total: 8640 },
      { month: 'Feb', scope1: 1420, scope2: 470, scope3: 6850, total: 8740 },
      { month: 'Mar', scope1: 1490, scope2: 510, scope3: 7500, total: 9500 },
      { month: 'Apr', scope1: 1520, scope2: 520, scope3: 7800, total: 9840 },
      { month: 'May', scope1: 1500, scope2: 500, scope3: 7700, total: 9700 },
      { month: 'Jun', scope1: 1560, scope2: 530, scope3: 8000, total: 10090 },
      { month: 'Jul', scope1: 1610, scope2: 550, scope3: 8200, total: 10360 },
      { month: 'Aug', scope1: 1590, scope2: 540, scope3: 8100, total: 10230 },
      { month: 'Sep', scope1: 1510, scope2: 500, scope3: 7750, total: 9760 },
      { month: 'Oct', scope1: 1540, scope2: 520, scope3: 7900, total: 9960 },
      { month: 'Nov', scope1: 1550, scope2: 490, scope3: 7800, total: 9840 },
      { month: 'Dec', scope1: 1530, scope2: 480, scope3: 7500, total: 9510 }
    ],
    topFacilities: [
      {
        id: 'fac-1',
        name: 'Facility Name - 1 (Rotterdam Port Terminal)',
        category: 'facility',
        emissions: 9200,
        percentage: 7.8,
        location: 'Rotterdam, Netherlands',
        primaryScope: 'Scope 1',
        trend: -15.9
      },
      {
        id: 'fac-2',
        name: 'Facility Name - 2 (Munich Assembly Plant)',
        category: 'facility',
        emissions: 6100,
        percentage: 5.2,
        location: 'Munich, Germany',
        primaryScope: 'Scope 2',
        trend: -19.9
      },
      {
        id: 'fac-3',
        name: 'Facility Name - 3 (Austin Data Center)',
        category: 'facility',
        emissions: 4300,
        percentage: 3.6,
        location: 'Austin, Texas, USA',
        primaryScope: 'Scope 2',
        trend: -20.5
      },
      {
        id: 'fac-4',
        name: 'Facility Name - 4 (Singapore Logistics Hub)',
        category: 'facility',
        emissions: 1950,
        percentage: 1.6,
        location: 'Tuas, Singapore',
        primaryScope: 'Scope 3',
        trend: -10.9
      },
      {
        id: 'fac-5',
        name: 'Facility Name - 5 (São Paulo Manufacturing)',
        category: 'facility',
        emissions: 1480,
        percentage: 1.3,
        location: 'São Paulo, Brazil',
        primaryScope: 'Scope 1',
        trend: -12.4
      }
    ],
    topSources: [
      {
        id: 'src-1',
        name: 'Purchased Electricity (Grid Consumption)',
        category: 'source',
        emissions: 24100,
        percentage: 20.4,
        primaryScope: 'Scope 2',
        trend: -22.8
      },
      {
        id: 'src-2',
        name: 'Natural Gas High-Temp Heating & Steam',
        category: 'source',
        emissions: 14800,
        percentage: 12.5,
        primaryScope: 'Scope 1',
        trend: -13.9
      },
      {
        id: 'src-3',
        name: 'Upstream Freight Transport & Distribution',
        category: 'source',
        emissions: 12900,
        percentage: 10.9,
        primaryScope: 'Scope 3',
        trend: -6.5
      },
      {
        id: 'src-4',
        name: 'Purchased Raw Materials & Capital Goods',
        category: 'source',
        emissions: 8900,
        percentage: 7.5,
        primaryScope: 'Scope 3',
        trend: -5.3
      },
      {
        id: 'src-5',
        name: 'Commercial Aviation & Employee Mobility',
        category: 'source',
        emissions: 4400,
        percentage: 3.7,
        primaryScope: 'Scope 3',
        trend: -15.4
      }
    ],
    energy: {
      windProduced: 920.0,
      solarProduced: 840.0,
      totalProduced: 1760.0,
      totalConsumed: 740.0,
      surplus: 1020.0,
      avoidedCarbon: 712.5,
      windSpeed: 17.0,
      windRpm: '35-60 RPM',
      efficiency: 95
    }
  }
};

export const CARBON_CREDIT_PROJECTS: CarbonCreditProject[] = [
  {
    id: 'proj-1',
    name: 'Acre Amazon Reforestation & Native Biodiversity Reserve',
    standard: 'Verra VCS + CCB Gold',
    category: 'Nature-based Forestry',
    location: 'Acre, Brazil',
    pricePerTonne: 14.50,
    availableTonnes: 125000,
    rating: 'AAA High Integrity',
    description: 'Protecting 450,000 hectares of primary tropical canopy with indigenous community co-management.'
  },
  {
    id: 'proj-2',
    name: 'Gujarat 300MW Offshore Wind Clean Grid Displacement',
    standard: 'Gold Standard GS4GG',
    category: 'Renewable Power',
    location: 'Gujarat, India',
    pricePerTonne: 9.20,
    availableTonnes: 85000,
    rating: 'AA+ Proven Additionality',
    description: 'Displacing high-carbon subcritical thermal power on the regional western grid.'
  },
  {
    id: 'proj-3',
    name: 'Mammoth Direct Air Capture & Basalt Mineralization',
    standard: 'Puro.earth Standard',
    category: 'Technological Carbon Removal',
    location: 'Hellisheidi, Iceland',
    pricePerTonne: 85.00,
    availableTonnes: 12000,
    rating: 'Permanent 1000yr Durability',
    description: 'Direct atmospheric capture with permanent geothermal subsurface basalt mineralization.'
  },
  {
    id: 'proj-4',
    name: 'Nordic Agroforestry Pyrolysis Biochar Sequestration',
    standard: 'Carbonfuture Verified',
    category: 'Biochar CDR',
    location: 'Småland, Sweden',
    pricePerTonne: 34.00,
    availableTonnes: 28000,
    rating: 'A+ High Permanence',
    description: 'Converting forestry thinning residue into stable porous carbon, enriching agricultural soil.'
  }
];

export const ORGANIZATIONS = [
  { id: 'org-global', name: 'Planet Sustech — Global Operations', count: '54 Facilities' },
  { id: 'org-eu', name: 'European Logistics & Manufacturing Hub', count: '18 Facilities' },
  { id: 'org-na', name: 'North America Data & Assembly Division', count: '22 Facilities' },
  { id: 'org-apac', name: 'Asia-Pacific Supply Chain Center', count: '14 Facilities' }
];
