"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Upload,
  X,
  Leaf,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";

type Mode = "choose" | "camera" | "upload";

const TIPS = [
  "Take photo in daylight for best results",
  "Capture at least 30cm × 30cm of soil",
  "Remove large rocks and debris",
  "Include a mix of surface and subsurface soil if possible",
  "Keep phone steady — avoid blurry photos",
];

export default function AnalyzePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [mode, setMode] = useState<Mode>("choose");
  const [imageData, setImageData] = useState<string | null>(null);
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  // Start camera
  const startCamera = useCallback(async () => {
    setError(null);
    setMode("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setCameraReady(true);
      }
    } catch {
      setError("Camera not available. Please use the upload option or allow camera access.");
      setMode("choose");
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
  }, []);

  // Capture photo from camera
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setImageData(dataUrl);
    stopCamera();
    setMode("upload"); // reuse upload mode for preview
  }, [stopCamera]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image too large. Please use an image under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageData(ev.target?.result as string);
      setMode("upload");
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  // Submit for analysis
  const handleAnalyze = async () => {
    if (!imageData) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData,
          farmName: farmName.trim() || undefined,
          location: location.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Analysis failed");

      // Store result and redirect
      sessionStorage.setItem("soilAnalysis", JSON.stringify(data.data));

      // Also save to history
      try {
        const history = JSON.parse(localStorage.getItem("soilHistory") || "[]");
        history.unshift({
          id: data.data.id,
          timestamp: data.data.timestamp,
          farmName: data.data.farmName,
          location: data.data.location,
          soilHealthScore: data.data.soilHealth.score,
          topCrop: data.data.topCrops?.[0]?.name || "Unknown",
          imageData: imageData.substring(0, 500), // truncated
        });
        localStorage.setItem("soilHistory", JSON.stringify(history.slice(0, 20)));
      } catch {}

      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAll = () => {
    stopCamera();
    setMode("choose");
    setImageData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
            <Leaf className="w-4 h-4" />
            Soil Analysis
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Analyze Your Soil</h1>
          <p className="text-stone-500">
            Take a clear photo of your soil to get instant AI-powered insights
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Mode: Choose */}
        {mode === "choose" && !imageData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={startCamera}
                className="flex flex-col items-center gap-3 bg-white border-2 border-green-200 hover:border-green-500 rounded-2xl p-8 transition-all hover:shadow-lg group"
              >
                <div className="w-16 h-16 bg-green-100 group-hover:bg-green-200 rounded-2xl flex items-center justify-center transition-colors">
                  <Camera className="w-8 h-8 text-green-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-800">Use Camera</div>
                  <div className="text-sm text-stone-500 mt-1">Take a photo now</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMode("upload");
                  setTimeout(() => fileInputRef.current?.click(), 100);
                }}
                className="flex flex-col items-center gap-3 bg-white border-2 border-amber-200 hover:border-amber-500 rounded-2xl p-8 transition-all hover:shadow-lg group"
              >
                <div className="w-16 h-16 bg-amber-100 group-hover:bg-amber-200 rounded-2xl flex items-center justify-center transition-colors">
                  <Upload className="w-8 h-8 text-amber-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-800">Upload Photo</div>
                  <div className="text-sm text-stone-500 mt-1">Choose from gallery</div>
                </div>
              </button>
            </div>

            {/* Tips */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Tips for Best Results
              </h3>
              <ul className="space-y-2">
                {TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-green-700">
                    <span className="text-green-500 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Demo mode */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
              <p className="text-amber-700 text-sm mb-3">
                Want to see a demo without uploading? Try with sample data.
              </p>
              <button
                onClick={async () => {
                  setIsAnalyzing(true);
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
                    setIsAnalyzing(false);
                  }
                }}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Leaf className="w-4 h-4" />}
                {isAnalyzing ? "Loading demo..." : "Try Demo Analysis"}
              </button>
            </div>
          </div>
        )}

        {/* Mode: Camera */}
        {mode === "camera" && (
          <div className="bg-black rounded-2xl overflow-hidden relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-6 border-2 border-white/40 rounded-xl" />
              {["top-6 left-6 border-t-4 border-l-4", "top-6 right-6 border-t-4 border-r-4", "bottom-6 left-6 border-b-4 border-l-4", "bottom-6 right-6 border-b-4 border-r-4"].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 border-amber-400 ${cls}`} />
              ))}
              <div className="scanner-line absolute left-6 right-6 h-0.5 bg-amber-400/70" />
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white/70 text-sm text-center mb-4">
                Aim camera at soil and tap capture
              </p>
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => { stopCamera(); setMode("choose"); }}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={capturePhoto}
                  disabled={!cameraReady}
                  className="w-20 h-20 bg-white hover:bg-green-50 rounded-full border-4 border-green-500 flex items-center justify-center transition-all disabled:opacity-50 pulse-glow"
                >
                  <Camera className="w-8 h-8 text-green-700" />
                </button>
                <div className="w-12 h-12" />
              </div>
            </div>
          </div>
        )}

        {/* Mode: Upload / Preview */}
        {(mode === "upload" || imageData) && mode !== "camera" && (
          <div className="space-y-5">
            {/* Image preview */}
            {imageData ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-green-200 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageData} alt="Soil sample" className="w-full object-cover max-h-72" />
                <button
                  onClick={resetAll}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Photo ready
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-green-400 rounded-2xl p-12 text-center cursor-pointer transition-colors"
              >
                <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500 font-medium mb-1">Click to choose a photo</p>
                <p className="text-stone-400 text-sm">JPG, PNG or WEBP up to 10MB</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Optional fields */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
              <h3 className="font-semibold text-stone-700 text-sm">Optional Details</h3>
              <div>
                <label className="block text-sm text-stone-500 mb-1.5">Farm Name</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. My Maize Farm"
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />
              </div>
              <div>
                <label className="block text-sm text-stone-500 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kumasi, Ghana"
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={resetAll}
                className="flex items-center gap-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 font-semibold px-5 py-3 rounded-xl transition-all text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Retake
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!imageData || isAnalyzing}
                className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 disabled:bg-stone-300 text-white font-bold px-6 py-3 rounded-xl transition-all text-base"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing soil...
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    Analyze My Soil
                  </>
                )}
              </button>
            </div>

            {/* Analysis progress */}
            {isAnalyzing && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-800 text-sm">AI Analysis in Progress</div>
                    <div className="text-green-600 text-xs">Examining soil color, texture, and composition...</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {["Detecting soil color & texture", "Estimating pH and nutrients", "Matching best crops", "Calculating shelf life & transport"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 text-xs text-green-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
