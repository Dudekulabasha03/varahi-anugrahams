import { NextResponse } from "next/server";

export interface AIAdvisorResponse {
  matchTitle: string;
  matchScore: number;
  executiveSummary: string;
  floorBreakdown: {
    level: string;
    highlights: string[];
    rationale: string;
  }[];
  recommendedUpgrades: {
    title: string;
    reason: string;
  }[];
  communityPerks: string[];
  suggestedAction: string;
  prefilledWhatsAppMessage: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt = "", familyProfile = "", priorities = [] } = body;

    const lower = (prompt + " " + familyProfile + " " + priorities.join(" ")).toLowerCase();

    // Check for AI Gateway or external API keys if configured
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_KEY;
    const gatewayUrl = process.env.AI_GATEWAY_URL;

    if (gatewayUrl && apiKey) {
      try {
        const response = await fetch(gatewayUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gemini-1.5-flash",
            messages: [
              {
                role: "system",
                content:
                  "You are the senior architectural advisor for VARAHI ANUGRAHAMS, an exclusive gated community in Tadipatri by Rangaiah Kotra (Sri Murali Cotton Press). Analyze the buyer's requirements against our 23x47 ft 3-level villa, 23x30 terrace garden, private lift, ground-floor master suite, anti-termite system, and 30ft avenue. Respond in valid JSON adhering to AIAdvisorResponse.",
              },
              { role: "user", content: `Buyer Needs: ${prompt}. Family Profile: ${familyProfile}. Priorities: ${priorities.join(", ")}` },
            ],
          }),
        });

        if (response.ok) {
          const aiData = await response.json();
          if (aiData?.result) {
            return NextResponse.json(aiData.result);
          }
        }
      } catch (err) {
        console.warn("AI Gateway fetch failed, falling back to local architectural reasoning engine", err);
      }
    }

    // High-Precision Architectural Reasoning Engine tailored for Varahi Anugrahams
    const hasElderly = lower.includes("elder") || lower.includes("parent") || lower.includes("old") || lower.includes("grandparent") || lower.includes("stairs") || lower.includes("age");
    const hasKids = lower.includes("child") || lower.includes("kid") || lower.includes("son") || lower.includes("daughter") || lower.includes("school") || lower.includes("family");
    const hasDevotion = lower.includes("pooja") || lower.includes("puja") || lower.includes("mandir") || lower.includes("temple") || lower.includes("prayer") || lower.includes("vaastu") || lower.includes("vastu");
    const hasRemoteWork = lower.includes("work") || lower.includes("office") || lower.includes("wfh") || lower.includes("study") || lower.includes("remote") || lower.includes("tech");
    const hasGarden = lower.includes("garden") || lower.includes("terrace") || lower.includes("outdoor") || lower.includes("plant") || lower.includes("nature") || lower.includes("green");
    const hasDurability = lower.includes("termite") || lower.includes("invest") || lower.includes("quality") || lower.includes("construction") || lower.includes("safety");

    let matchScore = 94;
    const recommendedUpgrades = [];

    if (hasElderly) {
      matchScore += 2;
      recommendedUpgrades.push({
        title: "Private Residential Lift Provision (4'-6\" × 4'-6\")",
        reason: "Eliminates stair climbing completely, providing smooth, silent access across all three levels from ground arrival to the rooftop terrace.",
      });
    }

    if (hasGarden || lower.includes("summer") || lower.includes("night") || lower.includes("chill")) {
      matchScore += 2;
      recommendedUpgrades.push({
        title: "Cooled Moonlight Terrace Bedroom & Pergola",
        reason: "Opens to cool night breezes and starlit views above the 23×30 ft garden terrace, perfect for beating summer heat and evening tea.",
      });
    }

    if (hasDurability || lower.includes("long term") || lower.includes("foundation")) {
      recommendedUpgrades.push({
        title: "Continuous Base-Level Anti-Termite Reticulation System",
        reason: "Subterranean piping built into the 23×47 ft foundation soil with brick supports for hassle-free permanent chemical recharge.",
      });
    }

    if (recommendedUpgrades.length === 0) {
      recommendedUpgrades.push({
        title: "Architectural Pergola with Ambient Water Fountain",
        reason: "Resort-grade treated timber canopy and soothing water ripples for private family relaxation and hosting guests.",
      });
    }

    const result: AIAdvisorResponse = {
      matchTitle: "Varahi Anugrahams Signature 3-Level Luxury Villa",
      matchScore: Math.min(matchScore, 99),
      executiveSummary: `Based on your lifestyle description, the Signature 3-Level Villa on a 23 ft × 47 ft plot with West Road frontage perfectly matches your family's needs. Its thoughtful distribution separates active ground-floor hospitality from private upper-level sanctuaries, crowned by a dedicated 23×30 ft private sky terrace.`,
      floorBreakdown: [
        {
          level: "Ground Floor (Hospitality & Accessibility)",
          highlights: [
            "Covered Car Porch with Arched Facade & West Road Gate",
            "Formal Sitting Room (10'-1½\" × 7'-0\") & Grand Living Hall (16'-1½\" × 12'-3\")",
            "Dedicated Sacred Pooja Mandir (4'-0\" × 6'-0\") with Vaastu alignment",
            "Ground Master Suite (14'-0\" × 16'-4½\") with Attached Toilet (9'-0\" × 7'-0\") — " + (hasElderly ? "Zero stairs required for senior parents!" : "Ideal for ground-floor convenience"),
            "Private Elevator Shaft (4'-6\" × 4'-6\") connecting all levels",
          ],
          rationale: hasElderly
            ? "The ground-floor master suite paired with direct lift access guarantees your parents complete independence without stair fatigue."
            : "Effortless flow between the formal greeting foyer, open dining (9'-4\" × 13'-0\"), and modular kitchen with utility yard.",
        },
        {
          level: "First Floor (Private Family & Lounge)",
          highlights: [
            "Primary Master Bedroom Suite (13'-0\" × 20'-0\") with Walk-in Dressing (5'-0\" × 4'-1½\")",
            "Spa-Style Ensuite Toilet (6'-0\" × 18'-0\")",
            "Child Room (13'-0\" × 13'-0\") with Attached Toilet (6'-6\" × 4'-0\")",
            "Central Family Lounge (16'-1½\" × 10'-3\") for intimate evenings",
            "Curved Cantilevered Balcony (6'-0\" × 17'-0\") with vertical timber shading fins",
          ],
          rationale: hasKids
            ? "Dedicated child room with attached bathroom right across from the family lounge gives children their own space while staying close to parents."
            : hasRemoteWork
            ? "The expansive master suite and family lounge easily accommodate a quiet executive desk with balcony garden views."
            : "Separated from ground-floor visitor movement, offering privacy, quiet, and garden balcony breezes.",
        },
        {
          level: "Terrace Level (Sky Sanctuary & Nature)",
          highlights: [
            "23 ft × 30 ft (690 Sq. Ft.) Private Open Rooftop Terrace",
            "Weatherproof Timber Pergola with Concealed Lighting",
            "Natural Soft Grass Turf Lawn & Planters",
            "Stone Cascading Water Fountain with Ambient Acoustic Ripples",
            "Direct Elevator & Stair Access",
          ],
          rationale: "Brings nature directly to your home — a private open-air haven for morning yoga, festival gatherings, and stargazing.",
        },
      ],
      recommendedUpgrades,
      communityPerks: [
        "Wide 30 FT Central Avenue Road with heavy-duty pavers",
        "Swaying Royal Palms and warm architectural illumination",
        "100% Concealed Underground Electrical and Drainage Utilities",
        "Grand V-Emblem Illuminated Entrance Portal with 24/7 Security Cabin & CCTV",
        "Bespoke Sri Aluru Kona Ranganatha Swamy Devotional Blessing & Ethos",
      ],
      suggestedAction: "Schedule a personalized on-site walkthrough with developer Sri Rangaiah Kotra to walk the 23×47 ft layout and inspect the 30 FT avenue in person.",
      prefilledWhatsAppMessage: `Hello Rangaiah Kotra garu, I used the Varahi Anugrahams AI Advisor. It recommended the Signature 3-Level Villa (23x47 ft plot, 23x30 terrace) with a ${Math.min(matchScore, 99)}% match for my family. I would like to schedule a site viewing.`,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Advisor Error:", error);
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
  }
}
