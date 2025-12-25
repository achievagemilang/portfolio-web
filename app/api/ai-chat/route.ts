import { createAiChatService } from '@/infrastructure/config/services.config';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/ai-chat
 * Handle AI chat requests
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const aiChatService = createAiChatService();
    const result = await aiChatService.handleChatRequest(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI Chat Error:', error);

    // Handle validation errors
    if (error instanceof Error && error.message.includes('Validation failed')) {
      return NextResponse.json(
        {
          message:
            "I'm having trouble processing your request. Please make sure your message is valid.",
          shouldScheduleMeeting: false,
        },
        { status: 400 }
      );
    }

    // Handle service configuration errors
    if (error instanceof Error && error.message.includes('required')) {
      return NextResponse.json(
        {
          message:
            "I'm experiencing technical difficulties. Please try again later or contact me directly.",
          shouldScheduleMeeting: false,
        },
        { status: 500 }
      );
    }

    // Handle AI service errors (already handled in service, but catch any unexpected errors)
    if (error instanceof Error && error.message.includes('AI service')) {
      return NextResponse.json(
        {
          message:
            "I'm having trouble processing your request right now. Please try again in a moment, or contact me directly at achievafuturagemilang@gmail.com.",
          shouldScheduleMeeting: false,
        },
        { status: 500 }
      );
    }

    // Generic error handler
    return NextResponse.json(
      {
        message:
          "I'm experiencing technical difficulties. Please try again later or contact me directly.",
        shouldScheduleMeeting: false,
      },
      { status: 500 }
    );
  }
}
