import { NextRequest, NextResponse } from "next/server";
import { analyzeSoilImage } from "@/lib/anthropic";
import { getDemoAnalysis } from "@/lib/demo-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageData, farmName, location, demo } = body;

    // Use demo mode if explicitly requested or no API key
    if (demo || !process.env.ANTHROPIC_API_KEY) {
      // Simulate processing delay for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const demoResult = getDemoAnalysis({ farmName, location });
      return NextResponse.json({ success: true, data: demoResult });
    }

    if (!imageData) {
      return NextResponse.json(
        { success: false, error: "Image data is required" },
        { status: 400 }
      );
    }

    const analysis = await analyzeSoilImage(imageData, farmName, location);
    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("Soil analysis error:", error);

    // Fall back to demo data on error
    const demoResult = getDemoAnalysis();
    return NextResponse.json({
      success: true,
      data: demoResult,
      warning: "Using demo data — AI analysis unavailable",
    });
  }
}
