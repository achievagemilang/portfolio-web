import { aiKnowledgeBase } from '@/components/about/ai-knowledge-base';
import type { AiChatRequest, AiChatResponse } from '@/domain/dtos/ai-chat.dto';
import type { IAiService } from '@/domain/interfaces/ai-service.interface';
import OpenAI from 'openai';

/**
 * OpenAI service implementation
 */
export class OpenAiService implements IAiService {
  private openai: OpenAI;
  private model: string;

  constructor(apiKey: string, model = 'gpt-5-nano') {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    this.openai = new OpenAI({ apiKey });
    this.model = model;
  }

  detectSchedulingIntent(message: string): boolean {
    const schedulingKeywords = ['schedule', 'book', 'appointment', 'consultation'];

    const lowerMessage = message.toLowerCase();
    return schedulingKeywords.some((keyword) => lowerMessage.includes(keyword));
  }

  async generateResponse(request: AiChatRequest): Promise<AiChatResponse> {
    const hasSchedulingIntent = this.detectSchedulingIntent(request.message);
    const systemPrompt = this.buildPrompt(hasSchedulingIntent);

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: request.message },
        ],
        model: this.model,
      });

      const aiMessage =
        completion.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a response at this time.";

      return {
        message: aiMessage,
        shouldScheduleMeeting: hasSchedulingIntent,
      };
    } catch (error: any) {
      console.error('OpenAI Error:', error);

      // Handle Rate Limits (429) or Quota (Insuficient Quota)
      if (error?.status === 429 || error?.code === 'insufficient_quota') {
        return {
          message:
            "I'm currently overloaded with requests (Rate Limit Exceeded). Please try again in a moment.",
          shouldScheduleMeeting: hasSchedulingIntent,
        };
      }

      throw new Error(`OpenAI service error: ${error?.message || 'Unknown error'}`);
    }
  }

  private buildPrompt(hasSchedulingIntent: boolean): string {
    const schedulingContext = hasSchedulingIntent
      ? `
IMPORTANT SCHEDULING CONTEXT:
If the user wants to schedule a meeting, please direct them to use Cip's Google Calendar Appointment page for booking: https://calendar.app.google/cEJRExr9jLsgHj469

When scheduling intent is detected, you should:
1. Acknowledge their interest in scheduling
2. Mention that you use Google Calendar for booking
3. Provide the Google Calendar Appointment link (https://calendar.app.google/cEJRExr9jLsgHj469)
4. Keep the response conversational and helpful
`
      : '';

    return `
Your name is AchI. You are Achieva Futura Gemilang's friendly and professional AI assistant for his personal portfolio website. Achieva Futura Gemilang often called by Cip. You can answer questions based on the following comprehensive knowledge base about Cip's professional life, background, and services. If a question is not covered, politely say, "Sorry, I did not find any information about that in my knowledge base. Is there anything else I can help you with?" 
Your responses should be conversational, concise, helpful, and professional.

${schedulingContext}

Knowledge Base:
Professional Summary: ${aiKnowledgeBase.professionalSummary}

Achieva Futura Gemilang's Nicknames: ${aiKnowledgeBase.nicknames.join(', ')}

Services Offered:
${aiKnowledgeBase.services
  .map(
    (service) => `
- **${service.name}**: ${service.description}
  Technologies: ${service.technologies?.join(', ') || 'Various technologies'}
  Examples: ${service.examples?.join(', ') || 'Custom solutions'}
  Areas: ${service.areas?.join(', ') || 'Various areas'}
`
  )
  .join('')}

Pricing Models:
${aiKnowledgeBase.pricing.models
  .map(
    (model) => `
- **${model.type}**: ${model.description}
  Best for: ${model.bestFor}
  Advantages: ${model.advantages.join(', ')}
`
  )
  .join('')}
Pricing Note: ${aiKnowledgeBase.pricing.note}

Process:
${aiKnowledgeBase.process.phases
  .map(
    (phase) => `
- **${phase.name}**: ${phase.description}
  Deliverables: ${phase.deliverables.join(', ')}
`
  )
  .join('')}
Methodology: ${aiKnowledgeBase.process.methodology}

Frequently Asked Questions:
${aiKnowledgeBase.faqs
  .map(
    (faq) => `
**Q: ${faq.question}**
A: ${faq.answer}
`
  )
  .join('')}

Achievements/Honors: ${aiKnowledgeBase.honors.join(', ')}

Skills: ${aiKnowledgeBase.skills.join(', ')}

Top Skills: ${aiKnowledgeBase.topSkills.join(', ')}

Work Experience: ${aiKnowledgeBase.workExperience
      .map(
        (exp) =>
          `\n- **${exp.role}** at ${exp.company} (${exp.period}): ${exp.responsibilities.join(
            '; '
          )} Impact: ${exp.impact?.join('; ') || ''}`
      )
      .join('')}

Projects: ${aiKnowledgeBase.projects
      .map(
        (p) =>
          `\n- **${p.name}**: ${p.description} (Role: ${p.role}, Tech: ${p.tech.join(', ')}, Link: ${
            p.link
          })`
      )
      .join('')}

Education: ${aiKnowledgeBase.education
      .map(
        (e) =>
          `\n- **${e.degree}** at ${e.institution} (${e.period})${
            e.achievements ? ', Achievements: ' + e.achievements.join('; ') : ''
          }`
      )
      .join('')}

Contact: Email: ${aiKnowledgeBase.contact.email}, LinkedIn: ${aiKnowledgeBase.contact.linkedin}, Instagram: ${aiKnowledgeBase.contact.instagram}

Fun Facts: ${aiKnowledgeBase.funFacts.join(', ')}

Languages: ${aiKnowledgeBase.languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}

Personal Interests: ${aiKnowledgeBase.interests.join(', ')}

Instructions:
1. Provide helpful, accurate responses based on the knowledge base
2. Be conversational and professional
3. If the user wants to schedule a meeting, book a call, or discuss their project, respond naturally but indicate scheduling intent
4. Keep responses concise but informative
5. If asked about services, highlight the most relevant ones based on the user's needs
6. If asked about pricing, explain the different models and suggest scheduling a consultation
7. When scheduling intent is detected, mention available time slots naturally in the conversation
9. ALWAYS format links using Markdown syntax: [Link Text](URL). Never output raw URLs. For the booking link, use [Book Appointment Here](https://calendar.app.google/cEJRExr9jLsgHj469)
`;
  }
}
