"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Leaf,
  TrendingUp,
  Clock,
  ChevronRight,
  Trash2,
  Star,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { AnalysisHistory } from "@/types/soil";

const DEMO_TIPS = [
  { icon: "🌱", title: "Test Soil pH", tip: "Apply lime to raise pH if below 5.5 for most crops." },
  { icon: "🌧️", title: "Rainy Season Prep", tip: "Analyze soil 4–6 weeks before planting season for best results." },
  { icon: "🌿", title: "Crop Rotation", tip: "Alternate legumes with cereals to naturally restore nitrogen." },
  { icon: "📦", title: "Storage Tip", tip: "Hermetic bags can extend grain shelf life by 6–12 months." },
];

export default function DashboardPage() {
  const router = useRouter();
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDemo, setLoadingDemo] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("soilHistory") || "[]");
      setHistory(stored);
    } catch {
      setHistory([]);
    }
    setLoading(false);
  }, []);

  const clearHistory = () => {
    if (confirm("Clear all analysis history?")) {
      localStorage.removeItem("soilHistory");
      setHistory([]);
    }
  };

  const loadDemo = async () => {
    setLoadingDemo(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demo: true, farmName: "Demo Farm", location: "West Africa" }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("soilAnalysis", JSON.stringify(data.data));
        router.push("/results");
      }
    } finally {
      setLoadingDemo(false);
    }
  };

  const avgScore = history.length
    ? Math.round(history.reduce((s, h) => s + h.soilHealthScore, 0) / history.length)
    : null;

  const topCropCounts = history.reduce<Record<string, number>>((acc, h) => {
    acc[h.topCrop] = (acc[h.topCrop] || 0) + 1;
    return acc;
  }, {});
  const mostRecommendedCrop = Object.entries(topCropCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-5 h-5 text-green-300" />
                <span className="text-green-300 text-sm font-medium">My Farm</span>
              </div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-green-200 text-sm">Your soil analysis history and insights</p>
            </div>
            <Link
              href="/analyze"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all flex-shrink-0"
            >
              <Camera className="w-4 h-4" />
              New Scan
            </Link>
          </div>

          {/* Stats row */}
          {history.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{history.length}</div>
                <div className="text-green-200 text-xs">Analyses</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{avgScore ?? "—"}</div>
                <div className="text-green-200 text-xs">Avg Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-xl font-bold truncate">{mostRecommendedCrop ?? "—"}</div>
                <div className="text-green-200 text-xs">Top Crop</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── HISTORY ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-stone-800 text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-stone-400" />
              Analysis History
            </h2>
            {history.length > 0 && (
              <button onClick={clearHistory} className="flex items-center gap-1 text-red-400 hover:text-red-600 text-sm">
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12 text-stone-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              Loading...
            </div>
          ) : history.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-stone-700 mb-2">No analyses yet</h3>
              <p className="text-stone-400 text-sm mb-6 max-w-xs mx-auto">
                Analyze your first soil sample to start building your farm intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/analyze"
                  className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
                >
                  <Camera className="w-4 h-4" />
                  Analyze My Soil
                </Link>
                <button
                  onClick={loadDemo}
                  disabled={loadingDemo}
                  className="flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
                >
                  {loadingDemo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
                  {loadingDemo ? "Loading..." : "See Demo Results"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((h) => {
                const scoreColor = h.soilHealthScore >= 70 ? "text-green-600 bg-green-50" : h.soilHealthScore >= 45 ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50";
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      // Re-load this analysis — for demo just show stored
                      router.push("/results");
                    }}
                    className="w-full bg-white border border-stone-200 hover:border-green-300 rounded-2xl p-4 flex items-center gap-4 text-left transition-all hover:shadow-sm group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${scoreColor}`}>
                      <span className="text-lg font-bold leading-none">{h.soilHealthScore}</span>
                      <span className="text-xs opacity-70">/100</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-800 truncate">
                        {h.farmName || "Unnamed Farm"}
                      </div>
                      <div className="text-sm text-stone-400 flex items-center gap-2 mt-0.5">
                        <span>{h.location || "No location"}</span>
                        {h.topCrop && (
                          <>
                            <span>·</span>
                            <span className="text-green-600 font-medium">{h.topCrop}</span>
                          </>
                        )}
                      </div>
                      <div className="text-xs text-stone-300 mt-0.5">
                        {new Date(h.timestamp).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-green-500 flex-shrink-0 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div>
          <h2 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-stone-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/analyze"
              className="flex flex-col gap-2 bg-green-700 hover:bg-green-600 text-white rounded-2xl p-5 transition-all group"
            >
              <Camera className="w-6 h-6" />
              <div className="font-bold">New Soil Scan</div>
              <div className="text-green-200 text-xs">Take or upload a photo</div>
            </Link>
            <button
              onClick={loadDemo}
              disabled={loadingDemo}
              className="flex flex-col gap-2 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl p-5 transition-all group text-left disabled:opacity-70"
            >
              {loadingDemo ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Star className="w-6 h-6" />
              )}
              <div className="font-bold">Demo Results</div>
              <div className="text-amber-100 text-xs">See full analysis example</div>
            </button>
          </div>
        </div>

        {/* ── FARMING TIPS ── */}
        <div>
          <h2 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-stone-400" />
            Farming Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {DEMO_TIPS.map((tip) => (
              <div key={tip.title} className="bg-white border border-stone-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{tip.icon}</span>
                  <span className="font-semibold text-stone-700 text-sm">{tip.title}</span>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT SOILSYNC ── */}
        <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-3xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">About SoilSync</span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed mb-4">
            SoilSync uses advanced AI vision to analyze soil photos and deliver instant, actionable intelligence for African smallholder farmers. Built for the MIT Africa Hackathon 2025.
          </p>
          <div className="flex items-center gap-2 text-green-300 text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>AI analysis is advisory — always consult local agricultural extension officers for critical decisions.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
