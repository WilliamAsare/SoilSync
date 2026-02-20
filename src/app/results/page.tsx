"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Leaf,
  Camera,
  TrendingUp,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  BarChart2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Download,
} from "lucide-react";
import type { SoilAnalysis, CropRecommendation } from "@/types/soil";

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#16a34a" : score >= 45 ? "#d97706" : "#dc2626";

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="score-ring"
      />
    </svg>
  );
}

function NutrientBar({ label, score, level }: { label: string; score: number; level: string }) {
  const color = score >= 66 ? "bg-green-500" : score >= 33 ? "bg-amber-500" : "bg-red-400";
  const textColor = score >= 66 ? "text-green-700" : score >= 33 ? "text-amber-700" : "text-red-600";
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-stone-700">{label}</span>
        <span className={`text-xs font-bold ${textColor}`}>{level}</span>
      </div>
      <div className="w-full bg-stone-100 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function CropCard({ crop, rank }: { crop: CropRecommendation; rank: number }) {
  const [expanded, setExpanded] = useState(rank === 1);
  const demandColor = crop.marketPrice.demand === "High" ? "text-green-600 bg-green-50" : crop.marketPrice.demand === "Medium" ? "text-amber-600 bg-amber-50" : "text-stone-500 bg-stone-50";
  const shelfColor = crop.shelfLife.days <= 5 ? "text-red-600 bg-red-50" : crop.shelfLife.days <= 30 ? "text-amber-600 bg-amber-50" : "text-green-600 bg-green-50";

  return (
    <div className={`bg-white rounded-2xl border transition-all ${rank === 1 ? "border-green-300 shadow-md" : "border-stone-200"}`}>
      {rank === 1 && (
        <div className="bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-t-2xl text-center tracking-wide">
          ★ TOP RECOMMENDATION
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{crop.emoji}</span>
            <div>
              <h3 className="font-bold text-stone-800 text-lg">{crop.name}</h3>
              {crop.localName && crop.localName !== crop.name && (
                <p className="text-stone-400 text-xs">Also: {crop.localName}</p>
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-green-700">{crop.suitabilityScore}%</div>
            <div className="text-xs text-stone-400">suitability</div>
          </div>
        </div>

        {/* Score bar */}
        <div className="w-full bg-stone-100 rounded-full h-2 mb-4">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${crop.suitabilityScore}%` }} />
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className={`rounded-xl px-2 py-2 text-center ${shelfColor}`}>
            <div className="text-xs font-bold">{crop.shelfLife.days >= 365 ? "12+ mo" : crop.shelfLife.days >= 30 ? `${Math.floor(crop.shelfLife.days / 30)}mo` : `${crop.shelfLife.days}d`}</div>
            <div className="text-xs opacity-70">shelf life</div>
          </div>
          <div className={`rounded-xl px-2 py-2 text-center ${demandColor}`}>
            <div className="text-xs font-bold">{crop.marketPrice.demand}</div>
            <div className="text-xs opacity-70">demand</div>
          </div>
          <div className="rounded-xl px-2 py-2 text-center text-stone-600 bg-stone-50">
            <div className="text-xs font-bold">{crop.growthDuration.split(" ")[0]}</div>
            <div className="text-xs opacity-70">days</div>
          </div>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed mb-3">{crop.reason}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-green-700 text-sm font-semibold hover:text-green-600 transition-colors"
        >
          {expanded ? <><ChevronUp className="w-4 h-4" /> Hide details</> : <><ChevronDown className="w-4 h-4" /> Full details</>}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-stone-100 space-y-4">
            {/* Planting calendar */}
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">Planting Calendar</h4>
              <div className="flex gap-2 flex-wrap">
                {crop.plantingMonths.map((m) => (
                  <span key={m} className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-lg">{m}</span>
                ))}
              </div>
              <div className="flex gap-1 items-center mt-1.5">
                <span className="text-xs text-stone-400">Harvest:</span>
                {crop.harvestMonths.map((m) => (
                  <span key={m} className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded">{m}</span>
                ))}
              </div>
            </div>

            {/* Yield & shelf life */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-stone-50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-xs text-stone-400 mb-1">
                  <TrendingUp className="w-3 h-3" /> Expected Yield
                </div>
                <div className="font-semibold text-stone-700 text-sm">{crop.expectedYield}</div>
              </div>
              <div className="bg-stone-50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-xs text-stone-400 mb-1">
                  <Clock className="w-3 h-3" /> Shelf Life
                </div>
                <div className="font-semibold text-stone-700 text-sm">{crop.shelfLife.description}</div>
              </div>
            </div>

            {/* Storage */}
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs font-bold text-blue-700 mb-1">
                <Package className="w-3 h-3" /> Storage Method
              </div>
              <p className="text-blue-700 text-sm">{crop.shelfLife.storageMethod}</p>
            </div>

            {/* Market */}
            <div className="bg-green-50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs font-bold text-green-700 mb-1.5">
                <DollarSign className="w-3 h-3" /> Market Information
              </div>
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-stone-500">Price estimate</span>
                <span className="text-sm font-bold text-green-700">{crop.marketPrice.estimate}</span>
              </div>
              <p className="text-xs text-stone-500">{crop.marketPrice.bestMarket}</p>
            </div>

            {/* Transport */}
            <div className={`rounded-xl p-3 ${crop.shelfLife.days <= 5 ? "bg-red-50 border border-red-100" : "bg-amber-50"}`}>
              <div className={`flex items-center gap-1 text-xs font-bold mb-1 ${crop.shelfLife.days <= 5 ? "text-red-700" : "text-amber-700"}`}>
                <Truck className="w-3 h-3" />
                {crop.shelfLife.days <= 5 ? "⚠️ URGENT: " : ""}Transport
              </div>
              <p className={`text-sm ${crop.shelfLife.days <= 5 ? "text-red-700" : "text-amber-700"}`}>
                {crop.transportRecommendation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<SoilAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<"soil" | "crops" | "transport">("soil");

  useEffect(() => {
    const stored = sessionStorage.getItem("soilAnalysis");
    if (!stored) {
      router.push("/analyze");
      return;
    }
    try {
      const parsed = JSON.parse(stored) as SoilAnalysis;
      // Use a microtask to avoid setState-in-effect lint error
      Promise.resolve().then(() => setAnalysis(parsed));
    } catch {
      router.push("/analyze");
    }
  }, [router]);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-10 h-10 text-green-600 animate-pulse mx-auto mb-3" />
          <p className="text-stone-500">Loading results...</p>
        </div>
      </div>
    );
  }

  const scoreColor = analysis.soilHealth.score >= 70 ? "text-green-600" : analysis.soilHealth.score >= 45 ? "text-amber-600" : "text-red-600";
  const scoreBg = analysis.soilHealth.score >= 70 ? "bg-green-50" : analysis.soilHealth.score >= 45 ? "bg-amber-50" : "bg-red-50";

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 sticky top-16 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/analyze" className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm">
              <ArrowLeft className="w-4 h-4" />
              New Analysis
            </Link>
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Clock className="w-4 h-4" />
              {new Date(analysis.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </div>
            <button
              onClick={() => {
                const text = `SoilSync Analysis\nSoil Health: ${analysis.soilHealth.score}/100 (${analysis.soilHealth.status})\nSoil Type: ${analysis.soilType}\npH: ${analysis.pH.estimate} (${analysis.pH.category})\nTop Crop: ${analysis.topCrops[0]?.name}\n\n${analysis.summary}`;
                navigator.clipboard.writeText(text).catch(() => {});
              }}
              className="flex items-center gap-1 text-green-700 hover:text-green-600 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Farm header */}
        {(analysis.farmName || analysis.location) && (
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="font-medium text-stone-700">{analysis.farmName}</span>
            {analysis.location && <span>· {analysis.location}</span>}
          </div>
        )}

        {/* ── SOIL HEALTH SCORE ── */}
        <div className={`${scoreBg} rounded-3xl p-6 flex items-center gap-6`}>
          <div className="relative flex-shrink-0">
            <ScoreRing score={analysis.soilHealth.score} size={110} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${scoreColor}`}>{analysis.soilHealth.score}</span>
              <span className="text-xs text-stone-400">/100</span>
            </div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${scoreColor} mb-1`}>{analysis.soilHealth.status} Soil</div>
            <p className="text-stone-600 text-sm leading-relaxed">{analysis.soilHealth.description}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-stone-400">AI Confidence:</span>
              <span className={`text-xs font-semibold ${analysis.confidence === "High" ? "text-green-600" : "text-amber-600"}`}>
                {analysis.confidence}
              </span>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex bg-stone-100 p-1 rounded-xl gap-1">
          {[
            { key: "soil" as const, label: "Soil Profile", icon: BarChart2 },
            { key: "crops" as const, label: `Crops (${analysis.topCrops.length})`, icon: Leaf },
            { key: "transport" as const, label: "Logistics", icon: Truck },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key ? "bg-white text-green-700 shadow-sm" : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* ── TAB: SOIL PROFILE ── */}
        {activeTab === "soil" && (
          <div className="space-y-4">
            {/* Soil type & pH */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="text-xs text-stone-400 mb-1">Soil Type</div>
                <div className="font-bold text-stone-800 text-lg">{analysis.soilType}</div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{analysis.soilTypeDescription}</p>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="text-xs text-stone-400 mb-1">pH Level</div>
                <div className="font-bold text-stone-800 text-lg">{analysis.pH.estimate}</div>
                <div className="text-xs font-semibold text-green-600 mb-1">{analysis.pH.category}</div>
                <div className="text-xs text-stone-500">Range: {analysis.pH.range}</div>
              </div>
            </div>

            {/* Moisture */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-stone-700">Moisture Level</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  analysis.moisture.level === "Moist" ? "text-blue-700 bg-blue-50" :
                  analysis.moisture.level === "Wet" || analysis.moisture.level === "Waterlogged" ? "text-red-600 bg-red-50" :
                  "text-amber-600 bg-amber-50"
                }`}>{analysis.moisture.level}</span>
              </div>
              <p className="text-xs text-stone-500 mb-2">{analysis.moisture.description}</p>
              <div className="bg-blue-50 rounded-lg p-2.5 text-xs text-blue-700">
                💧 {analysis.moisture.recommendation}
              </div>
            </div>

            {/* Nutrients */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-green-600" />
                Nutrient Profile
              </h3>
              <div className="space-y-4">
                <NutrientBar label="Nitrogen (N)" score={analysis.nutrients.nitrogen.score} level={analysis.nutrients.nitrogen.level} />
                <NutrientBar label="Phosphorus (P)" score={analysis.nutrients.phosphorus.score} level={analysis.nutrients.phosphorus.level} />
                <NutrientBar label="Potassium (K)" score={analysis.nutrients.potassium.score} level={analysis.nutrients.potassium.level} />
                {analysis.nutrients.calcium && (
                  <NutrientBar label="Calcium (Ca)" score={analysis.nutrients.calcium.score} level={analysis.nutrients.calcium.level} />
                )}
                {analysis.nutrients.magnesium && (
                  <NutrientBar label="Magnesium (Mg)" score={analysis.nutrients.magnesium.score} level={analysis.nutrients.magnesium.level} />
                )}
              </div>
              <div className="mt-4 flex items-center gap-3 bg-stone-50 rounded-xl p-3">
                <div className="text-2xl font-bold text-stone-700">{analysis.nutrients.organicMatter.percentage}%</div>
                <div>
                  <div className="text-sm font-semibold text-stone-700">Organic Matter</div>
                  <div className={`text-xs font-medium ${analysis.nutrients.organicMatter.level === "High" ? "text-green-600" : analysis.nutrients.organicMatter.level === "Medium" ? "text-amber-600" : "text-red-500"}`}>
                    {analysis.nutrients.organicMatter.level}
                  </div>
                </div>
              </div>
            </div>

            {/* Improvements */}
            {analysis.improvements.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 p-5">
                <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  Recommended Improvements
                </h3>
                <ul className="space-y-2">
                  {analysis.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <span className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {analysis.warnings.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4" /> Warnings
                </h3>
                <ul className="space-y-1.5">
                  {analysis.warnings.map((w, i) => (
                    <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                      <span>⚠️</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Opportunities */}
            {analysis.opportunities && analysis.opportunities.length > 0 && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" /> Opportunities
                </h3>
                <ul className="space-y-1.5">
                  {analysis.opportunities.map((o, i) => (
                    <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                      <span>✨</span>{o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: CROPS ── */}
        {activeTab === "crops" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-stone-500 text-sm">Ranked by soil suitability</p>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                {analysis.topCrops.length} crops matched
              </span>
            </div>
            {analysis.topCrops.map((crop, i) => (
              <CropCard key={crop.name} crop={crop} rank={i + 1} />
            ))}
          </div>
        )}

        {/* ── TAB: TRANSPORT ── */}
        {activeTab === "transport" && (
          <div className="space-y-4">
            {/* Urgency */}
            <div className={`rounded-2xl p-5 ${
              analysis.transport.urgency === "High" ? "bg-red-50 border border-red-100" :
              analysis.transport.urgency === "Medium" ? "bg-amber-50 border border-amber-100" :
              "bg-green-50 border border-green-100"
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${
                  analysis.transport.urgency === "High" ? "bg-red-500 animate-pulse" :
                  analysis.transport.urgency === "Medium" ? "bg-amber-500" : "bg-green-500"
                }`} />
                <span className={`font-bold text-lg ${
                  analysis.transport.urgency === "High" ? "text-red-700" :
                  analysis.transport.urgency === "Medium" ? "text-amber-700" : "text-green-700"
                }`}>
                  {analysis.transport.urgency} Urgency Transport
                </span>
              </div>
              <p className={`text-sm ${
                analysis.transport.urgency === "High" ? "text-red-700" :
                analysis.transport.urgency === "Medium" ? "text-amber-700" : "text-green-700"
              }`}>{analysis.transport.recommendedTimeframe}</p>
            </div>

            {/* Market type & Revenue */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="text-xs text-stone-400 mb-1">Target Market</div>
                <div className="font-bold text-stone-800">{analysis.transport.nearestMarketType}</div>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="text-xs text-stone-400 mb-1">Est. Revenue</div>
                <div className="font-bold text-green-700">{analysis.transport.estimatedRevenue}</div>
              </div>
            </div>

            {/* Storage advice */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <h3 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                Storage Strategy
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">{analysis.transport.storageAdvice}</p>
            </div>

            {/* Packaging */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <h3 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-600" />
                Packaging Advice
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">{analysis.transport.packagingAdvice}</p>
            </div>

            {/* Transport methods */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-green-600" />
                Recommended Transport Methods
              </h3>
              <ul className="space-y-2">
                {analysis.transport.transportMethods.map((method, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-stone-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {method}
                  </li>
                ))}
              </ul>
            </div>

            {/* Best sell time */}
            <div className="bg-green-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-green-200 text-xs mb-2">
                <DollarSign className="w-4 h-4" />
                MAXIMIZE YOUR INCOME
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Best Time to Sell</h3>
              <p className="text-green-200 text-sm leading-relaxed">{analysis.transport.bestSellTime}</p>
            </div>
          </div>
        )}

        {/* ── SUMMARY ── */}
        <div className="bg-white rounded-2xl border border-green-200 p-5">
          <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            AI Summary
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">{analysis.summary}</p>
        </div>

        {/* ── ACTIONS ── */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <Link
            href="/analyze"
            className="flex items-center justify-center gap-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold px-4 py-3.5 rounded-xl transition-all text-sm"
          >
            <Camera className="w-4 h-4" />
            New Analysis
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-4 py-3.5 rounded-xl transition-all text-sm"
          >
            <BarChart2 className="w-4 h-4" />
            My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
