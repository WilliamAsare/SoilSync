import Anthropic from "@anthropic-ai/sdk";
import { SoilAnalysis } from "@/types/soil";

const SOIL_ANALYSIS_PROMPT = `You are an expert agricultural soil scientist and crop advisor specializing in African farming systems. Analyze the provided soil image carefully.

Examine these visual indicators:
- Soil COLOR: Dark/black = high organic matter; Reddish/orange = iron-rich laterite; Pale/white = low organic matter or salinity; Grey = poor drainage
- Soil TEXTURE: Coarse/grainy = sandy; Fine/smooth = clay; Mixed = loam; Crumbly = good structure
- MOISTURE: Surface sheen = wet; Moist clumps = optimal; Dusty/cracked = dry
- STRUCTURE: Crumb structure = excellent; Blocky = clay; Single-grain = sandy; Compacted/hard = poor
- ORGANIC MATTER: Dark color, visible plant material, earthworm holes = good organic content

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:

{
  "soilHealth": {
    "score": <number 0-100>,
    "status": "<Poor|Fair|Good|Excellent>",
    "description": "<2-3 sentence assessment>"
  },
  "soilType": "<Sandy|Sandy Loam|Loam|Clay Loam|Clay|Silt|Laterite|Peat>",
  "soilTypeDescription": "<1-2 sentences about this soil type for farmers>",
  "pH": {
    "estimate": <number like 6.2>,
    "range": "<e.g. 5.8 – 6.6>",
    "description": "<brief description>",
    "category": "<Very Acidic|Acidic|Slightly Acidic|Neutral|Slightly Alkaline|Alkaline|Very Alkaline>"
  },
  "moisture": {
    "level": "<Dry|Moist|Wet|Waterlogged>",
    "description": "<observation>",
    "recommendation": "<practical advice>"
  },
  "nutrients": {
    "nitrogen": {"level": "<Low|Medium|High>", "score": <0-100>},
    "phosphorus": {"level": "<Low|Medium|High>", "score": <0-100>},
    "potassium": {"level": "<Low|Medium|High>", "score": <0-100>},
    "organicMatter": {"percentage": <number>, "level": "<Low|Medium|High>"},
    "calcium": {"level": "<Low|Medium|High>", "score": <0-100>},
    "magnesium": {"level": "<Low|Medium|High>", "score": <0-100>}
  },
  "topCrops": [
    {
      "name": "<crop name>",
      "localName": "<local/alternative name>",
      "emoji": "<single emoji>",
      "suitabilityScore": <0-100>,
      "reason": "<why this crop suits the soil>",
      "plantingMonths": ["<month>"],
      "harvestMonths": ["<month>"],
      "expectedYield": "<range like 3-5 tonnes/hectare>",
      "shelfLife": {
        "days": <number>,
        "description": "<how long and conditions>",
        "storageMethod": "<practical storage advice>"
      },
      "marketPrice": {
        "estimate": "<price range>",
        "demand": "<Low|Medium|High>",
        "bestMarket": "<where to sell>"
      },
      "transportRecommendation": "<when and how to transport>",
      "waterRequirement": "<Low|Medium|High>",
      "growthDuration": "<time range>"
    }
  ],
  "transport": {
    "urgency": "<Low|Medium|High>",
    "recommendedTimeframe": "<practical timing advice>",
    "storageAdvice": "<how to store produce>",
    "nearestMarketType": "<Local|Regional|Export>",
    "estimatedRevenue": "<revenue estimate per hectare>",
    "packagingAdvice": "<how to package for transport>",
    "transportMethods": ["<method 1>", "<method 2>"],
    "bestSellTime": "<when to sell for best price>"
  },
  "improvements": ["<actionable improvement 1>", "<actionable improvement 2>", "<actionable improvement 3>"],
  "warnings": ["<warning if any>"],
  "opportunities": ["<market/crop opportunity>"],
  "summary": "<2-3 sentence overall assessment and key recommendation>",
  "confidence": "<Low|Medium|High>"
}

Include exactly 5 crop recommendations sorted by suitability score (highest first). Focus on crops commonly grown in Sub-Saharan Africa. Be practical and specific.`;

export async function analyzeSoilImage(
  imageBase64: string,
  farmName?: string,
  location?: string
): Promise<SoilAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not configured");
  }

  const client = new Anthropic({ apiKey });

  // Strip data URL prefix if present
  const base64Data = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;

  // Determine media type
  const mediaType = imageBase64.startsWith("data:image/png")
    ? "image/png"
    : imageBase64.startsWith("data:image/webp")
    ? "image/webp"
    : "image/jpeg";

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64Data,
            },
          },
          {
            type: "text",
            text:
              SOIL_ANALYSIS_PROMPT +
              (farmName ? `\n\nFarm name: ${farmName}` : "") +
              (location ? `\nLocation: ${location}` : ""),
          },
        ],
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Parse JSON — handle potential markdown wrapping
  const jsonMatch =
    responseText.match(/```json\s*([\s\S]*?)```/) ||
    responseText.match(/```\s*([\s\S]*?)```/) ||
    responseText.match(/(\{[\s\S]*\})/);

  if (!jsonMatch) {
    throw new Error("Failed to parse AI response as JSON");
  }

  const analysisData = JSON.parse(jsonMatch[1] || jsonMatch[0]);

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    farmName: farmName || undefined,
    location: location || undefined,
    ...analysisData,
  };
}
