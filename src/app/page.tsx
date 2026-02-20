"use client";

import Link from "next/link";
import {
  Camera,
  Brain,
  TrendingUp,
  Truck,
  ArrowRight,
  CheckCircle,
  BarChart2,
  Leaf,
  Users,
  ShieldCheck,
  Star,
  LayoutDashboard,
} from "lucide-react";

const problems = [
  {
    icon: "🌱",
    title: "Guessing Soil Health",
    desc: "Farmers plant without knowing their soil's pH, nutrients, or type — leading to poor yields and wasted inputs.",
  },
  {
    icon: "💸",
    title: "Wrong Crop Choices",
    desc: "Without soil data, farmers pick the wrong crops for their land, resulting in low harvests and financial loss.",
  },
  {
    icon: "🚛",
    title: "Post-Harvest Losses",
    desc: "Produce spoils due to poor timing of market transport. Up to 40% of African harvests are lost post-harvest.",
  },
  {
    icon: "📉",
    title: "Unstable Income",
    desc: "Selling at the wrong time — during harvest gluts — means prices collapse and farmers earn a fraction of potential.",
  },
];

const features = [
  {
    icon: Camera,
    color: "bg-green-100 text-green-700",
    title: "Instant Soil Analysis",
    desc: "Take one photo with your phone. Our AI analyzes color, texture, and structure to determine pH, nutrient levels, moisture, and soil type in seconds.",
  },
  {
    icon: Brain,
    color: "bg-emerald-100 text-emerald-700",
    title: "Smart Crop Planning",
    desc: "Get ranked crop recommendations matched to your exact soil conditions. Know what to plant, when to plant, and how much yield to expect.",
  },
  {
    icon: BarChart2,
    color: "bg-amber-100 text-amber-700",
    title: "Shelf-Life Prediction",
    desc: "Know exactly how long each crop will last after harvest. Plan storage, processing, and sales timing to minimize losses.",
  },
  {
    icon: Truck,
    color: "bg-blue-100 text-blue-700",
    title: "Transport Coordination",
    desc: "Get market-timing advice and transport recommendations. Sell at peak prices instead of harvest glut lows — earn 30–50% more.",
  },
];

const steps = [
  {
    step: "01",
    title: "Capture Soil Photo",
    desc: "Open SoilSync and take a clear photo of your soil in the field. No lab. No waiting.",
    icon: Camera,
  },
  {
    step: "02",
    title: "AI Analysis in Seconds",
    desc: "Our AI instantly analyzes pH, nutrients (N, P, K), soil type, moisture, and overall health score.",
    icon: Brain,
  },
  {
    step: "03",
    title: "Grow & Profit",
    desc: "Plant the right crops, store produce correctly, time your market sales — and watch your income grow.",
    icon: TrendingUp,
  },
];

const stats = [
  { value: "3 sec", label: "Average Analysis Time", icon: "⚡" },
  { value: "40%", label: "Potential Yield Increase", icon: "📈" },
  { value: "60%", label: "Post-Harvest Loss Reduction", icon: "🌿" },
  { value: "5+", label: "Crops Recommended Per Scan", icon: "🌾" },
];

const testimonials = [
  {
    name: "Amara Diallo",
    location: "Senegal",
    role: "Rice Farmer",
    text: "SoilSync told me my soil was perfect for groundnuts, not just rice. I tried it and made twice the income this season.",
    rating: 5,
  },
  {
    name: "Fatima Osei",
    location: "Ghana",
    role: "Cassava Farmer",
    text: "I never knew I needed to transport cassava within 48 hours. SoilSync warned me in time. No more losses.",
    rating: 5,
  },
  {
    name: "Kofi Mensah",
    location: "Nigeria",
    role: "Mixed Crop Farmer",
    text: "The soil score showed my phosphorus was low. I added fertilizer and my maize yield jumped from 2 to 5 tonnes.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── HERO ── */}
      <section className="hero-gradient soil-texture relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-400 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-700/50 text-green-300 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
                <Leaf className="w-3.5 h-3.5" />
                MIT Africa Hackathon 2025
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Grow Smarter with{" "}
                <span className="text-amber-400">AI Soil Intelligence</span>
              </h1>

              <p className="text-green-100 text-lg md:text-xl leading-relaxed mb-8">
                Snap a photo of your soil. Get instant crop recommendations,
                shelf-life predictions, and transport coordination.{" "}
                <strong className="text-white">
                  No lab. No guessing. Just results.
                </strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/analyze"
                  className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <Camera className="w-5 h-5" />
                  Analyze My Soil — Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all backdrop-blur-sm"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  View Demo
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-green-200">
                {["No account needed", "Works offline", "Any soil type", "35+ African crops"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right: App mockup */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Phone frame */}
                <div className="w-64 h-[520px] bg-stone-900 rounded-[3rem] border-4 border-stone-700 shadow-2xl overflow-hidden float-animation">
                  <div className="h-full bg-gradient-to-b from-green-950 to-stone-900 p-4 flex flex-col">
                    <div className="flex justify-between text-xs text-green-400 mb-3">
                      <span>9:41</span>
                      <span>SoilSync</span>
                      <span>●●●</span>
                    </div>
                    <div className="flex-1 bg-stone-800 rounded-2xl overflow-hidden relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-stone-900/40" />
                      {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map((cls, i) => (
                        <div key={i} className={`absolute w-5 h-5 border-amber-400 ${cls}`} />
                      ))}
                      <div className="scanner-line absolute left-0 right-0 h-0.5 bg-amber-400/60 shadow-lg shadow-amber-400" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl">🌍</div>
                      </div>
                    </div>
                    <div className="bg-stone-800/80 rounded-xl p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 text-xs font-semibold">SOIL HEALTH</span>
                        <span className="text-white text-sm font-bold">72/100</span>
                      </div>
                      <div className="w-full bg-stone-700 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "72%" }} />
                      </div>
                      <div className="grid grid-cols-3 gap-1 pt-1">
                        {["🌽 Maize", "🥜 Groundnut", "🌾 Sorghum"].map((crop) => (
                          <div key={crop} className="bg-green-900/50 rounded-lg p-1.5 text-center text-xs text-green-300">
                            {crop}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-12 top-16 bg-white rounded-2xl shadow-xl p-3 text-sm font-semibold text-green-700 border border-green-100">
                  🌱 pH 6.2 — Ideal
                </div>
                <div className="absolute -right-14 top-1/3 bg-white rounded-2xl shadow-xl p-3 text-sm font-semibold text-amber-700 border border-amber-100">
                  ⚡ 3s Analysis
                </div>
                <div className="absolute -left-10 bottom-1/4 bg-white rounded-2xl shadow-xl p-3 text-sm font-semibold text-blue-700 border border-blue-100">
                  🚛 Market Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-700">{stat.value}</div>
                <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            The Problem Farmers Face Every Season
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            African smallholder farmers lose up to{" "}
            <strong className="text-red-600">40% of their income</strong> due to
            poor soil information and logistics gaps.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="bg-red-50 border border-red-100 rounded-2xl p-6 card-hover">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-bold text-stone-800 mb-2">{p.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-green-800 py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How SoilSync Works</h2>
            <p className="text-green-200 text-lg max-w-xl mx-auto">
              From photo to actionable plan in under 10 seconds
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-2/3 right-0 h-0.5 bg-green-600 z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-2xl mb-4 shadow-lg">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-green-400 text-sm font-bold tracking-widest mb-2">STEP {step.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-green-200 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Everything a Farmer Needs</h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Four powerful tools in one simple app — built for the realities of African smallholder farming.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white rounded-2xl border border-stone-200 p-8 card-hover shadow-sm">
                <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-green-50 border-y border-green-100 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Farmers Already Using SoilSync</h2>
            <p className="text-stone-500">Real results from real farms across Africa</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm card-hover">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-800">{t.name}</div>
                    <div className="text-sm text-stone-400">{t.role} · {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              The Opportunity for African Agriculture
            </h2>
            <div className="space-y-4">
              {[
                { icon: Users, text: "600M+ smallholder farmers globally, 60% in Sub-Saharan Africa" },
                { icon: TrendingUp, text: "AI soil analysis can increase yields by 20–50% with same inputs" },
                { icon: ShieldCheck, text: "Better market timing adds 30–50% to farmer income instantly" },
                { icon: Leaf, text: "Precision farming reduces fertilizer waste and environmental impact" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <p className="text-stone-600 mt-1">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Ready to grow smarter?</h3>
            <p className="text-green-200 mb-6 text-sm leading-relaxed">
              Join thousands of farmers already using AI to make better decisions. No equipment needed — just your smartphone.
            </p>
            <Link
              href="/analyze"
              className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-4 rounded-xl text-lg transition-all mb-4"
            >
              <Camera className="w-5 h-5" />
              Analyze My Soil Now
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              See Demo Results
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-green-950 text-green-300 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Soil<span className="text-amber-400">Sync</span>
              </span>
            </div>
            <p className="text-green-400 text-sm text-center">
              Built for MIT Africa Hackathon 2025 · AI-powered soil intelligence for African farmers
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/analyze" className="hover:text-white transition-colors">Analyze</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
