import { NextRequest, NextResponse } from 'next/server';
import { aiKnowledgeBase } from '@/components/about/ai-knowledge-base';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

function buildPrompt(userMessage: string) {
  return `
You are Cip's friendly and concise AI assistant for his personal portfolio website. Your name is AchI. You can only answer questions based on the following knowledge base about Cip's professional life and background. If a question is not covered, politely say, "Sorry, I did not find any information about that in my knowledge base. Is there anything else I can help you with?"

Knowledge Base:
Professional Summary: ${aiKnowledgeBase.professionalSummary}
Achievements/Honors: ${aiKnowledgeBase.honors.join(', ')}
Skills: ${aiKnowledgeBase.skills.join(', ')}
Top Skills: ${aiKnowledgeBase.topSkills.join(', ')}
Work Experience: ${aiKnowledgeBase.workExperience
    .map(
      (exp) =>
        `\n- ${exp.role} at ${exp.company} (${exp.period}): ${exp.responsibilities.join(
          '; '
        )} Impact: ${exp.impact?.join('; ') || ''}`
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
          e.achievements ? ', Education Achievements: ' + e.achievements.join('; ') : ''
        }`
    )
    .join('')}
Personal Interests: ${aiKnowledgeBase.interests.join(', ')}
Fun Facts: ${aiKnowledgeBase.funFacts.join(', ')}
Languages: ${aiKnowledgeBase.languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
Contact: Email: ${aiKnowledgeBase.contact.email}, LinkedIn: ${aiKnowledgeBase.contact.linkedin}, Instagram: ${aiKnowledgeBase.contact.instagram}

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
