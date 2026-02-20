import { SoilAnalysis } from "@/types/soil";

export function getDemoAnalysis(overrides?: Partial<SoilAnalysis>): SoilAnalysis {
  const base: SoilAnalysis = {
    id: "demo-" + Date.now(),
    timestamp: new Date().toISOString(),
    farmName: overrides?.farmName || "Demo Farm",
    location: overrides?.location || "West Africa Region",

    soilHealth: {
      score: 72,
      status: "Good",
      description:
        "Your soil shows strong potential. The dark coloration indicates reasonable organic matter content. Some improvements in phosphorus levels will significantly boost crop yields.",
    },

    soilType: "Sandy Loam",
    soilTypeDescription:
      "Sandy loam soils are excellent for most African crops. They drain well while retaining enough moisture for plant growth, and are easy to work with simple farming tools.",

    pH: {
      estimate: 6.2,
      range: "5.8 – 6.6",
      description: "Slightly acidic to neutral. Ideal for most crops.",
      category: "Slightly Acidic",
    },

    moisture: {
      level: "Moist",
      description: "Soil moisture is at an optimal level for planting.",
      recommendation:
        "Current moisture is good. Monitor during dry season and irrigate when topsoil dries 3–5 cm deep.",
    },

    nutrients: {
      nitrogen: { level: "Medium", score: 58 },
      phosphorus: { level: "Low", score: 32 },
      potassium: { level: "High", score: 78 },
      organicMatter: { percentage: 3.2, level: "Medium" },
      calcium: { level: "Medium", score: 62 },
      magnesium: { level: "Medium", score: 55 },
    },

    topCrops: [
      {
        name: "Maize",
        localName: "Corn",
        emoji: "🌽",
        suitabilityScore: 88,
        reason:
          "Sandy loam with medium nitrogen is ideal for maize. The soil structure supports deep root development and good drainage.",
        plantingMonths: ["March", "April", "September"],
        harvestMonths: ["July", "August", "December"],
        expectedYield: "4–6 tonnes/hectare",
        shelfLife: {
          days: 180,
          description: "6 months when dried to 13% moisture",
          storageMethod: "Dry, ventilated silo or hermetic bags",
        },
        marketPrice: {
          estimate: "$180–220/tonne",
          demand: "High",
          bestMarket: "Regional grain markets, animal feed processors",
        },
        transportRecommendation:
          "Transport within 2 weeks of harvest. Dry thoroughly first. Use covered trucks to prevent moisture damage.",
        waterRequirement: "Medium",
        growthDuration: "90–120 days",
      },
      {
        name: "Cassava",
        localName: "Manioc / Yuca",
        emoji: "🥔",
        suitabilityScore: 85,
        reason:
          "Cassava thrives in sandy loam and tolerates lower phosphorus. Excellent drought resistance makes it reliable.",
        plantingMonths: ["March", "April", "October"],
        harvestMonths: ["September", "October", "April"],
        expectedYield: "20–35 tonnes/hectare",
        shelfLife: {
          days: 3,
          description: "2–3 days fresh; months when processed",
          storageMethod: "Process quickly into gari, flour, or chips. Wax coating extends shelf life.",
        },
        marketPrice: {
          estimate: "$40–80/tonne fresh, $300–500/tonne processed",
          demand: "High",
          bestMarket: "Local markets, processing factories, starch industries",
        },
        transportRecommendation:
          "URGENT: Must reach market within 48–72 hours of harvest. Arrange transport before harvesting.",
        waterRequirement: "Low",
        growthDuration: "9–12 months",
      },
      {
        name: "Groundnut",
        localName: "Peanut",
        emoji: "🥜",
        suitabilityScore: 81,
        reason:
          "Groundnuts fix nitrogen in soil, improving future crops. They perform excellently in sandy loam and help address the low phosphorus issue.",
        plantingMonths: ["April", "May"],
        harvestMonths: ["August", "September"],
        expectedYield: "1.5–2.5 tonnes/hectare",
        shelfLife: {
          days: 365,
          description: "12+ months when properly dried and stored",
          storageMethod: "Dry pods to 9% moisture. Store in cool, dry conditions away from pests.",
        },
        marketPrice: {
          estimate: "$600–900/tonne",
          demand: "High",
          bestMarket: "Export markets, oil processors, snack manufacturers",
        },
        transportRecommendation:
          "Transport within 1 month of harvest. Bagged in breathable jute sacks. Premium value when exported.",
        waterRequirement: "Low",
        growthDuration: "90–110 days",
      },
      {
        name: "Sweet Potato",
        localName: "Sweetpotato",
        emoji: "🍠",
        suitabilityScore: 76,
        reason:
          "Well-drained sandy loam is perfect for tuber development. Nutritious, high-value, with strong food security benefits.",
        plantingMonths: ["March", "August"],
        harvestMonths: ["June", "November"],
        expectedYield: "15–25 tonnes/hectare",
        shelfLife: {
          days: 30,
          description: "3–4 weeks in cool storage; 6+ months when processed",
          storageMethod: "Store in cool, dark, well-ventilated space. Do not refrigerate.",
        },
        marketPrice: {
          estimate: "$120–180/tonne",
          demand: "Medium",
          bestMarket: "Urban markets, schools/hospitals, food processors",
        },
        transportRecommendation:
          "Plan transport within 2 weeks. Stack carefully to avoid bruising. High demand in urban areas.",
        waterRequirement: "Medium",
        growthDuration: "90–120 days",
      },
      {
        name: "Sorghum",
        localName: "Guinea Corn",
        emoji: "🌾",
        suitabilityScore: 71,
        reason:
          "Drought-tolerant and well-suited to slightly acidic sandy loam. Excellent food security crop with multiple uses.",
        plantingMonths: ["May", "June"],
        harvestMonths: ["October", "November"],
        expectedYield: "2–4 tonnes/hectare",
        shelfLife: {
          days: 365,
          description: "12+ months when threshed and dried",
          storageMethod: "Hermetic storage bags or concrete silos. Treat with diatomaceous earth.",
        },
        marketPrice: {
          estimate: "$140–180/tonne",
          demand: "Medium",
          bestMarket: "Breweries, animal feed, flour mills, food aid programs",
        },
        transportRecommendation:
          "Very stable. Transport when prices are favorable. No urgency — store and sell at peak price.",
        waterRequirement: "Low",
        growthDuration: "120–150 days",
      },
    ],

    transport: {
      urgency: "Low",
      recommendedTimeframe:
        "Plan transportation 2–3 weeks before harvest. Crops like maize and groundnuts have excellent shelf life when properly stored.",
      storageAdvice:
        "Invest in hermetic bags for grain storage. This can increase prices by 20–40% by allowing you to sell outside peak harvest when prices are low.",
      nearestMarketType: "Regional",
      estimatedRevenue: "$800–1,200/hectare depending on crop mix",
      packagingAdvice:
        "Use clean, food-grade bags. Label with weight and harvest date. Consistent packaging commands premium prices.",
      transportMethods: [
        "Motorcycle (small loads, local market)",
        "Pickup truck (medium loads, regional market)",
        "Covered truck (large loads, urban/export market)",
      ],
      bestSellTime:
        "Sell grains 3–4 months after harvest when prices rise 30–50% above harvest-time lows.",
    },

    improvements: [
      "Add 2–3 bags of DAP (Di-ammonium Phosphate) fertilizer per hectare to address low phosphorus",
      "Apply compost or cattle manure (5 tonnes/hectare) to boost organic matter",
      "Intercrop with legumes (beans, groundnuts) to naturally fix nitrogen",
      "Practice crop rotation: cereals this season, legumes next season",
      "Add organic mulch to retain moisture and improve soil structure",
    ],

    warnings: [
      "Low phosphorus levels will limit root development — address before planting",
      "Monitor for moisture stress during dry season, especially for maize",
    ],

    opportunities: [
      "High potassium makes this soil excellent for banana/plantain as a border crop",
      "Slightly acidic pH is perfect for groundnuts — consider for export market",
      "Good drainage reduces disease risk — a competitive advantage for premium markets",
    ],

    summary:
      "Your soil is in good health with excellent potential. The sandy loam texture, neutral-to-slightly-acidic pH, and high potassium create ideal conditions for a productive farm. Addressing the low phosphorus through targeted fertilization and legume intercropping will unlock significantly higher yields. Maize and groundnuts are your highest-value crops this season.",

    confidence: "High",
  };

  return { ...base, ...overrides };
}

export const AFRICAN_CROPS_DATA = {
  Maize: { emoji: "🌽", shelfDays: 180 },
  Cassava: { emoji: "🥔", shelfDays: 3 },
  Groundnut: { emoji: "🥜", shelfDays: 365 },
  "Sweet Potato": { emoji: "🍠", shelfDays: 30 },
  Sorghum: { emoji: "🌾", shelfDays: 365 },
  Rice: { emoji: "🍚", shelfDays: 365 },
  Millet: { emoji: "🌾", shelfDays: 365 },
  Yam: { emoji: "🥔", shelfDays: 60 },
  Cowpea: { emoji: "🫘", shelfDays: 365 },
  Tomato: { emoji: "🍅", shelfDays: 7 },
};
