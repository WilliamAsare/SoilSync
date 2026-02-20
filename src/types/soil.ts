export interface SoilNutrient {
  level: "Low" | "Medium" | "High";
  score: number; // 0-100
  unit?: string;
}

export interface SoilNutrients {
  nitrogen: SoilNutrient;
  phosphorus: SoilNutrient;
  potassium: SoilNutrient;
  organicMatter: {
    percentage: number;
    level: "Low" | "Medium" | "High";
  };
  calcium?: SoilNutrient;
  magnesium?: SoilNutrient;
}

export interface CropRecommendation {
  name: string;
  localName?: string;
  emoji: string;
  suitabilityScore: number; // 0-100
  reason: string;
  plantingMonths: string[];
  harvestMonths: string[];
  expectedYield: string;
  shelfLife: {
    days: number;
    description: string;
    storageMethod: string;
  };
  marketPrice: {
    estimate: string;
    demand: "Low" | "Medium" | "High";
    bestMarket: string;
  };
  transportRecommendation: string;
  waterRequirement: "Low" | "Medium" | "High";
  growthDuration: string;
}

export interface TransportRecommendation {
  urgency: "Low" | "Medium" | "High";
  recommendedTimeframe: string;
  storageAdvice: string;
  nearestMarketType: "Local" | "Regional" | "Export";
  estimatedRevenue: string;
  packagingAdvice: string;
  transportMethods: string[];
  bestSellTime: string;
}

export interface SoilAnalysis {
  id: string;
  timestamp: string;
  imageData?: string;
  farmName?: string;
  location?: string;

  soilHealth: {
    score: number;
    status: "Poor" | "Fair" | "Good" | "Excellent";
    description: string;
  };

  soilType: string;
  soilTypeDescription: string;

  pH: {
    estimate: number;
    range: string;
    description: string;
    category: "Very Acidic" | "Acidic" | "Slightly Acidic" | "Neutral" | "Slightly Alkaline" | "Alkaline" | "Very Alkaline";
  };

  moisture: {
    level: "Dry" | "Moist" | "Wet" | "Waterlogged";
    description: string;
    recommendation: string;
  };

  nutrients: SoilNutrients;

  topCrops: CropRecommendation[];

  transport: TransportRecommendation;

  improvements: string[];
  warnings: string[];
  opportunities: string[];
  summary: string;

  confidence: "Low" | "Medium" | "High";
}

export interface AnalysisHistory {
  id: string;
  timestamp: string;
  farmName?: string;
  location?: string;
  soilHealthScore: number;
  topCrop: string;
  imageData?: string;
}
