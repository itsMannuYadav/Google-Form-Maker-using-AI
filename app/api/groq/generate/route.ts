import { NextRequest, NextResponse } from "next/server";
import { processUserFormRequest } from "@/lib/groq/formGenerator";
import { ChatMessage, FormDefinition } from "@/types/form";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, chatHistory = [], currentForm = null } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A prompt is required to generate or edit the form." },
        { status: 400 }
      );
    }

    const result = await processUserFormRequest(
      prompt,
      chatHistory as ChatMessage[],
      currentForm as FormDefinition | null
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API /api/groq/generate error:", error);
    return NextResponse.json(
      {
        error: "Failed to process form request. Please try again.",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
