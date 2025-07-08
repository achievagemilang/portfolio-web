import { NextRequest, NextResponse } from 'next/server';
import { aiKnowledgeBase } from '@/components/about/ai-knowledge-base';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

function buildPrompt(userMessage: string) {
  return `
You are an AI assistant for Achieva Futura Gemilang's personal portfolio website. Your answers should be friendly and concise. You can only answer questions based on the following knowledge base. If a question is not covered, politely say you can only answer questions about Achieva Futura Gemilang's professional life and background.

Knowledge Base:
Professional Summary: ${aiKnowledgeBase.professionalSummary}
Skills: ${aiKnowledgeBase.skills.join(', ')}
Work Experience: ${aiKnowledgeBase.workExperience
    .map(
      (exp) =>
        `\n- ${exp.role} at ${exp.company} (${exp.period}): ${exp.responsibilities.join(
          '; '
        )} Achievements: ${exp.achievements?.join('; ') || ''}`
    )
    .join('')}
Projects: ${aiKnowledgeBase.projects
    .map(
      (p) =>
        `\n- ${p.name}: ${p.description} (Role: ${p.role}, Tech: ${p.tech.join(', ')}, Link: ${
          p.link
        })`
    )
    .join('')}
Education: ${aiKnowledgeBase.education
    .map(
      (e) =>
        `\n- ${e.degree} at ${e.institution} (${e.period})${
          e.achievements ? ', Achievements: ' + e.achievements.join('; ') : ''
        }`
    )
    .join('')}
Personal Interests: ${aiKnowledgeBase.interests.join(', ')}
Honors/Achievements: ${aiKnowledgeBase.honors.join(', ')}
Fun Facts: ${aiKnowledgeBase.funFacts.join(', ')}

User: ${userMessage}
AI:`;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
    }

    const prompt = buildPrompt(message);

    const geminiRes = await fetch(`${GEMINI_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiRes.ok) {
      const error = await geminiRes.text();
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await geminiRes.json();
    const aiMessage =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response at this time.";

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
