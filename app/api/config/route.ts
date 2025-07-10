import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    elevenLabsAgentId: process.env.ELEVENLABS_AGENT_ID || '',
    elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiApiUrl: process.env.GEMINI_API_URL || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    googleCalendarApiKey: process.env.GOOGLE_CALENDAR_API_KEY || '',
    googleCalendarId: process.env.GOOGLE_CALENDAR_ID || '',
  });
}
